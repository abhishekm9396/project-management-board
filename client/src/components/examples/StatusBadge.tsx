import { StatusBadge } from '../status-badge'

export default function StatusBadgeExample() {
  return (
    <div className="flex items-center gap-4 p-4 flex-wrap">
      <StatusBadge status="backlog" />
      <StatusBadge status="todo" />
      <StatusBadge status="in_progress" />
      <StatusBadge status="in_review" />
      <StatusBadge status="done" />
    </div>
  )
}