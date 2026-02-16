import { Shield, AlertCircle, TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface RiskFactor {
  name: string;
  severity: 'low' | 'moderate' | 'high';
}

interface HealthRiskProps {
  status: 'LOW' | 'MODERATE' | 'HIGH';
  score: number;
  riskFactors: RiskFactor[];
}

const HealthRiskCard = ({ status, score, riskFactors }: HealthRiskProps) => {
  const statusConfig = {
    LOW: {
      color: 'risk-low',
      bgClass: 'bg-success/10',
      borderClass: 'border-success/30',
      textClass: 'text-success',
      icon: TrendingDown,
      label: 'Low Risk',
    },
    MODERATE: {
      color: 'risk-moderate',
      bgClass: 'bg-warning/10',
      borderClass: 'border-warning/30',
      textClass: 'text-warning',
      icon: Minus,
      label: 'Moderate Risk',
    },
    HIGH: {
      color: 'risk-high',
      bgClass: 'bg-danger/10',
      borderClass: 'border-danger/30',
      textClass: 'text-danger',
      icon: TrendingUp,
      label: 'High Risk',
    },
  };

  const config = statusConfig[status] || statusConfig.LOW;
  const StatusIcon = config.icon;

  return (
    <section className="medical-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Health Risk Assessment</h2>
          <p className="text-sm text-muted-foreground">
            Overall health status based on report analysis
          </p>
        </div>
      </div>

      {/* Status Card */}
      <div className={`p-6 rounded-xl border-2 ${config.bgClass} ${config.borderClass} mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl ${config.bgClass} flex items-center justify-center`}>
              <StatusIcon className={`w-8 h-8 ${config.textClass}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overall Status</p>
              <h3 className={`text-2xl font-bold ${config.textClass}`}>
                {config.label.toUpperCase()}
              </h3>
            </div>
          </div>
          
          {/* Severity Score */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Severity Score</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-bold ${config.textClass}`}>
                {Math.round(score)}
              </span>
              <span className="text-muted-foreground">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div>
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Risk Factors Identified
        </h4>
        <div className="space-y-3">
          {riskFactors.map((factor, index) => {
            const severityClasses = {
              low: { dot: 'bg-success', text: 'text-success', badge: 'bg-success/10' },
              moderate: { dot: 'bg-warning', text: 'text-warning', badge: 'bg-warning/10' },
              high: { dot: 'bg-danger', text: 'text-danger', badge: 'bg-danger/10' },
            };
            const classes = severityClasses[factor.severity];

            return (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${classes.dot}`}></span>
                  <span className="font-medium">{factor.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes.badge} ${classes.text}`}>
                  {factor.severity.charAt(0).toUpperCase() + factor.severity.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HealthRiskCard;
