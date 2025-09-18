import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { StoryStatus } from "@shared/schema"

interface StatusBadgeProps {
  status: StoryStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    backlog: {
      label: "Backlog",
      className: "bg-muted text-muted-foreground"
    },
    todo: {
      label: "To Do",
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    },
    in_progress: {
      label: "In Progress", 
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    },
    in_review: {
      label: "In Review",
      className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    },
    done: {
      label: "Done",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    }
  }

  const config = statusConfig[status]

  return (
    <Badge 
      variant="secondary" 
      className={cn(config.className, className)}
      data-testid={`status-${status}`}
    >
      {config.label}
    </Badge>
  )
}