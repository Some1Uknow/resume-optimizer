"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Chrome } from "lucide-react"

const ChromeIcon = () => (
  <Chrome className="w-4 h-4 mr-2" />
)

export default function JobTracker() {
  return (
    <div className="min-h-screen bg-[#e8e8e8] py-2 flex flex-col">
      <div className="w-full h-full bg-white p-6 shadow-sm rounded-xl flex flex-col flex-1">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-[32px] font-bold text-gray-900">Job Tracker</h1>
              <p className="text-gray-600 text-[14px]">
                Manage your job applications and track your progress
              </p>
            </div>
            <Button className="bg-gradient-to-br from-[#a855f7] via-[#9333ea] to-[#7c3aed] text-white px-4 py-2 rounded-lg text-[14px] font-medium flex items-center">
              <ChromeIcon />
              Install Extension
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col justify-between items-start">
            <h3 className="text-[14px] font-medium text-gray-600">Total Jobs</h3>
            <div className="text-[28px] font-bold text-gray-900">0</div>
          </div>
          <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col justify-between items-start">
            <h3 className="text-[14px] font-medium text-gray-600">Captured</h3>
            <div className="text-[28px] font-bold text-gray-900">0</div>
          </div>
          <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col justify-between items-start">
            <h3 className="text-[14px] font-medium text-gray-600">Applied</h3>
            <div className="text-[28px] font-bold text-gray-900">0</div>
          </div>
          <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col justify-between items-start">
            <h3 className="text-[14px] font-medium text-gray-600">Interviews</h3>
            <div className="text-[28px] font-bold text-gray-900">0</div>
          </div>
          <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col justify-between items-start">
            <h3 className="text-[14px] font-medium text-gray-600">Offers</h3>
            <div className="text-[28px] font-bold text-gray-900">0</div>
          </div>
          <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4 shadow-sm flex flex-col justify-between items-start">
            <h3 className="text-[14px] font-medium text-gray-600">Avg Selection rate</h3>
            <div className="text-[28px] font-bold text-gray-900">0%</div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <div className="text-center mb-6">
            <h2 className="text-[24px] font-bold text-gray-900 mb-2">
              Get Started with Job Tracking
            </h2>
            <p className="text-gray-600 text-[14px] max-w-md">
              Install our Chrome extension to automatically capture job postings
              from any website with just one click.
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-white border-2 border-gray-200 text-gray-900 px-6 py-3 rounded-lg text-[14px] font-medium hover:bg-gray-50 flex items-center"
          >
            <ChromeIcon />
            Install Chrome Extension
          </Button>
        </div>

        {/* Job Postings Table */}
        <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[18px] font-bold text-gray-900">
              Job Postings
            </h3>
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search companies or positions..."
                className="px-4 py-2 border border-gray-200 rounded-lg text-[14px] w-64"
              />
              <Select>
                <SelectTrigger className="px-4 py-2 border border-gray-200 rounded-lg text-[14px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Company
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Position
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Status
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Captured Date
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    ATS Score
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Salary
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Location
                  </TableHead>
                  <TableHead className="text-left py-3 px-4 text-[13px] font-medium text-gray-600">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-500 text-[14px]"
                  >
                    No job postings yet. Start by installing the Chrome
                    extension.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
