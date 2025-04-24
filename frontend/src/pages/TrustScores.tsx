
import { Header } from '@/components/layout/Header';
import { ReviewValidator } from '@/components/validator/ReviewValidator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts, mockTrustScores } from '@/utils/mockData';
import { TrustScoreCard } from '@/components/dashboard/TrustScoreCard';

const TrustScores = () => {
  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <Header title="Trust Scores" />
      
      <Tabs defaultValue="scores">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="scores">Trust Scores</TabsTrigger>
          <TabsTrigger value="reviews">Review Validator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scores" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProducts.map((product) => {
              const score = mockTrustScores.find(s => s.productId === product.id);
              return (
                <TrustScoreCard
                  key={product.id}
                  productName={product.name}
                  productImage={product.imageUrl}
                  score={product.trustScore}
                  breakdown={score?.breakdown}
                />
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <ReviewValidator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrustScores;
