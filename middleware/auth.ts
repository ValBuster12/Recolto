export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const loggedIn = localStorage.getItem('loggedIn')
    if (loggedIn !== 'true') {
      return navigateTo('/login')
    }
  }
})
