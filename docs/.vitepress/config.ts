import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "CodeQuest Docs",
  description: "Complete Project Handbook & Interview Preparation Guide",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/overview' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Project Overview', link: '/overview' },
        ]
      },
      {
        text: 'Architecture',
        items: [
          { text: 'High-Level Architecture', link: '/architecture' },
          { text: 'State & Auth', link: '/state-auth' },
        ]
      },
      {
        text: 'Deep Dives',
        items: [
          { text: 'File & Code Walkthrough', link: '/deep-dives' },
          { text: 'Design Decisions', link: '/design-decisions' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Learn Next.js', link: '/guides-nextjs' },
          { text: 'User Journey', link: '/guides-journey' },
          { text: 'Interview Prep', link: '/guides-interview' },
          { text: 'Revision Notes', link: '/guides-revision' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
