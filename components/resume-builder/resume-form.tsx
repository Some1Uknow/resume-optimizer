"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Minus, Wand2 } from "lucide-react";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    highlights: string[];
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  achievements: Array<{
    title: string;
    date: string;
    description: string;
  }>;
  customSections: Array<{
    title: string;
    items: Array<{
      title: string;
      description: string;
      date: string;
    }>;
  }>;
}

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onAISuggestion?: (field: string, content: string) => Promise<string | null>;
  onGenerateBulletPoints?: (description: string) => Promise<string[] | null>;
  onAddAchievement: () => void;
  onUpdateAchievement: (index: number, field: string, value: string) => void;
  onRemoveAchievement: (index: number) => void;
  onAddCustomSection: () => void;
  onUpdateCustomSection: (index: number, field: string, value: string) => void;
  onAddCustomSectionItem: (sectionIndex: number) => void;
  onUpdateCustomSectionItem: (sectionIndex: number, itemIndex: number, field: string, value: string) => void;
  onRemoveCustomSectionItem: (sectionIndex: number, itemIndex: number) => void;
}

export function ResumeForm({ 
  data, 
  onChange, 
  onAISuggestion,
  onGenerateBulletPoints,
  onAddAchievement,
  onUpdateAchievement,
  onRemoveAchievement,
  onAddCustomSection,
  onUpdateCustomSection,
  onAddCustomSectionItem,
  onUpdateCustomSectionItem,
  onRemoveCustomSectionItem 
}: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<string>("personal");

  const updateData = (newData: Partial<ResumeData>) => {
    onChange({ ...data, ...newData });
  };

  const addExperience = () => {
    updateData({
      experience: [
        ...data.experience,
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
          highlights: [""],
        },
      ],
    });
  };

  const addEducation = () => {
    updateData({
      education: [
        ...data.education,
        {
          degree: "",
          school: "",
          location: "",
          graduationDate: "",
          highlights: [""],
        },
      ],
    });
  };

  const addSkillCategory = () => {
    updateData({
      skills: [...data.skills, { category: "", items: [""] }],
    });
  };

  const handleAISuggestion = async (field: string, content: string) => {
    if (onAISuggestion && content.trim()) {
      const suggestion = await onAISuggestion(field, content);
      if (suggestion) {
        if (field === "summary") {
          updateData({ summary: suggestion });
        } else if (field.startsWith("experience")) {
          const [, index] = field.split("-");
          const newExp = [...data.experience];
          newExp[Number(index)].description = suggestion;
          updateData({ experience: newExp });
        }
      }
    }
  };

  const handleGenerateBulletPoints = async (expIndex: number, description: string) => {
    if (onGenerateBulletPoints && description.trim()) {
      const bullets = await onGenerateBulletPoints(description);
      if (bullets) {
        const newExp = [...data.experience];
        newExp[expIndex].highlights = bullets;
        updateData({ experience: newExp });
      }
    }
  };

  return (
    <div className="space-y-6 max-h-screen">
      {/* Upload Buttons */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="resume-upload" className="block mb-2">Upload Existing Resume</Label>
          <Input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="linkedin-upload" className="block mb-2">Upload LinkedIn PDF</Label>
          <Input
            id="linkedin-upload"
            type="file"
            accept=".pdf"
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex gap-2 mb-6 overflow-auto">
        {["personal", "summary", "experience", "education", "skills", "achievements", "customSections"].map((section) => (
          <Button
            key={section}
            variant={activeSection === section ? "default" : "outline"}
            onClick={() => setActiveSection(section)}
            className="capitalize"
          >
            {section}
          </Button>
        ))}
      </div>

      {/* Personal Information */}
      <div className={activeSection === "personal" ? "" : "hidden"}>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={data.personalInfo.fullName}
              onChange={(e) =>
                updateData({
                  personalInfo: { ...data.personalInfo, fullName: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) =>
                updateData({
                  personalInfo: { ...data.personalInfo, email: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) =>
                updateData({
                  personalInfo: { ...data.personalInfo, phone: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) =>
                updateData({
                  personalInfo: { ...data.personalInfo, location: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={data.personalInfo.linkedin}
              onChange={(e) =>
                updateData({
                  personalInfo: { ...data.personalInfo, linkedin: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={data.personalInfo.website}
              onChange={(e) =>
                updateData({
                  personalInfo: { ...data.personalInfo, website: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={activeSection === "summary" ? "" : "hidden"}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Professional Summary</h3>
          {onAISuggestion && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleAISuggestion("summary", data.summary)}
            >
              <Wand2 className="h-4 w-4 mr-2" /> Enhance with AI
            </Button>
          )}
        </div>
        <Textarea
          value={data.summary}
          onChange={(e) => updateData({ summary: e.target.value })}
          rows={6}
        />
      </div>

      {/* Experience */}
      <div className={activeSection === "experience" ? "" : "hidden"}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>
        {data.experience.map((exp, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={exp.title}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].title = e.target.value;
                    updateData({ experience: newExp });
                  }}
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].company = e.target.value;
                    updateData({ experience: newExp });
                  }}
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].startDate = e.target.value;
                    updateData({ experience: newExp });
                  }}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newExp = [...data.experience];
                    newExp[index].endDate = e.target.value;
                    updateData({ experience: newExp });
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <Label>Description</Label>
                {onAISuggestion && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAISuggestion(`experience-${index}`, exp.description)}
                    >
                      <Wand2 className="h-4 w-4 mr-2" /> Enhance with AI
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateBulletPoints(index, exp.description)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Generate Bullets
                    </Button>
                  </div>
                )}
              </div>
              <Textarea
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...data.experience];
                  newExp[index].description = e.target.value;
                  updateData({ experience: newExp });
                }}
                rows={4}
              />
            </div>
            <div className="mt-4">
              <Label>Key Achievements</Label>
              {exp.highlights.map((highlight, hIndex) => (
                <div key={hIndex} className="flex gap-2 mt-2">
                  <Input
                    value={highlight}
                    onChange={(e) => {
                      const newExp = [...data.experience];
                      newExp[index].highlights[hIndex] = e.target.value;
                      updateData({ experience: newExp });
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newExp = [...data.experience];
                      newExp[index].highlights.push("");
                      updateData({ experience: newExp });
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {exp.highlights.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newExp = [...data.experience];
                        newExp[index].highlights.splice(hIndex, 1);
                        updateData({ experience: newExp });
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className={activeSection === "education" ? "" : "hidden"}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </div>
        {data.education.map((edu, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].degree = e.target.value;
                    updateData({ education: newEdu });
                  }}
                />
              </div>
              <div>
                <Label>School</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].school = e.target.value;
                    updateData({ education: newEdu });
                  }}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].location = e.target.value;
                    updateData({ education: newEdu });
                  }}
                />
              </div>
              <div>
                <Label>Graduation Date</Label>
                <Input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].graduationDate = e.target.value;
                    updateData({ education: newEdu });
                  }}
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => {
                    const newEdu = [...data.education];
                    newEdu[index].gpa = e.target.value;
                    updateData({ education: newEdu });
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className={activeSection === "skills" ? "" : "hidden"}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <Button onClick={addSkillCategory} size="sm">
            <Plus className="h-4 w-4 mr-2" /> Add Skill Category
          </Button>
        </div>
        {data.skills.map((skillCat, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={skillCat.category}
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index].category = e.target.value;
                  updateData({ skills: newSkills });
                }}
              />
            </div>
            <div className="mt-4">
              <Label>Skills</Label>
              {skillCat.items.map((skill, sIndex) => (
                <div key={sIndex} className="flex gap-2 mt-2">
                  <Input
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...data.skills];
                      newSkills[index].items[sIndex] = e.target.value;
                      updateData({ skills: newSkills });
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newSkills = [...data.skills];
                      newSkills[index].items.push("");
                      updateData({ skills: newSkills });
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {skillCat.items.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newSkills = [...data.skills];
                        newSkills[index].items.splice(sIndex, 1);
                        updateData({ skills: newSkills });
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className={activeSection === "achievements" ? "" : "hidden"}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Achievements</h3>
          {data.achievements.map((achievement, index) => (
            <div key={index} className="space-y-2">
              <Input
                value={achievement.title}
                onChange={(e) => onUpdateAchievement(index, 'title', e.target.value)}
                placeholder="Achievement title"
              />
              <Input
                value={achievement.date}
                onChange={(e) => onUpdateAchievement(index, 'date', e.target.value)}
                placeholder="Date"
              />
              <Textarea
                value={achievement.description}
                onChange={(e) => onUpdateAchievement(index, 'description', e.target.value)}
                placeholder="Description"
              />
              <Button onClick={() => onRemoveAchievement(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={onAddAchievement}>
            Add Achievement
          </Button>
        </div>
      </div>

      {/* Custom Sections */}
      <div className={activeSection === "customSections" ? "" : "hidden"}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Custom Sections</h3>
          {data.customSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <Input
                value={section.title}
                onChange={(e) => onUpdateCustomSection(index, 'title', e.target.value)}
                placeholder="Section title"
              />
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-2">
                  <Input
                    value={item.title}
                    onChange={(e) => onUpdateCustomSectionItem(index, itemIndex, 'title', e.target.value)}
                    placeholder="Item title"
                  />
                  <Textarea
                    value={item.description}
                    onChange={(e) => onUpdateCustomSectionItem(index, itemIndex, 'description', e.target.value)}
                    placeholder="Description"
                  />
                  <Input
                    value={item.date}
                    onChange={(e) => onUpdateCustomSectionItem(index, itemIndex, 'date', e.target.value)}
                    placeholder="Date"
                  />
                  <Button onClick={() => onRemoveCustomSectionItem(index, itemIndex)}>Remove Item</Button>
                </div>
              ))}
              <Button onClick={() => onAddCustomSectionItem(index)}>
                Add Item
              </Button>
            </div>
          ))}
          <Button onClick={onAddCustomSection}>
            Add Custom Section
          </Button>
        </div>
      </div>
    </div>
  );
}
