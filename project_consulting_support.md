# Project Consulting & Support Section

## Content

### Title
**Project Consulting & Support**

### Service Items
1.  **Technical Strategy**
    *   *Description:* Expert guidance on architecture and tech stack choices.
    *   *Icon:* MessageSquare

2.  **Maintenance & Support**
    *   *Description:* Ongoing updates, bug fixes, and performance monitoring.
    *   *Icon:* LifeBuoy

3.  **Code Audits**
    *   *Description:* In-depth analysis of code quality and security.
    *   *Icon:* Settings

4.  **Team Augmentation**
    *   *Description:* Scale your team with our senior engineers.
    *   *Icon:* Users

---

## Design Specifications

### Section Layout & Spacing
*   **Container:** `container mx-auto px-6` (Centered container with 1.5rem horizontal padding)
*   **Vertical Padding:** `py-20` (5rem / 80px top and bottom padding)
*   **Spacing Between Groups:** `space-y-32` (8rem / 128px vertical space between service categories)

### Section Title Design
*   **Typography:** `text-3xl font-bold text-white`
*   **Spacing:** `mb-12` (3rem / 48px margin bottom)
*   **Accent:** `border-l-4 border-green-500 pl-6` (Green left border with 1.5rem padding)

### Grid Layout
*   **Columns:**
    *   Mobile: 1 column (`grid-cols-1`)
    *   Tablet: 2 columns (`md:grid-cols-2`)
    *   Desktop: 3 columns (`lg:grid-cols-3`)
*   **Gap:** `gap-6` (1.5rem / 24px gap between cards)

### Card Design
*   **Background:** `bg-zinc-900/30` (Dark zinc with 30% opacity)
*   **Border:** `border-zinc-800/50` (Subtle border)
*   **Hover Effect:**
    *   Background becomes darker: `hover:bg-zinc-900`
    *   Border becomes clearer: `hover:border-zinc-700`
    *   Transition: `transition-all duration-300`

### Content Styling
*   **Icon Box:**
    *   `p-2 bg-black rounded-lg border border-zinc-800`
    *   Icon Color: `text-zinc-400` (Turns white on hover)
*   **Card Title:** `text-lg font-medium text-zinc-200` (Turns white on hover)
*   **Description:** `text-sm text-zinc-500 leading-relaxed` (Turns lighter zinc on hover)
