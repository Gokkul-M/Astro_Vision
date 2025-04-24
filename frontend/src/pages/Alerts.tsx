
import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { mockAlerts } from '@/utils/mockData';
import { Alert } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  
  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !alert.resolved;
    if (filter === 'resolved') return alert.resolved;
    return true;
  });

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
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <Header title="Admin Alerts" />
      
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle>Alerts</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="text-xs font-medium"
            >
              All
            </Button>
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
              className="text-xs font-medium"
            >
              Pending
            </Button>
            <Button 
              variant={filter === 'resolved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('resolved')}
              className="text-xs font-medium"
            >
              Resolved
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center shrink-0",
                        "bg-astral-purple/10"
                      )}>
                        {getIssueTypeIcon(alert.issueType)}
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {alert.productName}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                        <div className="flex items-center mt-3 flex-wrap gap-2">
                          <Badge 
                            variant="secondary" 
                            className="text-xs gap-1 flex items-center"
                          >
                            {getIssueTypeIcon(alert.issueType)}
                            {alert.issueType}
                          </Badge>
                          <Badge 
                            className={cn(
                              "text-xs",
                              getSeverityColor(alert.severity)
                            )}
                          >
                            {alert.severity} severity
                          </Badge>
                          {alert.resolved && (
                            <Badge variant="outline" className="text-xs border-green-300 text-green-600 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3">
                      <span className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      {!alert.resolved && (
                        <Button 
                          variant="outline"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No alerts to display</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
