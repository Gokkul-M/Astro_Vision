
import { Header } from '@/components/layout/Header';
import { ProductScanner } from '@/components/scanner/ProductScanner';

const Scanner = () => {
  return (
    <div className="flex-1 space-y-6 p-6 overflow-auto">
      <Header title="Product Scanner" />
      <ProductScanner />
    </div>
  );
};

export default Scanner;
