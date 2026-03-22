import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Nearby healthcare section removed per request

const CarrierResults = () => {
  const navigate = useNavigate();

  const lifestyleCards = [
    { title: "Regular Health Monitoring", description: "Monitor your hemoglobin levels and overall health with routine checkups", icon: Activity, action: "Schedule Checkup" },
    { title: "Nutritional Support", description: "Maintain a balanced diet rich in iron and vitamins for optimal health", icon: Heart, action: "Get Diet Plan" },
    { title: "Genetic Counseling", description: "Essential before family planning to understand inheritance patterns", icon: Shield, action: "Book Session" },
  ];

  // Nearby healthcare interactions removed

  return (
    <div className="min-h-screen bg-soft-gradient">
      {/* Header */}
      <header className="bg-card-gradient border-b border-border/50 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-secondary-accent rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient">ThalAI Bridge</h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/book-consultation")} className="btn-healing">
              Book Counseling
            </Button>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Results Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-secondary-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Assessment Results: Thalassemia Carrier</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            You are a thalassemia carrier. While you typically don't have symptoms, it's important to monitor your health and consider genetic counseling for family planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Lifestyle Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Lifestyle & Health Monitoring</h2>
            <div className="space-y-4">
              {lifestyleCards.map((card, index) => (
                <Card key={index} className="card-healing hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                        <card.icon className="w-6 h-6 text-secondary-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-secondary-foreground">{card.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary-foreground/70 mb-4">{card.description}</p>
                    <Button className="btn-healing">{card.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Healthcare section removed */}
        </div>
      </div>
    </div>
  );
};

export default CarrierResults;
