import { DashboardStats, commonStats } from '../dashboard-stats'

export default function DashboardStatsExample() {
  const stats = [
    commonStats.activeStories(12),
    commonStats.completedToday(8, 25),
    commonStats.timeLogged(32, 15),
    commonStats.teamMembers(6)
  ]

  return (
    <div className="p-4">
      <DashboardStats stats={stats} />
    </div>
  )
}