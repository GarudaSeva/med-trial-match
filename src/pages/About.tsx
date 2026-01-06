import { 
  Activity, 
  Brain, 
  Users, 
  Clock, 
  Target, 
  CheckCircle,
  Microscope,
  Heart,
  Shield,
  Zap
} from 'lucide-react';

const About = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Time Efficiency',
      description: 'Reduce manual screening time by up to 80% with automated report analysis.'
    },
    {
      icon: Target,
      title: 'Accurate Predictions',
      description: 'AI-powered disease detection with high confidence scores using BioBERT models.'
    },
    {
      icon: Shield,
      title: 'Fair Assessment',
      description: 'Unbiased health risk evaluation based on clinical data, not demographics.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive health insights in seconds, not days or weeks.'
    },
  ];

  const features = [
    'Automatic text extraction from medical reports (OCR)',
    'Natural Language Processing for clinical data analysis',
    'Disease prediction using advanced ML models',
    'Health risk assessment with severity scoring',
    'Personalized recommendations based on analysis',
    'Comprehensive disease information library',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="medical-card gradient-medical-light mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">About MedTrailMatch</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Powered Clinical Trial Eligibility & Health Risk Prediction
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              MedTrailMatch is an innovative platform that leverages artificial intelligence 
              to transform how medical reports are analyzed. Our mission is to make healthcare 
              insights accessible, accurate, and actionable for doctors, researchers, and patients alike.
            </p>
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl gradient-medical flex items-center justify-center flex-shrink-0 animate-float">
            <Brain className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">What MedTrailMatch Does</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI platform analyzes medical reports to provide comprehensive health insights
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Microscope, title: 'Report Analysis', desc: 'Upload medical reports in image or PDF format for instant AI analysis' },
            { icon: Brain, title: 'Disease Prediction', desc: 'Identify potential health conditions with probability scores' },
            { icon: Heart, title: 'Risk Assessment', desc: 'Evaluate overall health status with risk factor identification' },
          ].map((item, index) => (
            <div 
              key={index}
              className="medical-card-hover text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-medical flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Benefits for Healthcare</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How MedTrailMatch helps doctors and researchers make better decisions
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="medical-card animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features List */}
      <section className="mb-12">
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold">Platform Features</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section>
        <div className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold">Who Can Benefit?</h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: 'Doctors', desc: 'Get quick insights to support clinical decisions and patient consultations.' },
              { title: 'Researchers', desc: 'Screen patients for clinical trial eligibility with reduced manual effort.' },
              { title: 'Patients', desc: 'Understand your health reports with AI-powered explanations and recommendations.' },
            ].map((user, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-accent/50">
                <h3 className="font-semibold text-lg mb-2">{user.title}</h3>
                <p className="text-sm text-muted-foreground">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
