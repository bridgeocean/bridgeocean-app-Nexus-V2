"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bot, Save, Send, Copy, MessageSquare, FileText, User } from "lucide-react"

export function EnhancedAI() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiMode, setAiMode] = useState("customer-service")
  const [savedTemplates, setSavedTemplates] = useState([
    {
      id: 1,
      name: "Caution Fee Explanation",
      content:
        "A caution fee (₦350,000) is a refundable amount paid upfront by the driver to Bridgeocean. This fee is fully refundable at the end of your rental agreement, provided no issues arise. It's our way of reducing financial risk while ensuring a smooth partnership.",
    },
    {
      id: 2,
      name: "LASRRA/LASDRI Requirements",
      content:
        "As part of our onboarding process, we require both LASRRA and LASDRI cards. You can apply for LASRRA online at https://registration.lagosresidents.gov.ng/register/. LASDRI takes more time to process, but we can accept application slips as evidence of applying.",
    },
    {
      id: 3,
      name: "Guarantor Requirements",
      content:
        "Your guarantor must have known you for at least 8 years, have 10+ years experience in their field, possess assets of at least ₦1 million, be 45 years or older, and have a NIN Card. There's a specific form for guarantors to complete.",
    },
  ])

  const aiModes = [
    { id: "customer-service", name: "Customer Service", description: "Helpful responses for customer inquiries" },
    {
      id: "partner-onboarding",
      name: "Partner Onboarding",
      description: "Detailed explanations of driver requirements",
    },
    { id: "emergency", name: "Emergency Response", description: "Urgent and direct communication" },
    { id: "business", name: "Business Analysis", description: "Professional business insights" },
    { id: "content", name: "Content Creation", description: "Marketing and promotional content" },
  ]

  const handleGenerate = async () => {
    if (!inputText.trim()) return

    setIsGenerating(true)

    try {
      // In a real implementation, this would call your AI API
      // const response = await fetch("/api/enhanced-ai-response", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ prompt: inputText, mode: aiMode })
      // })
      // const data = await response.json()
      // setOutputText(data.response)

      // Simulated response for demo
      setTimeout(() => {
        let response = ""

        switch (aiMode) {
          case "customer-service":
            response = `Thank you for reaching out to Bridgeocean. ${
              inputText.includes("charter")
                ? "Our charter service offers both Toyota Camry and GMC Terrain options for your transportation needs in Lagos. Would you like to know more about our rates or availability?"
                : "We're here to assist with all your transportation needs. How can we help you today?"
            }`
            break
          case "partner-onboarding":
            response = `Welcome to the Bridgeocean partner onboarding process. ${
              inputText.includes("requirements")
                ? "To become a partner, you'll need to provide: Valid license, LASRRA card, LASDRI card, 2 guarantors (who have known you for 8+ years), and consent to the caution fee payment (₦350,000). Would you like more details on any of these requirements?"
                : "We're excited to have you join our team. The process involves screening, document verification, and contract signing. What specific information do you need?"
            }`
            break
          case "emergency":
            response = `URGENT: ${
              inputText.includes("accident")
                ? "Please ensure everyone is safe and call emergency services if needed. Then contact our emergency line at +234XXXXXXXX immediately. We'll dispatch assistance right away."
                : "This is a priority message from Bridgeocean. Please respond immediately with your current status and location."
            }`
            break
          case "business":
            response = `Bridgeocean Business Analysis: ${
              inputText.includes("revenue")
                ? "Based on current projections, we anticipate a 15% increase in charter bookings this quarter. The caution fee system has improved our financial stability by reducing risk exposure by approximately 35%."
                : "Our business metrics indicate steady growth in the Lagos transportation sector. Would you like specific data on partner retention, vehicle utilization, or customer satisfaction?"
            }`
            break
          case "content":
            response = `${
              inputText.includes("promotion")
                ? "Experience premium transportation with Bridgeocean! Our fleet of well-maintained vehicles and professional drivers ensure your journey is comfortable, safe, and punctual. Book your charter today and discover the Bridgeocean difference!"
                : "Bridgeocean: Connecting Lagos with reliable transportation solutions. Our commitment to quality service and professional standards makes us the preferred choice for discerning clients."
            }`
            break
        }

        setOutputText(response)
        setIsGenerating(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setOutputText("Error generating response. Please try again.")
      setIsGenerating(false)
    }
  }

  const saveTemplate = () => {
    if (!outputText.trim()) return

    const newTemplate = {
      id: savedTemplates.length + 1,
      name: `Template ${savedTemplates.length + 1}`,
      content: outputText,
    }

    setSavedTemplates([...savedTemplates, newTemplate])
  }

  const useTemplate = (content) => {
    setOutputText(content)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
  }

  const handleTemplateClick = (content) => {
    useTemplate(content)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <Select value={aiMode} onValueChange={setAiMode}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {aiModes.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      {mode.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="input">Your prompt:</Label>
            <Textarea
              id="input"
              placeholder="Enter your message or question..."
              className="min-h-[120px]"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating || !inputText.trim()} className="w-full">
            {isGenerating ? "Generating..." : "Generate Response"} <Bot className="ml-2 h-4 w-4" />
          </Button>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="output">AI Response:</Label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!outputText}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={saveTemplate} disabled={!outputText}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              id="output"
              placeholder="AI response will appear here..."
              className="min-h-[200px]"
              value={outputText}
              onChange={(e) => setOutputText(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <Tabs defaultValue="templates">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates">
                <FileText className="h-4 w-4 mr-2" /> Saved Templates
              </TabsTrigger>
              <TabsTrigger value="conversations">
                <MessageSquare className="h-4 w-4 mr-2" /> Conversations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {savedTemplates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:bg-gray-50">
                    <CardContent className="p-4" onClick={() => handleTemplateClick(template.content)}>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-2 mt-1">{template.content}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="conversations" className="space-y-4 mt-4">
              <div className="max-h-[400px] overflow-y-auto space-y-4">
                <div className="flex gap-3">
                  <User className="h-8 w-8 bg-blue-100 p-1 rounded-full text-blue-600" />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">I need information about the caution fees for new drivers.</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Today, 10:23 AM</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Bot className="h-8 w-8 bg-green-100 p-1 rounded-full text-green-600" />
                  <div className="flex-1">
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm">
                        The caution fee is ₦350,000 and is fully refundable at the end of your rental agreement,
                        provided no issues arise. This fee helps us reduce financial risk while ensuring a smooth
                        partnership. Would you like more details about when and how to pay?
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Today, 10:24 AM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
