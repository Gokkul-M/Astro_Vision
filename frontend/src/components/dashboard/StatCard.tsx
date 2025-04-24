
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  iconColor?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  iconColor = "text-astral-purple"
}: StatCardProps) => {
  return (
    <div className={cn(
      "p-6 rounded-xl bg-white shadow-sm border card-shine",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          {trend && (
            <div className="flex items-center mt-2 text-xs">
              <span className={cn(
                "font-semibold",
                trend.positive ? "text-astral-green" : "text-astral-red"
              )}>
                {trend.positive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground ml-1">vs. last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center",
          "bg-gradient-to-br from-astral-purple/20 to-astral-deep-purple/10"
        )}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
};
