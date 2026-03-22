import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, MapPin, TestTube } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScheduleTest = () => {
  const [selectedTest, setSelectedTest] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    preferredLanguage: "",
  });

  const [confirmed, setConfirmed] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const availableTests = [
    { id: "cbc", name: "Complete Blood Count (CBC)", duration: "15 minutes", fasting: false, price: "₹300" },
    { id: "hb-electrophoresis", name: "Hemoglobin Electrophoresis", duration: "30 minutes", fasting: false, price: "₹1,200" },
    { id: "genetic-testing", name: "Genetic Testing", duration: "45 minutes", fasting: false, price: "₹5,000" },
  ];

  const hospitals = [
    { id: "apollo-jubilee", name: "Apollo Hospitals Jubilee Hills", address: "Jubilee Hills, Hyderabad", rating: 4.8, availableSlots: ["09:00", "10:30", "14:00"] },
    { id: "care-banjara", name: "CARE Hospitals Banjara Hills", address: "Banjara Hills, Hyderabad", rating: 4.7, availableSlots: ["09:30", "11:00", "14:30"] },
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TEST${Date.now().toString().slice(-6)}`;
    setAppointmentId(id);
    setConfirmed(true);
  };

  const getAvailableSlots = () => {
    const hospital = hospitals.find(h => h.id === selectedHospital);
    return hospital ? hospital.availableSlots : [];
  };

  const selectedTestData = availableTests.find(test => test.id === selectedTest);
  const selectedHospitalData = hospitals.find(hospital => hospital.id === selectedHospital);

  // Pre-select test if passed from navigation state
  const location = useLocation();
  useEffect(() => {
    const incoming = (location.state as any)?.selectedTest as string | undefined;
    if (incoming) {
      const match = availableTests.find(t => t.name === incoming);
      if (match) setSelectedTest(match.id);
      else if (incoming.toLowerCase().includes('routine')) setSelectedTest('cbc');
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {!confirmed ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TestTube className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Schedule Medical Test</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Book your thalassemia-related tests at verified hospitals in Hyderabad.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Test Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-5 h-5" /> Select Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedTest} onValueChange={setSelectedTest}>
                    {availableTests.map(test => (
                      <div key={test.id} className="border rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={test.id} id={test.id} />
                          <Label htmlFor={test.id}>{test.name} <Badge>{test.price}</Badge></Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Hospital Selection */}
              {selectedTest && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> Select Hospital
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedHospital} onValueChange={setSelectedHospital}>
                      {hospitals.map(hospital => (
                        <div key={hospital.id} className="border rounded-lg p-3">
                          <div className="flex items-start gap-3">
                            <RadioGroupItem value={hospital.id} id={hospital.id} />
                            <Label htmlFor={hospital.id}>
                              {hospital.name} <Badge>★ {hospital.rating}</Badge>
                            </Label>
                          </div>
                          <p className="text-xs text-muted-foreground">{hospital.address}</p>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Date & Time Selection */}
              {selectedHospital && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> Select Date & Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                    </div>
                    <div>
                      <Label>Available Slots</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableSlots().map(slot => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Patient Information */}
              {selectedTime && (
                <Card>
                  <CardHeader><CardTitle>Patient Info</CardTitle></CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Full Name" required value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} />
                    <Input placeholder="Age" required value={formData.age} onChange={(e) => updateFormData("age", e.target.value)} />
                    <Input placeholder="Email" type="email" required value={formData.email} onChange={(e) => updateFormData("email", e.target.value)} />
                    <Input placeholder="Phone" required value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} />
                  </CardContent>
                </Card>
              )}

              {selectedTime && (
                <div className="text-center">
                  <Button type="submit" className="px-6 py-2">Confirm Appointment</Button>
                </div>
              )}
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <h2 className="text-2xl font-bold">Appointment Confirmed!</h2>
            <p className="text-muted-foreground">Your test has been successfully scheduled.</p>

            <Card className="max-w-md mx-auto">
              <CardContent className="p-6 space-y-2 text-left">
                <p><strong>Appointment ID:</strong> {appointmentId}</p>
                <p><strong>Test:</strong> {selectedTestData?.name}</p>
                <p><strong>Hospital:</strong> {selectedHospitalData?.name}</p>
                <p><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</p>
                <p><strong>Patient:</strong> {formData.name}, Age {formData.age}</p>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              A confirmation email and SMS will be sent shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTest;
