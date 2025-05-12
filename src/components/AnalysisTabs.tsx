
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileCheck, Maximize2, Star, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AnalysisTabsProps {
  analysisData: {
    overview: {
      readabilityScore: number;
      length: string;
      tone: string;
      structure: string;
    };
    grammarAndStyle: {
      spellingErrors: number;
      grammarIssues: number;
      passiveVoice: number;
      clarityScore: number;
      issues: Array<{ type: string; text: string; suggestion: string }>;
    };
    keywords: {
      detected: Array<{ keyword: string; count: number; relevance: string }>;
      missing: string[];
      density: number;
    };
    suggestions: {
      critical: string[];
      important: string[];
      minor: string[];
    };
  } | null;
}

const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!analysisData) {
    return null;
  }

  return (
    <Tabs 
      defaultValue="overview" 
      className="w-full max-w-4xl mx-auto mt-12"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="grid grid-cols-4 mb-8 w-full max-w-2xl mx-auto">
        <TabsTrigger value="overview" className="rounded-xl">
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="grammar" className="rounded-xl">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Grammar & Style</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="keywords" className="rounded-xl">
          <div className="flex items-center gap-2">
            <Maximize2 className="h-4 w-4" />
            <span className="hidden sm:inline">Keywords</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="suggestions" className="rounded-xl">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Suggestions</span>
          </div>
        </TabsTrigger>
      </TabsList>

      <div className="animate-fade-in">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Readability Score</CardTitle>
                <CardDescription>How easy your resume is to read</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                    {analysisData.overview.readabilityScore}/10
                  </div>
                  <Badge variant={analysisData.overview.readabilityScore >= 7 ? "success" : "destructive"}>
                    {analysisData.overview.readabilityScore >= 7 ? "Good" : "Needs Improvement"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Length Assessment</CardTitle>
                <CardDescription>Optimal length for your career level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-semibold">
                    {analysisData.overview.length}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Tone Analysis</CardTitle>
                <CardDescription>The voice and style of your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Badge className="text-lg px-4 py-1 my-2">{analysisData.overview.tone}</Badge>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    A {analysisData.overview.tone.toLowerCase()} tone is {analysisData.overview.tone === "Professional" ? "excellent" : "acceptable"} for most job applications.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Structure</CardTitle>
                <CardDescription>Organization and formatting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg">{analysisData.overview.structure}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grammar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Spelling Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {analysisData.grammarAndStyle.spellingErrors}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Grammar Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {analysisData.grammarAndStyle.grammarIssues}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Passive Voice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {analysisData.grammarAndStyle.passiveVoice}%
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 dark:text-gray-400">Clarity Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {analysisData.grammarAndStyle.clarityScore}/10
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Detailed Issues</CardTitle>
              <CardDescription>Found grammar and style issues in your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisData.grammarAndStyle.issues.map((issue, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="mb-2">{issue.type}</Badge>
                    </div>
                    <p className="mb-2 font-medium">{issue.text}</p>
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <Check size={16} />
                      <span>Suggestion: {issue.suggestion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glassmorphism md:col-span-2">
              <CardHeader>
                <CardTitle>Detected Keywords</CardTitle>
                <CardDescription>Industry-relevant terms found in your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisData.keywords.detected.map((kw, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className={`text-md py-2 px-4 ${
                        kw.relevance === "high" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                          : kw.relevance === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {kw.keyword} ({kw.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism">
              <CardHeader>
                <CardTitle>Keyword Density</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {analysisData.keywords.density}%
                  </div>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {analysisData.keywords.density < 4 
                      ? "Too low. Add more relevant keywords."
                      : analysisData.keywords.density > 7
                      ? "Too high. Reduce keyword density."
                      : "Optimal keyword density."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommended Keywords</CardTitle>
              <CardDescription>Consider adding these missing keywords relevant to your field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysisData.keywords.missing.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 py-1 px-3">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader className="bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800">
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Critical Improvements
              </CardTitle>
              <CardDescription className="text-red-600 dark:text-red-300">
                Address these issues first for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {analysisData.suggestions.critical.map((suggestion, index) => (
                  <li key={index} className="flex gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-800/30 text-red-600 dark:text-red-400 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <p>{suggestion}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-100 dark:border-yellow-800">
              <CardTitle className="text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Important Recommendations
              </CardTitle>
              <CardDescription className="text-yellow-600 dark:text-yellow-300">
                These changes will significantly improve your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {analysisData.suggestions.important.map((suggestion, index) => (
                  <li key={index} className="flex gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-800/30 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <p>{suggestion}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800">
              <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                <Check className="h-5 w-5" />
                Minor Enhancements
              </CardTitle>
              <CardDescription className="text-green-600 dark:text-green-300">
                These small tweaks will polish your resume
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {analysisData.suggestions.minor.map((suggestion, index) => (
                  <li key={index} className="flex gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <p>{suggestion}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AnalysisTabs;
