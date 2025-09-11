import React from 'react';
import { Mail, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNewAuth } from '@/hooks/use-new-auth';
import { toast } from 'sonner';

export function EmailVerificationBanner() {
  const { user } = useNewAuth();

  // Don't show if user is verified or no email
  if (!user || user.emailVerified || !user.email) {
    return null;
  }

  const handleResendVerification = async () => {
    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <Card className="mb-6 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Mail className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900">
                📧 Verify Your Email Address
              </h3>
              <p className="text-sm text-amber-700">
                We sent a verification link to <strong>{user.email}</strong>. 
                Please check your inbox to unlock all features!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleResendVerification}
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Resend
            </Button>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-amber-600 bg-amber-100 rounded-md p-2">
          💡 <strong>Why verify?</strong> Verified accounts get access to premium features, 
          better security, and important notifications about your content strategy.
        </div>
      </CardContent>
    </Card>
  );
}