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
  saved: {
    show: true,
    message: 'Saved successfully',
    color: 'success'
  },
  error: {
    show: true,
    message: 'Something went wrong, unable to save',
    color: 'error'
  }
}

export const sns = [
  'facebook',
  'instagram',
  'twitter'
]
