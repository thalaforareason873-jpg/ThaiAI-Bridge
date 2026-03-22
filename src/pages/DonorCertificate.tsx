import { useLocation, useNavigate } from "react-router-dom";
import { Award, Download, Share2, Heart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DonorCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { donorData, wellness } = location.state || {};

  const generateDonorID = () => {
    return `THL${Date.now().toString().slice(-6)}`;
  };

  const donorID = generateDonorID();
  const currentDate = new Date().toLocaleDateString();

  const handleDownload = () => {
    // TODO: Generate actual PDF certificate
    alert("Certificate download will be implemented with PDF generation");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Blood Donor Certificate',
        text: `I'm now an official blood donor! Donor ID: ${donorID}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`I'm now an official blood donor! Donor ID: ${donorID}`);
      alert("Sharing link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            You are now officially a blood donor!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Certificate */}
          <div className="lg:col-span-2">
            <Card className="card-soft border-2 border-primary/20 shadow-custom-lg">
              <CardHeader className="text-center bg-hero-gradient text-white rounded-t-xl">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">
                  Blood Donor Certificate
                </CardTitle>
                <p className="text-white/90">ThalAI Bridge</p>
              </CardHeader>
              
              <CardContent className="p-8 text-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gradient mb-2">
                      {donorData?.fullName || "Donor Name"}
                    </h2>
                    <Badge className="bg-success text-success-foreground">
                      Eligible Donor
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left bg-muted/20 p-6 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Donor ID</p>
                      <p className="font-semibold">{donorID}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Group</p>
                      <p className="font-semibold">{donorData?.bloodGroup || "O+"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date Registered</p>
                      <p className="font-semibold">{currentDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold text-success">Active</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <p className="text-lg font-medium text-gradient mb-2">
                      "Every drop counts, every donor matters"
                    </p>
                    <p className="text-muted-foreground">
                      Thank you for your commitment to saving lives through blood donation.
                      You are now part of a community of heroes making a difference.
                    </p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button onClick={handleDownload} className="btn-hero flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Achievement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wellness & Tips */}
          <div className="space-y-6">
            <Card className="card-healing">
              <CardHeader>
                <CardTitle className="text-secondary-foreground">
                  Your Recovery Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge 
                      variant={wellness?.recoverySpeed === "fast" ? "default" : "secondary"}
                      className="text-lg px-4 py-2"
                    >
                      {wellness?.recoverySpeed === "fast" ? "Fast Recovery" : 
                       wellness?.recoverySpeed === "slow" ? "Gradual Recovery" : "Normal Recovery"}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-secondary-foreground mb-2">
                      Personalized Tips:
                    </h4>
                    <ul className="space-y-1 text-sm text-secondary-foreground/80">
                      {wellness?.tips?.map((tip: string, index: number) => (
                        <li key={index}>• {tip}</li>
                      )) || [
                        "• Stay hydrated - drink plenty of water",
                        "• Rest for at least 24 hours",
                        "• Eat iron-rich foods"
                      ]}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/donation-centers")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Find Donation Centers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/donor-portal")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donor Portal
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-primary-soft border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-primary mb-2">
                    You're a Hero! 🦸‍♀️
                  </h3>
                  <p className="text-sm text-primary/80">
                    Your donation could save up to 3 lives
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
            variant="outline"
            className="mr-4"
          >
            Back to Home
          </Button>
          <Button 
            onClick={() => navigate("/donor-form")} 
            className="btn-healing"
          >
            Help Another Friend Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorCertificate;