
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/utils/types';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface AlertsListProps {
  alerts: Alert[];
  onResolve?: (alertId: string) => void;
}

export const AlertsList = ({ alerts, onResolve }: AlertsListProps) => {
  const handleResolve = (alertId: string) => {
    if (onResolve) {
      onResolve(alertId);
      toast.success("Alert marked as resolved");
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-astral-red text-white';
      case 'medium':
        return 'bg-astral-yellow text-black';
      case 'low':
        return 'bg-astral-green text-black';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case 'expiry':
        return <Clock className="h-4 w-4" />;
      case 'authenticity':
        return <AlertTriangle className="h-4 w-4" />;
      case 'review':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-9 w-9 rounded-full flex items-center justify-center",
                      "bg-astral-purple/10"
                    )}>
                      {getIssueTypeIcon(alert.issueType)}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">
                        {alert.productName}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {alert.description}
                      </p>
                      <div className="flex items-center mt-2 gap-2">
                        <Badge 
                          variant="secondary" 
                          className="text-[10px] h-5 gap-1 flex items-center"
                        >
                          {getIssueTypeIcon(alert.issueType)}
                          {alert.issueType}
                        </Badge>
                        <Badge 
                          className={cn(
                            "text-[10px] h-5",
                            getSeverityColor(alert.severity)
                          )}
                        >
                          {alert.severity} severity
                        </Badge>
                        {alert.resolved && (
                          <Badge variant="outline" className="text-[10px] h-5 border-green-300 text-green-600 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                    {!alert.resolved && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-7"
                        onClick={() => handleResolve(alert.id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No alerts to display</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
