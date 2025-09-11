import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Calendar, BarChart3, Zap } from "lucide-react";
import { useNewAuth } from "@/hooks/use-new-auth";
import { CopyrightFooter } from "@/components/CopyrightFooter";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { user, loginMutation, registerMutation } = useNewAuth();
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(registerForm);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 grid lg:grid-cols-2">
        {/* Authentication Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">
                Sign in to your content planning dashboard
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          type="text"
                          value={loginForm.username}
                          onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                      Create a new account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-username">Username</Label>
                        <Input
                          id="new-username"
                          type="text"
                          value={registerForm.username}
                          onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-muted flex items-center justify-center p-8">
          <div className="max-w-md text-center space-y-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto">
              <Calendar className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Content Planning Made Easy</h2>
              <p className="text-muted-foreground">
                Organize, schedule, and manage your content across all platforms with our powerful planning tools.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm">Secure Admin Panel</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-sm">Analytics Dashboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">Content Scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm">Bot Protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CopyrightFooter />
    </div>
  );
}