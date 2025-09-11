import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Play, Calendar, Zap, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  target: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}

interface InteractiveDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InteractiveDemo({ isOpen, onClose }: InteractiveDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps: DemoStep[] = [
    {
      id: 0,
      title: "Welcome to ContentPro",
      description: "Let's take a tour of your new content planning empire!",
      target: "welcome",
      icon: <Play className="h-5 w-5" />,
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Ready to Transform Your Content?</h3>
          <p className="text-muted-foreground leading-relaxed">
            This interactive demo will show you exactly how ContentPro can revolutionize your content strategy. 
            We'll walk through creating content, using AI assistance, and tracking your success.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>6 features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Interactive</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Smart Calendar Planning",
      description: "See how easy it is to organize content across multiple platforms",
      target: "calendar",
      icon: <Calendar className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Your Content Calendar Hub</h3>
          <p className="text-muted-foreground">
            This is where all your content magic happens. Click on any date to create new content, 
            or click existing items to edit them.
          </p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded border-2 border-blue-600"></div>
              <span>Social Media</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded border-2 border-green-600"></div>
              <span>Email Campaigns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded border-2 border-orange-600"></div>
              <span>Blog Posts</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => {
              toast.success("🗓️ Try clicking on any date in the calendar to create content!");
              // Highlight calendar area
              const calendarEl = document.querySelector('.content-calendar');
              if (calendarEl) {
                calendarEl.classList.add('animate-pulse');
                setTimeout(() => calendarEl.classList.remove('animate-pulse'), 2000);
              }
            }}
          >
            Try Creating Content
          </Button>
        </div>
      )
    },
    {
      id: 2,
      title: "AI-Powered Assistant",
      description: "Let AI help you create better content faster",
      target: "ai-assistant",
      icon: <Zap className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Your AI Content Strategist</h3>
          <p className="text-muted-foreground">
            Get intelligent suggestions, optimal posting times, and content ideas powered by AI. 
            It's like having a content marketing expert on your team 24/7.
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <Zap className="h-4 w-4 text-primary mt-1" />
              <div>
                <p className="font-medium text-sm">Content Ideas</p>
                <p className="text-xs text-muted-foreground">AI generates trending topic suggestions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <BarChart3 className="h-4 w-4 text-green-500 mt-1" />
              <div>
                <p className="font-medium text-sm">Optimal Times</p>
                <p className="text-xs text-muted-foreground">Data-driven posting schedule recommendations</p>
              </div>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => {
              toast.success("🤖 Check out the AI Assistant in the sidebar!");
            }}
          >
            Explore AI Features
          </Button>
        </div>
      )
    },
    {
      id: 3,
      title: "Advanced Analytics",
      description: "Track your content performance and grow your audience",
      target: "analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Performance Insights</h3>
          <p className="text-muted-foreground">
            Understand what content works best and optimize your strategy with detailed analytics and reports.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">300%</div>
              <div className="text-xs text-muted-foreground">Avg. Growth</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600">10hrs</div>
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </div>
          </div>
          <Badge className="w-full justify-center" variant="outline">
            Premium Feature - Upgrade to unlock
          </Badge>
        </div>
      )
    },
    {
      id: 4,
      title: "Team Collaboration",
      description: "Work together with your team seamlessly",
      target: "collaboration",
      icon: <Users className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Collaborate Effortlessly</h3>
          <p className="text-muted-foreground">
            Invite team members, assign tasks, manage approval workflows, and keep everyone aligned on your content strategy.
          </p>
          <div className="flex -space-x-2 justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              A
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              B
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              C
            </div>
            <div className="w-8 h-8 bg-muted border-2 border-dashed border-muted-foreground rounded-full flex items-center justify-center text-muted-foreground text-xs">
              +
            </div>
          </div>
          <Badge className="w-full justify-center" variant="outline">
            Premium Feature - Upgrade to unlock
          </Badge>
        </div>
      )
    },
    {
      id: 5,
      title: "Ready to Get Started?",
      description: "You're all set to transform your content strategy!",
      target: "finish",
      icon: <ArrowRight className="h-5 w-5" />,
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">You're Ready to Create!</h3>
            <p className="text-muted-foreground">
              Start planning your content empire today. Click anywhere on the calendar to create your first content item, 
              or explore the AI assistant for instant ideas.
            </p>
          </div>
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              onClick={() => {
                onClose();
                toast.success("🚀 Welcome to ContentPro! Start creating amazing content!");
              }}
            >
              Start Creating Content
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                onClose();
                // Open subscription page
                window.location.href = '/subscription';
              }}
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startAutoPlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);
  };

  // Add spotlight effect
  useEffect(() => {
    if (!isOpen) return;
    
    const step = demoSteps[currentStep];
    const targetElement = document.querySelector(`.${step.target}`) || document.querySelector(`[data-demo="${step.target}"]`);
    
    if (targetElement && step.target !== 'welcome' && step.target !== 'finish') {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('demo-highlight');
    }

    return () => {
      document.querySelectorAll('.demo-highlight').forEach(el => {
        el.classList.remove('demo-highlight');
      });
    };
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  const currentDemoStep = demoSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center">
                {currentDemoStep.icon}
              </div>
              <div>
                <CardTitle className="text-xl">{currentDemoStep.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{currentDemoStep.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Step {currentStep + 1} of {demoSteps.length}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentDemoStep.content}
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {!isPlaying && currentStep === 0 && (
                <Button 
                  variant="ghost" 
                  onClick={startAutoPlay}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Play className="h-4 w-4" />
                  Auto-play
                </Button>
              )}
            </div>
            
            {currentStep < demoSteps.length - 1 ? (
              <Button onClick={nextStep} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={onClose}
                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              >
                Get Started!
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}