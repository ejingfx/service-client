export default function ({ store, redirect, route }) {
  if (route.name === 'dashboard' && !store.state.isAuth) {
    return redirect('/login')
  } else if ((route.name === 'login' || route.name === 'register') && store.state.isAuth) {
    return redirect('/dashboard')
  } else if (route.name !== 'register' && !store.state.isAuth) {
    return redirect('/login')
  }
}
