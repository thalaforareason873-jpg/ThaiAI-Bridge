import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User } from "lucide-react";
import { useState } from "react";

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    doctorPreference: "",
    urgency: "",
    currentCondition: "",
    familyHistory: "",
    previousTests: "",
    specificConcerns: "",
    preferredLanguage: "",
    consultationMode: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TH${Date.now().toString().slice(-6)}`;
    setBookingId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-success-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-bounce">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-2">
                Book Genetic Consultation
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Schedule a consultation with our expert genetic counselors and thalassemia specialists.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        required
                        value={formData.age}
                        onChange={(e) => updateFormData("age", e.target.value)}
                        placeholder="Your age"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+91-XXXXX-XXXXX"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Details */}
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Consultation Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Type of Consultation *</Label>
                    <Select onValueChange={(value) => updateFormData("consultationType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select consultation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genetic-counseling">Genetic Counseling</SelectItem>
                        <SelectItem value="thalassemia-specialist">Thalassemia Specialist</SelectItem>
                        <SelectItem value="family-planning">Family Planning Consultation</SelectItem>
                        <SelectItem value="carrier-screening">Carrier Screening</SelectItem>
                        <SelectItem value="treatment-planning">Treatment Planning</SelectItem>
                        <SelectItem value="second-opinion">Second Opinion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => updateFormData("preferredDate", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label>Preferred Time *</Label>
                      <Select onValueChange={(value) => updateFormData("preferredTime", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="14:00">02:00 PM</SelectItem>
                          <SelectItem value="15:00">03:00 PM</SelectItem>
                          <SelectItem value="16:00">04:00 PM</SelectItem>
                          <SelectItem value="17:00">05:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Doctor Preference</Label>
                    <Select onValueChange={(value) => updateFormData("doctorPreference", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any available doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any available doctor</SelectItem>
                        <SelectItem value="dr-sharma">Dr. Priya Sharma (Genetic Counselor)</SelectItem>
                        <SelectItem value="dr-reddy">Dr. Rajesh Reddy (Hematologist)</SelectItem>
                        <SelectItem value="dr-krishna">Dr. Kavitha Krishna (Pediatric Specialist)</SelectItem>
                        <SelectItem value="female-doctor">Female doctor preferred</SelectItem>
                        <SelectItem value="male-doctor">Male doctor preferred</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="text-center">
                <Button type="submit" className="btn-hero px-8 py-3 text-lg">
                  Book Consultation
                </Button>
              </div>
            </form>
          </>
        ) : (
          // Confirmation Section
          <Card className="card-healing p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gradient">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your consultation has been successfully booked.  
              <br /> Booking ID: <span className="font-semibold">{bookingId}</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">Personal Details</h3>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Age:</strong> {formData.age}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Consultation Info</h3>
                <p><strong>Type:</strong> {formData.consultationType}</p>
                <p><strong>Date:</strong> {formData.preferredDate}</p>
                <p><strong>Time:</strong> {formData.preferredTime}</p>
                <p><strong>Doctor Preference:</strong> {formData.doctorPreference}</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              You will receive a confirmation email with details shortly.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookConsultation;
