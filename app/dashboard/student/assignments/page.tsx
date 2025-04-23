"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload } from "lucide-react"

export default function StudentAssignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [submissionText, setSubmissionText] = useState("")
  const [submissionFile, setSubmissionFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmissionText("")
      setSubmissionFile(null)
      // Close dialog and update UI as needed
      setSelectedAssignment(null)
    }, 1500)
  }

  const assignments = {
    current: [
      {
        id: 1,
        subject: "Mathematics",
        title: "Calculus Problem Set 3",
        description: "Complete problems 1-15 on page 127 of the textbook.",
        dueDate: "Apr 22, 2025",
        status: "In Progress",
      },
      {
        id: 2,
        subject: "Physics",
        title: "Lab Report: Wave Properties",
        description: "Write a lab report on the wave properties experiment conducted in class.",
        dueDate: "Apr 25, 2025",
        status: "Not Started",
      },
      {
        id: 3,
        subject: "English Literature",
        title: "Essay on Shakespeare",
        description: "Write a 1000-word essay analyzing a theme from Hamlet.",
        dueDate: "Apr 28, 2025",
        status: "In Progress",
      },
      {
        id: 4,
        subject: "Computer Science",
        title: "Algorithm Implementation",
        description: "Implement the sorting algorithms discussed in class.",
        dueDate: "May 2, 2025",
        status: "Not Started",
      },
    ],
    past: [
      {
        id: 5,
        subject: "Mathematics",
        title: "Algebra Quiz",
        description: "Complete the online quiz on algebraic expressions.",
        dueDate: "Apr 10, 2025",
        status: "Submitted",
        grade: "A",
      },
      {
        id: 6,
        subject: "History",
        title: "Research Paper",
        description: "Write a research paper on a historical event of your choice.",
        dueDate: "Apr 5, 2025",
        status: "Submitted",
        grade: "B",
      },
      {
        id: 7,
        subject: "Chemistry",
        title: "Lab Report: Chemical Reactions",
        description: "Write a lab report on the chemical reactions experiment.",
        dueDate: "Mar 28, 2025",
        status: "Submitted",
        grade: "A-",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">View and submit your assignments for all subjects.</p>
      </div>
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.current.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={assignment.status === "Not Started" ? "outline" : "secondary"}>
                      {assignment.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                  </div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.subject}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>{assignment.description}</p>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" onClick={() => setSelectedAssignment(assignment)}>
                        View & Submit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{selectedAssignment?.title}</DialogTitle>
                        <DialogDescription>
                          {selectedAssignment?.subject} - Due: {selectedAssignment?.dueDate}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Assignment Details</h4>
                          <p className="text-sm">{selectedAssignment?.description}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Your Submission</h4>
                          <div className="space-y-4">
                            <div className="grid w-full gap-1.5">
                              <Label htmlFor="submission-text">Text Submission</Label>
                              <Textarea
                                id="submission-text"
                                placeholder="Type your answer here..."
                                value={submissionText}
                                onChange={(e) => setSubmissionText(e.target.value)}
                                className="min-h-[100px]"
                              />
                            </div>
                            <div className="grid w-full gap-1.5">
                              <Label htmlFor="submission-file">File Upload</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id="submission-file"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="flex-1"
                                />
                                <Button variant="outline" size="icon">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                              {submissionFile && (
                                <p className="text-xs text-muted-foreground">Selected file: {submissionFile.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Assignment"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.past.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="success">{assignment.status}</Badge>
                    <span className="text-sm font-medium">Grade: {assignment.grade}</span>
                  </div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.subject}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>{assignment.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Feedback
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
