# JIRA-Like Project Management Application Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for productivity tools, emphasizing clarity, efficiency, and information hierarchy. The application prioritizes function over form while maintaining modern aesthetics.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 85% 50% (Professional blue)
- Secondary: 210 15% 95% (Light gray backgrounds)
- Accent: 150 70% 45% (Success green for completed items)
- Background: 0 0% 99%
- Text: 220 15% 20%

**Dark Mode:**
- Primary: 220 85% 60% (Lighter blue for contrast)
- Secondary: 220 15% 15% (Dark gray backgrounds)
- Accent: 150 60% 55% (Softer green)
- Background: 220 15% 8%
- Text: 220 15% 90%

### Typography
- Primary: Inter (Google Fonts) - Clean, readable sans-serif
- Headers: Inter Bold (600-700 weight)
- Body: Inter Regular (400 weight)
- Code/Technical: JetBrains Mono for story IDs and technical content

### Layout System
**Spacing**: Consistent 4, 8, 16, 24, 32 pixel increments (Tailwind: 1, 2, 4, 6, 8)
- Cards and containers: p-6 (24px)
- Section spacing: mb-8 (32px)
- Component gaps: gap-4 (16px)
- Tight spacing: p-2 (8px) for compact elements

### Component Library

**Navigation:**
- Top navigation bar with project selector and user profile
- Collapsible sidebar with main navigation items
- Breadcrumb navigation for deep pages

**Core Components:**
- **Kanban Board**: Card-based layout with drag-drop zones
- **Story Cards**: Compact cards showing ID, title, assignee avatar, priority indicator
- **Forms**: Clean input fields with proper labeling and validation states
- **Data Tables**: Sortable columns, pagination, bulk actions
- **Modals**: Overlay dialogs for story creation/editing
- **Time Tracker**: Prominent play/pause buttons with elapsed time display

**Status Indicators:**
- Priority: Color-coded dots (red=high, orange=medium, blue=low)
- Story Status: Colored badges with rounded corners
- Progress Bars: For sprint completion and individual story progress

### Specific UI Patterns

**Dashboard Layout:**
- Grid-based layout with KRA widgets
- Quick action buttons prominently placed
- Recent activity feed with timeline design

**Story Management:**
- Three-column Kanban board (To Do, In Progress, Done)
- Story detail view with tabbed interface (Details, Comments, History)
- Bulk selection with checkbox overlays

**Role-Based UI:**
- Admin: Full access with additional management sections
- Team Lead: Enhanced controls for assignment and reporting
- User: Streamlined interface focusing on personal tasks

### Animations
Minimal, functional animations only:
- Smooth card transitions during drag-drop
- Subtle hover states on interactive elements
- Loading spinners for async operations

### Key Design Principles
1. **Information Density**: Maximize useful information while maintaining readability
2. **Consistent Hierarchy**: Clear visual hierarchy through typography and spacing
3. **Progressive Disclosure**: Show essential information first, details on demand
4. **Accessibility**: High contrast ratios, keyboard navigation support
5. **Responsive Design**: Mobile-first approach with touch-friendly controls

This design system prioritizes productivity and efficiency while maintaining a modern, professional appearance suitable for enterprise project management workflows.