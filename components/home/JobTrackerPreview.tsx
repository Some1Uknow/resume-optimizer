import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"

type JobStatus = "applied" | "interview" | "offer" | "rejected"

interface JobApplication {
  id: string
  company: string
  position: string
  status: JobStatus
  appliedDate: string
  atsScore: number
  salary?: string
  location: string
  notes?: string
}

const mockJobs: JobApplication[] = [
  {
    id: "1",
    company: "Google",
    position: "Senior Software Engineer",
    status: "interview",
    appliedDate: "2024-01-15",
    atsScore: 92,
    salary: "$180,000",
    location: "Mountain View, CA",
    notes: "Technical interview scheduled for next week",
  },
  {
    id: "2",
    company: "Microsoft",
    position: "Product Manager",
    status: "applied",
    appliedDate: "2024-01-12",
    atsScore: 87,
    salary: "$160,000",
    location: "Seattle, WA",
  },
  {
    id: "3",
    company: "Apple",
    position: "iOS Developer",
    status: "offer",
    appliedDate: "2024-01-10",
    atsScore: 95,
    salary: "$170,000",
    location: "Cupertino, CA",
    notes: "Offer received! Negotiating salary",
  },
  {
    id: "4",
    company: "Meta",
    position: "Frontend Engineer",
    status: "rejected",
    appliedDate: "2024-01-08",
    atsScore: 78,
    salary: "$155,000",
    location: "Menlo Park, CA",
  },
]

const statusColors = {
  applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  interview: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  offer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export function JobTrackerPreview() {
  const stats = {
    total: mockJobs.length,
    applied: mockJobs.filter((j) => j.status === "applied").length,
    interviews: mockJobs.filter((j) => j.status === "interview").length,
    offers: mockJobs.filter((j) => j.status === "offer").length,
    avgAtsScore: Math.round(mockJobs.reduce((acc, job) => acc + job.atsScore, 0) / mockJobs.length),
  }

  return (
    <div className="space-y-6 m-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-muted-foreground">Manage your job applications and track your progress</p>
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Job Applications</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies or positions..."
                disabled
                className="pl-8"
              />
            </div>
            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
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
                <TableHead>Applied Date</TableHead>
                <TableHead>ATS Score</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.company}</TableCell>
                  <TableCell>{job.position}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[job.status]}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${job.atsScore}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{job.atsScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.salary || "N/A"}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
