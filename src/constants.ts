import { linkOptions } from '@tanstack/react-router';

export const navLinks = linkOptions([
  {
    to: '/journal',
    label: 'Journal',
  },
  {
    to: '/history',
    label: 'History',
  },
  {
    to: '/settings',
    label: 'Settings',
  },
]);
