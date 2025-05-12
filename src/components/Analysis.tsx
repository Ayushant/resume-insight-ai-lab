
import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import AnalysisTabs from './AnalysisTabs';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const Analysis: React.FC = () => {
  const [resumeContent, setResumeContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  
  const analyzeResume = async () => {
    if (!resumeContent) {
      toast.error("Please upload a resume first");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real app, we'd make an API call to OpenAI here
      // Since we're not connecting to real APIs, we'll simulate a response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response data
      const mockAnalysisData = {
        overview: {
          readabilityScore: 7,
          length: 'Appropriate (1 page)',
          tone: 'Professional',
          structure: 'Well-organized with clear sections',
        },
        grammarAndStyle: {
          spellingErrors: 2,
          grammarIssues: 3,
          passiveVoice: 15,
          clarityScore: 8,
          issues: [
            {
              type: 'Passive Voice',
              text: '...was implemented by our team...',
              suggestion: 'I implemented with our team...',
            },
            {
              type: 'Wordiness',
              text: 'In order to achieve the desired results',
              suggestion: 'To achieve results',
            },
            {
              type: 'Spelling',
              text: 'recieved',
              suggestion: 'received',
            },
          ],
        },
        keywords: {
          detected: [
            { keyword: 'React', count: 4, relevance: 'high' },
            { keyword: 'JavaScript', count: 3, relevance: 'high' },
            { keyword: 'TypeScript', count: 2, relevance: 'medium' },
            { keyword: 'Node.js', count: 2, relevance: 'medium' },
            { keyword: 'Testing', count: 1, relevance: 'low' },
            { keyword: 'API', count: 3, relevance: 'medium' },
            { keyword: 'Development', count: 5, relevance: 'medium' },
            { keyword: 'Software', count: 2, relevance: 'high' },
          ],
          missing: [
            'CI/CD',
            'Agile',
            'Docker',
            'Cloud',
            'Python',
            'Team Leadership',
          ],
          density: 5.2,
        },
        suggestions: {
          critical: [
            'Quantify achievements with metrics (e.g., "increased performance by 40%" instead of "improved performance")',
            'Add specific technical skills relevant to the job description',
            'Remove outdated technologies that are over 10 years old',
          ],
          important: [
            'Use more action verbs at the beginning of bullet points',
            'Expand on your most recent role with more accomplishments',
            'Add a brief technical projects section to showcase practical skills',
            'Improve your professional summary to highlight your unique value proposition',
          ],
          minor: [
            'Consider using a cleaner, more modern formatting',
            'Ensure consistent verb tense throughout the document',
            'Add LinkedIn profile and GitHub links if applicable',
            'Proofread for the spelling errors identified above',
          ],
        },
      };
      
      setAnalysisData(mockAnalysisData);
      setAnalysisComplete(true);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const resetAnalysis = () => {
    setAnalysisComplete(false);
    setAnalysisData(null);
    setResumeContent('');
    setFileName('');
  };
  
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {!analysisComplete ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Upload Your Resume</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI will analyze your resume and provide actionable feedback
              </p>
            </div>
            
            <div className="mb-8">
              <FileUpload 
                onFileContent={setResumeContent}
                onFileNameChange={setFileName}
                onUploadComplete={() => {}}
              />
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={analyzeResume}
                disabled={!resumeContent || isAnalyzing}
                className="px-8 py-6 text-lg rounded-xl"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Resume"
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl md:text-3xl font-bold">Analysis Results</h2>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Complete
                  </Badge>
                </div>
                <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <span>Resume: {fileName}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={resetAnalysis}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Analyze Another Resume
              </Button>
            </div>
            
            <AnalysisTabs analysisData={analysisData} />
          </>
        )}
      </div>
    </section>
  );
};

export default Analysis;
