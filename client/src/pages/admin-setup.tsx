import { AdminSetup } from "@/components/AdminSetup";
import { useLocation } from "wouter";

export default function AdminSetupPage() {
  const [, navigate] = useLocation();

  const handleComplete = () => {
    // Navigate to admin dashboard after successful setup
    navigate("/admin");
  };

  return <AdminSetup onComplete={handleComplete} />;
}