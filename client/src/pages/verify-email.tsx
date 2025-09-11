import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle, XCircle, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    // Verify the email token
    fetch(`/api/verify-email?token=${token}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message || 'Verification failed');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Network error. Please try again.');
      });
  }, []);

  const handleContinue = () => {
    setLocation('/app');
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch('/api/resend-verification', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {status === 'loading' && (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          )}
          {status === 'success' && (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          )}
          {status === 'error' && (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          )}
          <CardTitle className="text-xl">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && '🎉 Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            {message}
          </p>
          
          {status === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>✅ Access your content planning dashboard</li>
                  <li>✅ Create and schedule content across platforms</li>
                  <li>✅ Track your content performance</li>
                  <li>✅ Explore premium features</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Continue to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">
                  Don't worry! You can request a new verification email.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={handleResendVerification}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </Button>
                
                <Button 
                  onClick={() => setLocation('/auth')}
                  variant="ghost"
                  className="w-full"
                >
                  Back to Login
                </Button>
              </div>
            </div>
          )}
          
          {status === 'loading' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                Please wait while we verify your email address...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}