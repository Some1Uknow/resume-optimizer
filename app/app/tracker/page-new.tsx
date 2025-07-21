"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Download,
  Eye,
  ExternalLink,
  Chrome,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type JobStatus = "CAPTURED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED"

interface JobPosting {
  id: string
  company: string
  position: string
  status: JobStatus
  createdAt: string
  atsScore?: number
  salary?: string
  location?: string
  notes?: string
  websiteUrl: string
  skills: string[]
  description?: string
}

const statusColors = {
  CAPTURED: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  APPLIED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  INTERVIEW: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  OFFER: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  CAPTURED: "Captured",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
}

export default function JobTrackerPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isViewJobOpen, setIsViewJobOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Fetch job postings from API
  useEffect(() => {
    fetchJobPostings()
  }, [])

  const fetchJobPostings = async () => {
    try {
      const response = await fetch('/api/job-postings')
      if (response.ok) {
        const data = await response.json()
        setJobs(data.jobPostings)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch job postings",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error fetching job postings:', error)
      toast({
        title: "Error",
        description: "Failed to fetch job postings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = jobs

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter)
    }

    setFilteredJobs(filtered)
  }, [jobs, searchTerm, statusFilter])

  const updateJobStatus = async (id: string, status: JobStatus) => {
    try {
      const response = await fetch('/api/job-postings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        await fetchJobPostings() // Refresh the list
        toast({
          title: "Success",
          description: "Job status updated successfully",
        })
      } else {
        throw new Error('Failed to update job status')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive",
      })
    }
  }

  const generateResume = () => {
    toast({
      title: "Resume Generated",
      description: "Tailored resume has been generated for this position",
    })
  }

  const generateCoverLetter = () => {
    toast({
      title: "Cover Letter Generated",
      description: "Personalized cover letter has been generated",
    })
  }

  const viewJobDetails = (job: JobPosting) => {
    setSelectedJob(job)
    setIsViewJobOpen(true)
  }

  const stats = {
    total: jobs.length,
    captured: jobs.filter((j) => j.status === "CAPTURED").length,
    applied: jobs.filter((j) => j.status === "APPLIED").length,
    interviews: jobs.filter((j) => j.status === "INTERVIEW").length,
    offers: jobs.filter((j) => j.status === "OFFER").length,
    avgAtsScore: jobs.length > 0 ? Math.round(jobs.reduce((acc, job) => acc + (job.atsScore || 0), 0) / jobs.length) : 0,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading job postings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 m-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-muted-foreground">Manage your job applications and track your progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Chrome className="h-4 w-4" />
            Install Extension
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Captured</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.captured}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applied}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ATS Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgAtsScore}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Chrome Extension CTA */}
      {stats.total === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Chrome className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Get Started with Job Tracking</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              Install our Chrome extension to automatically capture job postings from any website with just one click.
            </p>
            <Button className="flex items-center gap-2">
              <Chrome className="h-4 w-4" />
              Install Chrome Extension
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Job Postings</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="CAPTURED">Captured</SelectItem>
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="INTERVIEW">Interview</SelectItem>
                <SelectItem value="OFFER">Offer</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Captured Date</TableHead>
                <TableHead>ATS Score</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.company}</TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[job.status]}>
                      {statusLabels[job.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${job.atsScore || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{job.atsScore || 0}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.salary || "N/A"}</TableCell>
                  <TableCell>{job.location || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewJobDetails(job)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(job.websiteUrl, '_blank')}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Original
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateJobStatus(job.id, "APPLIED")}>
                          Mark as Applied
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => generateResume()}>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => generateCoverLetter()}>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Cover Letter
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Job Details Modal */}
      <Dialog open={isViewJobOpen} onOpenChange={setIsViewJobOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.position} at {selectedJob?.company}</DialogTitle>
            <DialogDescription>
              Captured from {selectedJob?.websiteUrl && new URL(selectedJob.websiteUrl).hostname}
            </DialogDescription>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={statusColors[selectedJob.status]}>
                    {statusLabels[selectedJob.status]}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">ATS Score</Label>
                  <p>{selectedJob.atsScore || 0}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Salary</Label>
                  <p>{selectedJob.salary || "Not specified"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p>{selectedJob.location || "Not specified"}</p>
                </div>
              </div>
              
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Required Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedJob.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedJob.description && (
                <div>
                  <Label className="text-sm font-medium">Job Description</Label>
                  <div className="mt-2 p-3 bg-muted rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{selectedJob.description}</p>
                  </div>
                </div>
              )}
              
              {selectedJob.notes && (
                <div>
                  <Label className="text-sm font-medium">Notes</Label>
                  <p className="text-sm text-muted-foreground">{selectedJob.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => window.open(selectedJob.websiteUrl, '_blank')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Original Posting
                </Button>
                <Button variant="outline" onClick={() => generateResume()}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Resume
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
