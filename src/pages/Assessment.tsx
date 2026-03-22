import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { predictAssessment } from "@/lib/api";
import { Activity, ArrowLeft, ArrowRight, Clock, Heart, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  // Demographics
  age: string;
  sex: string;
  ethnicity: string;
  
  // Family History
  familyHistory: string;
  parentsRelated: string;
  
  // Symptoms
  fatigue: string;
  paleSkin: string;
  boneDeformities: string;
  slowGrowth: string;
  abdominalSwelling: string;
  breathlessness: string;
  
  // Health History
  anemiaHistory: string;
  frequentInfections: string;
  bloodTransfusions: string;
  
  // Lifestyle
  ironIntake: string;
  chronicIllness: string;
}

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    ethnicity: "",
    familyHistory: "",
    parentsRelated: "",
    fatigue: "",
    paleSkin: "",
    boneDeformities: "",
    slowGrowth: "",
    abdominalSwelling: "",
    breathlessness: "",
    anemiaHistory: "",
    frequentInfections: "",
    bloodTransfusions: "",
    ironIntake: "",
    chronicIllness: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Save to Supabase database (requires Supabase integration)
      console.log("Form Data:", formData);
      
      // Prepare payload and call ML prediction API
      const payload = {
        age: Number(formData.age || 0),
        sex: formData.sex || "male",
        ethnicity: formData.ethnicity || "south-asian",
        familyHistory: formData.familyHistory || "no",
        parentsRelated: formData.parentsRelated || "no",
        fatigue: formData.fatigue || "none",
        paleSkin: formData.paleSkin || "none",
        boneDeformities: formData.boneDeformities || "no",
        slowGrowth: formData.slowGrowth || "no",
        abdominalSwelling: formData.abdominalSwelling || "no",
        breathlessness: formData.breathlessness || "no",
        anemiaHistory: formData.anemiaHistory || "no",
        frequentInfections: formData.frequentInfections || "no",
        bloodTransfusions: formData.bloodTransfusions || "no",
        ironIntake: formData.ironIntake || "normal",
        chronicIllness: formData.chronicIllness || "no",
      };

      const prediction = await predictAssessment(payload);
      
      toast({
        title: "Assessment Complete!",
        description: `Prediction: ${prediction}`,
      });
      
      // Navigate based on prediction
      setTimeout(() => {
        navigate(`/results/${prediction.toLowerCase()}`);
      }, 2000);
      
    } catch (error) {
      // Fallback to local classification (previous behavior)
      const localPrediction = (() => {
        const riskFactors = [
          formData.familyHistory === "yes",
          formData.fatigue === "severe",
          formData.paleSkin === "severe",
          formData.anemiaHistory === "yes",
          formData.bloodTransfusions === "yes",
        ].filter(Boolean).length;
        if (riskFactors >= 3) return "Patient";
        if (riskFactors >= 1) return "Carrier";
        return "Normal";
      })();

      toast({
        title: "Assessment Complete (Offline Mode)",
        description: `Prediction: ${localPrediction}`,
      });

      setTimeout(() => {
        navigate(`/results/${localPrediction.toLowerCase()}`);
      }, 1500);
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Demographic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                />
              </div>
              
              <div>
                <Label>Sex</Label>
                <RadioGroup
                  value={formData.sex}
                  onValueChange={(value) => updateFormData("sex", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Ethnicity/Region</Label>
                <RadioGroup
                  value={formData.ethnicity}
                  onValueChange={(value) => updateFormData("ethnicity", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="south-asian" id="south-asian" />
                    <Label htmlFor="south-asian">South Asian</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mediterranean" id="mediterranean" />
                    <Label htmlFor="mediterranean">Mediterranean</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="middle-eastern" id="middle-eastern" />
                    <Label htmlFor="middle-eastern">Middle Eastern</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="african" id="african" />
                    <Label htmlFor="african">African</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other-ethnicity" id="other-ethnicity" />
                    <Label htmlFor="other-ethnicity">Other</Label>
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
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Family History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Family history of thalassemia</Label>
                <RadioGroup
                  value={formData.familyHistory}
                  onValueChange={(value) => updateFormData("familyHistory", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="family-yes" />
                    <Label htmlFor="family-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="family-no" />
                    <Label htmlFor="family-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dont-know" id="family-dk" />
                    <Label htmlFor="family-dk">Don't know</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Are your parents related by blood?</Label>
                <RadioGroup
                  value={formData.parentsRelated}
                  onValueChange={(value) => updateFormData("parentsRelated", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="parents-yes" />
                    <Label htmlFor="parents-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="parents-no" />
                    <Label htmlFor="parents-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dont-know" id="parents-dk" />
                    <Label htmlFor="parents-dk">Don't know</Label>
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
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Symptoms & Physical Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Fatigue or weakness</Label>
                <RadioGroup
                  value={formData.fatigue}
                  onValueChange={(value) => updateFormData("fatigue", value)}
                  className="mt-2"
                >
                  {["none", "mild", "moderate", "severe"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`fatigue-${option}`} />
                      <Label htmlFor={`fatigue-${option}`} className="capitalize">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Pale/yellow skin</Label>
                <RadioGroup
                  value={formData.paleSkin}
                  onValueChange={(value) => updateFormData("paleSkin", value)}
                  className="mt-2"
                >
                  {["none", "mild", "moderate", "severe"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`pale-${option}`} />
                      <Label htmlFor={`pale-${option}`} className="capitalize">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Bone deformities</Label>
                <RadioGroup
                  value={formData.boneDeformities}
                  onValueChange={(value) => updateFormData("boneDeformities", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="bone-yes" />
                    <Label htmlFor="bone-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="bone-no" />
                    <Label htmlFor="bone-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Slow growth/delayed puberty</Label>
                <RadioGroup
                  value={formData.slowGrowth}
                  onValueChange={(value) => updateFormData("slowGrowth", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="growth-yes" />
                    <Label htmlFor="growth-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="growth-no" />
                    <Label htmlFor="growth-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dont-know" id="growth-dk" />
                    <Label htmlFor="growth-dk">Don't know</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Health History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>History of anemia</Label>
                <RadioGroup
                  value={formData.anemiaHistory}
                  onValueChange={(value) => updateFormData("anemiaHistory", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="anemia-yes" />
                    <Label htmlFor="anemia-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="anemia-no" />
                    <Label htmlFor="anemia-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dont-know" id="anemia-dk" />
                    <Label htmlFor="anemia-dk">Don't know</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Frequent infections</Label>
                <RadioGroup
                  value={formData.frequentInfections}
                  onValueChange={(value) => updateFormData("frequentInfections", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="infections-yes" />
                    <Label htmlFor="infections-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="infections-no" />
                    <Label htmlFor="infections-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sometimes" id="infections-sometimes" />
                    <Label htmlFor="infections-sometimes">Sometimes</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Blood transfusions</Label>
                <RadioGroup
                  value={formData.bloodTransfusions}
                  onValueChange={(value) => updateFormData("bloodTransfusions", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="transfusion-yes" />
                    <Label htmlFor="transfusion-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="transfusion-no" />
                    <Label htmlFor="transfusion-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dont-know" id="transfusion-dk" />
                    <Label htmlFor="transfusion-dk">Don't know</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Lifestyle & Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Dietary iron intake</Label>
                <RadioGroup
                  value={formData.ironIntake}
                  onValueChange={(value) => updateFormData("ironIntake", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="iron-low" />
                    <Label htmlFor="iron-low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="iron-normal" />
                    <Label htmlFor="iron-normal">Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="iron-high" />
                    <Label htmlFor="iron-high">High</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Chronic illnesses</Label>
                <RadioGroup
                  value={formData.chronicIllness}
                  onValueChange={(value) => updateFormData("chronicIllness", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="chronic-yes" />
                    <Label htmlFor="chronic-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="chronic-no" />
                    <Label htmlFor="chronic-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Thalassemia Assessment
          </h1>
          <p className="text-muted-foreground">
            Please answer the following questions to assess your thalassemia status
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Step */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit} className="btn-hero flex items-center gap-2">
              Complete Assessment
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleNext} className="btn-hero flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;