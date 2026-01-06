import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UploadSection from '@/components/UploadSection';
import AIProcessing from '@/components/AIProcessing';
import PredictedDiseases from '@/components/PredictedDiseases';
import HealthRiskCard from '@/components/HealthRiskCard';
import AISummary from '@/components/AISummary';

type AnalysisState = 'idle' | 'processing' | 'complete';

const Upload = () => {
  const { updateReportStats } = useAuth();
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [processingStage, setProcessingStage] = useState(0);

  // Dummy data for predictions
  const predictedDiseases = [
    { 
      name: 'Anemia', 
      probability: 87,
      description: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.'
    },
    { 
      name: 'Hypertension', 
      probability: 42,
      description: 'A condition in which the force of the blood against the artery walls is too high, often leading to heart disease.'
    },
  ];

  const healthRisk = {
    status: 'MODERATE' as const,
    score: 0.63,
    riskFactors: [
      { name: 'Low hemoglobin levels', severity: 'high' as const },
      { name: 'Elevated blood pressure', severity: 'moderate' as const },
    ],
  };

  const aiSummary = {
    summary: 'The report indicates low hemoglobin levels (10.2 g/dL), suggesting a high likelihood of anemia. Blood pressure readings are slightly elevated (138/88 mmHg), indicating a moderate risk of hypertension. Iron and vitamin B12 levels should be further evaluated.',
    recommendations: [
      'Consult a physician for comprehensive anemia evaluation and potential iron studies',
      'Consider incorporating iron-rich foods (spinach, red meat, legumes) or supplements as advised',
      'Monitor blood pressure regularly and maintain a low-sodium diet',
      'Schedule follow-up blood work in 4-6 weeks to track hemoglobin levels',
    ],
    confidence: 0.91,
    modelVersion: 'biobert-health-v1.0',
  };

  const handleAnalyze = async (file: File) => {
    setAnalysisState('processing');
    setProcessingStage(0);

    // Simulate AI processing stages
    for (let i = 0; i < 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProcessingStage(i + 1);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setAnalysisState('complete');
    updateReportStats();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
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

            <PredictedDiseases diseases={predictedDiseases} />
            <HealthRiskCard {...healthRisk} />
            <AISummary {...aiSummary} />
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
