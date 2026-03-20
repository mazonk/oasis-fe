import { jwtDecode } from 'jwt-decode'
import { useAuthStore } from '../stores/AuthStore'

export async function authGuard(to: any, from: any, next: any) {
  const authStore = useAuthStore()
  const token = authStore.token

  if (!token) {
    return next({ name: 'auth' })
  }

  try {
    const decoded: any = jwtDecode(token)
    const now = Date.now() / 1000

    if (decoded.exp < now) {
      authStore.clearAuthData()
      return next({ name: 'auth' })
    }

    if (!authStore.loggedInUser) {
      await authStore.initAuth()
    }

    next()
  } catch (e) {
    authStore.clearAuthData()
    return next({ name: 'auth' })
  }
}