import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  FileText, 
  Calendar, 
  Activity,
  TrendingUp,
  Shield,
  Eye,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PredictedDiseases from '@/components/PredictedDiseases';
import HealthRiskCard from '@/components/HealthRiskCard';
import AISummary from '@/components/AISummary';

const Profile = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports?email=${user?.email}`);
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const transformReportRx = (report: any) => {
    const data = report.results || {};
    
    // Map Disease Predictions
    const diseases = (data.disease_predictions || []).map((p: any) => ({
      name: p.disease,
      probability: Math.round(p.probability * 100),
      description: p.details?.description || p.description || 'No description available for this condition.',
      details: p.details
    }));

    // Map Health Risk
    let riskStatus = 'LOW';
    const backendRisk = data.risk_assessment?.risk_level;
    if (backendRisk === 'MEDIUM') riskStatus = 'MODERATE';
    else if (backendRisk === 'HIGH' || backendRisk === 'CRITICAL') riskStatus = 'HIGH';
    else if (backendRisk === 'LOW') riskStatus = 'LOW';
    
    let abnormalLabs = (data.abnormal_labs || []).map((lab: any) => ({
      name: `${lab.test} (${lab.value})`,
      severity: lab.status === 'HIGH' || lab.status === 'CRITICAL' ? 'high' : 'moderate',
    }));

    if (abnormalLabs.length === 0 && riskStatus !== 'LOW' && data.disease_predictions?.[0]) {
        const topDisease = data.disease_predictions[0];
        abnormalLabs.push({
            name: `Potential ${topDisease.disease} Detected`,
            severity: riskStatus === 'HIGH' ? 'high' : 'moderate'
        });
    }

    const healthRisk = {
      status: riskStatus as 'LOW' | 'MODERATE' | 'HIGH',
      score: data.risk_assessment?.risk_score || 0,
      riskFactors: abnormalLabs.length > 0 ? abnormalLabs : [{ name: "No major risk factors found", severity: "low" as const }],
    };

    // Filter out detailed recommendations for the summary view
    const summaryRecommendations = (data.summary?.recommendations || []).filter((r: string) => 
        !r.startsWith("Precautions:") &&
        !r.startsWith("Recommended Foods:") &&
        !r.startsWith("Avoid Foods:") &&
        !r.startsWith("Common Medicines:") &&
        !r.startsWith("Recommended Tests:")
    );

    // Map Summary
    const aiSummary = {
      summary: data.summary?.summary_text || `Analysis complete. Found ${data.abnormal_count} abnormal lab results. Risk level assessed as ${backendRisk}.`,
      recommendations: summaryRecommendations,
      confidence: data.disease_predictions?.[0]?.probability || 0.85, 
      modelVersion: 'biobert-health-v1.0',
    };

    return { diseases, healthRisk, aiSummary };
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="medical-card mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl gradient-medical flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold mb-1">{user.username}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mt-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Last upload: {user.lastUploadDate 
                    ? format(new Date(user.lastUploadDate), 'MMM d, yyyy') 
                    : 'No uploads yet'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <section className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-medical flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold">Analysis History</h2>
          </div>

          {loading ? (
             <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => {
                 const mappedData = transformReportRx(report);
                 return (
                  <div key={report._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:bg-muted/80 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-medium">Medical Report Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(report.timestamp), 'MMMM d, yyyy • h:mm a')}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${mappedData.healthRisk.status === 'LOW' ? 'bg-success/10 text-success' : 
                          mappedData.healthRisk.status === 'MODERATE' ? 'bg-warning/10 text-warning' : 
                          'bg-destructive/10 text-destructive'}`}>
                        {mappedData.healthRisk.status} RISK
                      </span>

                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            View Results
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[90vw] sm:max-w-[700px] overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Report Analysis Results</SheetTitle>
                            <SheetDescription>
                              Analyzed on {format(new Date(report.timestamp), 'PPP p')}
                            </SheetDescription>
                          </SheetHeader>
                          
                          <ScrollArea className="h-full pr-4 pb-20">
                            <div className="py-6 space-y-8">
                              {/* Predictions */}
                              {mappedData.diseases.length > 0 && (
                                  <PredictedDiseases diseases={mappedData.diseases} />
                              )}
                              
                              {/* Risk */}
                              <HealthRiskCard {...mappedData.healthRisk} />
                              
                              {/* Summary */}
                              <AISummary 
                                {...mappedData.aiSummary}
                                details={mappedData.diseases.length > 0 ? mappedData.diseases[0].details : null}
                              />
                            </div>
                          </ScrollArea>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                 );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reports analyzed yet.</p>
              <p className="text-sm mt-2">Upload your first medical report to get started!</p>
              <Button className="mt-4" onClick={() => window.location.href = '/upload'}>
                 Go to Upload
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
