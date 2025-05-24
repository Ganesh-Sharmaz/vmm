'use client'
import React from "react";
import { 
  PlusCircle, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Eye,
  Edit3,
  Trash2,
  Calendar,
  TrendingUp
} from "lucide-react";
import Link from "next/link";

function Dashboard() {
  const stats = [
    {
      title: "Total Articles",
      value: "142",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText
    },
    {
      title: "Monthly Views",
      value: "24.5K",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Eye
    },
    {
      title: "Active Users",
      value: "1,840",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Engagement Rate",
      value: "68.4%",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: TrendingUp
    }
  ];

  const quickActions = [
    {
      title: "Create News",
      description: "Publish a new article to your website",
      icon: PlusCircle,
      href: "/admin/news",
      color: "blue",
      featured: true
    },
    {
      title: "Manage Articles",
      description: "Edit or delete existing news articles",
      icon: Edit3,
      href: "/admin/manage",
      color: "green",
      featured: false
    },
    {
      title: "Analytics",
      description: "View detailed performance metrics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "purple",
      featured: false
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      href: "/admin/users",
      color: "orange",
      featured: false
    },
    {
      title: "Settings",
      description: "Configure system preferences",
      icon: Settings,
      href: "/admin/settings",
      color: "gray",
      featured: false
    },
    {
      title: "Content Review",
      description: "Review pending articles for approval",
      icon: Calendar,
      href: "/admin/review",
      color: "red",
      featured: false
    }
  ];

  const getColorClasses = (color: string, featured: boolean) => {
    const colors = {
      blue: featured 
        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700" 
        : "bg-blue-50 text-blue-700 group-hover:bg-blue-100",
      green: "bg-green-50 text-green-700 group-hover:bg-green-100",
      purple: "bg-purple-50 text-purple-700 group-hover:bg-purple-100",
      orange: "bg-orange-50 text-orange-700 group-hover:bg-orange-100",
      gray: "bg-gray-50 text-gray-700 group-hover:bg-gray-100",
      red: "bg-red-50 text-red-700 group-hover:bg-red-100"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getIconColorClasses = (color: string, featured: boolean) => {
    if (featured) return "text-white";
    
    const colors = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      orange: "text-orange-600",
      gray: "text-gray-600",
      red: "text-red-600"
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ganesh!</h2>
          <p className="text-gray-600">Here's what's happening with your news platform today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-lg ${
                    stat.changeType === 'positive' 
                      ? 'text-green-700 bg-green-50' 
                      : 'text-red-700 bg-red-50'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const isFeatured = action.featured;
              
              return (
                <Link
                  key={index}
                  href={action.href}
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isFeatured 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md' 
                      : 'bg-white shadow-sm border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl transition-colors duration-200 ${
                        getColorClasses(action.color, isFeatured)
                      }`}>
                        <Icon className={`h-6 w-6 ${getIconColorClasses(action.color, isFeatured)}`} />
                      </div>
                      {isFeatured && (
                        <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-lg">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <h4 className={`text-lg font-semibold mb-2 ${
                        isFeatured ? 'text-white' : 'text-gray-900'
                      }`}>
                        {action.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${
                        isFeatured ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {action.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <Link 
              href="/admin/activity" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              {
                action: "New article published",
                title: "Breaking: Major Economic Update",
                time: "2 hours ago",
                type: "publish"
              },
              {
                action: "Article updated",
                title: "Technology Trends in 2024",
                time: "5 hours ago",
                type: "edit"
              },
              {
                action: "User registered",
                title: "john.doe@example.com",
                time: "1 day ago",
                type: "user"
              },
              {
                action: "Article deleted",
                title: "Outdated Market Analysis",
                time: "2 days ago",
                type: "delete"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'publish' ? 'bg-green-100' :
                  activity.type === 'edit' ? 'bg-blue-100' :
                  activity.type === 'user' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  {activity.type === 'publish' && <PlusCircle className="h-4 w-4 text-green-600" />}
                  {activity.type === 'edit' && <Edit3 className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'user' && <Users className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'delete' && <Trash2 className="h-4 w-4 text-red-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.title}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;