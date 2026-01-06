import { Link } from 'react-router-dom';
import { diseases } from '@/data/diseases';
import { 
  BookOpen, 
  ChevronRight, 
  Droplet, 
  Heart, 
  Activity, 
  Wind,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const iconMap: Record<string, React.ElementType> = {
  droplet: Droplet,
  heart: Heart,
  activity: Activity,
  wind: Wind,
  'heart-pulse': Heart,
};

const Diseases = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disease.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(diseases.map(d => d.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl gradient-medical flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Diseases & Health Library</h1>
            <p className="text-muted-foreground">
              Browse comprehensive information about various health conditions
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search diseases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSearchQuery('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            searchQuery === '' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:bg-primary/10'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSearchQuery(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              searchQuery === category 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Disease Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease, index) => {
          const Icon = iconMap[disease.icon] || Activity;
          
          return (
            <Link 
              key={disease.id} 
              to={`/diseases/${disease.id}`}
              className="block animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="medical-card-hover h-full group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {disease.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {disease.name}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {disease.description}
                </p>
                
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Learn more
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No diseases found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Diseases;
