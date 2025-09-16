import { HeroSection } from "@/components/HeroSection";
import { DiseaseDetector } from "@/components/DiseaseDetector";
import { HowItWorks } from "@/components/HowItWorks";
import { DiseaseLibrary } from "@/components/DiseaseLibrary";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <DiseaseDetector />
      <HowItWorks />
      <DiseaseLibrary />
      <Footer />
    </div>
  );
};

export default Index;
