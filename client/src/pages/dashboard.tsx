import { DashboardStats, commonStats } from "@/components/dashboard-stats"
import { TimeTracker } from "@/components/time-tracker"
import { StoryCard } from "@/components/story-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, TrendingUp, Zap } from "lucide-react"

export default function Dashboard() {
  // Mock data - todo: remove mock functionality
  const stats = [
    commonStats.activeStories(12),
    commonStats.completedToday(8, 25),
    commonStats.timeLogged(32, 15),
    commonStats.teamMembers(6)
  ]

  const recentStories = [
    {
      id: '1',
      key: 'PROJ-123',
      title: 'Implement user authentication system',
      description: 'OAuth integration with Google, GitHub, Apple',
      type: 'story' as const,
      status: 'in_progress' as const,
      priority: 'high' as const,
      storyPoints: 8,
      estimatedHours: 16,
      loggedHours: 6,
      projectId: 'proj-1',
      reporterId: 'user-1',
      assigneeId: 'user-2',
      acceptanceCriteria: [],
      labels: ['auth', 'security'],
      createdAt: new Date(),
      updatedAt: new Date(),
      parentStoryId: null,
      assignee: {
        id: 'user-2',
        name: 'Sarah Wilson',
        email: 'sarah@company.com',
        avatar: null,
        role: 'user' as const,
        skills: ['React', 'TypeScript'],
        managerId: null,
        createdAt: new Date()
      },
      reporter: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@company.com',
        avatar: null,
        role: 'team_lead' as const,
        skills: ['Project Management'],
        managerId: null,
        createdAt: new Date()
      },
      commentsCount: 3,
      attachmentsCount: 2
    }
  ]

  const aiSuggestions = [
    {
      title: "Story Estimation Suggestion",
      description: "PROJ-125 might need 5 story points based on similar tasks",
      confidence: 85,
      action: "Review"
    },
    {
      title: "Workload Balance",
      description: "Sarah Wilson has 2 fewer stories than team average",
      confidence: 92,
      action: "Assign"
    }
  ]

  return (
    <div className="p-6 space-y-6" data-testid="page-dashboard">
      <div>
        <h1 className="text-2xl font-bold mb-2">Good morning, John!</h1>
        <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Overview */}
      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Work */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                My Active Work
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentStories.map((story) => (
                <StoryCard 
                  key={story.id}
                  story={story}
                  onClick={() => console.log('Story clicked:', story.key)}
                />
              ))}
              <Button variant="outline" className="w-full" data-testid="button-view-all-work">
                View All My Work
              </Button>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-3 border rounded-lg hover-elevate">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                      <p className="text-muted-foreground text-xs mb-2">{suggestion.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" data-testid={`button-ai-suggestion-${index}`}>
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Time Tracker */}
          <TimeTracker 
            storyKey="PROJ-123"
            storyTitle="Implement user authentication system"
          />

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stories Completed</span>
                <Badge>15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Time Logged</span>
                <Badge>32h</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Velocity</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  +12%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Sprint Review</p>
                <p className="text-muted-foreground text-xs">Tomorrow, 2:00 PM</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">PROJ-130 Due</p>
                <p className="text-muted-foreground text-xs">Friday, End of day</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Team Retrospective</p>
                <p className="text-muted-foreground text-xs">Next Monday, 10:00 AM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}