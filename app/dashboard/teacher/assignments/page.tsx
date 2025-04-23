"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Edit } from "lucide-react"

export default function TeacherAssignments() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    class: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateAssignment = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsCreateDialogOpen(false)
      setNewAssignment({
        title: "",
        description: "",
        dueDate: "",
        class: "",
      })
    }, 1500)
  }

  const handleEditAssignment = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsEditDialogOpen(false)
      setSelectedAssignment(null)
    }, 1500)
  }

  const assignments = {
    active: [
      {
        id: 1,
        title: "Calculus Problem Set 3",
        description: "Complete problems 1-15 on page 127 of the textbook.",
        dueDate: "Apr 22, 2025",
        class: "Mathematics 101",
        submissions: 18,
        totalStudents: 32,
      },
      {
        id: 2,
        title: "Lab Report: Wave Properties",
        description: "Write a lab report on the wave properties experiment conducted in class.",
        dueDate: "Apr 25, 2025",
        class: "Physics 101",
        submissions: 5,
        totalStudents: 28,
      },
      {
        id: 3,
        title: "Essay on Shakespeare",
        description: "Write a 1000-word essay analyzing a theme from Hamlet.",
        dueDate: "Apr 28, 2025",
        class: "English Literature",
        submissions: 12,
        totalStudents: 30,
      },
      {
        id: 4,
        title: "Algorithm Implementation",
        description: "Implement the sorting algorithms discussed in class.",
        dueDate: "May 2, 2025",
        class: "Computer Science",
        submissions: 8,
        totalStudents: 25,
      },
    ],
    past: [
      {
        id: 5,
        title: "Algebra Quiz",
        description: "Complete the online quiz on algebraic expressions.",
        dueDate: "Apr 10, 2025",
        class: "Mathematics 101",
        submissions: 30,
        totalStudents: 32,
        averageGrade: "B+",
      },
      {
        id: 6,
        title: "Research Paper",
        description: "Write a research paper on a historical event of your choice.",
        dueDate: "Apr 5, 2025",
        class: "History",
        submissions: 28,
        totalStudents: 30,
        averageGrade: "B",
      },
      {
        id: 7,
        title: "Lab Report: Chemical Reactions",
        description: "Write a lab report on the chemical reactions experiment.",
        dueDate: "Mar 28, 2025",
        class: "Chemistry",
        submissions: 24,
        totalStudents: 26,
        averageGrade: "A-",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Create, manage, and grade assignments for your classes.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>Create a new assignment for your students.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="Enter assignment title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={newAssignment.class}
                  onValueChange={(value) => setNewAssignment({ ...newAssignment, class: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics 101">Mathematics 101</SelectItem>
                    <SelectItem value="Physics 101">Physics 101</SelectItem>
                    <SelectItem value="English Literature">English Literature</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter assignment description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAssignment} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Assignment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assignments.active.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{assignment.class}</Badge>
                    <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                  </div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>
                    Submissions: {assignment.submissions}/{assignment.totalStudents}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>{assignment.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Assignment</DialogTitle>
                        <DialogDescription>Make changes to the assignment details.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="edit-title">Assignment Title</Label>
                          <Input id="edit-title" defaultValue={assignment.title} />
                        </div>
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="edit-class">Class</Label>
                          <Select defaultValue={assignment.class}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mathematics 101">Mathematics 101</SelectItem>
                              <SelectItem value="Physics 101">Physics 101</SelectItem>
                              <SelectItem value="English Literature">English Literature</SelectItem>
                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                              <SelectItem value="History">History</SelectItem>
                              <SelectItem value="Chemistry">Chemistry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            defaultValue={assignment.description}
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="edit-due-date">Due Date</Label>
                          <Input id="edit-due-date" type="date" defaultValue={assignment.dueDate} />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    View Submissions
                  </Button>
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
                    <Badge variant="outline">{assignment.class}</Badge>
                    <span className="text-sm font-medium">Avg: {assignment.averageGrade}</span>
                  </div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <CardDescription>
                    Submissions: {assignment.submissions}/{assignment.totalStudents}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>{assignment.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    View Submissions
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
