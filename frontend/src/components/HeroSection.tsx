import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

export const HeroSection = () => {
  const scrollToDetector = () => {
    document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          Identify Crop Diseases
          <span className="block text-3xl sm:text-4xl lg:text-6xl mt-2 text-sky">
            in Seconds
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Upload a photo of a plant leaf and let our AI instantly identify potential diseases to help you protect your harvest.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
          <Button 
            variant="hero" 
            size="xl"
            onClick={scrollToDetector}
            className="min-w-[200px]"
          >
            Start Detection
          </Button>
          <Button 
            variant="outline" 
            size="xl"
            className="min-w-[200px] bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};