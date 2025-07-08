import { Button } from "@/components/ui/button";
import { Settings, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavigationProps {
  currentPage: 'home' | 'payment';
  onPageChange: (page: 'home' | 'payment') => void;
}

export const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  return (
    <nav className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Engineers Tools" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">EngineersTools.store</h1>
              <p className="text-xs text-muted-foreground">Automation tools for engineers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => onPageChange('home')}
              className="hidden sm:flex"
            >
              <Settings className="w-4 h-4 mr-2" />
              Home
            </Button>
            
            <Button
              variant={currentPage === 'payment' ? 'premium' : 'outline'}
              onClick={() => onPageChange('payment')}
            >
              Get Shoring Suite
            </Button>
            
            <a 
              href="mailto:request@engineerstools.store"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};