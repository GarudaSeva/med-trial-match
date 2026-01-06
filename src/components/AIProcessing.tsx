import { Activity, Brain, FileSearch, Stethoscope } from 'lucide-react';

interface AIProcessingProps {
  stage: number;
}

const AIProcessing = ({ stage }: AIProcessingProps) => {
  const stages = [
    { icon: FileSearch, label: 'Extracting text from report...', sublabel: 'OCR Processing' },
    { icon: Brain, label: 'Analyzing clinical data...', sublabel: 'NLP Analysis' },
    { icon: Stethoscope, label: 'Predicting diseases...', sublabel: 'BioBERT Model' },
    { icon: Activity, label: 'Assessing health risks...', sublabel: 'Risk Calculation' },
  ];

  return (
    <section className="medical-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center animate-pulse-medical">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Processing</h2>
          <p className="text-sm text-muted-foreground">
            Analyzing your medical report with advanced AI models
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((s, index) => {
          const Icon = s.icon;
          const isActive = index === stage;
          const isComplete = index < stage;

          return (
            <div 
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/10 border border-primary/30' 
                  : isComplete 
                    ? 'bg-success/10 border border-success/30' 
                    : 'bg-muted/50 border border-transparent'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isActive 
                  ? 'gradient-medical animate-pulse-medical' 
                  : isComplete 
                    ? 'bg-success' 
                    : 'bg-muted-foreground/20'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive || isComplete ? 'text-primary-foreground' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  isActive ? 'text-primary' : isComplete ? 'text-success' : 'text-muted-foreground'
                }`}>
                  {s.label}
                </p>
                <p className="text-xs text-muted-foreground">{s.sublabel}</p>
              </div>
              {isActive && (
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              )}
              {isComplete && (
                <span className="text-success text-sm font-medium">✓ Complete</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Scan Animation */}
      <div className="relative mt-6 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 gradient-medical rounded-full transition-all duration-500"
          style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};

export default AIProcessing;
