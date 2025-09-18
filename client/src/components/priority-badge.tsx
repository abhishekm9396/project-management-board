import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Priority } from "@shared/schema"

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const priorityConfig = {
    urgent: {
      label: "Urgent",
      className: "bg-destructive text-destructive-foreground",
      dotColor: "bg-red-500"
    },
    high: {
      label: "High", 
      className: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      dotColor: "bg-orange-500"
    },
    medium: {
      label: "Medium",
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300", 
      dotColor: "bg-blue-500"
    },
    low: {
      label: "Low",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      dotColor: "bg-green-500"
    }
  }

  const config = priorityConfig[priority]

  return (
    <Badge 
      variant="secondary" 
      className={cn("flex items-center gap-1.5", config.className, className)}
      data-testid={`priority-${priority}`}
    >
      <div className={cn("h-2 w-2 rounded-full", config.dotColor)} />
      {config.label}
    </Badge>
  )
}