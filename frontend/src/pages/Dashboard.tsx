
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { BarChart2, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrustScoreCard } from '@/components/dashboard/TrustScoreCard';
import { mockProducts, mockTrustScores, mockAlerts, getRecentVerifications } from '@/utils/mockData';
import { AlertsList } from '@/components/alert/AlertsList';
import { useState } from 'react';
import { Alert } from '@/utils/types';

const Dashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  
  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      )
    );
  };

  const recentVerifications = getRecentVerifications().slice(0, 3);

  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <Header title="Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Trust Score Average"
          value="89%"
          description="All products"
          icon={Shield}
          trend={{ value: 3.2, positive: true }}
        />
        <StatCard 
          title="Verified Products"
          value="128"
          description="Last 7 days"
          icon={CheckCircle}
          trend={{ value: 7.5, positive: true }}
        />
        <StatCard 
          title="Near Expiry Items"
          value="12"
          description="Within 30 days"
          icon={Clock}
          trend={{ value: 2.1, positive: false }}
        />
        <StatCard 
          title="Unresolved Alerts"
          value={alerts.filter(a => !a.resolved).length}
          description="Requires attention"
          icon={AlertTriangle}
          iconColor="text-astral-red"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>Recent Trust Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTrustScores.slice(0, 3).map((scoreData) => {
                const product = mockProducts.find(p => p.id === scoreData.productId);
                return product ? (
                  <TrustScoreCard 
                    key={scoreData.id}
                    productName={product.name}
                    productImage={product.imageUrl}
                    score={scoreData.score}
                    breakdown={scoreData.breakdown}
                  />
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
        
        <AlertsList 
          alerts={alerts} 
          onResolve={handleResolveAlert}
        />
      </div>
    </div>
  );
};

export default Dashboard;
