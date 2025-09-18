import { useState } from "react"
import { KanbanBoard } from "@/components/kanban-board"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Filter, Search, Plus, Download } from "lucide-react"
import type { StoryStatus } from "@shared/schema"

export default function KanbanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterAssignee, setFilterAssignee] = useState("all")

  // Mock data - todo: remove mock functionality
  const mockUser1 = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@company.com',
    avatar: null,
    role: 'team_lead' as const,
    skills: ['Project Management'],
    managerId: null,
    createdAt: new Date()
  }
  
  const mockUser2 = {
    id: 'user-2',
    name: 'Sarah Wilson',
    email: 'sarah@company.com',
    avatar: null,
    role: 'user' as const,
    skills: ['React', 'TypeScript'],
    managerId: null,
    createdAt: new Date()
  }
  
  const mockUser3 = {
    id: 'user-3',
    name: 'Michael Chen',
    email: 'michael@company.com', 
    avatar: null,
    role: 'user' as const,
    skills: ['Python', 'API Development'],
    managerId: null,
    createdAt: new Date()
  }

  const columns = [
    {
      id: 'backlog' as const,
      title: 'Backlog',
      stories: [
        {
          id: '5',
          key: 'PROJ-125',
          title: 'Add email notifications',
          description: 'Send notifications for story assignments and updates',
          type: 'story' as const,
          status: 'backlog' as const,
          priority: 'low' as const,
          storyPoints: 3,
          estimatedHours: 8,
          loggedHours: 0,
          projectId: 'proj-1',
          reporterId: 'user-1',
          assigneeId: null,
          acceptanceCriteria: [],
          labels: ['notifications'],
          createdAt: new Date(),
          updatedAt: new Date(),
          parentStoryId: null,
          reporter: mockUser1,
          commentsCount: 0
        }
      ]
    },
    {
      id: 'todo' as const,
      title: 'To Do',
      stories: [
        {
          id: '1',
          key: 'PROJ-124',
          title: 'Design user onboarding flow',
          description: 'Create wireframes and mockups for new user experience',
          type: 'story' as const,
          status: 'todo' as const,
          priority: 'medium' as const,
          storyPoints: 5,
          estimatedHours: 12,
          loggedHours: 0,
          projectId: 'proj-1',
          reporterId: 'user-1',
          assigneeId: 'user-2',
          acceptanceCriteria: [],
          labels: ['design', 'ux'],
          createdAt: new Date(),
          updatedAt: new Date(),
          parentStoryId: null,
          assignee: mockUser2,
          reporter: mockUser1,
          commentsCount: 1
        },
        {
          id: '6',
          key: 'PROJ-126',
          title: 'API performance optimization',
          description: 'Optimize database queries and add caching',
          type: 'task' as const,
          status: 'todo' as const,
          priority: 'high' as const,
          storyPoints: 8,
          estimatedHours: 20,
          loggedHours: 0,
          projectId: 'proj-1',
          reporterId: 'user-1',
          assigneeId: 'user-3',
          acceptanceCriteria: [],
          labels: ['performance', 'backend'],
          createdAt: new Date(),
          updatedAt: new Date(),
          parentStoryId: null,
          assignee: mockUser3,
          reporter: mockUser1,
          commentsCount: 2
        }
      ]
    },
    {
      id: 'in_progress' as const,
      title: 'In Progress',
      stories: [
        {
          id: '2',
          key: 'PROJ-123',
          title: 'Implement authentication system',
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
          assignee: mockUser2,
          reporter: mockUser1,
          commentsCount: 3,
          attachmentsCount: 2
        }
      ]
    },
    {
      id: 'in_review' as const,
      title: 'In Review',
      stories: [
        {
          id: '3',
          key: 'PROJ-122',
          title: 'Fix navigation bug on mobile',
          description: 'Menu not opening correctly on iOS Safari',
          type: 'bug' as const,
          status: 'in_review' as const,
          priority: 'urgent' as const,
          storyPoints: 2,
          estimatedHours: 4,
          loggedHours: 3,
          projectId: 'proj-1',
          reporterId: 'user-1',
          assigneeId: 'user-2',
          acceptanceCriteria: [],
          labels: ['bug', 'mobile'],
          createdAt: new Date(),
          updatedAt: new Date(),
          parentStoryId: null,
          assignee: mockUser2,
          reporter: mockUser1,
          commentsCount: 5
        }
      ]
    },
    {
      id: 'done' as const,
      title: 'Done',
      stories: [
        {
          id: '4',
          key: 'PROJ-121',
          title: 'Setup project structure',
          description: 'Initialize React app with TypeScript and Tailwind',
          type: 'task' as const,
          status: 'done' as const,
          priority: 'low' as const,
          storyPoints: 3,
          estimatedHours: 6,
          loggedHours: 4,
          projectId: 'proj-1',
          reporterId: 'user-1',
          assigneeId: 'user-2',
          acceptanceCriteria: [],
          labels: ['setup'],
          createdAt: new Date(),
          updatedAt: new Date(),
          parentStoryId: null,
          assignee: mockUser2,
          reporter: mockUser1,
          commentsCount: 0
        }
      ]
    }
  ]

  const totalStories = columns.reduce((sum, col) => sum + col.stories.length, 0)
  const completedStories = columns.find(col => col.id === 'done')?.stories.length || 0
  const inProgressStories = columns.find(col => col.id === 'in_progress')?.stories.length || 0

  return (
    <div className="p-6 space-y-6" data-testid="page-kanban">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Project Board</h1>
          <p className="text-muted-foreground">Manage and track your team's progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button data-testid="button-create-story">
            <Plus className="h-4 w-4 mr-2" />
            Create Story
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Stories</p>
                <p className="text-2xl font-bold">{totalStories}</p>
              </div>
              <Badge variant="secondary">{totalStories}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressStories}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                {inProgressStories}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedStories}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {completedStories}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{Math.round((completedStories / totalStories) * 100)}%</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {Math.round((completedStories / totalStories) * 100)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
                data-testid="input-search-stories"
              />
            </div>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40" data-testid="select-priority-filter">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterAssignee} onValueChange={setFilterAssignee}>
              <SelectTrigger className="w-40" data-testid="select-assignee-filter">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="user-1">John Doe</SelectItem>
                <SelectItem value="user-2">Sarah Wilson</SelectItem>
                <SelectItem value="user-3">Michael Chen</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
            
            {(searchTerm || filterPriority !== "all" || filterAssignee !== "all") && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchTerm("")
                  setFilterPriority("all")
                  setFilterAssignee("all")
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <KanbanBoard 
        columns={columns}
        onStoryMove={(storyId, newStatus, newIndex) => {
          console.log(`Moving story ${storyId} to ${newStatus} at index ${newIndex}`)
        }}
        onStoryClick={(story) => {
          console.log('Story clicked:', story.key)
        }}
        onCreateStory={(status: StoryStatus) => {
          console.log('Create new story in:', status)
        }}
      />
    </div>
  )
}