import HospitalMap from "@/components/HospitalMap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { Calendar, Dna, FileText, Heart, TestTube } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientResults = () => {
  const navigate = useNavigate();

  const testCards = [
    {
      title: "Complete Blood Count (CBC)",
      description: "Essential test to check red blood cell count, hemoglobin levels, and overall blood health",
      icon: TestTube,
      urgency: "High Priority",
      urgencyColor: "destructive"
    },
    {
      title: "Hemoglobin Electrophoresis",
      description: "Identifies abnormal hemoglobin types and confirms thalassemia diagnosis",
      icon: Dna,
      urgency: "Required",
      urgencyColor: "default"
    },
    {
      title: "Genetic Testing",
      description: "Determines specific genetic mutations for family planning and treatment decisions",
      icon: FileText,
      urgency: "Recommended",
      urgencyColor: "secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {/* Results Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Assessment Results: Thalassemia Patient
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your assessment, you show characteristics consistent with thalassemia. 
            Here are the recommended next steps for your care.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Test Cards Carousel */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Recommended Tests</h2>
            <div className="space-y-4">
              {testCards.map((test, index) => (
                <Card key={index} className="card-soft hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <test.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{test.title}</CardTitle>
                          <Badge variant={test.urgencyColor as any} className="mt-1">
                            {test.urgency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{test.description}</p>
                    <Button 
                      className="btn-hero mt-4"
                      onClick={() => navigate('/schedule-test', { state: { selectedTest: test.title } })}
                    >
                      Schedule Test
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="space-y-6">
            <HospitalMap />

            {/* Quick Actions */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/partner-match")}
                >
                  <Dna className="w-4 h-4 mr-2" />
                  Partner Match
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/book-consultation")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/support-groups")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Join Support Groups
                </Button>
              </CardContent>
            </Card>

            {/* Important Info */}
            <Card className="card-healing">
              <CardHeader>
                <CardTitle className="text-secondary-foreground">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-secondary-foreground">
                  <li>• Regular monitoring is essential</li>
                  <li>• Follow your treatment plan consistently</li>
                  <li>• Genetic counseling before family planning</li>
                  <li>• Join support groups for emotional support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card-gradient border-t border-border/50 p-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            ThalAI Bridge - Supporting thalassemia patients with AI-powered care
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            For medical emergencies, contact your healthcare provider immediately
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PatientResults;