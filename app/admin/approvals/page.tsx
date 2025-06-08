"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Clock, User, Building, Briefcase, MessageSquare } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

interface PendingUser {
  id: string
  name: string
  email: string
  company: string
  position: string
  reason: string
  status: "pending" | "approved" | "rejected"
  registeredAt: string
}

export default function ApprovalsPage() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Load pending approvals
    const pending = JSON.parse(localStorage.getItem("pendingApprovals") || "[]")
    setPendingUsers(pending)
  }, [])

  const handleApproval = (userId: string, action: "approve" | "reject") => {
    // Update pending approvals
    const updatedPending = pendingUsers.map((user) =>
      user.id === userId ? { ...user, status: action === "approve" ? "approved" : "rejected" } : user,
    )
    setPendingUsers(updatedPending)
    localStorage.setItem("pendingApprovals", JSON.stringify(updatedPending))

    // Update registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const updatedRegistered = registeredUsers.map((user: any) =>
      user.id === userId ? { ...user, status: action === "approve" ? "approved" : "rejected" } : user,
    )
    localStorage.setItem("registeredUsers", JSON.stringify(updatedRegistered))

    setMessage(`User ${action === "approve" ? "approved" : "rejected"} successfully`)
    setTimeout(() => setMessage(""), 3000)
  }

  const pendingCount = pendingUsers.filter((user) => user.status === "pending").length

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">User Approvals</h2>
            <p className="text-muted-foreground">Manage access requests to the dashboard</p>
          </div>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {pendingCount} Pending
          </Badge>
        </div>

        {message && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          {pendingUsers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Access Requests</h3>
                <p className="text-muted-foreground text-center">
                  There are currently no pending access requests to review.
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingUsers.map((user) => (
              <Card key={user.id} className={user.status === "pending" ? "border-yellow-200" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <Badge
                        variant={
                          user.status === "approved"
                            ? "default"
                            : user.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {user.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                        {user.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                        {user.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(user.registeredAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Company:</strong> {user.company || "Not specified"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>Position:</strong> {user.position || "Not specified"}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="text-sm">
                          <strong>Reason for Access:</strong>
                          <p className="mt-1 text-muted-foreground">{user.reason}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {user.status === "pending" && (
                    <div className="flex space-x-2 mt-4 pt-4 border-t">
                      <Button onClick={() => handleApproval(user.id, "approve")} className="flex-1" variant="default">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleApproval(user.id, "reject")}
                        className="flex-1"
                        variant="destructive"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
