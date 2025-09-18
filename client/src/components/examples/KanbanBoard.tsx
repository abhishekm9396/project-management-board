import { KanbanBoard } from '../kanban-board'

export default function KanbanBoardExample() {
  // Mock data for the kanban board
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

  const columns = [
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

  return (
    <div className="p-4 w-full">
      <KanbanBoard 
        columns={columns}
        onStoryMove={(storyId, newStatus, newIndex) => {
          console.log(`Moving story ${storyId} to ${newStatus} at index ${newIndex}`)
        }}
        onStoryClick={(story) => {
          console.log('Story clicked:', story.key)
        }}
        onCreateStory={(status) => {
          console.log('Create new story in:', status)
        }}
      />
    </div>
  )
}