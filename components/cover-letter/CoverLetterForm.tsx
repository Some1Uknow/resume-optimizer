import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

interface CoverLetterFormProps {
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: () => void;
  loading: boolean;
  error: string;
}

export const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  error,
}) => (
  <ScrollArea className="h-full">
    <div className="space-y-6 pr-4">
      <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6">
        <h3 className="text-[18px] font-bold text-gray-900 mb-4">Job Details</h3>
        <p className="text-gray-600 text-[13px] mb-4">
          Provide job information to generate a personalized cover letter
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                Company Name *
              </Label>
              <Input
                type="text"
                placeholder="e.g. Google"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({ ...formData, company_name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]"
              />
            </div>
            <div>
              <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                Position *
              </Label>
              <Input
                type="text"
                placeholder="e.g. Software Engineer"
                value={formData.position}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]"
              />
            </div>
          </div>
          <div>
            <Label className="block text-[13px] font-medium text-gray-700 mb-1">
              Hiring Manager (Optional)
            </Label>
            <Input
              type="text"
              placeholder="e.g. John Doe"
              value={formData.hiring_manager}
              onChange={(e) =>
                setFormData({ ...formData, hiring_manager: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]"
            />
          </div>
          <div>
            <Label className="block text-[13px] font-medium text-gray-700 mb-1">
              Job Description
            </Label>
            <Textarea
              rows={4}
              placeholder="Paste the job description here..."
              value={formData.job_description}
              onChange={(e) =>
                setFormData({ ...formData, job_description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                Tone
              </Label>
              <Select
                value={formData.tone}
                onValueChange={(value) =>
                  setFormData({ ...formData, tone: value })
                }
              >
                <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]">
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-[13px] font-medium text-gray-700 mb-1">
                Template
              </Label>
              <Select
                value={formData.template}
                onValueChange={(value) =>
                  setFormData({ ...formData, template: value })
                }
              >
                <SelectTrigger className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="w-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-white py-3 rounded-lg text-[14px] font-medium"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </Button>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-[12px] text-red-800">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </ScrollArea>
);
