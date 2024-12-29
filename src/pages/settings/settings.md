# Settings Page Components 🛠️

## Overview 📝
The Settings page uses a tab-based layout to organize different configuration sections. The main component `SettingsPage` uses Chakra UI components for styling and tab management.

## Component Structure 🏗️
```
SettingsPage
├── PageGrid
└── TabsContent
    ├── General
    ├── Privacy and Security
    ├── Payments and Wallets
    ├── Credits and Coupons
    └── User Management
```

## Tab Structure 🔄
Settings are organized into the following tabs:
- General
- Privacy and Security
- Payments and Wallets
- Credits and Coupons
- User Management

## Components Details 🔍

### SettingsPage
- Main container component using PageGrid layout
- Renders the header and TabsContent component
- Uses Chakra UI for consistent styling

### TabsContent
- Handles tab management using Chakra UI Tabs
- Maintains selected tab state
- Custom styling with border treatments
- Props for each tab:
  - `title`: Tab label
  - `content`: Component to render in tab panel

### SectionContainer
- Container component for settings sections
- Handles layout of section titles, descriptions, badges, and right content
- Responsive spacing and flex layout
- Props:
  - `title`: Section heading
  - `description`: Optional section description
  - `badge`: Optional badge component
  - `rightContent`: Optional content to display on the right
  - `children`: Section content

### SectionContent
- Content component for individual settings items
- Two-column layout with responsive design
- Left column contains title, description, and main content
- Right column for optional content (e.g., inputs, buttons)
- Props:
  - `title`: Content heading
  - `description`: Optional content description
  - `badge`: Optional badge component
  - `rightContent`: Optional right column content
  - `children`: Optional content that is rendered at the bottom of the description element (for example, it is useful for rendering warnings, such as the Wallet Requirement warning)

## Usage Example 💡
```tsx
// Tab implementation
<Tabs variant="unstyled" width="100%">
    <TabList>
        {tabs.map((tab, index) => (
            <Tab key={index}>
                {tab.title}
            </Tab>
        ))}
    </TabList>
    <TabPanels>
        {tabs.map((tab, index) => (
            <TabPanel key={index}>
                {tab.content}
            </TabPanel>
        ))}
    </TabPanels>
</Tabs>

// Section usage remains the same
<SectionContainer
    title="Store Details"
    description="Configure your store settings"
    badge={<PremiumBadge />}
>
    <SectionContent
        title="Shop Name"
        description="Enter your store name"
        rightContent={<Input />}
    >
        <AlertProduct />
    </SectionContent>
</SectionContainer>
```

## Notes 📌
- Uses Chakra UI Tabs for navigation
- Custom styling with border treatments
- State management for selected tab
- Responsive design ready