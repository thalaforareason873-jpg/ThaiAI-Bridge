import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Dna, Heart } from "lucide-react";
import { useState } from "react";

const PartnerMatch = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    compatibility: string;
    riskLevel: string;
    details: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    userAge: "",
    userGender: "",
    userThalStatus: "",
    userFamilyHistory: "",
    partnerAge: "",
    partnerGender: "",
    partnerThalStatus: "",
    partnerFamilyHistory: "",
    planningTimeframe: "",
    consultationPreference: ""
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateCompatibility = (userStatus: string, partnerStatus: string) => {
    if (userStatus === "unknown" || partnerStatus === "unknown") {
      return {
        compatibility: "requires-counseling",
        riskLevel: "Unknown",
        details:
          "Further genetic testing recommended to determine exact risk levels."
      };
    }

    if (userStatus === "patient" || partnerStatus === "patient") {
      if (userStatus === "patient" && partnerStatus === "patient") {
        return {
          compatibility: "incompatible",
          riskLevel: "High",
          details:
            "All children will have thalassemia major. Professional medical consultation strongly recommended."
        };
      } else {
        return {
          compatibility: "requires-counseling",
          riskLevel: "High",
          details:
            "50% chance of children having thalassemia major. Genetic counseling essential."
        };
      }
    }

    if (userStatus === "carrier" && partnerStatus === "carrier") {
      return {
        compatibility: "requires-counseling",
        riskLevel: "High",
        details:
          "25% chance of thalassemia major, 50% chance of carrier status. Prenatal testing recommended."
      };
    }

    if (
      (userStatus === "carrier" && partnerStatus === "normal") ||
      (userStatus === "normal" && partnerStatus === "carrier")
    ) {
      return {
        compatibility: "compatible",
        riskLevel: "Low",
        details:
          "No risk of thalassemia major. 50% chance children will be carriers."
      };
    }

    return {
      compatibility: "compatible",
      riskLevel: "Low",
      details: "No genetic risk for thalassemia in children."
    };
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const requiredFields = [
      "userAge",
      "userGender",
      "userThalStatus",
      "partnerAge",
      "partnerGender",
      "partnerThalStatus",
      "planningTimeframe",
      "consultationPreference"
    ];

    const missingFields = requiredFields.filter(
      field => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setError("");
    const result = calculateCompatibility(
      formData.userThalStatus,
      formData.partnerThalStatus
    );
    setResult(result); // save result instead of navigate
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userAge">Your Age</Label>
                  <Input
                    id="userAge"
                    value={formData.userAge}
                    onChange={e => updateFormData("userAge", e.target.value)}
                    placeholder="Age in years"
                  />
                </div>
                <div>
                  <Label>Your Gender</Label>
                  <Select
                    onValueChange={value => updateFormData("userGender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Your Thalassemia Status</Label>
                <RadioGroup
                  onValueChange={value => updateFormData("userThalStatus", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="user-normal" />
                    <Label htmlFor="user-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="carrier" id="user-carrier" />
                    <Label htmlFor="user-carrier">Carrier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="user-patient" />
                    <Label htmlFor="user-patient">Patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="user-unknown" />
                    <Label htmlFor="user-unknown">Unknown</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Partner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="partnerAge">Partner's Age</Label>
                  <Input
                    id="partnerAge"
                    value={formData.partnerAge}
                    onChange={e => updateFormData("partnerAge", e.target.value)}
                    placeholder="Age in years"
                  />
                </div>
                <div>
                  <Label>Partner's Gender</Label>
                  <Select
                    onValueChange={value =>
                      updateFormData("partnerGender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Partner's Thalassemia Status</Label>
                <RadioGroup
                  onValueChange={value =>
                    updateFormData("partnerThalStatus", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="partner-normal" />
                    <Label htmlFor="partner-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="carrier" id="partner-carrier" />
                    <Label htmlFor="partner-carrier">Carrier</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="partner-patient" />
                    <Label htmlFor="partner-patient">Patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unknown" id="partner-unknown" />
                    <Label htmlFor="partner-unknown">Unknown</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>Planning Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>When are you planning to have children?</Label>
                <Select
                  onValueChange={value =>
                    updateFormData("planningTimeframe", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="within-6-months">Within 6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="1-2-years">1-2 years</SelectItem>
                    <SelectItem value="2-plus-years">2+ years</SelectItem>
                    <SelectItem value="just-exploring">Just exploring options</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Would you like genetic counseling consultation?</Label>
                <RadioGroup
                  onValueChange={value =>
                    updateFormData("consultationPreference", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="consult-yes" />
                    <Label htmlFor="consult-yes">Yes, book consultation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="consult-maybe" />
                    <Label htmlFor="consult-maybe">
                      Maybe, show me results first
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="consult-no" />
                    <Label htmlFor="consult-no">No, just the analysis</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-tertiary-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
            <Dna className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Partner Match for Child Planning
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered genetic compatibility analysis to understand potential risks
            and make informed decisions about family planning.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {[1, 2, 3].map(stepNum => (
              <div
                key={stepNum}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= stepNum
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stepNum}
              </div>
            ))}
          </div>
        </div>

        {/* Form Step */}
        <div className="mb-8">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="flex items-center gap-2"
          >
            ← Previous
          </Button>

          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="btn-hero flex items-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="btn-hero flex items-center gap-2"
            >
              Analyze Compatibility <Dna className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Result Display */}
        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}

        {result && (
          <Card className="mt-8 card-result border-2 border-primary">
            <CardHeader>
              <CardTitle>Compatibility Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Compatibility:</strong> {result.compatibility}
              </p>
              <p>
                <strong>Risk Level:</strong> {result.riskLevel}
              </p>
              <p className="text-muted-foreground">{result.details}</p>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="card-healing mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-foreground mb-2">
                  Privacy & Security
                </h3>
                <p className="text-secondary-foreground/70 text-sm">
                  Your genetic information is completely confidential and used only
                  for this analysis. We follow strict medical privacy standards and
                  never share your data with third parties.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerMatch;
