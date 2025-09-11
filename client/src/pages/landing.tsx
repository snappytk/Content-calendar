import { useState } from "react";
import { Link } from "wouter";
import { Calendar, BarChart3, Clock, Zap, Check, ArrowRight, Users, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { toast } from "sonner";
import heroImage from "@assets/generated_images/Content_planner_hero_image_17a70e0b.png";
import analyticsImage from "@assets/generated_images/Dashboard_analytics_illustration_62ccec57.png";
import bulkSchedulingImage from "@assets/generated_images/Bulk_scheduling_feature_illustration_12787e77.png";

export default function Landing() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: "Smart Calendar Planning",
      description: "Organize all your content across multiple platforms in one beautiful calendar view.",
      included: true
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance, engagement, and growth with detailed insights and reports.",
      included: false,
      premium: true
    },
    {
      icon: Clock,
      title: "Bulk Scheduling",
      description: "Schedule dozens of posts at once and automate your content pipeline.",
      included: false,
      premium: true
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together with your team, assign tasks, and manage approval workflows.",
      included: false,
      premium: true
    },
    {
      icon: TrendingUp,
      title: "AI Content Suggestions",
      description: "Get smart recommendations for optimal posting times and content ideas.",
      included: false,
      premium: true
    },
    {
      icon: Globe,
      title: "Multi-Platform Publishing",
      description: "Automatically publish to all your social media accounts and blog platforms.",
      included: false,
      premium: true
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Manager",
      content: "This tool has revolutionized our content strategy. We've seen a 300% increase in engagement!"
    },
    {
      name: "Mike Rodriguez",
      role: "Social Media Creator",
      content: "The bulk scheduling feature alone has saved me 10+ hours per week. Absolutely worth it!"
    },
    {
      name: "Emma Thompson",
      role: "Content Director",
      content: "The analytics dashboard gives us insights we never had before. Game-changer for our team!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">ContentPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/app" className="text-muted-foreground hover:text-foreground transition-colors">
                App
              </Link>
              <ThemeToggle />
              <Link href="/app">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link href="/app">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse opacity-20" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 animate-pulse-gentle bg-gradient-to-r from-primary to-purple-500 text-white border-0" variant="secondary">
                ✨ AI-Powered Content Intelligence • 🚀 Now with Advanced Analytics
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-black text-foreground mb-8 animate-slide-up leading-tight">
                Plan Your Content.
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent block">Grow Your Empire.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                The ultimate content planning platform that transforms creators into <span className="font-semibold text-primary">content strategists</span>. 
                Schedule, analyze, and optimize across all platforms with AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up mb-8" style={{ animationDelay: '0.4s' }}>
                <Link href="/app">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white border-0 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                    data-testid="button-start-free"
                  >
                    Start Your Free Journey
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-6 border-2 transition-all duration-300 hover:scale-105 hover:bg-primary/5 hover:border-primary"
                  onClick={() => {
                    setIsDemoOpen(true);
                  }}
                >
                  Watch Interactive Demo
                </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>14-Day Free Trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-2 shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Advanced Content Planning Dashboard with AI Features"
                  className="rounded-xl shadow-xl transition-transform duration-700 hover:scale-[1.02] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="bg-primary rounded-full w-1 h-1 opacity-20"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
              🚀 Complete Feature Suite
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6">
              Everything You Need to 
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Dominate Content</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From AI-powered insights to advanced analytics, we've built the ultimate toolkit for content creators who want to <span className="font-semibold text-primary">scale and succeed</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className={`group relative transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] animate-slide-up overflow-hidden ${
                  feature.premium 
                    ? 'border-primary/30 bg-gradient-to-br from-primary/5 via-purple-500/5 to-transparent hover:border-primary/50' 
                    : 'hover:border-primary/20'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setIsHovered(feature.title)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {feature.premium && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
                )}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isHovered === feature.title 
                        ? 'bg-primary/20 scale-110' 
                        : feature.premium 
                        ? 'bg-gradient-to-br from-primary/10 to-purple-500/10'
                        : 'bg-muted'
                    }`}>
                      <feature.icon className={`h-6 w-6 transition-all duration-300 ${
                        isHovered === feature.title ? 'text-primary scale-110' : 'text-foreground'
                      }`} />
                    </div>
                    {feature.premium && (
                      <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white border-0" variant="secondary">
                        ✨ Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                  {feature.included && (
                    <div className="flex items-center mt-4 text-green-500 font-medium">
                      <Check className="h-4 w-4 mr-2" />
                      <span className="text-sm">Included in Free Plan</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you're ready to scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free Plan */}
            <Card className="animate-slide-up transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold text-foreground mt-4">
                  $0<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Up to 10 content items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Basic calendar view</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>3 platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Link href="/app">
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 transition-all duration-300 hover:scale-105"
                    data-testid="button-start-free-plan"
                  >
                    Start Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="animate-slide-up border-primary relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105" style={{ animationDelay: '0.2s' }}>
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-purple-500 h-1"></div>
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl">Premium</CardTitle>
                <div className="text-4xl font-bold text-foreground mt-4">
                  $5<span className="text-lg text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground">Everything you need to scale</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Unlimited content items</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Bulk scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>AI suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/subscription">
                  <Button 
                    className="w-full mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                    data-testid="button-upgrade-premium"
                  >
                    Upgrade to Premium
                    <Zap className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Features Showcase */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Premium Features That Drive Results
            </h2>
          </div>

          <div className="space-y-20">
            {/* Analytics Feature */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <Badge className="mb-4" variant="outline">Analytics</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Deep Insights Into Your Content Performance
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Track engagement, reach, and conversion across all platforms. Identify your best-performing content and optimize your strategy with data-driven insights.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Real-time performance metrics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Custom reporting dashboards</span>
                  </li>
                </ul>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <img 
                  src={analyticsImage} 
                  alt="Analytics Dashboard"
                  className="rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Bulk Scheduling Feature */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in order-2 lg:order-1" style={{ animationDelay: '0.3s' }}>
                <img 
                  src={bulkSchedulingImage} 
                  alt="Bulk Scheduling"
                  className="rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="animate-slide-up order-1 lg:order-2">
                <Badge className="mb-4" variant="outline">Automation</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Schedule Weeks of Content in Minutes
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Upload multiple posts at once, set optimal posting times, and let our AI distribute your content across platforms for maximum engagement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>CSV import for bulk uploads</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Smart time optimization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span>Auto-posting to all platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Loved by Content Creators Worldwide
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.name}
                className="animate-slide-up transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <Badge className="mb-8 bg-white/20 text-white border-white/30 text-lg px-6 py-2" variant="outline">
              💥 Join 50,000+ Content Creators
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Ready to Transform Your 
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Content Empire?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the revolution of creators who've discovered the secret to 
              <span className="font-bold text-yellow-300">exponential growth</span>. 
              Your content empire starts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/app">
                <Button 
                  size="lg" 
                  className="group bg-white text-primary hover:bg-gray-100 text-xl px-10 py-6 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-xl font-bold"
                  data-testid="button-get-started-cta"
                >
                  🚀 Launch Your Empire Now
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="text-white border-white/50 hover:bg-white/10 text-xl px-10 py-6 transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setIsDemoOpen(true);
                }}
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">14-Day Free Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="font-medium">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="font-medium">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <span className="font-medium">Instant Setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-muted/50 to-muted/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-br from-primary to-purple-500 rounded-xl mr-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  ContentPro
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
                Empowering creators worldwide to build content empires through intelligent planning, 
                AI-powered insights, and seamless workflow automation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
            
            {/* Product */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/app" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/analytics" className="hover:text-primary transition-colors">Analytics</Link></li>
                <li><Link href="/bulk-scheduling" className="hover:text-primary transition-colors">Bulk Scheduling</Link></li>
                <li><Link href="/subscription" className="hover:text-primary transition-colors">Premium</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  © 2024 ContentPro. All rights reserved.
                </p>
                <div className="hidden md:flex items-center space-x-4 text-xs text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Interactive Demo Modal */}
      <InteractiveDemo 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
    </div>
  );
}