
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, AlertTriangle, Loader2, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const ReviewValidator = () => {
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isFake: boolean;
    confidence: number;
    explanation: string;
  } | null>(null);

  const handleValidate = () => {
    if (!reviewText.trim()) {
      toast.error('Please enter a review to validate');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Fake detection logic based on review length and content
      const isFake = 
        reviewText.length > 300 || 
        reviewText.includes('!!!') || 
        reviewText.includes('cure') || 
        reviewText.includes('miracle') ||
        reviewText.toLowerCase().includes('amazing');
      
      const confidence = isFake ? 
        Math.floor(Math.random() * (98 - 85) + 85) :
        Math.floor(Math.random() * (95 - 75) + 75);
        
      setResult({
        isFake,
        confidence,
        explanation: isFake 
          ? 'This review contains exaggerated claims and excessive punctuation typical of fake reviews.'
          : 'This review appears to contain balanced opinions and specific details typical of authentic reviews.'
      });
      
      setIsLoading(false);
      
      toast.success('Review analyzed successfully!');
    }, 1500);
  };

  const handleReset = () => {
    setReviewText('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white shadow-sm border p-6">
        <h3 className="font-medium text-lg">Enter Review Text</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Paste a product review to check its authenticity
        </p>
        <div className="mt-4">
          <Textarea 
            placeholder="Enter or paste review text here..."
            className="min-h-[120px] resize-none"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleReset}>Reset</Button>
            <Button 
              onClick={handleValidate} 
              disabled={isLoading || !reviewText.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Validate Review'
              )}
            </Button>
          </div>
        </div>
      </div>

      {result && (
        <div className={cn(
          "rounded-xl border p-6 animate-fade-in",
          result.isFake ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center",
              result.isFake ? "bg-red-100" : "bg-green-100"
            )}>
              {result.isFake ? (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              ) : (
                <BadgeCheck className="h-5 w-5 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">
                {result.isFake ? 'Potentially Fake Review' : 'Authentic Review'}
              </h3>
              <div className="flex items-center mt-1">
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className={cn(
                  "ml-1 text-sm font-medium",
                  result.isFake ? "text-red-600" : "text-green-600"
                )}>
                  {result.confidence}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Analysis Explanation:</h4>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white border">
              <h4 className="text-sm font-medium flex items-center">
                <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <Check className="h-3 w-3 text-green-600" />
                </span>
                Authentic Review Characteristics
              </h4>
              <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                <li>• Contains specific product details</li>
                <li>• Balanced positive and negative points</li>
                <li>• Reasonable length and tone</li>
                <li>• Natural language patterns</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-white border">
              <h4 className="text-sm font-medium flex items-center">
                <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <X className="h-3 w-3 text-red-600" />
                </span>
                Fake Review Indicators
              </h4>
              <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                <li>• Excessive punctuation (!!!, ???)</li>
                <li>• Unrealistic or exaggerated claims</li>
                <li>• Generic praise without specifics</li>
                <li>• Overused superlatives (amazing, best ever)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
