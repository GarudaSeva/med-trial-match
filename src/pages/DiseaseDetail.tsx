import { useParams, Link } from 'react-router-dom';
import { diseases } from '@/data/diseases';
import { 
  ArrowLeft, 
  AlertCircle, 
  Activity, 
  Shield, 
  Home, 
  Stethoscope,
  CheckCircle,
  AlertTriangle,
  Heart,
  Droplet,
  Wind
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  droplet: Droplet,
  heart: Heart,
  activity: Activity,
  wind: Wind,
  'heart-pulse': Heart,
};

const DiseaseDetail = () => {
  const { id } = useParams();
  const disease = diseases.find(d => d.id === id);

  if (!disease) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Disease Not Found</h1>
          <Link to="/diseases">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[disease.icon] || Activity;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/diseases" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Disease Library
      </Link>

      {/* Header */}
      <div className="medical-card mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl gradient-medical flex items-center justify-center flex-shrink-0">
            <Icon className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground mb-3">
              {disease.category}
            </span>
            <h1 className="text-3xl font-bold mb-3">{disease.name}</h1>
            <p className="text-muted-foreground leading-relaxed">{disease.description}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Symptoms */}
        <section className="medical-card animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-danger/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-danger" />
            </div>
            <h2 className="text-xl font-bold">Symptoms</h2>
          </div>
          <ul className="space-y-3">
            {disease.symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-danger mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground">{symptom}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Causes */}
        <section className="medical-card animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Causes</h2>
          </div>
          <ul className="space-y-3">
            {disease.causes.map((cause, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground">{cause}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Risk Factors */}
        <section className="medical-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-warning" />
            </div>
            <h2 className="text-xl font-bold">Risk Factors</h2>
          </div>
          <ul className="space-y-3">
            {disease.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{factor}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Home Remedies */}
        <section className="medical-card animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-success" />
            </div>
            <h2 className="text-xl font-bold">Home Remedies</h2>
          </div>
          <ul className="space-y-3">
            {disease.homeRemedies.map((remedy, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{remedy}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* When to Consult */}
      <section className="medical-card mt-8 border-l-4 border-l-primary animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">When to Consult a Doctor</h2>
            <p className="text-muted-foreground leading-relaxed">{disease.whenToConsult}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiseaseDetail;
