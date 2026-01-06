import { Activity, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Disclaimer Banner */}
      <div className="bg-warning/10 border-b border-warning/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-sm text-warning-foreground">
              <strong>Medical Disclaimer:</strong> This platform is for research and educational purposes only 
              and is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient-medical">MedTrailMatch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered clinical trial eligibility and health risk prediction platform. 
              Advancing healthcare through intelligent analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/diseases" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Disease Library
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/upload" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Analyze Report
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <div className="flex flex-col gap-2">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors text-left flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors text-left flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Terms & Conditions
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 MedTrailMatch. Academic Research Project.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by AI for Healthcare Innovation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
