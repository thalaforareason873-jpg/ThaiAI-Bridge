import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Award, Droplets, Shield, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DonorFormData {
  // Basic Info
  fullName: string;
  age: string;
  gender: string;
  weight: string;
  bloodGroup: string;
  thalStatus: string;
  
  // Health Checks
  hemoglobin: string;
  anemia: string;
  chronicIllness: string;
  infections: string;
  
  // Eligibility Checks
  travelHistory: string;
  familyBloodDisorders: string;
  smoking: string;
  alcohol: string;
  tattoos: string;
  lastDonation: string;
}

const DonorForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<DonorFormData>({
    fullName: "",
    age: "",
    gender: "",
    weight: "",
    bloodGroup: "",
    thalStatus: "",
    hemoglobin: "",
    anemia: "",
    chronicIllness: "",
    infections: "",
    travelHistory: "",
    familyBloodDisorders: "",
    smoking: "",
    alcohol: "",
    tattoos: "",
    lastDonation: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof DonorFormData, value: string) => {
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

  const checkEligibility = (data: DonorFormData) => {
    const issues = [];
    
    // Age check
    const age = parseInt(data.age);
    if (age < 18 || age > 65) {
      issues.push("Age must be between 18-65 years");
    }
    
    // Weight check
    const weight = parseFloat(data.weight);
    if (weight < 50) {
      issues.push("Weight must be at least 50 kg");
    }
    
    // Thalassemia status check
    if (data.thalStatus === "patient") {
      issues.push("Thalassemia patients are not eligible to donate");
    }
    
    // Carrier-specific checks
    if (data.thalStatus === "carrier") {
      const hb = parseFloat(data.hemoglobin);
      if (hb < 12.5) {
        issues.push("Carriers need hemoglobin ≥12.5 g/dL");
      }
      if (data.anemia === "yes") {
        issues.push("Active anemia disqualifies donation");
      }
    }
    
    // Health checks
    if (data.chronicIllness === "yes") {
      issues.push("Chronic illness may disqualify donation");
    }
    
    if (data.infections === "yes") {
      issues.push("Recent infections disqualify donation");
    }
    
    // Travel history
    if (data.travelHistory === "yes") {
      issues.push("Recent travel to malaria/dengue zones may disqualify donation");
    }
    
    // Recent tattoos
    if (data.tattoos === "yes") {
      issues.push("Tattoos/piercings in last 6 months disqualify donation");
    }
    
    // Donation frequency
    if (data.lastDonation === "recent") {
      const months = data.gender === "male" ? 3 : 4;
      issues.push(`Must wait ${months} months between donations`);
    }
    
    return {
      eligible: issues.length === 0,
      issues: issues
    };
  };

  const handleSubmit = async () => {
    try {
      // Check eligibility
      const eligibility = checkEligibility(formData);
      
      // TODO: Save to Supabase database
      console.log("Donor Form Data:", formData);
      console.log("Eligibility:", eligibility);
      
      // TODO: Call ML API for wellness prediction
      const wellnessPrediction = await mockWellnessPrediction(formData);
      
      if (eligibility.eligible) {
        toast({
          title: "Congratulations! You're eligible to donate!",
          description: "Processing your donor profile...",
        });
        
        setTimeout(() => {
          navigate("/donor-certificate", { 
            state: { 
              donorData: formData, 
              wellness: wellnessPrediction 
            }
          });
        }, 2000);
      } else {
        toast({
          title: "Sorry, you're not eligible to donate at this time",
          description: eligibility.issues.join(". "),
          variant: "destructive",
        });
        
        setTimeout(() => {
          navigate("/donor-ineligible", { 
            state: { 
              issues: eligibility.issues 
            }
          });
        }, 2000);
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process donor form. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Mock wellness prediction function
  const mockWellnessPrediction = async (data: DonorFormData) => {
    const age = parseInt(data.age);
    const weight = parseFloat(data.weight);
    const hb = parseFloat(data.hemoglobin);
    
    let recoverySpeed = "normal";
    let tips = [
      "Stay hydrated - drink plenty of water",
      "Rest for at least 24 hours after donation",
      "Eat iron-rich foods like spinach and red meat"
    ];
    
    if (age < 25 && weight > 70 && hb > 13) {
      recoverySpeed = "fast";
      tips = [
        "Excellent health profile! Quick recovery expected",
        "Continue your healthy lifestyle",
        "Consider becoming a regular donor"
      ];
    } else if (age > 50 || weight < 60 || hb < 13) {
      recoverySpeed = "slow";
      tips = [
        "Take extra care during recovery",
        "Increase iron intake for 1-2 weeks",
        "Rest more than usual after donation"
      ];
    }
    
    return { recoverySpeed, tips };
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="age">Age (18-65 years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => updateFormData("age", e.target.value)}
                />
              </div>

              <div>
                <Label>Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => updateFormData("gender", value)}
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
                <Label htmlFor="weight">Weight (≥50 kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight in kg"
                  value={formData.weight}
                  onChange={(e) => updateFormData("weight", e.target.value)}
                />
              </div>

              <div>
                <Label>Blood Group</Label>
                <RadioGroup
                  value={formData.bloodGroup}
                  onValueChange={(value) => updateFormData("bloodGroup", value)}
                  className="mt-2"
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Rare (Bombay/Rh null)"].map((group) => (
                    <div key={group} className="flex items-center space-x-2">
                      <RadioGroupItem value={group} id={group} />
                      <Label htmlFor={group}>{group}</Label>
                    </div>
                  ))}
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
                <Droplets className="w-5 h-5 text-primary" />
                Thalassemia Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Are you a Patient/Carrier/Normal?</Label>
                <RadioGroup
                  value={formData.thalStatus}
                  onValueChange={(value) => updateFormData("thalStatus", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="patient" />
                    <Label htmlFor="patient">Patient (❌ Not eligible)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="carrier" id="carrier" />
                    <Label htmlFor="carrier">Carrier (Additional checks required)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Normal</Label>
                  </div>
                </RadioGroup>
              </div>

              {(formData.thalStatus === "carrier" || formData.thalStatus === "normal") && (
                <>
                  <div>
                    <Label htmlFor="hemoglobin">Current Hemoglobin Level (g/dL)</Label>
                    <Input
                      id="hemoglobin"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 13.5"
                      value={formData.hemoglobin}
                      onChange={(e) => updateFormData("hemoglobin", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Required: ≥12.5 g/dL for donation eligibility
                    </p>
                  </div>

                  <div>
                    <Label>Do you currently have anemia?</Label>
                    <RadioGroup
                      value={formData.anemia}
                      onValueChange={(value) => updateFormData("anemia", value)}
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
                    </RadioGroup>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Health & Eligibility Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Do you have any chronic illnesses?</Label>
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

              <div>
                <Label>Have you had any infections in the past month?</Label>
                <RadioGroup
                  value={formData.infections}
                  onValueChange={(value) => updateFormData("infections", value)}
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
                </RadioGroup>
              </div>

              <div>
                <Label>Recent travel to malaria, Zika, or dengue zones?</Label>
                <RadioGroup
                  value={formData.travelHistory}
                  onValueChange={(value) => updateFormData("travelHistory", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="travel-yes" />
                    <Label htmlFor="travel-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="travel-no" />
                    <Label htmlFor="travel-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Family history of blood disorders?</Label>
                <RadioGroup
                  value={formData.familyBloodDisorders}
                  onValueChange={(value) => updateFormData("familyBloodDisorders", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="family-blood-yes" />
                    <Label htmlFor="family-blood-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="family-blood-no" />
                    <Label htmlFor="family-blood-no">No</Label>
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
                <Award className="w-5 h-5 text-primary" />
                Final Eligibility Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Smoking or alcohol consumption habits</Label>
                <RadioGroup
                  value={formData.smoking}
                  onValueChange={(value) => updateFormData("smoking", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="habits-none" />
                    <Label htmlFor="habits-none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="habits-occasional" />
                    <Label htmlFor="habits-occasional">Occasional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="habits-regular" />
                    <Label htmlFor="habits-regular">Regular</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>Tattoos or piercings in the last 6 months?</Label>
                <RadioGroup
                  value={formData.tattoos}
                  onValueChange={(value) => updateFormData("tattoos", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="tattoo-yes" />
                    <Label htmlFor="tattoo-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="tattoo-no" />
                    <Label htmlFor="tattoo-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label>When was your last blood donation?</Label>
                <RadioGroup
                  value={formData.lastDonation}
                  onValueChange={(value) => updateFormData("lastDonation", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="never" id="donation-never" />
                    <Label htmlFor="donation-never">Never donated before</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recent" id="donation-recent" />
                    <Label htmlFor="donation-recent">Less than 3-4 months ago</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eligible" id="donation-eligible" />
                    <Label htmlFor="donation-eligible">More than 3-4 months ago</Label>
                  </div>
                </RadioGroup>
                <p className="text-sm text-muted-foreground mt-1">
                  Men: 3 months minimum, Women: 4 months minimum
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Navbar />
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Blood Donor Registration
          </h1>
          <p className="text-muted-foreground">
            Help save lives through blood donation - let's check your eligibility
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
              Check Eligibility
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
    </div>
  );
};

export default DonorForm;