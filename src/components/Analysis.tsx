
import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import AnalysisTabs from './AnalysisTabs';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useOpenAI } from '@/hooks/useOpenAI';
import { Input } from '@/components/ui/input';

const Analysis: React.FC = () => {
  const [resumeContent, setResumeContent] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  
  const { data, loading: isAnalyzing, error, analyzeResume } = useOpenAI({ 
    apiKey: apiKey || 'YOUR_API_KEY' // Replace with actual key in production
  });
  
  // Update analysisData when OpenAI response is received
  useEffect(() => {
    if (data) {
      setAnalysisData(data);
      setAnalysisComplete(true);
      toast.success("Analysis complete!");
    }
  }, [data]);

  // Show error toast if API request fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  const handleAnalyzeResume = async () => {
    if (!resumeContent) {
      toast.error("Please upload a resume first");
      return;
    }
    
    if (!apiKey && !showApiKeyInput) {
      setShowApiKeyInput(true);
      toast.info("Please enter your OpenAI API key to continue");
      return;
    }
    
    if (showApiKeyInput && !apiKey) {
      toast.error("Please enter your OpenAI API key");
      return;
    }
    
    try {
      await analyzeResume(resumeContent);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast.error("Failed to analyze resume. Please try again.");
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
            
            {showApiKeyInput && (
              <div className="mb-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 mb-4">
                  <p className="text-amber-800 dark:text-amber-300 text-sm">
                    For security, enter your OpenAI API key. This will not be stored on our servers.
                  </p>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mb-4"
                />
              </div>
            )}
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleAnalyzeResume}
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
