"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CopyIcon } from 'lucide-react'; 
import {toast, Toaster} from "sonner"
import axios from 'axios';

const GenerateKey: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBlink = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/generate_key', {
        withCredentials: true
      });

      if(!response.data.success) {
        toast("Unable to generate api key")
      }

      setApiKey(response.data.apiKey);

    } catch (err) {
      setError('Error generating Blink. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast("Copied to clipboard")
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleGenerateBlink} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate ApiKey'}
      </Button>
      
      {error && <p className="text-red-500">{error}</p>}
      
      {apiKey && (
        <div className="flex items-center space-x-2">
          <Label htmlFor="blinkUrl">Generated ApiKey:</Label>
          <Input
            id="blinkUrl"
            value={apiKey.slice(0,5) + "..." + apiKey.slice(-5)}
            readOnly
            className="w-fit"
          />
          <Button onClick={handleCopyToClipboard} variant="outline" size="icon">
            <CopyIcon onClick={() => {
              handleCopyToClipboard()
            }} className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Toaster/>
    </div>
  );
};

export default GenerateKey;