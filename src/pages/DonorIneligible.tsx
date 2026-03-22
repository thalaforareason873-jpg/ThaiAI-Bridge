import { useLocation, useNavigate } from "react-router-dom";
import { XCircle, Info, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DonorIneligible = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { issues } = location.state || { issues: [] };

  const suggestedActions = [
    {
      title: "Address Health Issues",
      description: "Work with your healthcare provider to address any underlying health concerns",
      icon: Heart,
      action: () => navigate("/find-doctors")
    },
    {
      title: "Wait and Reapply",
      description: "Some restrictions are temporary. Consider reapplying after the waiting period",
      icon: Calendar,
      action: () => navigate("/donor-form")
    },
    {
      title: "Support in Other Ways",
      description: "Help spread awareness about blood donation in your community",
      icon: Info,
      action: () => navigate("/volunteer")
    }
  ];

  return (
    <div className="min-h-screen bg-soft-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Thank You for Your Interest
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unfortunately, you're not eligible to donate blood at this time. 
            This doesn't diminish your willingness to help - there are other ways to support the cause.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Issues and Explanations */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-destructive" />
                  Eligibility Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {issues.map((issue: string, index: number) => (
                    <Alert key={index} className="border-destructive/20">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <AlertDescription className="text-destructive">
                        {issue}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-healing">
              <CardHeader>
                <CardTitle className="text-secondary-foreground">
                  Alternative Ways to Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer" onClick={action.action}>
                      <div className="w-10 h-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                        <action.icon className="w-5 h-5 text-secondary-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-secondary-foreground">{action.title}</h4>
                        <p className="text-sm text-secondary-foreground/70">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle>When You Might Become Eligible</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Temporary Restrictions</h4>
                      <p className="text-sm text-muted-foreground">
                        Some restrictions (like recent travel or tattoos) are temporary. 
                        Check back after the waiting period.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Health Improvements</h4>
                      <p className="text-sm text-muted-foreground">
                        Work with your doctor to address health concerns that may affect eligibility.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Information */}
          <div className="space-y-6">
            <Card className="card-healing">
              <CardHeader>
                <CardTitle className="text-secondary-foreground">
                  Remember
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-secondary-foreground">
                  <li>• Your willingness to help is appreciated</li>
                  <li>• These guidelines protect both donors and recipients</li>
                  <li>• There are many ways to support the cause</li>
                  <li>• Consider encouraging friends and family to donate</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/find-doctors")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Find Healthcare Providers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/volunteer")}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Volunteer Opportunities
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/awareness")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Spread Awareness
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-tertiary-soft border-tertiary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="w-12 h-12 text-tertiary mx-auto mb-3" />
                  <h3 className="font-semibold text-tertiary mb-2">
                    You Still Matter! ❤️
                  </h3>
                  <p className="text-sm text-tertiary/80">
                    There are many ways to support life-saving efforts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate("/")} 
            className="btn-hero mr-4"
          >
            Back to Home
          </Button>
          <Button 
            onClick={() => navigate("/volunteer")} 
            variant="outline"
          >
            Explore Other Ways to Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorIneligible;