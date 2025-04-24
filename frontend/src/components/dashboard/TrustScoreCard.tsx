
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface TrustScoreCardProps {
  productName: string;
  productImage?: string;
  score: number;
  breakdown?: {
    authenticity: number;
    reviewValidity: number;
    expiryCompliance: number;
    priceAccuracy: number;
  };
  className?: string;
}

export const TrustScoreCard = ({
  productName,
  productImage,
  score,
  breakdown,
  className
}: TrustScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-astral-green";
    if (score >= 70) return "text-astral-yellow";
    return "text-astral-red";
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-astral-green";
    if (score >= 70) return "bg-astral-yellow";
    return "bg-astral-red";
  };

  return (
    <div className={cn(
      "p-6 rounded-xl bg-white shadow-sm border card-shine",
      className
    )}>
      <div className="flex items-center gap-4">
        {productImage ? (
          <img 
            src={productImage} 
            alt={productName} 
            className="h-16 w-16 object-cover rounded-md"
          />
        ) : (
          <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-xs">No image</span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold">{productName}</h3>
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-2xl font-bold",
              getScoreColor(score)
            )}>
              {score}
            </span>
            <span className="text-sm text-muted-foreground ml-1">/ 100</span>
            <Progress 
              value={score} 
              className={cn("h-2 ml-3 flex-1", getProgressColor(score))} 
            />
          </div>
        </div>
      </div>

      {breakdown && (
        <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-6">
          <div>
            <p className="text-xs text-muted-foreground">Authenticity</p>
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-sm font-semibold",
                getScoreColor(breakdown.authenticity)
              )}>
                {breakdown.authenticity}%
              </span>
              <Progress 
                value={breakdown.authenticity} 
                className={cn("h-1 ml-2 flex-1", getProgressColor(breakdown.authenticity))} 
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Review Validity</p>
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-sm font-semibold",
                getScoreColor(breakdown.reviewValidity)
              )}>
                {breakdown.reviewValidity}%
              </span>
              <Progress 
                value={breakdown.reviewValidity} 
                className={cn("h-1 ml-2 flex-1", getProgressColor(breakdown.reviewValidity))} 
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expiry Compliance</p>
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-sm font-semibold",
                getScoreColor(breakdown.expiryCompliance)
              )}>
                {breakdown.expiryCompliance}%
              </span>
              <Progress 
                value={breakdown.expiryCompliance} 
                className={cn("h-1 ml-2 flex-1", getProgressColor(breakdown.expiryCompliance))} 
              />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Price Accuracy</p>
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-sm font-semibold",
                getScoreColor(breakdown.priceAccuracy)
              )}>
                {breakdown.priceAccuracy}%
              </span>
              <Progress 
                value={breakdown.priceAccuracy} 
                className={cn("h-1 ml-2 flex-1", getProgressColor(breakdown.priceAccuracy))} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
