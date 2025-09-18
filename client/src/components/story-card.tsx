import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/user-avatar"
import { PriorityBadge } from "@/components/priority-badge"
import { StatusBadge } from "@/components/status-badge"
import { Clock, MessageCircle, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Story, User, StoryType } from "@shared/schema"

interface StoryCardProps {
  story: Story & {
    assignee?: User
    reporter: User
    commentsCount?: number
    attachmentsCount?: number
  }
  onClick?: () => void
  isDragging?: boolean
  className?: string
}

export function StoryCard({ story, onClick, isDragging, className }: StoryCardProps) {
  const typeConfig = {
    story: { label: "Story", color: "bg-blue-500" },
    task: { label: "Task", color: "bg-green-500" },
    bug: { label: "Bug", color: "bg-red-500" },
    epic: { label: "Epic", color: "bg-purple-500" },
    adhoc: { label: "Ad-hoc", color: "bg-orange-500" },
    call: { label: "Call", color: "bg-pink-500" }
  }

  const typeInfo = typeConfig[story.type as StoryType]

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover-elevate border-l-4 border-l-primary",
        isDragging && "opacity-50 rotate-2",
        className
      )}
      onClick={onClick}
      data-testid={`story-card-${story.key}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Badge variant="outline" className="shrink-0 text-xs font-mono">
              {story.key}
            </Badge>
            <Badge 
              variant="secondary" 
              className={cn("shrink-0 text-xs", typeInfo.color, "text-white")}
            >
              {typeInfo.label}
            </Badge>
          </div>
          <PriorityBadge priority={story.priority} />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <h3 className="font-medium mb-3 line-clamp-2 text-sm leading-relaxed">
          {story.title}
        </h3>
        
        {story.description && (
          <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
            {story.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {story.assignee && (
              <UserAvatar 
                name={story.assignee.name} 
                avatar={story.assignee.avatar} 
                size="sm" 
              />
            )}
            
            <div className="flex items-center gap-2 text-muted-foreground">
              {story.commentsCount !== undefined && story.commentsCount > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  <span className="text-xs">{story.commentsCount}</span>
                </div>
              )}
              
              {story.attachmentsCount !== undefined && story.attachmentsCount > 0 && (
                <div className="flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  <span className="text-xs">{story.attachmentsCount}</span>
                </div>
              )}
              
              {story.estimatedHours && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{story.estimatedHours}h</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {story.storyPoints && (
              <Badge variant="outline" className="text-xs">
                {story.storyPoints} SP
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}