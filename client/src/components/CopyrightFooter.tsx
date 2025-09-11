import React from 'react';

export function CopyrightFooter() {
  const getCurrentYear = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based: January is 0
    const currentDay = now.getDate();
    
    // Show @2026 starting January 1, 2026
    if (currentYear === 2025 && currentMonth === 11 && currentDay >= 31) {
      // December 31, 2025 or later
      return 2026;
    } else if (currentYear >= 2026) {
      return currentYear;
    }
    
    return 2025; // Show @2025 for all of 2025
  };

  return (
    <footer className="mt-auto py-4 px-6 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="text-center text-sm text-muted-foreground">
        @{getCurrentYear()} Content Planner. All rights reserved.
      </div>
    </footer>
  );
}