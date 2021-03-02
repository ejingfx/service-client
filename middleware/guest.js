import PUBLIC_ROUTES from '@/utility/public-routes'

export default function ({ store, redirect, route }) {
  if (store.state.authenticated && PUBLIC_ROUTES.includes(route.name)) {
    return redirect('/dashboard')
  }
}
