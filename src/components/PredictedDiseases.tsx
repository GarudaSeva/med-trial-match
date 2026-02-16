import { AlertTriangle, Activity, TrendingUp, Info, Pill, Apple, FileSearch, ShieldAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DiseaseDetails {
  description?: string;
  precautions?: string[];
  medicines?: string[];
  foods_to_avoid?: string[];
  foods_to_eat?: string[];
  recommended_tests?: string[];
  related_diseases?: string[];
}

interface Disease {
  name: string;
  probability: number;
  description: string;
  details?: DiseaseDetails;
}

interface PredictedDiseasesProps {
  diseases: Disease[];
}

const PredictedDiseases = ({ diseases }: PredictedDiseasesProps) => {
  const getColorClasses = (probability: number) => {
    if (probability >= 70) return { bg: 'bg-destructive', text: 'text-destructive', border: 'border-destructive/20' };
    if (probability >= 40) return { bg: 'bg-warning', text: 'text-warning', border: 'border-warning/20' };
    return { bg: 'bg-success', text: 'text-success', border: 'border-success/20' };
  };

  return (
    <section className="medical-card animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Predicted Diseases</h2>
          <p className="text-sm text-muted-foreground">
            AI-detected conditions based on your report analysis
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {diseases.map((disease, index) => {
          const colors = getColorClasses(disease.probability);
          const hasDetails = disease.details && Object.keys(disease.details).length > 0;
          
          return (
            <div 
              key={index}
              className={`p-5 rounded-xl border ${colors.border} bg-card hover:shadow-medical transition-all duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${colors.bg}/10 flex items-center justify-center`}>
                    <Activity className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="font-semibold cursor-help">{disease.name}</h3>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">{disease.description}</p>
                      </TooltipContent>
                    </Tooltip>
                    <p className={`text-sm font-medium ${colors.text}`}>
                      {disease.probability >= 70 ? 'High' : disease.probability >= 40 ? 'Moderate' : 'Low'} Likelihood
                    </p>
                  </div>
                </div>
                {disease.probability >= 70 && (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Probability</span>
                    <span className={`font-bold ${colors.text}`}>{disease.probability}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${colors.bg} rounded-full transition-all duration-1000`}
                      style={{ width: `${disease.probability}%` }}
                    ></div>
                  </div>
                </div>

                {hasDetails && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full text-xs h-8">
                        View Treatment & Precautions
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl text-primary">
                          <Activity className="w-6 h-6" />
                          {disease.name}
                        </DialogTitle>
                        <DialogDescription>
                           Comprehensive analysis and recommendations
                        </DialogDescription>
                      </DialogHeader>
                      
                      <ScrollArea className="flex-1 pr-4">
                        <Tabs defaultValue="overview" className="w-full mt-4">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="treatment">Treatment</TabsTrigger>
                            <TabsTrigger value="diet">Diet</TabsTrigger>
                            <TabsTrigger value="tests">Tests</TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="space-y-4 mt-4">
                            <div className="p-4 rounded-lg bg-muted/50">
                              <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" />
                                Description
                              </h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {disease.details?.description || disease.description}
                              </p>
                            </div>

                            {disease.details?.related_diseases && (
                              <div className="p-4 rounded-lg bg-orange-50 border border-orange-100">
                                <h4 className="font-semibold mb-2 flex items-center gap-2 text-orange-700">
                                  <ShieldAlert className="w-4 h-4" />
                                  Related Conditions
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {disease.details.related_diseases.map((rel, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-white rounded-md border border-orange-200 text-orange-800">
                                      {rel}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="treatment" className="space-y-4 mt-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700">
                                  <ShieldAlert className="w-4 h-4" />
                                  Precautions
                                </h4>
                                <ul className="space-y-2">
                                  {disease.details?.precautions?.map((item, i) => (
                                    <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-700">
                                  <Pill className="w-4 h-4" />
                                  Common Medicines
                                </h4>
                                <ul className="space-y-2">
                                  {disease.details?.medicines?.map((item, i) => (
                                    <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="diet" className="space-y-4 mt-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-emerald-700">
                                  <Apple className="w-4 h-4" />
                                  Foods to Eat
                                </h4>
                                <ul className="space-y-2">
                                  {disease.details?.foods_to_eat?.map((item, i) => (
                                    <li key={i} className="text-sm text-emerald-800 flex items-start gap-2">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
                                  <AlertTriangle className="w-4 h-4" />
                                  Foods to Avoid
                                </h4>
                                <ul className="space-y-2">
                                  {disease.details?.foods_to_avoid?.map((item, i) => (
                                    <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="tests" className="space-y-4 mt-4">
                             <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                                <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-700">
                                  <FileSearch className="w-4 h-4" />
                                  Recommended Future Tests
                                </h4>
                                <div className="grid gap-2 sm:grid-cols-2">
                                  {disease.details?.recommended_tests?.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 p-2 bg-white rounded border border-purple-200 text-sm text-purple-800">
                                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                          </TabsContent>
                        </Tabs>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default PredictedDiseases;
