
import { useState } from 'react';

interface UseOpenAIProps {
  apiKey: string;
}

interface OpenAIResponse {
  data: any;
  loading: boolean;
  error: string | null;
  analyzeResume: (resumeText: string) => Promise<void>;
}

export const useOpenAI = ({ apiKey }: UseOpenAIProps): OpenAIResponse => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async (resumeText: string) => {
    if (!resumeText) {
      setError('Resume text is required');
      return;
    }

    setLoading(true);
    setError(null);

    const systemPrompt = `
      You are an expert resume analyst with years of experience in HR and recruitment.
      Analyze the provided resume and give detailed feedback in these categories:
      1. Overview - Assess readability, length, tone, and structure
      2. Grammar & Style - Identify spelling errors, grammar issues, passive voice usage, and clarity
      3. Keywords - Detect important keywords, missing keywords, and calculate keyword density
      4. Suggestions - Provide specific, actionable recommendations for improvement
      
      Format your response as JSON with the following structure:
      {
        "overview": {
          "readabilityScore": number (1-10),
          "length": string,
          "tone": string,
          "structure": string
        },
        "grammarAndStyle": {
          "spellingErrors": number,
          "grammarIssues": number,
          "passiveVoice": number,
          "clarityScore": number (1-10),
          "issues": [
            {
              "type": string,
              "text": string,
              "suggestion": string
            }
          ]
        },
        "keywords": {
          "detected": [
            {
              "keyword": string,
              "count": number,
              "relevance": string
            }
          ],
          "missing": string[],
          "density": number
        },
        "suggestions": {
          "critical": string[],
          "important": string[],
          "minor": string[]
        }
      }
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: resumeText
            }
          ],
          temperature: 0.3
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to analyze resume');
      }

      const responseData = await response.json();
      const analysisText = responseData.choices[0]?.message?.content;
      
      // Try parsing the response as JSON
      try {
        const parsedData = JSON.parse(analysisText);
        setData(parsedData);
      } catch (parseError) {
        // If parsing fails, just use the raw text
        setData({ rawResponse: analysisText });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, analyzeResume };
};
