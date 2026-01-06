import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  FileText, 
  Calendar, 
  Activity,
  TrendingUp,
  Shield
} from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    { 
      icon: FileText, 
      label: 'Reports Analyzed', 
      value: user.reportsAnalyzed.toString(),
      color: 'bg-primary/10 text-primary'
    },
    { 
      icon: TrendingUp, 
      label: 'Health Score', 
      value: '78%',
      color: 'bg-success/10 text-success'
    },
    { 
      icon: Shield, 
      label: 'Risk Level', 
      value: 'Low',
      color: 'bg-success/10 text-success'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="medical-card mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl gradient-medical flex items-center justify-center">
              <User className="w-12 h-12 text-primary-foreground" />
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

        {/* Stats Grid */}
        {/* <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="medical-card text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div> */}

        {/* Recent Activity */}
        <section className="medical-card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-medical flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>

          {user.reportsAnalyzed > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Medical Report Analyzed</p>
                  <p className="text-sm text-muted-foreground">
                    {user.lastUploadDate && format(new Date(user.lastUploadDate), 'MMMM d, yyyy at h:mm a')}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  Completed
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reports analyzed yet.</p>
              <p className="text-sm">Upload your first medical report to get started!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
