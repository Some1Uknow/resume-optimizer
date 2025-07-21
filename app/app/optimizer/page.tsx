'use client';

import { useState } from 'react';

interface AnalysisResult {
  metadata: {
    timestamp: string;
    role: string;
    seniority: string;
    industry: string;
  };
  ats_analysis: {
    keywords_found: string[];
    keywords_missing: string[];
    format_compliance: boolean;
    parsing_errors: string[];
  };
  structure: {
    length_pages: number;
    sections_present: string[];
    section_order_score: number;
  };
  content_scores: {
    summary_score: number;
    skills_score: number;
    experience_score: number;
    education_score: number;
    projects_score: number;
  };
  impact_metrics: {
    total_bullets: number;
    quantified_bullets: number;
    impact_density: number;
  };
  pedigree: {
    company_prestige_score: number;
    education_prestige_score: number;
  };
  flags: string[];
  recommendations: Array<{
    area: string;
    message: string;
  }>;
}

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [role, setRole] = useState('software_engineer');
  const [seniority, setSeniority] = useState('mid');
  const [industry, setIndustry] = useState('tech');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredKeywords, setRequiredKeywords] = useState('');
  const [anonymize, setAnonymize] = useState(false);
  const [focusPortfolio, setFocusPortfolio] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractingText, setExtractingText] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTextFromFile = async (file: File): Promise<string> => {
    setExtractingText(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text from file');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Text extraction error:', error);
      throw new Error('Failed to extract text from file');
    } finally {
      setExtractingText(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file only');
      return;
    }

    setUploadedFile(file);
    setError(null);

    try {
      const extractedText = await extractTextFromFile(file);
      setResumeText(extractedText);
    } catch (error) {
      setError('Failed to extract text from the uploaded file');
      console.log(error)
      setUploadedFile(null);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setResumeText('');
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please upload a resume or enter resume text');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume_text: resumeText,
          role,
          seniority,
          industry,
          job_description: jobDescription.trim() || undefined,
          required_keywords: requiredKeywords
            .split(',')
            .map((k) => k.trim())
            .filter(Boolean),
          anonymize,
          focus_portfolio: focusPortfolio,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      setError(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOverallScore = () => {
    if (!analysisResult) return 0;
    const scores = analysisResult.content_scores;
    const avgScore = (scores.summary_score + scores.skills_score + scores.experience_score + scores.education_score + scores.projects_score) / 5;
    return Math.round(avgScore * 100);
  };

  return (
    <div className="min-h-screen bg-[#e8e8e8] py-2 flex flex-col">
      <div className="w-full h-full bg-white p-4 shadow-sm rounded-md flex flex-col flex-1">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-12 gap-6">
          {/* Left Column - Inputs */}
          <div className="col-span-6 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-4">
              {/* Upload Section */}
              <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6 mb-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-2">Upload Resume</h3>
                <p className="text-gray-600 text-[13px] mb-4">Upload your resume in PDF or DOCX format for analysis</p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {extractingText ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
                    ) : (
                      <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                    disabled={extractingText}
                  />
                  <label htmlFor="resume-upload" className={`cursor-pointer ${extractingText ? 'opacity-50' : ''}`}>
                    <p className="text-[14px] font-medium text-gray-900 mb-1">
                      {extractingText ? 'Extracting text...' : 'Click to upload your resume'}
                    </p>
                    <p className="text-[12px] text-gray-500">PDF or DOCX files only</p>
                  </label>
                </div>

                {uploadedFile && (
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[13px] text-gray-700 block">{uploadedFile.name}</span>
                        <span className="text-[11px] text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleRemoveFile}
                      className="text-[12px] text-red-600 hover:text-red-800"
                      disabled={extractingText}
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Resume Text Preview */}
                {resumeText && (
                  <div className="mb-4">
                    <label className="text-[13px] font-medium text-gray-700 block mb-2">Extracted Text Preview</label>
                    <textarea 
                      value={resumeText.substring(0, 500) + (resumeText.length > 500 ? '...' : '')}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded text-[12px] h-20 bg-gray-50"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      {resumeText.length} characters extracted
                    </p>
                  </div>
                )}
              </div>

              {/* Job Context Inputs */}
              <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-[13px] font-medium text-gray-700 block mb-2">Target Role</label>
                    <select 
                      value={role} 
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-[13px]"
                    >
                      <option value="software_engineer">Software Engineer</option>
                      <option value="product_manager">Product Manager</option>
                      <option value="ux_designer">UX Designer</option>
                      <option value="marketing_manager">Marketing Manager</option>
                      <option value="operations_lead">Operations Lead</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-gray-700 block mb-2">Seniority Level</label>
                    <select 
                      value={seniority} 
                      onChange={(e) => setSeniority(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-[13px]"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive Level</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-gray-700 block mb-2">Industry</label>
                    <select 
                      value={industry} 
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-[13px]"
                    >
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-gray-700 block mb-2">Job Description (Optional)</label>
                    <textarea 
                      value={jobDescription} 
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-[13px] h-20"
                      placeholder="Paste the job description here..."
                    />
                  </div>

                  <div>
                    <label className="text-[13px] font-medium text-gray-700 block mb-2">Required Keywords (Optional)</label>
                    <input 
                      type="text"
                      value={requiredKeywords} 
                      onChange={(e) => setRequiredKeywords(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-[13px]"
                      placeholder="Python, AWS, Agile (comma-separated)"
                    />
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center text-[13px]">
                      <input 
                        type="checkbox" 
                        checked={anonymize} 
                        onChange={(e) => setAnonymize(e.target.checked)}
                        className="mr-2"
                      />
                      Anonymize resume
                    </label>
                    <label className="flex items-center text-[13px]">
                      <input 
                        type="checkbox" 
                        checked={focusPortfolio} 
                        onChange={(e) => setFocusPortfolio(e.target.checked)}
                        className="mr-2"
                      />
                      Focus on portfolio
                    </label>
                  </div>
                </div>

                <button 
                  onClick={handleAnalyze}
                  disabled={isLoading || !resumeText.trim() || extractingText}
                  className="w-full mt-6 bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-white py-3 rounded-lg text-[14px] font-medium disabled:opacity-50"
                >
                  {isLoading ? 'Analyzing Resume...' : 'Analyze Resume'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Analysis Results */}
          <div className="col-span-6 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto pr-4 space-y-6">
              {/* Analysis Results */}
              <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4">Analysis Results</h3>
                
                {analysisResult ? (
                  <>
                    <div className="text-center mb-6 w-full">
                      <div className="text-[48px] font-bold text-orange-500 mb-2">
                        {calculateOverallScore()}%
                      </div>
                      <p className="text-[16px] font-medium text-gray-900">
                        ATS Score - {calculateOverallScore() >= 80 ? 'Good' : calculateOverallScore() >= 60 ? 'Fair' : 'Needs Improvement'}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${calculateOverallScore()}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-[14px] font-medium text-green-600 mb-2">Strengths</h4>
                        <ul className="space-y-1 text-[12px] text-gray-700">
                          <li>• Impact density: {Math.round(analysisResult.impact_metrics.impact_density * 100)}%</li>
                          <li>• Skills coverage: {Math.round(analysisResult.content_scores.skills_score * 100)}%</li>
                          <li>• Experience relevance: {Math.round(analysisResult.content_scores.experience_score * 100)}%</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-medium text-red-600 mb-2">Areas to Improve</h4>
                        <ul className="space-y-1 text-[12px] text-gray-700">
                          {analysisResult.flags.slice(0, 3).map((flag, index) => (
                            <li key={index}>• {flag.replace(/_/g, ' ')}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-[20px] font-bold text-blue-600">{analysisResult.structure.length_pages}</div>
                        <div className="text-[12px] text-gray-600">Pages</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-[20px] font-bold text-purple-600">{analysisResult.structure.sections_present.length}</div>
                        <div className="text-[12px] text-gray-600">Sections</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-[20px] font-bold text-green-600">{analysisResult.impact_metrics.quantified_bullets}</div>
                        <div className="text-[12px] text-gray-600">Quantified Points</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-[20px] font-bold text-orange-600">{Math.round(analysisResult.structure.section_order_score * 10)}/10</div>
                        <div className="text-[12px] text-gray-600">Structure Score</div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-br from-[#a855f7] to-[#7c3aed] text-white py-2 rounded-lg text-[13px] font-medium">
                      Download Detailed Report
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-[14px] mb-2">
                      Upload your resume and fill in the details
                    </p>
                    <p className="text-gray-400 text-[12px]">
                      Get instant AI-powered analysis of your resume
                    </p>
                  </div>
                )}
              </div>

              {/* Keywords Analysis - Moved from left column */}
              <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4">Keywords Analysis</h3>

                <div className="mb-4">
                  <h4 className="text-[14px] font-medium text-green-600 mb-2">Present Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult?.ats_analysis.keywords_found.map((keyword) => (
                      <span key={keyword} className="bg-green-100 text-green-800 px-2 py-1 rounded text-[12px]">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[14px] font-medium text-red-600 mb-2">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult?.ats_analysis.keywords_missing.map((keyword) => (
                      <span key={keyword} className="bg-red-100 text-red-800 px-2 py-1 rounded text-[12px]">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[16px] p-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-4">Recommendations</h3>
                
                {analysisResult ? (
                  <div className="space-y-3">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-[13px] text-gray-700">
                          <span className="font-medium">{rec.area}:</span> {rec.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500 text-[14px]">
                      Complete the analysis to get personalized recommendations
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
