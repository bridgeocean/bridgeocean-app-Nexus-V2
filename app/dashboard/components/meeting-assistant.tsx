"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, CheckCircle, FileText, Phone, MessageSquare, Bot, Copy, Save, Send, Calendar, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  stage: string
  status: string
  notes: string
}

interface InterviewChecklist {
  id: string
  item: string
  completed: boolean
  phase: "screening" | "interview" | "visitation" | "contract"
  category: "safety" | "documents" | "requirements" | "logistics" | "follow-up"
}

const INTERVIEW_PHASES = {
  screening: "Screening Call",
  interview: "Interview Call",
  visitation: "Home Visitation",
  contract: "Contract Signing",
}

const INTERVIEW_CHECKLIST: InterviewChecklist[] = [
  // Safety & Introduction
  { id: "1", item: "Introduce yourself professionally", completed: false, phase: "interview", category: "safety" },
  {
    id: "2",
    item: "SAFETY REMINDER: Don't share address or personal information",
    completed: false,
    phase: "interview",
    category: "safety",
  },

  // Document Verification
  {
    id: "3",
    item: "Confirm accuracy of documents sent over",
    completed: false,
    phase: "interview",
    category: "documents",
  },
  {
    id: "4",
    item: "Verify Uber/Bolt profile and experience",
    completed: false,
    phase: "interview",
    category: "documents",
  },
  {
    id: "5",
    item: "Confirm marital status with evidence (family photos)",
    completed: false,
    phase: "interview",
    category: "requirements",
  },

  // Business Terms
  {
    id: "6",
    item: "Explain the aim - delivery service, not hire purchase",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "7",
    item: "Explain ₦350,000 caution fee & payment conditions",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "8",
    item: "Request proof of initial caution fee (₦150,000 minimum)",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "9",
    item: "Discuss weekly delivery amount and expectations",
    completed: false,
    phase: "interview",
    category: "requirements",
  },

  // Logistics & Operations
  {
    id: "10",
    item: "Discuss parking spot & designated location terms",
    completed: false,
    phase: "interview",
    category: "logistics",
  },
  {
    id: "11",
    item: "Inform about vehicle trackers installation",
    completed: false,
    phase: "interview",
    category: "logistics",
  },
  {
    id: "12",
    item: "Discuss drive route limits & speed delimiter",
    completed: false,
    phase: "interview",
    category: "logistics",
  },
  {
    id: "13",
    item: "Explain vehicle inspection requirements",
    completed: false,
    phase: "interview",
    category: "logistics",
  },
  {
    id: "14",
    item: "Discuss maintenance and repair responsibilities",
    completed: false,
    phase: "interview",
    category: "logistics",
  },

  // Guarantors & References
  {
    id: "15",
    item: "Explain guarantor requirements (2 guarantors needed)",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "16",
    item: "Guarantor must know applicant for 8+ years",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "17",
    item: "Guarantor must have 10+ years field experience",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "18",
    item: "Guarantor must have ₦1M+ asset base",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  { id: "19", item: "Guarantor must be 50+ years old", completed: false, phase: "interview", category: "requirements" },
  {
    id: "20",
    item: "Explain referee requirements (3 referees)",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "21",
    item: "Referees should know applicant 2+ years",
    completed: false,
    phase: "interview",
    category: "requirements",
  },
  {
    id: "22",
    item: "Clarify referees are NOT guarantors",
    completed: false,
    phase: "interview",
    category: "requirements",
  },

  // Follow-up & Next Steps
  {
    id: "23",
    item: "Discuss 6 forms/documents to be sent after call",
    completed: false,
    phase: "interview",
    category: "follow-up",
  },
  {
    id: "24",
    item: "Explain next steps if interview is successful",
    completed: false,
    phase: "interview",
    category: "follow-up",
  },
  { id: "25", item: "Mention WhatsApp group inclusion", completed: false, phase: "interview", category: "follow-up" },
  { id: "26", item: "Allow time for candidate questions", completed: false, phase: "interview", category: "follow-up" },
]

export function MeetingAssistant() {
  const { toast } = useToast()
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [checklist, setChecklist] = useState<InterviewChecklist[]>(INTERVIEW_CHECKLIST)
  const [meetingNotes, setMeetingNotes] = useState("")
  const [aiSuggestions, setAiSuggestions] = useState("")
  const [interviewPhase, setInterviewPhase] = useState<keyof typeof INTERVIEW_PHASES>("interview")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCandidates()
  }, [])

  const loadCandidates = async () => {
    try {
      const response = await fetch("/api/candidates")
      const result = await response.json()
      if (result.candidates) {
        setCandidates(result.candidates)
      }
    } catch (error) {
      console.error("Error loading candidates:", error)
    }
  }

  const generateAISuggestions = async () => {
    if (!selectedCandidate) return

    setLoading(true)
    try {
      // In a real implementation, this would call your AI API
      setTimeout(() => {
        let suggestions = ""

        if (interviewPhase === "interview") {
          suggestions = `🤖 AI Interview Suggestions for ${selectedCandidate.name}:

📋 **Key Focus Areas:**
• Verify their Uber/Bolt experience mentioned in notes
• Pay special attention to family status verification
• Assess their understanding of delivery vs hire-purchase model

💡 **Talking Points:**
• "I see you have experience with ride-hailing. How do you feel about switching to delivery services?"
• "Can you tell me about your family situation and living arrangements?"
• "What's your understanding of our weekly remittance model?"

⚠️ **Red Flags to Watch:**
• Hesitation about caution fee payment
• Unclear about parking arrangements
• Difficulty providing guarantor information

🎯 **Success Indicators:**
• Clear understanding of business model
• Ready with guarantor contacts
• Confident about meeting requirements

📝 **Follow-up Actions:**
• Send guarantor forms if interview goes well
• Schedule visitation within 3-5 days
• Add to WhatsApp group for updates`
        } else if (interviewPhase === "visitation") {
          suggestions = `🏠 **Visitation Checklist for ${selectedCandidate.name}:**

📋 **Documents to Collect:**
• 2 completed guarantor forms
• Driver's information form
• Supporting documents from guarantors

🔍 **Verification Tasks:**
• Compare LASDRI, LASRRA, Driver's license (hard vs soft copies)
• Verify address with proof provided
• Take video of parking spot
• Get GPS coordinates of parking location

👥 **Family Assessment:**
• Look for family photos
• Assess living situation
• Evaluate maintenance culture of home

📱 **Tech Tasks:**
• Send parking coordinates to tracking team
• Update candidate status in system
• Schedule contract signing if all checks pass`
        }

        setAiSuggestions(suggestions)
        setLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating suggestions:", error)
      setLoading(false)
    }
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const getCompletionStats = () => {
    const total = checklist.filter((item) => item.phase === interviewPhase).length
    const completed = checklist.filter((item) => item.phase === interviewPhase && item.completed).length
    return { total, completed, percentage: Math.round((completed / total) * 100) }
  }

  const saveMeetingNotes = () => {
    if (!selectedCandidate) return

    // In a real implementation, this would save to the database
    toast({
      title: "Meeting Notes Saved",
      description: `Notes saved for ${selectedCandidate.name}`,
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Content copied successfully",
    })
  }

  const stats = getCompletionStats()

  return (
    <div className="space-y-6">
      {/* Candidate Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Candidate</Label>
          <Select
            onValueChange={(value) => {
              const candidate = candidates.find((c) => c.id === value)
              setSelectedCandidate(candidate || null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a candidate" />
            </SelectTrigger>
            <SelectContent>
              {candidates.map((candidate) => (
                <SelectItem key={candidate.id} value={candidate.id}>
                  {candidate.name} - {candidate.stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Interview Phase</Label>
          <Select
            value={interviewPhase}
            onValueChange={(value: keyof typeof INTERVIEW_PHASES) => setInterviewPhase(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INTERVIEW_PHASES).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedCandidate && (
        <Alert>
          <User className="h-4 w-4" />
          <AlertDescription>
            <strong>{selectedCandidate.name}</strong> - {selectedCandidate.stage} | {selectedCandidate.email} |{" "}
            {selectedCandidate.phone}
          </AlertDescription>
        </Alert>
      )}

      {selectedCandidate && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Interview Assistant
              </CardTitle>
              <CardDescription>Smart suggestions based on candidate profile and interview phase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={generateAISuggestions} disabled={loading} className="w-full">
                {loading ? "Generating..." : "Generate AI Suggestions"}
                <Bot className="ml-2 h-4 w-4" />
              </Button>

              {aiSuggestions && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>AI Suggestions</Label>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(aiSuggestions)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    value={aiSuggestions}
                    onChange={(e) => setAiSuggestions(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="AI suggestions will appear here..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced AI Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Enhanced AI Tools
              </CardTitle>
              <CardDescription>Advanced AI responses with Bridgeocean knowledge</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-20 flex-col">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  Generate WhatsApp Response
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Mail className="h-6 w-6 mb-2" />
                  Draft Follow-up Email
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Create Interview Summary
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule Next Steps
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interview Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Interview Checklist
                <Badge variant="outline" className="ml-auto">
                  {stats.completed}/{stats.total} ({stats.percentage}%)
                </Badge>
              </CardTitle>
              <CardDescription>Based on Bridgeocean interview guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.percentage}%` }}
                  ></div>
                </div>

                {/* Checklist Items */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {checklist
                    .filter((item) => item.phase === interviewPhase)
                    .map((item) => (
                      <div key={item.id} className="flex items-start space-x-2 p-2 rounded hover:bg-gray-50">
                        <Checkbox
                          id={item.id}
                          checked={item.completed}
                          onCheckedChange={() => toggleChecklistItem(item.id)}
                        />
                        <label
                          htmlFor={item.id}
                          className={`text-sm cursor-pointer flex-1 ${
                            item.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {item.item}
                        </label>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Meeting Notes */}
      {selectedCandidate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Meeting Notes
            </CardTitle>
            <CardDescription>Record important points and observations from the interview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              placeholder="Record your meeting notes here..."
              className="min-h-[150px]"
            />
            <div className="flex gap-2">
              <Button onClick={saveMeetingNotes}>
                <Save className="h-4 w-4 mr-2" />
                Save Notes
              </Button>
              <Button variant="outline" onClick={() => copyToClipboard(meetingNotes)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy Notes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {selectedCandidate && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const phone = selectedCandidate.phone.replace(/\D/g, "") // Remove non-digits
              const message = `Hi ${selectedCandidate.name}, this is from Bridgeocean. We'd like to schedule your interview call. When would be a good time for you?`
              const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
              window.open(whatsappUrl, "_blank")
            }}
          >
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Start Call</h3>
              <p className="text-sm text-muted-foreground">Begin interview via WhatsApp</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const startDate = new Date()
              startDate.setDate(startDate.getDate() + 2) // 2 days from now
              const endDate = new Date(startDate)
              endDate.setHours(startDate.getHours() + 1) // 1 hour duration

              const formatDate = (date: Date) => {
                return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
              }

              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Home+Visitation+-+${encodeURIComponent(selectedCandidate.name)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=Home+visitation+for+driver+candidate+${encodeURIComponent(selectedCandidate.name)}%0A%0ACandidate+Details:%0AEmail:+${encodeURIComponent(selectedCandidate.email)}%0APhone:+${encodeURIComponent(selectedCandidate.phone)}%0A%0AChecklist:%0A-+Verify+documents%0A-+Check+parking+spot%0A-+Family+assessment%0A-+Collect+guarantor+forms`

              window.open(calendarUrl, "_blank")
            }}
          >
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Schedule Visit</h3>
              <p className="text-sm text-muted-foreground">Book home visitation</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const subject = `Bridgeocean Driver Application - Next Steps for ${selectedCandidate.name}`
              const body = `Dear ${selectedCandidate.name},

Thank you for your interest in becoming a Bridgeocean partner driver.

Following our interview, please find attached the required forms:

1. Driver Information Form
2. Guarantor Form (2 copies needed)
3. Referee Form (3 copies needed)
4. Vehicle Information Form
5. Insurance Declaration Form
6. Agreement Terms Document

Please complete all forms and return them within 5 business days.

Requirements reminder:
- 2 Guarantors (known you for 8+ years, 50+ years old, ₦1M+ assets)
- 3 Referees (known you for 2+ years)
- Caution fee: ₦350,000 (₦150,000 minimum to start)

Next steps:
1. Complete and return forms
2. Schedule home visitation
3. Document verification
4. Contract signing

Contact us if you have any questions.

Best regards,
Bridgeocean Team
Phone: +234 906 918 3165
Email: info@bridgeocean.com`

              const mailtoUrl = `mailto:${selectedCandidate.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
              window.location.href = mailtoUrl
            }}
          >
            <CardContent className="p-4 text-center">
              <Send className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Send Forms</h3>
              <p className="text-sm text-muted-foreground">Email documents</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              const phone = selectedCandidate.phone.replace(/\D/g, "")
              const message = `Welcome to Bridgeocean, ${selectedCandidate.name}! 🚗

You've been added to our driver candidates group. Here you'll receive:
- Important updates
- Document requirements
- Interview schedules
- Support from our team

Please introduce yourself to the group and let us know if you have any questions.

Best regards,
Bridgeocean Team`

              const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
              window.open(whatsappUrl, "_blank")
            }}
          >
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-semibold">WhatsApp Group</h3>
              <p className="text-sm text-muted-foreground">Add to group</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
