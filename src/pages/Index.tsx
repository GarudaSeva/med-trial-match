import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Upload, 
  Brain, 
  Shield, 
  FileText, 
  ChevronRight,
  Stethoscope,
  Heart,
  Microscope,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 gradient-medical-light opacity-50"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230d9488%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
          
          <div className="relative container mx-auto px-4 py-20 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                AI-Powered Healthcare Platform
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transform Your Health Analysis with{' '}
                <span className="text-gradient-medical">MedTrailMatch</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Upload your medical reports and get instant AI-powered disease predictions, 
                health risk assessments, and personalized recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button variant="medical" size="lg" className="min-w-[200px]">
                    Get Started Free
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="min-w-[200px]">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful AI Health Analysis
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our advanced AI models analyze your medical reports to provide 
                accurate predictions and actionable insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Upload, title: 'Easy Upload', desc: 'Upload images or PDFs of your medical reports in seconds' },
                { icon: Brain, title: 'AI Analysis', desc: 'Advanced NLP models extract and analyze clinical data' },
                { icon: Shield, title: 'Risk Assessment', desc: 'Get comprehensive health risk scores and factors' },
                { icon: FileText, title: 'Smart Reports', desc: 'Receive personalized recommendations and summaries' },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="medical-card-hover text-center"
                >
                  <div className="w-14 h-14 rounded-xl gradient-medical flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer for landing */}
        <footer className="py-8 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-primary" />
              <span className="font-bold text-gradient-medical">MedTrailMatch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MedTrailMatch. Academic Research Project.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Authenticated Home Page
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <section className="mb-12">
        <div className="medical-card gradient-medical-light">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome to <span className="text-gradient-medical">MedTrailMatch</span>
              </h1>
              <p className="text-muted-foreground">
                Upload your medical reports and get AI-powered health insights instantly.
              </p>
            </div>
            <Link to="/upload">
              <Button variant="medical" size="lg">
                <Upload className="w-5 h-5" />
                Analyze Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Upload, title: 'Upload Report', desc: 'Analyze a new medical report', to: '/upload', color: 'bg-primary' },
            { icon: Stethoscope, title: 'Disease Library', desc: 'Browse health conditions', to: '/diseases', color: 'bg-accent-foreground' },
            { icon: Heart, title: 'Health Profile', desc: 'View your health data', to: '/profile', color: 'bg-danger' },
            { icon: Microscope, title: 'About Platform', desc: 'Learn about MedTrailMatch', to: '/about', color: 'bg-success' },
          ].map((action, index) => (
            <Link key={index} to={action.to}>
              <div className="medical-card-hover h-full">
                <div className={`w-12 h-12 rounded-xl ${action.color}/10 flex items-center justify-center mb-4`}>
                  <action.icon className={`w-6 h-6 text-primary`} />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Upload Report', desc: 'Upload your medical report as an image or PDF file.' },
            { step: '02', title: 'AI Analysis', desc: 'Our AI extracts clinical data and predicts potential conditions.' },
            { step: '03', title: 'Get Insights', desc: 'Receive risk assessment and personalized recommendations.' },
          ].map((item, index) => (
            <div key={index} className="medical-card relative overflow-hidden">
              <span className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                {item.step}
              </span>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg gradient-medical flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
