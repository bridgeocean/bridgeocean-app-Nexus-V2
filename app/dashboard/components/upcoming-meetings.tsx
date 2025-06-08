"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, FileText, MessageSquare, Video } from "lucide-react"
import Link from "next/link"

const meetings = [
  {
    id: "m001",
    title: "Interview with John Doe",
    date: "2025-06-08T14:00:00",
    duration: "30 minutes",
    type: "Video Call",
    candidate: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
    prepared: true,
  },
  {
    id: "m002",
    title: "Interview with Michael Smith",
    date: "2025-06-08T16:30:00",
    duration: "45 minutes",
    type: "Video Call",
    candidate: {
      name: "Michael Smith",
      avatar: "/placeholder.svg",
      initials: "MS",
    },
    prepared: false,
  },
  {
    id: "m003",
    title: "Contract Signing with Maria Lopez",
    date: "2025-06-09T10:00:00",
    duration: "60 minutes",
    type: "In Person",
    candidate: {
      name: "Maria Lopez",
      avatar: "/placeholder.svg",
      initials: "ML",
    },
    prepared: true,
  },
]

export function UpcomingMeetings() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>This Week</CardTitle>
          <CardDescription>Your scheduled meetings for the week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="flex items-start space-x-4 rounded-md border p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={meeting.candidate.avatar || "/placeholder.svg"} alt={meeting.candidate.name} />
                <AvatarFallback>{meeting.candidate.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{meeting.title}</p>
                  {meeting.prepared ? (
                    <Badge variant="outline" className="border-green-500 text-green-500">
                      Prepared
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      Needs Prep
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarClock className="mr-1 h-3 w-3" />
                  {new Date(meeting.date).toLocaleString()} ({meeting.duration})
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Video className="mr-1 h-3 w-3" />
                  {meeting.type}
                </div>
              </div>
              <div className="flex space-x-2">
                {!meeting.prepared && (
                  <Link href={`/meetings/prepare/${meeting.id}`}>
                    <Button size="sm" variant="outline">
                      <FileText className="mr-1 h-3 w-3" />
                      Prepare
                    </Button>
                  </Link>
                )}
                <Link href={`/communications/whatsapp?candidate=${meeting.candidate.name}`}>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Message
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Meetings
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>June 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={new Date("2025-06-08")} className="rounded-md border" />
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Schedule Meeting
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
