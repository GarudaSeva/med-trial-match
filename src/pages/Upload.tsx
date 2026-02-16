import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UploadSection from '@/components/UploadSection';
import AIProcessing from '@/components/AIProcessing';
import PredictedDiseases from '@/components/PredictedDiseases';
import HealthRiskCard from '@/components/HealthRiskCard';
import AISummary from '@/components/AISummary';

type AnalysisState = 'idle' | 'processing' | 'complete';

const Upload = () => {
  const { user, updateReportStats } = useAuth();
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [processingStage, setProcessingStage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [predictedDiseases, setPredictedDiseases] = useState<any[]>([]);
  const [healthRisk, setHealthRisk] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<any>(null);

  const handleAnalyze = async (file: File) => {
    setAnalysisState('processing');
    setProcessingStage(0);
    setError(null);

    try {
      // Simulate initial processing stages while uploading/waiting
      const progressInterval = setInterval(() => {
        setProcessingStage((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1000);

      const formData = new FormData();
      formData.append('file', file);
      if (user?.email) {
        formData.append('email', user.email);
      }

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProcessingStage(4); // Finalizing

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to analyze report');
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Map Disease Predictions
      const diseases = (data.disease_predictions || []).map((p: any) => ({
        name: p.disease,
        probability: Math.round(p.probability * 100),
        description: p.details?.description || p.description || 'No description available for this condition.',
        details: p.details
      }));
      setPredictedDiseases(diseases);

      // Map Health Risk
      // Frontend expects: LOW, MODERATE, HIGH
      // Backend returns: LOW, MEDIUM, HIGH, CRITICAL
      let riskStatus = 'LOW';
      if (data.risk_assessment?.risk_level === 'MEDIUM') riskStatus = 'MODERATE';
      else if (data.risk_assessment?.risk_level === 'HIGH' || data.risk_assessment?.risk_level === 'CRITICAL') riskStatus = 'HIGH';
      else if (data.risk_assessment?.risk_level === 'LOW') riskStatus = 'LOW';
      
      let abnormalLabs = (data.abnormal_labs || []).map((lab: any) => ({
        name: `${lab.test} (${lab.value})`,
        severity: lab.status === 'HIGH' || lab.status === 'CRITICAL' ? 'high' : 'moderate',
      }));

      // If no abnormal labs but high risk (due to disease prediction), add the disease as a risk factor
      if (abnormalLabs.length === 0 && riskStatus !== 'LOW' && data.disease_predictions?.[0]) {
        const topDisease = data.disease_predictions[0];
        abnormalLabs.push({
          name: `Potential ${topDisease.disease} Detected`,
          severity: riskStatus === 'HIGH' ? 'high' : 'moderate'
        });
      }

      setHealthRisk({
        status: riskStatus,
        score: data.risk_assessment?.risk_score || 0,
        riskFactors: abnormalLabs.length > 0 ? abnormalLabs : [{ name: "No major risk factors found", severity: "low" }],
      });

      // Filter out detailed recommendations for the summary view since they are shown in accordions
      const summaryRecommendations = (data.summary?.recommendations || []).filter((r: string) => 
        !r.startsWith("Precautions:") &&
        !r.startsWith("Recommended Foods:") &&
        !r.startsWith("Avoid Foods:") &&
        !r.startsWith("Common Medicines:") &&
        !r.startsWith("Recommended Tests:")
      );

      // Map Summary
      setAiSummary({
        summary: data.summary?.summary_text || `Analysis complete. Found ${data.abnormal_count} abnormal lab results. Risk level assessed as ${data.risk_assessment?.risk_level}.`,
        recommendations: summaryRecommendations,
        confidence: data.disease_predictions?.[0]?.probability || 0.85, 
        modelVersion: 'biobert-health-v1.0',
      });

      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for UX
      setAnalysisState('complete');
      updateReportStats();

    } catch (err: any) {
      console.error("Analysis Error:", err);
      setError(err.message || "An error occurred during analysis.");
      setAnalysisState('idle');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
            Error: {error}
          </div>
        )}

        {/* Upload Section - Always visible */}
        {analysisState === 'idle' && (
          <UploadSection onAnalyze={handleAnalyze} isAnalyzing={false} />
        )}

        {/* Processing Animation */}
        {analysisState === 'processing' && (
          <AIProcessing stage={processingStage} />
        )}

        {/* Results */}
        {analysisState === 'complete' && (
          <>
            {/* New Analysis Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setAnalysisState('idle')}
                className="text-sm text-primary hover:underline"
              >
                ← Upload New Report
              </button>
            </div>

            {predictedDiseases.length > 0 && (
                <PredictedDiseases diseases={predictedDiseases} />
            )}
            
            {healthRisk && (
                <HealthRiskCard {...healthRisk} />
            )}
            
            {aiSummary && (
                <AISummary 
                  {...aiSummary} 
                  details={predictedDiseases.length > 0 ? predictedDiseases[0].details : null}
                />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
