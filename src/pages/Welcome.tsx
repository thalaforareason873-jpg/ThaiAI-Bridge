import heroCharacter from "@/assets/hero-character.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { Droplets, Heart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const quotes = [
    "Every drop of blood donated is a gift of life.",
    "Your donation today could save three lives tomorrow.",
    "Together, we can make a difference in the fight against thalassemia.",
    "Hope is stronger when we support each other.",
  ];

  const handlePatientFlow = () => {
    navigate("/assessment");
  };

  const handleDonorFlow = () => {
    navigate("/donor-form");
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Navbar />
      
      <div className="flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-8 animate-fade-in-up">
            {/* Hero Section */}
            <Card className="card-soft p-8 text-center">
              <div className="mb-8">
                <div className="relative mb-6">
                  <img 
                    src={heroCharacter} 
                    alt="Friendly medical professional welcoming you to ThalAI Bridge" 
                    className="w-32 h-20 object-cover rounded-xl mx-auto animate-float shadow-custom"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-hero-gradient rounded-full flex items-center justify-center animate-gentle-bounce">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gradient mb-4">
                  Welcome to ThalAI Bridge
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Your comprehensive companion for thalassemia care, genetic counseling, 
                  and blood donation support. Together, we're building bridges to better health.
                </p>
              </div>

              {/* Motivational Quote */}
              <div className="bg-healing-gradient p-6 rounded-xl mb-8">
                <div className="text-lg italic text-secondary-foreground">
                  "{quotes[Math.floor(Math.random() * quotes.length)]}"
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <Card className="card-healing p-8 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={handlePatientFlow}>
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-secondary-accent rounded-full flex items-center justify-center mx-auto">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-secondary-foreground mb-3">
                        Are you a Patient / Carrier / Normal?
                      </h3>
                      <p className="text-secondary-foreground/70 text-lg">
                        Get AI-powered thalassemia assessment and personalized recommendations
                      </p>
                    </div>
                    <Button 
  className="w-full text-lg py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-all"
>
  Start AI Assessment
</Button>

                  </div>
                </Card>

                <Card className="card-healing p-8 hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={handleDonorFlow}>
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <Droplets className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-accent-foreground mb-3">
                        Donor Registration
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        Register as a blood donor and help save lives in your community
                      </p>
                    </div>
                    <Button className="btn-hero w-full text-lg py-3">
                      Register as Donor
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-soft p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧬</span>
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning for accurate thalassemia prediction
                </p>
              </Card>

              <Card className="card-soft p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="font-semibold mb-2">Find Nearby Care</h3>
                <p className="text-sm text-muted-foreground">
                  Locate thalassemia centers and specialist doctors near you
                </p>
              </Card>

              <Card className="card-soft p-6 text-center">
                <div className="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💊</span>
                </div>
                <h3 className="font-semibold mb-2">Personalized Care</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored recommendations based on your unique profile
                </p>
              </Card>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Welcome;