export default function ({ store, redirect, route }) {
  if (!store.state.authenticated && ['login', 'register', 'index'].includes(route.name)) {
    console.log('redirect guest -> login')
    return redirect(route.path)
  } else if (!store.state.authenticated) {
    console.log('redirect guest -> login')
    return redirect('/login')
  }
}
