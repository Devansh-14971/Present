import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BarChart3, Users, Package, FileText, LogOut, Shield, Activity } from "lucide-react";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const sessionId = localStorage.getItem("adminSessionId");

  // Verify session on load
  const { data: sessionData, isLoading: verifyingSession, error: sessionError } = useQuery({
    queryKey: ["/api/admin/verify"],
    queryFn: async () => {
      const response = await fetch("/api/admin/verify", {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Session verification failed");
      }
      
      return response.json();
    },
    enabled: !!sessionId,
    retry: false,
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading: loadingDashboard } = useQuery({
    queryKey: ["/api/admin/dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      
      return response.json();
    },
    enabled: !!sessionData,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      localStorage.removeItem("adminSessionId");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/admin/login");
    },
    onError: () => {
      // Even if logout fails on server, clear local session
      localStorage.removeItem("adminSessionId");
      navigate("/admin/login");
    },
  });

  useEffect(() => {
    if (!sessionId) {
      navigate("/admin/login");
      return;
    }

    if (sessionError || (sessionData === null && !verifyingSession)) {
      localStorage.removeItem("adminSessionId");
      navigate("/admin/access-denied");
    }
  }, [sessionId, sessionData, sessionError, verifyingSession, navigate]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (verifyingSession || loadingDashboard) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!sessionData) {
    return null; // Will redirect via useEffect
  }

  // Real dashboard data from API
  const dashboardStats = dashboardData ? [
    {
      title: "Total Products",
      value: dashboardData.stats.productCount.toString(),
      description: "Active products in catalog",
      icon: Package,
      trend: "+12%",
      trendColor: "text-green-600",
    },
    {
      title: "Quote Requests",
      value: dashboardData.stats.thisMonthQuotes.toString(),
      description: "This month",
      icon: FileText,
      trend: "+18%",
      trendColor: "text-green-600",
    },
    {
      title: "Total Quotes",
      value: dashboardData.stats.quoteRequestCount.toString(),
      description: "All time quote requests",
      icon: FileText,
      trend: "+23%",
      trendColor: "text-green-600",
    },
    {
      title: "Active Users",
      value: dashboardData.stats.activeUsers.toLocaleString(),
      description: "Monthly active visitors",
      icon: Users,
      trend: "+5%",
      trendColor: "text-green-600",
    },
  ] : [];

  const recentActivities = dashboardData?.recentActivities || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout} disabled={logoutMutation.isPending}>
              <LogOut className="h-4 w-4 mr-2" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your business performance and manage operations from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm ${stat.trendColor}`}>
                        {stat.trend}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and changes in your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <Badge 
                        variant={activity.type === 'quote' ? 'default' : 
                                activity.type === 'product' ? 'secondary' : 'outline'}
                        className="capitalize"
                      >
                        {activity.type}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.details}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Package className="h-6 w-6 mb-2" />
                  Manage Products
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  View Quotes
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  User Management
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}