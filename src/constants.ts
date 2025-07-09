import { linkOptions } from '@tanstack/react-router';
import type { Value } from 'platejs';

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

export const entryDefaultValue: Value = [
  {
    children: [{ text: 'Title' }],
    type: 'h3',
  },
  {
    children: [{ text: 'This is a quote.' }],
    type: 'blockquote',
  },
  {
    children: [
      { text: 'With some ' },
      { bold: true, text: 'bold' },
      { text: ' text for emphasis!' },
    ],
    type: 'p',
  },
];
