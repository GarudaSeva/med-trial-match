import { FileText, CheckCircle, Info, Cpu } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AISummaryProps {
  summary: string;
  recommendations: string[];
  confidence: number;
  modelVersion: string;
}

const AISummary = ({ summary, recommendations, confidence, modelVersion }: AISummaryProps) => {
  return (
    <section className="medical-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center">
          <FileText className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Summary & Recommendations</h2>
          <p className="text-sm text-muted-foreground">
            Personalized insights based on your health data
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="p-5 rounded-xl bg-secondary/50 border border-border mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-2">Clinical Summary</h4>
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <h4 className="font-semibold mb-4">Recommendations</h4>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-accent/50 border border-border"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Model Info */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 cursor-help">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Confidence: {(confidence * 100).toFixed(0)}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">The AI model's confidence in its predictions</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted cursor-help">
              <Cpu className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Model: {modelVersion}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">BioBERT-based health analysis model</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
};

export default AISummary;
