import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  name: string
  avatar?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function UserAvatar({ name, avatar, size = "md", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base"
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Avatar className={cn(sizeClasses[size], className)} data-testid={`avatar-${name.toLowerCase().replace(/\s+/g, "-")}`}>
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}