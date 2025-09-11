import React from 'react';
import { Crown, Zap, Calendar, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNewAuth } from '@/hooks/use-new-auth';

export function PremiumUpgradeBanner() {
  const { user } = useNewAuth();

  // Don't show to verified premium users
  if (!user) return null;

  const handleUpgrade = () => {
    // Navigate to subscription page
    window.location.href = '/subscription';
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-none relative overflow-hidden">
      <CardContent className="p-6 relative z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="flex items-center justify-between relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Crown className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-xl">Unlock Premium Features</h3>
                <Badge className="bg-yellow-400 text-yellow-900 font-semibold animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  LIMITED TIME
                </Badge>
              </div>
              <p className="text-white/90 text-sm mb-3">
                Take your content strategy to the next level with advanced analytics, AI assistance, and bulk scheduling
              </p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-4 w-4 text-green-300" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-blue-300" />
                  <span>Bulk Scheduling</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span>AI Content Assistant</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <Button 
              onClick={handleUpgrade}
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 py-2 h-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Upgrade Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-white/80 text-xs mt-2">
              <span className="line-through">$29/mo</span>{' '}
              <span className="font-bold">$19/mo</span> - Save 34%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PremiumFeatureTease({ feature }: { feature: string }) {
  return (
    <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-200">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <Crown className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        🚀 {feature} - Premium Feature
      </h3>
      <p className="text-gray-600 mb-4">
        Unlock advanced {feature.toLowerCase()} capabilities with ContentPro Premium
      </p>
      <Button 
        onClick={() => window.location.href = '/subscription'}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <Crown className="h-4 w-4 mr-2" />
        Upgrade to Premium
      </Button>
    </div>
  );
}