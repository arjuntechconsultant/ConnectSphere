# Design Guidelines: Networking, Career & HR Platform

## Design Approach

**Reference-Based Approach**: Drawing inspiration from LinkedIn (professional networking), Notion (data-rich panels), and Pickle.com/memory (bubble visualization). This platform requires a sophisticated, data-dense interface that balances visual appeal with functional complexity.

## Core Design Principles

1. **Panel-Based Architecture**: 18 distinct but interconnected panels organized into two sections (Candidate/Networking A-L, HR/Recruiting M-R)
2. **Data Density with Clarity**: High information density without overwhelming users through consistent card patterns and visual hierarchy
3. **Interactive Connectivity**: Visual feedback showing how panel interactions affect related panels
4. **Professional Polish**: Enterprise-grade aesthetics suitable for career/HR contexts

## Typography System

**Font Stack**: 
- Primary: Inter or Work Sans (clean, professional)
- Monospace: JetBrains Mono (for code panels)

**Hierarchy**:
- Section Headers: 24px/32px, semibold
- Panel Titles: 18px/24px, semibold  
- Card Headers: 16px/20px, medium
- Body Text: 14px/20px, regular
- Metadata/Labels: 12px/16px, medium
- Tiny Labels: 11px/14px, regular

## Layout & Spacing System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16 for consistent rhythm
- Tight spacing: 2-4 (within cards, between labels)
- Standard spacing: 6-8 (between card elements)
- Section spacing: 12-16 (between panels)

**Grid Structure**:
- Dashboard layout with 12-column grid
- Panels occupy 3-4-6-8 column widths based on content density
- Responsive breakpoints: Mobile (stack), Tablet (2-column), Desktop (3-4 column)

## Panel-Specific Design Patterns

### Panel A - Bubble Field
- Full-width canvas (100% viewport width, 60vh height)
- Floating bubbles with 60-80px diameter avatars
- Soft shadows (shadow-lg), scale animation on hover (1.1x)
- Tooltip cards appear above bubbles: compact info card with 8px border-radius

### Panels B-L (Candidate Section)
**Card Pattern**: Consistent elevated card design
- Border-radius: 12px
- Padding: 16px (mobile), 24px (desktop)
- Shadow: subtle elevation (shadow-md)
- Borders: 1px solid with subtle divider lines

**Panel B - Details Card**: 
- Avatar + bio header (flex layout)
- Skill tags: pill-shaped, 6px padding, 4px spacing
- Horizontal timeline: scrollable flex with date nodes

**Panel C - Ratings**:
- Star rows with parameter labels on left
- Interactive stars (24px size) with smooth fill animation
- Overall score: prominent display (32px, bold)

**Panel E - Vertical Timeline**:
- Left-aligned timeline with connecting vertical line (2px)
- Nodes: 12px circles at each entry
- Cards extend right with hover expansion effect

**Panel F - Charts**:
- 4-up grid layout on desktop, stack on mobile
- Chart cards: 16px padding, consistent aspect ratio
- Use bar, line, and donut chart types appropriately

**Panel G - Meeting Form**:
- Two-column form layout (desktop)
- Input fields: 12px padding, 8px border-radius
- Primary button: full-width on mobile, auto on desktop

**Panels H-L (Application/Assessment)**:
- Table layouts with alternating row backgrounds
- Status badges: rounded-full pills with appropriate semantic styling
- Charts accompany tables in 60/40 split layout

### Panels M-R (HR Section)
**Enterprise Dashboard Aesthetic**: More structured, data-heavy

**Panel M - Job Openings**:
- Table + chart side-by-side (50/50 on desktop)
- Stacked bar chart showing pipeline stages
- Department filters as tab navigation

**Panel N - Candidate Cards**:
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Card design: avatar top, name/title, status badge, rating stars
- Hover effect: subtle lift (shadow-lg, translateY -2px)

**Panel O - Interview Calendar**:
- Week view grid with time slots
- Interview blocks: rounded cards within calendar cells
- Color coding by interview stage

**Panel P - Evaluation**:
- Split layout: ratings left, notes right
- Rating interface matches Panel C pattern
- Notes: textarea with character count

**Panel Q - HR Analytics**:
- Dashboard grid with 4-6 metric cards
- Each card: large number display + trend indicator + mini chart
- Conversion funnel visualization

**Panel R - Interaction Timeline**:
- Chronological feed similar to Panel E
- Interaction type icons (call, email, note)
- Expandable entries for full content

## Global Components

**Search Panel**: 
- Prominent top bar, 48px height
- Search input with icon, filters as dropdown pills
- Results dropdown with categorized sections

**Notifications Panel**:
- Slide-out drawer from top-right
- Notification cards: icon left, content center, timestamp right
- Badge indicator on notification icon

**Light/Dark Mode**:
- Toggle switch in header (moon/sun icons)
- Maintain contrast ratios: 4.5:1 minimum for text
- Chart colors adjust for mode (muted in dark mode)

## Animation Specifications

**Bubble Animations** (Panel A):
- Gentle floating: translateY ±20px, duration 3-5s per bubble
- Random delays (0-2s) for natural movement
- Hover: scale 1.1, transition 200ms

**Panel Transitions**:
- Slide-in from right: 300ms ease-out
- Content updates: fade 200ms
- Chart animations: 400ms stagger for data points

**Interactive Elements**:
- Hover states: 150ms transition
- Button presses: scale 0.98
- Card hover: shadow increase + 2px lift, 200ms

## Responsive Behavior

**Mobile (<768px)**:
- Stack all panels vertically
- Bubble field: 100vh, larger touch targets (80px bubbles)
- Tables convert to card layouts
- Forms: single column

**Tablet (768-1024px)**:
- 2-column grid for most panels
- Bubble field maintains aspect
- Horizontal scrolling for wide tables

**Desktop (>1024px)**:
- 3-4 column grid maximizing screen real estate
- Side-by-side chart + table layouts
- Multi-panel interactions visible simultaneously

## Section Differentiation

**Candidate Section (A-L)**: 
- Softer, community-focused aesthetic
- Warmer interaction patterns
- Personal profile emphasis

**HR Section (M-R)**:
- Structured, professional dashboard feel
- Data-driven visualizations
- Process-oriented layouts

Visual distinction through subtle header styling and section background tints (very subtle, 2-3% opacity difference).

## Critical Implementation Notes

- All 18 panels must be fully designed and functional
- State connections between panels require clear visual feedback (highlight, glow, or border on related panels when interaction occurs)
- Ensure consistent card patterns across similar panel types
- Charts must be readable in both light and dark modes
- Maintain visual hierarchy even with high data density