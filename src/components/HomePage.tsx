import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Cog, Mail, Phone, DollarSign, Wrench } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HomePageProps {
  onGoToPayment: () => void;
}

export const HomePage = ({ onGoToPayment }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-hero text-primary-foreground py-24 lg:py-32 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--accent) / 0.9)), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 animate-float">
            Engineering Automation Tools
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            We make automation tools
            <br />
            <span className="text-accent-glow">for engineers</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
            We make your life easier. Save hours on every design with our professional engineering software suite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGoToPayment}
              className="animate-pulse-glow"
            >
              <Cog className="w-5 h-5 mr-2" />
              Get Shoring Suite - $50/quarter
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-background/10 border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
              asChild
            >
              <a href="mailto:request@engineerstools.store">
                <Mail className="w-5 h-5 mr-2" />
                Request Custom Tools
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Tools?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional engineering software designed to save you time and increase accuracy on every project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Time Savings</CardTitle>
                <CardDescription>
                  Save at least 1 hour per design. 30 designs = 30 hours saved.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-accent-foreground" />
                </div>
                <CardTitle>Custom Features</CardTitle>
                <CardDescription>
                  Need a specific feature? We'll build it for you and others for just $75 per feature.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-medium hover:shadow-large transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>Affordable Pricing</CardTitle>
                <CardDescription>
                  $50 per quarter is incredibly cheap for the value we provide to engineering professionals.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              Professional engineering solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cog className="w-5 h-5 mr-2 text-primary" />
                  Shoring Suite Software
                </CardTitle>
                <CardDescription>
                  3-month subscription model. Purchase multiple quarters for extended access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-2xl text-primary">$50 per quarter</p>
                  <p className="text-sm text-muted-foreground">No discounts or trial versions</p>
                  <Button 
                    variant="engineering" 
                    onClick={onGoToPayment}
                    className="w-full mt-4"
                  >
                    Subscribe Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-medium hover:shadow-large transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-accent" />
                  Consultation & Custom Development
                </CardTitle>
                <CardDescription>
                  Professional consultation and custom software development services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">Phone Consultation: <span className="text-primary">$100/hour</span></p>
                  <p className="font-semibold text-lg">Custom Features: <span className="text-primary">~$100/feature</span></p>
                  <Button 
                    variant="outline" 
                    asChild
                    className="w-full mt-4"
                  >
                    <a href="mailto:request@engineerstools.store">
                      <Mail className="w-4 h-4 mr-2" />
                      Get Quote
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need More Engineering Tools?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Email us for more software solutions. Our pricing is typically around $100 per feature, 
            and we offer professional consultation services.
          </p>
          <Button 
            variant="premium" 
            size="lg"
            asChild
          >
            <a href="mailto:request@engineerstools.store">
              <Mail className="w-5 h-5 mr-2" />
              Contact us at request@engineerstools.store
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};