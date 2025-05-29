const roadmap = [
  {
    product: "Once UI OSS",
    brand: "blue",
    columns: [
      {
        title: "Planned",
        tasks: [
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [ 
          {
            title: "Data visualization module",
            description: "Data components built on top of Recharts.",
            type: "feature"
          },
          {
            title: "New docs",
            description: "Rebuilt Once UI docs with Magic Docs from scratch. More examples, use cases, guides.",
            type: "feature"
          },
          {
            title: "Cursor card",
            description: "A card component that pops up when hovering a trigger element.",
            type: "feature"
          },
          {
            title: "0.6 release",
            description: "Simplified SEO with the new Meta and Schema. Better navigations with Command Palette, HeadingNav, MegaMenu. Minor styling improvements.",
            type: "feature"
          },
        ]
      }
    ]
  },
  {
    product: "Once UI Pro",
    brand: "indigo",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Module: Social media",
            description: "Social components to power your indie social apps: posts, comments, OG card and more.",
            type: "feature"
          },
          {
            title: "Page: Dashboard",
            description: "A dashboard page with analytics and metrics based on the data visualization module.",
            type: "feature"
          },
          {
            title: "Block: Price list",
            description: "Service list with prices and details built with accordion.",
            type: "feature"
          },
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [
          {
            title: "Product: Magic Store",
            description: "New solution for e-commerce stores powered by Fourthwall. Build a strong brand and monetize early with an out-of-the-box merch store.",
            type: "feature"
          },
          {
            title: "Pages",
            description: "Commonly used landing page examples: team, contact, about, pricing, blog.",
            type: "feature"
          },
          {
            title: "Blocks",
            description: "Commonly used landing page blocks: features, testimonials, plans.",
            type: "feature"
          },
        ]
      },
    ]
  },
  {
    product: "Magic Docs",
    brand: "magenta",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Tab navigation in MDX files",
            description: "Expand the hierarchical structure of MDX files with optional tab navigation.",
            type: "feature"
          },
          {
            title: "Documentation version control",
            description: "Ability to switch between documentation versions.",
            type: "feature"
          },
          {
            title: "Hot reload",
            description: "Automatically re-render documentation when changes are detected in MDX files.",
            type: "feature"
          },
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [
          {
            title: "Changelog",
            description: "Changelog page with release notes and updates based on JSON.",
            type: "feature"
          },
          {
            title: "Roadmap",
            description: "Roadmap page with auto-generated columns based on JSON.",
            type: "feature"
          },
        ]
      }
    ]
  },
  {
    product: "Magic Portfolio",
    brand: "orange",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Improve Blog layout",
            description: "Add pagination, featured read and a recent article block.",
            type: "improvement"
          },
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [
          {
            title: "Migrate to 0.6",
            description: "Migrate to Once UI 0.6.",
            type: "improvement"
          },
          {
            title: "New gallery layout",
            description: "Rework gallery with improved design and flexibility for artists and photographers.",
            type: "improvement"
          },
        ]
      }
    ]
  },
  {
    product: "Magic Bio",
    brand: "emerald",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Email block",
            description: "Add email block with Mailchimp integration.",
            type: "feature"
          },
          {
            title: "Migrate to 0.6",
            description: "Migrate to Once UI 0.6.",
            type: "improvement"
          },
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [
        ]
      }
    ]
  },
  {
    product: "Once UI Hub",
    brand: "cyan",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Comments",
            description: "Comment section for projects with reply and mentions.",
            type: "feature"
          },
          {
            title: "Notifications",
            description: "Notification center for project updates and comments.",
            type: "feature"
          },
          {
            title: "Post formats",
            description: "Support for different post formats.",
            type: "feature"
          }
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [
          {
            title: "Profile page",
            description: "Profile page with user information and settings.",
            type: "feature"
          },
          {
            title: "Feed pages",
            description: "Feed pages with project posts.",
            type: "feature"
          },
          {
            title: "Project upload",
            description: "Project upload with image gallery and project details.",
            type: "feature"
          },
          {
            title: "Showcase",
            description: "Dynamically display projects on related marketing pages.",
            type: "feature"
          },
          {
            title: "Feature project",
            description: "Highlight projects with a note and badge.",
            type: "feature"
          }
        ]
      }
    ]
  },
  {
    product: "Design Engineers Club",
    brand: "aqua",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "New landing page",
            description: "Create a new home for our community.",
            type: "feature"
          },
        ]
      },
      {
        title: "In Progress",
        tasks: [
        ]
      },
      {
        title: "Done",
        tasks: [
          {
            title: "Merch drop",
            description: 'Design and drop the "Stay Human" line.',
            type: "feature"
          },
        ]
      }
    ]
  }
];

const task = {
  bug: { label: "Bug", color: "red" },
  feature: { label: "Feature", color: "green" },
  improvement: { label: "Improvement", color: "blue" },
  documentation: { label: "Docs", color: "magenta" },
  performance: { label: "Performance", color: "orange" },
  security: { label: "Security", color: "indigo" }
};

export { roadmap, task };