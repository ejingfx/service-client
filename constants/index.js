export const ORGANIZATION_ROUTES = [
  {
    name: 'About',
    icon: 'mdi-lightbulb-outline',
    to: '/organization/'
  },
  {
    name: 'Roles',
    icon: 'mdi-lightbulb-outline',
    to: '/organization/roles'
  },
  {
    name: 'Projects',
    icon: 'mdi-format-color-fill',
    to: '/organization/projects'
  },
  {
    name: 'Teams',
    icon: 'mdi-briefcase-outline',
    to: '/organization/teams'
  },
  {
    name: 'Forms',
    icon: 'mdi-face',
    to: '/organization/forms'
  },
  {
    name: 'Pages',
    icon: 'mdi-bell-outline',
    to: '/organization/pages'
  }
]
export const PUBLIC_ROUTES = [
  'login',
  'register',
  'forgot-password',
  'index'
]

export const settings = [
  {
    name: 'General',
    icon: 'mdi-lightbulb-outline',
    to: '/settings/'
  },
  {
    name: 'Appearance',
    icon: 'mdi-format-color-fill',
    to: '/settings/appearance'
  },
  {
    name: 'Account',
    icon: 'mdi-briefcase-outline',
    to: '/settings/account'
  },
  {
    name: 'Profile',
    icon: 'mdi-face',
    to: '/settings/profile'
  },
  {
    name: 'Notification',
    icon: 'mdi-bell-outline',
    to: '/settings/notification'
  }
]

export const snackbar = {
  error: {
    show: true,
    message: 'Something went wrong, unable to save',
    color: 'error'
  },
  info: {
    show: true,
    message: '',
    color: 'primary'
  },
  saved: {
    show: true,
    message: 'Saved successfully',
    color: 'success'
  }
}

export const sns = [
  'facebook',
  'instagram',
  'twitter'
]
