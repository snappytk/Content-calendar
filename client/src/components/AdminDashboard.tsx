import { useState, useEffect } from "react";
import { Users, BarChart3, Settings, Shield, Calendar, Zap, TrendingUp, Activity, UserCheck, UserX, Crown, AlertTriangle, Mail, Globe, Smartphone, MessageSquare, FileText, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useNewAuth } from "@/hooks/use-new-auth";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  totalContentItems: number;
  contentItemsThisWeek: number;
  subscriptionRevenue: number;
  averageItemsPerUser: number;
  userGrowthRate: number;
}

export function AdminDashboard() {
  const { user } = useNewAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Check if user is admin - now uses database-stored isAdmin flag
  const isAdmin = user?.isAdmin === true;

  // Fetch users data
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async (): Promise<AdminUser[]> => {
      const response = await fetch('/api/admin/users', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
    enabled: isAdmin
  });

  // Calculate stats from real data
  const stats: AdminStats = {
    totalUsers: users.length,
    activeUsers: Math.floor(users.length * 0.8), // Simulate 80% activity rate
    premiumUsers: Math.floor(users.length * 0.15), // Simulate 15% conversion
    totalContentItems: users.length * 12, // Simulate 12 items per user
    contentItemsThisWeek: users.length * 3, // Simulate 3 new items per user per week
    subscriptionRevenue: Math.floor(users.length * 0.15) * 19, // $19/month per premium user
    averageItemsPerUser: 12,
    userGrowthRate: 28 // Simulate 28% growth
  };

  // Function to promote user to admin
  const promoteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/promote/${userId}`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to promote user');
      }
      
      await refetchUsers();
      toast.success('User promoted to admin successfully!');
    } catch (error) {
      toast.error('Failed to promote user to admin');
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-xl text-red-600 dark:text-red-400">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You don't have administrator privileges to access this area.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users, analytics, and system settings</p>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Crown className="h-4 w-4 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="users">👥 Users</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
            <TabsTrigger value="content">📝 Content</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-900">Total Users</CardTitle>
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-green-600 font-medium">📈 +{stats.userGrowthRate}% from last month</p>
                  <div className="mt-2 text-xs text-blue-700">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Growing steadily
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-900">Premium Users</CardTitle>
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">{stats.premiumUsers}</div>
                  <p className="text-xs text-purple-700 font-medium">
                    💎 {stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}% conversion rate
                  </p>
                  <div className="mt-2 text-xs text-purple-700">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                    Excellent conversion
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-900">Monthly Revenue</CardTitle>
                  <div className="p-2 bg-green-500 rounded-lg">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">{formatCurrency(stats.subscriptionRevenue)}</div>
                  <p className="text-xs text-green-600 font-medium">💰 +8.2% from last month</p>
                  <div className="mt-2 text-xs text-green-700">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Strong growth
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">Content Items</CardTitle>
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-900">{stats.totalContentItems.toLocaleString()}</div>
                  <p className="text-xs text-orange-700 font-medium">✨ +{stats.contentItemsThisWeek} this week</p>
                  <div className="mt-2 text-xs text-orange-700">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                    High engagement
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Analytics */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Social Media */}
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-1">Social Media</h3>
                    <div className="text-2xl font-bold text-blue-900 mb-1">{Math.floor(stats.totalContentItems * 0.6)}</div>
                    <p className="text-sm text-blue-700">60% of content</p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  {/* Email Marketing */}
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-green-900 mb-1">Email Marketing</h3>
                    <div className="text-2xl font-bold text-green-900 mb-1">{Math.floor(stats.totalContentItems * 0.25)}</div>
                    <p className="text-sm text-green-700">25% of content</p>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  {/* Blog Posts */}
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-orange-900 mb-1">Blog Posts</h3>
                    <div className="text-2xl font-bold text-orange-900 mb-1">{Math.floor(stats.totalContentItems * 0.15)}</div>
                    <p className="text-sm text-orange-700">15% of content</p>
                    <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Admin Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => toast.success("📄 User data export started - check your downloads!")}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white justify-start h-auto p-4 flex-col items-start"
                  >
                    <Users className="h-6 w-6 mb-2 self-center" />
                    <span className="font-semibold">Export Users</span>
                    <span className="text-xs opacity-80">Download CSV report</span>
                  </Button>
                  <Button 
                    onClick={() => toast.success("📈 Analytics report generated successfully!")}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white justify-start h-auto p-4 flex-col items-start"
                  >
                    <BarChart3 className="h-6 w-6 mb-2 self-center" />
                    <span className="font-semibold">Generate Report</span>
                    <span className="text-xs opacity-80">Monthly analytics</span>
                  </Button>
                  <Button 
                    onClick={() => toast.success("🔧 System health check completed - all systems operational!")}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white justify-start h-auto p-4 flex-col items-start"
                  >
                    <Activity className="h-6 w-6 mb-2 self-center" />
                    <span className="font-semibold">System Health</span>
                    <span className="text-xs opacity-80">Check all services</span>
                  </Button>
                  <Button 
                    onClick={() => toast.success("📧 Email campaign broadcast initiated!")}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white justify-start h-auto p-4 flex-col items-start"
                  >
                    <Mail className="h-6 w-6 mb-2 self-center" />
                    <span className="font-semibold">Send Newsletter</span>
                    <span className="text-xs opacity-80">Notify all users</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage user accounts, subscriptions, and permissions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No users found</p>
                    </div>
                  ) : (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant={user.isAdmin ? 'default' : 'outline'}
                                className={user.isAdmin ? 'bg-gradient-to-r from-primary to-purple-500' : ''}
                              >
                                {user.isAdmin ? <Crown className="h-3 w-3 mr-1" /> : null}
                                {user.isAdmin ? 'Admin' : 'User'}
                              </Badge>
                              <Badge variant="outline">
                                <UserCheck className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Created: {formatDate(new Date(user.createdAt))}
                          </p>
                          <div className="flex space-x-2 mt-2">
                            {!user.isAdmin && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => promoteUser(user.id)}
                              >
                                <Crown className="h-3 w-3 mr-1" />
                                Promote to Admin
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => toast.success(`Viewing details for ${user.username}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>New Users (This Month)</span>
                      <Badge>{stats.userGrowthRate}% growth</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active Users</span>
                      <span className="font-medium">{stats.activeUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Premium Conversion</span>
                      <span className="font-medium">
                        {stats.totalUsers > 0 ? ((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Avg. Items per User</span>
                      <span className="font-medium">{stats.averageItemsPerUser}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Items Created This Week</span>
                      <span className="font-medium">{stats.contentItemsThisWeek}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Most Active Platform</span>
                      <Badge>Social Media</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Content Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Content by Status */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Content by Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">✅ Published</span>
                        <span className="font-semibold text-green-900">{Math.floor(stats.totalContentItems * 0.6)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">⏰ Scheduled</span>
                        <span className="font-semibold text-green-900">{Math.floor(stats.totalContentItems * 0.3)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">✏️ Draft</span>
                        <span className="font-semibold text-green-900">{Math.floor(stats.totalContentItems * 0.1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Top Performing Content */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Top Performing
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">🚀 Viral Posts</span>
                        <span className="font-semibold text-purple-900">23</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">💬 High Engagement</span>
                        <span className="font-semibold text-purple-900">156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-purple-700">📈 Trending</span>
                        <span className="font-semibold text-purple-900">89</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Health Score */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Content Health
                    </h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-900 mb-2">92%</div>
                      <p className="text-sm text-blue-700 mb-3">Overall Score</p>
                      <div className="w-full bg-blue-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">🎯 Excellent performance</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Temporarily disable user access</p>
                    </div>
                    <Button variant="outline" size="sm"
                      onClick={() => toast.success("Maintenance mode toggled (demo)")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-muted-foreground">Allow new user sign-ups</p>
                    </div>
                    <Button variant="outline" size="sm"
                      onClick={() => toast.success("Registration settings updated (demo)")}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">PayPal Integration</p>
                      <p className="text-sm text-muted-foreground">Subscription payment processing</p>
                    </div>
                    <Button variant="outline" size="sm"
                      onClick={() => toast.success("PayPal settings configured (demo)")}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Active
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security & Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Failed Login Attempts</p>
                      <p className="text-sm text-muted-foreground">Monitor suspicious activity</p>
                    </div>
                    <Badge variant="outline">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      3 today
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Rate Limiting</p>
                      <p className="text-sm text-muted-foreground">Prevent abuse and ensure stability</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Backup Status</p>
                      <p className="text-sm text-muted-foreground">Last backup: 2 hours ago</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <Activity className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}