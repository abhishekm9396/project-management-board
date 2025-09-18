import { useState } from "react"
import { 
  DndContext, 
  DragEndEvent, 
  DragOverlay, 
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StoryCard } from "@/components/story-card"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StoryStatus, Story, User } from "@shared/schema"

interface KanbanColumn {
  id: StoryStatus
  title: string
  stories: (Story & { assignee?: User; reporter: User })[]
}

interface KanbanBoardProps {
  columns: KanbanColumn[]
  onStoryMove?: (storyId: string, newStatus: StoryStatus, newIndex: number) => void
  onStoryClick?: (story: Story) => void
  onCreateStory?: (status: StoryStatus) => void
}

function SortableStoryCard({ story, onStoryClick }: { 
  story: Story & { assignee?: User; reporter: User }
  onStoryClick?: (story: Story) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: story.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <StoryCard 
        story={story} 
        onClick={() => onStoryClick?.(story)}
        isDragging={isDragging}
        className="mb-3"
      />
    </div>
  )
}

function KanbanColumnComponent({ 
  column, 
  onStoryClick, 
  onCreateStory 
}: { 
  column: KanbanColumn
  onStoryClick?: (story: Story) => void
  onCreateStory?: (status: StoryStatus) => void
}) {
  return (
    <Card className="w-80 h-fit max-h-[80vh] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {column.stories.length}
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6"
            onClick={() => onCreateStory?.(column.id)}
            data-testid={`button-add-story-${column.id}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pt-0">
        <SortableContext 
          items={column.stories.map(s => s.id)} 
          strategy={verticalListSortingStrategy}
        >
          {column.stories.map((story) => (
            <SortableStoryCard 
              key={story.id} 
              story={story} 
              onStoryClick={onStoryClick}
            />
          ))}
        </SortableContext>
        
        {column.stories.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No stories</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function KanbanBoard({ columns, onStoryMove, onStoryClick, onCreateStory }: KanbanBoardProps) {
  const [activeStory, setActiveStory] = useState<Story | null>(null)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const storyId = event.active.id as string
    const story = columns
      .flatMap(col => col.stories)
      .find(s => s.id === storyId)
    
    if (story) {
      setActiveStory(story)
      console.log('Drag started for story:', story.key)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over || !activeStory) {
      setActiveStory(null)
      return
    }

    const storyId = active.id as string
    const overId = over.id as string
    
    // Check if dropped on a column or another story
    const targetColumn = columns.find(col => col.id === overId)
    const targetStory = columns
      .flatMap(col => col.stories)
      .find(s => s.id === overId)
    
    if (targetColumn) {
      // Dropped on column header - move to end of column
      onStoryMove?.(storyId, targetColumn.id, targetColumn.stories.length)
      console.log(`Moved story ${activeStory.key} to ${targetColumn.title}`)
    } else if (targetStory) {
      // Dropped on another story - find target column and index
      const targetCol = columns.find(col => 
        col.stories.some(s => s.id === targetStory.id)
      )
      if (targetCol) {
        const targetIndex = targetCol.stories.findIndex(s => s.id === targetStory.id)
        onStoryMove?.(storyId, targetCol.id, targetIndex)
        console.log(`Moved story ${activeStory.key} to ${targetCol.title} at position ${targetIndex}`)
      }
    }
    
    setActiveStory(null)
  }

  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div 
        className="flex gap-6 overflow-x-auto pb-6"
        data-testid="kanban-board"
      >
        {columns.map((column) => (
          <KanbanColumnComponent
            key={column.id}
            column={column}
            onStoryClick={onStoryClick}
            onCreateStory={onCreateStory}
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeStory ? (
          <StoryCard 
            story={activeStory}
            isDragging
            className="rotate-2"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}