import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Eye } from "lucide-react";
import diseaseImage from "@/assets/disease-leaves.jpg";

const diseases = [
  {
    name: "Tomato Late Blight",
    crop: "Tomato",
    severity: "High",
    symptoms: "Dark brown spots with white fungal growth"
  },
  {
    name: "Apple Scab",
    crop: "Apple",
    severity: "Medium",
    symptoms: "Dark, scaly lesions on leaves and fruit"
  },
  {
    name: "Corn Common Rust",
    crop: "Corn",
    severity: "Medium",
    symptoms: "Orange-brown pustules on leaf surfaces"
  },
  {
    name: "Wheat Leaf Rust",
    crop: "Wheat",
    severity: "High",
    symptoms: "Orange spore pustules, yellowing leaves"
  },
  {
    name: "Rice Blast",
    crop: "Rice",
    severity: "High",
    symptoms: "Diamond-shaped lesions with gray centers"
  },
  {
    name: "Potato Early Blight",
    crop: "Potato",
    severity: "Medium",
    symptoms: "Concentric ring spots on leaves"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-destructive text-destructive-foreground";
    case "Medium":
      return "bg-accent text-accent-foreground";
    default:
      return "bg-primary text-primary-foreground";
  }
};

export const DiseaseLibrary = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Common Crop Diseases
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about the most common diseases affecting crops worldwide
          </p>
        </div>

        {/* Featured Disease */}
        <Card className="mb-12 shadow-green">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              <div 
                className="h-64 lg:h-auto bg-cover bg-center rounded-l-lg"
                style={{ backgroundImage: `url(${diseaseImage})` }}
              ></div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Disease Identification Made Easy
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our AI system can identify over 50 different crop diseases with high accuracy. 
                  From fungal infections to bacterial diseases, get the knowledge you need to protect your crops.
                </p>
                <Button variant="hero" className="w-fit">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Library
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disease Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {disease.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {disease.crop}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getSeverityColor(disease.severity)}`}>
                    {disease.severity} Risk
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {disease.symptoms}
                </p>
                
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};