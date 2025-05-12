
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, LineChart, BookOpen } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      title: "Smart Resume Parsing",
      description: "Our AI intelligently extracts and analyzes information from your resume regardless of format or structure."
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-blue-500" />,
      title: "Grammar & Style Check",
      description: "Ensure your resume is error-free with comprehensive spelling, grammar, and style analysis."
    },
    {
      icon: <LineChart className="h-8 w-8 text-blue-500" />,
      title: "Keyword Optimization",
      description: "Get insights on relevant industry keywords and how to incorporate them for better ATS matching."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: "Actionable Recommendations",
      description: "Receive personalized, practical suggestions to improve your resume's impact and effectiveness."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Smart Resume Analyzer?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Advanced AI analysis to help you stand out in the job market
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="neumorphism border-none">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
