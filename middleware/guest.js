export default function ({ store, redirect, route }) {
  if (store.state.authenticated && ['login', 'register', 'index'].includes(route.name)) {
    console.log('redirect user -> dashboard')
    return redirect('/dashboard')
  }
}
