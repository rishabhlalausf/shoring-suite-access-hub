import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Shield, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  Copy,
  CreditCard,
  Mail,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentPageProps {
  onGoToHome: () => void;
}

export const PaymentPage = ({ onGoToHome }: PaymentPageProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for successful payment on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const sessionId = urlParams.get('session_id');
    
    if (success === 'true' && sessionId && !generatedCode) {
      verifyPaymentAndGetCode(sessionId);
    }
  }, [generatedCode]);

  // Verify payment and get license code
  const verifyPaymentAndGetCode = async (sessionId: string) => {
    try {
      setIsProcessing(true);
      
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      if (error) throw error;

      if (data.success) {
        setGeneratedCode(data.license_code);
        toast({
          title: "Payment Successful!",
          description: "Your license code has been generated. Save it securely.",
        });
        
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        throw new Error(data.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      toast({
        title: "Payment Verification Failed",
        description: "Please contact support with your session ID.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle payment button click
  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      const { data, error } = await supabase.functions.invoke('create-payment');
      
      if (error) throw error;
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Code Copied!",
        description: "License code copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Professional Engineering Software
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">Shoring Suite Subscription</h1>
          <p className="text-lg text-muted-foreground">
            Get your quarterly access code for our professional engineering automation tools
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pricing Card */}
          <Card className="shadow-large border-primary/20">
            <CardHeader className="text-center bg-gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl">Shoring Suite</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                3-Month Subscription
              </CardDescription>
              <div className="text-4xl font-bold mt-4">$50</div>
              <div className="text-sm opacity-90">per quarter</div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-primary mr-2" />
                  <span>Save 1+ hour per design</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-primary mr-2" />
                  <span>3 months of full access</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary mr-2" />
                  <span>Professional engineering tools</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span>Instant license code generation</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <Alert className="border-primary/30 bg-primary/5">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  <strong>Important:</strong> We don't offer any discounts or trial versions. 
                  $50 is pretty cheap for the value we offer.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <div className="space-y-6">
            {!generatedCode ? (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Your Purchase
                  </CardTitle>
                  <CardDescription>
                    Click below to process payment and generate your license code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="premium"
                    size="xl"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pay $50 & Get License Code
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Secure payment processing. Your license code will be generated instantly.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-large border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Payment Successful!
                  </CardTitle>
                  <CardDescription>
                    Your Shoring Suite license code has been generated
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg border-2 border-dashed border-primary/30">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-bold text-primary">
                        {generatedCode}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyCode}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Important:</strong> Save this code securely. You'll need it to activate your software. 
                    This code is valid for 3 months from today.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Value Proposition */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Why This Investment Pays Off</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>✓ Saves at least 1 hour per design</p>
                  <p>✓ 30 designs = 30 hours saved</p>
                  <p>✓ Professional engineering automation</p>
                  <p>✓ Custom features available for $75 each</p>
                </div>
                
                <Alert className="mt-4 border-accent/30 bg-accent/5">
                  <AlertDescription className="text-sm">
                    If you want a specific feature in the software, we will build that 
                    in the software for you (and others) for $75 per feature.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="mailto:request@engineerstools.store">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="mailto:request@engineerstools.store?subject=Phone Consultation Request">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Consultation ($100/hour)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" onClick={onGoToHome}>
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};