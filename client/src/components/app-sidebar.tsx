import { Home, Kanban, Clock, Users, Settings, BarChart3, Plus, Search } from "lucide-react"
import { Link, useLocation } from "wouter"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "@/components/user-avatar"

// Menu items for different user roles
const menuItems = {
  common: [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "My Work", url: "/my-work", icon: Kanban },
    { title: "Time Tracking", url: "/time", icon: Clock },
  ],
  teamLead: [
    { title: "Team Board", url: "/team", icon: Users },
    { title: "Reports", url: "/reports", icon: BarChart3 },
  ],
  admin: [
    { title: "Projects", url: "/projects", icon: Settings },
    { title: "Users", url: "/users", icon: Users },
    { title: "Settings", url: "/settings", icon: Settings },
  ]
}

interface AppSidebarProps {
  userRole?: 'user' | 'team_lead' | 'admin'
  userName?: string
  userAvatar?: string
}

export function AppSidebar({ 
  userRole = 'user', 
  userName = 'John Doe',
  userAvatar 
}: AppSidebarProps) {
  const [location] = useLocation()

  const getAllMenuItems = () => {
    let items = [...menuItems.common]
    
    if (userRole === 'team_lead' || userRole === 'admin') {
      items = [...items, ...menuItems.teamLead]
    }
    
    if (userRole === 'admin') {
      items = [...items, ...menuItems.admin]
    }
    
    return items
  }

  const allMenuItems = getAllMenuItems()

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">WF</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm">WorkFlow Pro</h2>
            <p className="text-xs text-muted-foreground">Project Management</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search stories..." 
              className="pl-8"
              data-testid="input-search"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location === item.url}
                    data-testid={`sidebar-nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 p-2">
              <Button 
                size="sm" 
                className="w-full justify-start"
                data-testid="button-create-story"
                onClick={() => console.log('Create story clicked')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Story
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                data-testid="button-start-timer"
                onClick={() => console.log('Start timer clicked')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Start Timer
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <UserAvatar name={userName} avatar={userAvatar} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole.replace('_', ' ')}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}