import { DocsConfig } from 'types'

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      href: '',
      title: 'Home',
    },
    {
      href: 'our-spa',
      title: 'Our Spa',
    },
    {
      href: 'videos',
      title: 'Videos',
      navItems: [
        {
          href: 'trending-videos',
          title: 'Trending Videos',
        },
        {
          href: 'newest-videos',
          title: 'Newest Videos',
        },
      ],
    },
    {
      href: 'services',
      title: 'Services',
      navItems: [
        {
          href: 'acne-treatment',
          title: 'Acne Treatment',
        },
        {
          href: 'face-massages',
          title: 'Face Massages',
        },
        {
          href: 'skin-care',
          title: 'Skincare',
        },
      ],
    },
    {
      href: 'spa-review',
      title: 'Reviews',
    },
  ],
}
