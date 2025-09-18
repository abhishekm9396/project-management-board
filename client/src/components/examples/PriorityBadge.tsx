import { PriorityBadge } from '../priority-badge'

export default function PriorityBadgeExample() {
  return (
    <div className="flex items-center gap-4 p-4">
      <PriorityBadge priority="low" />
      <PriorityBadge priority="medium" />
      <PriorityBadge priority="high" />
      <PriorityBadge priority="urgent" />
    </div>
  )
}