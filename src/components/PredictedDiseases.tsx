import { AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Disease {
  name: string;
  probability: number;
  description: string;
}

interface PredictedDiseasesProps {
  diseases: Disease[];
}

const PredictedDiseases = ({ diseases }: PredictedDiseasesProps) => {
  const getColorClasses = (probability: number) => {
    if (probability >= 70) return { bg: 'bg-danger', text: 'text-danger' };
    if (probability >= 40) return { bg: 'bg-warning', text: 'text-warning' };
    return { bg: 'bg-success', text: 'text-success' };
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
          
          return (
            <div 
              key={index}
              className="p-5 rounded-xl border border-border bg-card hover:shadow-medical transition-all duration-300"
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
                  <AlertTriangle className="w-5 h-5 text-danger" />
                )}
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Probability</span>
                  <span className={`font-bold ${colors.text}`}>{disease.probability}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${colors.bg} rounded-full transition-all duration-1000`}
                    style={{ width: `${disease.probability}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PredictedDiseases;
