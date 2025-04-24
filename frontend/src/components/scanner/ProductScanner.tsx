
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockProducts } from '@/utils/mockData';
import { TrustScoreCard } from '../dashboard/TrustScoreCard';
import { toast } from 'sonner';

export const ProductScanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const resetScanner = () => {
    setFile(null);
    setPreviewUrl(null);
    setVerificationResult(null);
  };

  const scanProduct = () => {
    if (!file) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Get random product from mock data
      const randomIndex = Math.floor(Math.random() * mockProducts.length);
      const product = mockProducts[randomIndex];
      
      setVerificationResult({
        product: product,
        breakdown: {
          authenticity: Math.floor(Math.random() * (100 - 70) + 70),
          reviewValidity: Math.floor(Math.random() * (100 - 65) + 65),
          expiryCompliance: Math.floor(Math.random() * (100 - 90) + 90),
          priceAccuracy: Math.floor(Math.random() * (100 - 80) + 80),
        }
      });
      
      setIsLoading(false);
      toast.success("Product verified successfully!");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="w-full lg:w-1/2">
          <div className={cn(
            "border-2 border-dashed rounded-xl h-[350px] flex flex-col items-center justify-center p-6",
            file ? "border-astral-purple" : "border-border"
          )}>
            {!file ? (
              <>
                <div className="mb-4 h-16 w-16 rounded-full bg-astral-purple/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-astral-purple" />
                </div>
                <h3 className="text-lg font-semibold">Upload a product image</h3>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Drag and drop or click to upload a product image for verification
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Button
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button variant="outline">
                    <Camera className="h-4 w-4 mr-2" />
                    Use Camera
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl || ''}
                  alt="Product preview"
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={resetScanner}>
                    Reset
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={scanProduct}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      'Verify Product'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          {verificationResult ? (
            <div className="space-y-4">
              <TrustScoreCard 
                productName={verificationResult.product.name}
                productImage={verificationResult.product.imageUrl}
                score={verificationResult.product.trustScore}
                breakdown={verificationResult.breakdown}
              />
              
              <div className="rounded-xl bg-white shadow-sm border p-6">
                <h3 className="font-medium text-lg">Product Details</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Brand</span>
                    <span className="text-sm font-medium">{verificationResult.product.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">MRP</span>
                    <span className="text-sm font-medium">${verificationResult.product.mrp.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expiry</span>
                    <span className="text-sm font-medium">{verificationResult.product.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quantity</span>
                    <span className="text-sm font-medium">{verificationResult.product.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Verification Date</span>
                    <span className="text-sm font-medium">{verificationResult.product.lastVerified}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[350px] rounded-xl bg-white shadow-sm border flex flex-col items-center justify-center p-6">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mt-4">No product scanned yet</h3>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Upload a product image to see verification results here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
