import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCard {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  icon: React.ReactNode
  description?: string
}

interface DashboardStatsProps {
  stats: StatCard[]
  className?: string
}

export function DashboardStats({ stats, className }: DashboardStatsProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <Card key={index} data-testid={`stat-card-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="text-muted-foreground">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            
            {stat.change && (
              <div className="flex items-center mt-2">
                {stat.change.type === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs",
                    stat.change.type === 'increase' 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  )}
                >
                  {stat.change.value > 0 ? '+' : ''}{stat.change.value}%
                </Badge>
              </div>
            )}
            
            {stat.description && (
              <p className="text-xs text-muted-foreground mt-2">
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Pre-configured stat cards for common use cases
export const commonStats = {
  activeStories: (count: number) => ({
    title: "Active Stories",
    value: count,
    icon: <AlertCircle className="h-4 w-4" />,
    description: "Currently in progress"
  }),
  
  completedToday: (count: number, change?: number) => ({
    title: "Completed Today",
    value: count,
    change: change ? { value: change, type: 'increase' as const } : undefined,
    icon: <CheckCircle className="h-4 w-4" />,
    description: "Stories completed today"
  }),
  
  timeLogged: (hours: number, change?: number) => ({
    title: "Time Logged",
    value: `${hours}h`,
    change: change ? { value: change, type: 'increase' as const } : undefined,
    icon: <Clock className="h-4 w-4" />,
    description: "This week"
  }),
  
  teamMembers: (count: number) => ({
    title: "Team Members",
    value: count,
    icon: <Users className="h-4 w-4" />,
    description: "Active contributors"
  })
}