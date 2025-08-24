import { MenuItem } from '@models/shared/menu-item.model';

export const MenuItemsConstants: MenuItem[] = [
  { label: 'PDF Notes', icon: 'picture_as_pdf', route: '/notes' },
  { label: 'Quick Quiz', icon: 'assignment_turned_in', route: '/quiz' },
  { label: '9th Lectures', icon: 'school', route: '/tickets' },
  { label: '10th Lectures', icon: 'school', route: '/lectures' },
  { label: '1st Year Lectures', icon: 'school', route: '/lectures' },
  { label: 'TextBooks', icon: 'menu_book', route: '/map' },
  { label: 'Literature Books', icon: 'auto_stories', route: '/map' },
  { label: 'Settings', icon: 'settings', route: '/profile' },
  { label: 'Logout', icon: 'logout', route: '/auth/login' },
];
