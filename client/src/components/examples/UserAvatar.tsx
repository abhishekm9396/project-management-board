import UserAvatar from '../user-avatar'

export default function UserAvatarExample() {
  return (
    <div className="flex items-center gap-4 p-4">
      <UserAvatar name="John Doe" size="sm" />
      <UserAvatar name="Sarah Wilson" size="md" />
      <UserAvatar name="Michael Chen" size="lg" />
    </div>
  )
}