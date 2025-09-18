import { TimeTracker } from '../time-tracker'

export default function TimeTrackerExample() {
  return (
    <div className="w-80 p-4">
      <TimeTracker 
        storyKey="PROJ-123"
        storyTitle="Implement user authentication system with social login options"
        onStart={() => console.log('Timer started')}
        onPause={() => console.log('Timer paused')}
        onStop={() => console.log('Timer stopped')}
      />
    </div>
  )
}