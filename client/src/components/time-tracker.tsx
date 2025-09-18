import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeTrackerProps {
  storyKey?: string
  storyTitle?: string
  isActive?: boolean
  onStart?: () => void
  onPause?: () => void
  onStop?: () => void
  className?: string
}

export function TimeTracker({ 
  storyKey, 
  storyTitle, 
  isActive = false, 
  onStart, 
  onPause, 
  onStop,
  className 
}: TimeTrackerProps) {
  const [elapsed, setElapsed] = useState(0) // in seconds
  const [isRunning, setIsRunning] = useState(isActive)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning) {
      interval = setInterval(() => {
        setElapsed(prev => prev + 1)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
    onStart?.()
    console.log('Timer started for:', storyKey || 'No story')
  }

  const handlePause = () => {
    setIsRunning(false)
    onPause?.()
    console.log('Timer paused at:', formatTime(elapsed))
  }

  const handleStop = () => {
    setIsRunning(false)
    setElapsed(0)
    onStop?.()
    console.log('Timer stopped for:', storyKey || 'No story')
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>Time Tracker</span>
          {isRunning && (
            <Badge variant="destructive" className="animate-pulse">
              Recording
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        {storyKey && (
          <div className="mb-4">
            <Badge variant="outline" className="font-mono text-xs mb-2">
              {storyKey}
            </Badge>
            {storyTitle && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {storyTitle}
              </p>
            )}
          </div>
        )}
        
        <div className="text-center mb-4">
          <div className="text-3xl font-mono font-bold mb-2" data-testid="timer-display">
            {formatTime(elapsed)}
          </div>
          <p className="text-xs text-muted-foreground">
            {isRunning ? 'Time logging in progress...' : 'Ready to start tracking'}
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          {!isRunning ? (
            <Button 
              onClick={handleStart} 
              className="flex items-center gap-2"
              data-testid="button-start-timer"
            >
              <Play className="h-4 w-4" />
              Start
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              onClick={handlePause}
              className="flex items-center gap-2"
              data-testid="button-pause-timer"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={handleStop}
            disabled={elapsed === 0}
            className="flex items-center gap-2"
            data-testid="button-stop-timer"
          >
            <Square className="h-4 w-4" />
            Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}