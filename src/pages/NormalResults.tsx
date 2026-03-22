import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, CheckCircle, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NormalResults = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-soft-gradient">
      {/* Header */}
      <header className="bg-card-gradient border-b border-border/50 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient">ThalAI Bridge</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="btn-soft"
          >
            Back to Home
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Results Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Great News! You're Normal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your assessment, you show no signs of thalassemia. 
            You can maintain your current health routine with occasional screenings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recommendations */}
          <Card className="card-healing">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                <Activity className="w-5 h-5" />
                Health Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium text-secondary-foreground">Routine Health Checkups</h4>
                    <p className="text-sm text-secondary-foreground/70">
                      Continue with regular annual health screenings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium text-secondary-foreground">Healthy Lifestyle</h4>
                    <p className="text-sm text-secondary-foreground/70">
                      Maintain balanced diet and regular exercise
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium text-secondary-foreground">Family History Awareness</h4>
                    <p className="text-sm text-secondary-foreground/70">
                      If family history exists, consider periodic screening
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-6">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Optional Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/donor-form")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Consider Blood Donation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/schedule-test', { state: { selectedTest: 'Routine Checkup' } })}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Routine Checkup
                </Button>
              </CardContent>
            </Card>

            <Card className="card-healing">
              <CardHeader>
                <CardTitle className="text-secondary-foreground">When to Seek Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-secondary-foreground">
                  <li>• If planning to have children</li>
                  <li>• If partner has thalassemia</li>
                  <li>• If experiencing unexplained fatigue</li>
                  <li>• If family history emerges</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-success-soft border-success/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                  <h3 className="font-semibold text-success mb-2">You're Healthy!</h3>
                  <p className="text-sm text-success/80">
                    Keep up the good work with your healthy lifestyle
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NormalResults;