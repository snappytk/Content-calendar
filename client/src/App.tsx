import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NewAuthProvider } from "@/hooks/use-new-auth";
import Landing from "@/pages/landing";
import ContentPlanner from "@/pages/content-planner";
import Analytics from "@/pages/analytics";
import BulkScheduling from "@/pages/bulk-scheduling";
import Subscription from "@/pages/subscription";
import Settings from "@/pages/settings";
import { AdminDashboard } from "@/components/AdminDashboard";
import AdminSetupPage from "@/pages/admin-setup";
import AuthPage from "@/pages/auth-page";
import VerifyEmailPage from "@/pages/verify-email";
import NotFound from "@/pages/not-found";
import { CopyrightFooter } from "@/components/CopyrightFooter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/app" component={ContentPlanner} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/bulk-scheduling" component={BulkScheduling} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/settings" component={Settings} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin-setup" component={AdminSetupPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/verify-email" component={VerifyEmailPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="content-planner-theme">
      <QueryClientProvider client={queryClient}>
        <NewAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                <Router />
              </div>
              <CopyrightFooter />
            </div>
          </TooltipProvider>
        </NewAuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
