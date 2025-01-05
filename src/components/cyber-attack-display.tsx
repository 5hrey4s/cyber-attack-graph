'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { CyberAttackData } from '@/types/cyber-attack';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import axios from 'axios';

export default function CyberAttackDisplay() {
  const [data, setData] = useState<CyberAttackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data'); // Replace with your API endpoint
        const jsonData: CyberAttackData = response.data;
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Cyber Attack Simulation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Timestamp:</strong> {data.timestamp}
          </div>
          <div>
            <strong>Query:</strong> {data.query}
          </div>
          <div>
            <strong>Response:</strong> {data.response}
          </div>
          <div>
            <strong>Total Tokens:</strong> {data.total_tokens}
          </div>
          <div>
            <strong>Status:</strong>{' '}
            <Badge variant={data.is_active ? 'default' : 'secondary'}>
              {data.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {data.agents.map((agent) => (
              <AccordionItem key={agent.idx} value={agent.idx}>
                <AccordionTrigger>{agent.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div>
                      <strong>Output:</strong> {agent.output}
                    </div>
                    <div>
                      <strong>Tools:</strong>
                    </div>
                    <ul className="list-disc pl-5">
                      {agent.tools.map((tool) => (
                        <li key={tool.idx}>
                          <strong>{tool.name}</strong>
                          <ul className="list-none pl-5">
                            <li>Input: {tool.input}</li>
                            <li>Output: {tool.output}</li>
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
