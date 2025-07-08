import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { PaymentPage } from "@/components/PaymentPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'payment'>('home');

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
      />
      
      {currentPage === 'home' ? (
        <HomePage onGoToPayment={() => setCurrentPage('payment')} />
      ) : (
        <PaymentPage onGoToHome={() => setCurrentPage('home')} />
      )}
    </div>
  );
};

export default Index;
