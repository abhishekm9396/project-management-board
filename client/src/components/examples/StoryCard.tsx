import { StoryCard } from '../story-card'

export default function StoryCardExample() {
  // Mock story data
  const story = {
    id: '1',
    key: 'PROJ-123',
    title: 'Implement user authentication system with social login options',
    description: 'Add OAuth integration for Google, GitHub, and Apple login. Include email/password fallback and proper session management.',
    type: 'story' as const,
    status: 'in_progress' as const,
    priority: 'high' as const,
    storyPoints: 8,
    estimatedHours: 16,
    loggedHours: 6,
    projectId: 'proj-1',
    reporterId: 'user-1',
    assigneeId: 'user-2',
    acceptanceCriteria: ['User can login with Google', 'Session persists across browser refresh'],
    labels: ['authentication', 'security'],
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

  return (
    <div className="w-80 p-4">
      <StoryCard 
        story={story}
        onClick={() => console.log('Story clicked:', story.key)}
      />
    </div>
  )
}