import { defineStore } from 'pinia'
import { apiRoutes } from '~/utils/apiRoutes'

type User = {
  pk: number
  username: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const login = async (username: string, password: string) => {
    await $fetch(apiRoutes.auth.csrf, {
      method: 'GET',
      baseURL: useRuntimeConfig().public.apiBase,
      credentials: 'include',
    })

    const response = await $fetch<{ detail: string, user: User }>(apiRoutes.auth.login, {
      method: 'POST',
      baseURL: useRuntimeConfig().public.apiBase,
      body: { username, password },
      credentials: 'include',
    })

    if (response.user) {
      user.value = response.user
      console.log("Login successful");
    }
  }

  const logout = async () => {
    await $fetch(apiRoutes.auth.logout, {
      method: 'POST',
      baseURL: useRuntimeConfig().public.apiBase,
      credentials: 'include',
    })
    user.value = null
    console.log("Logout successful")
  }

  return {
    user,
    login,
    logout,
  }
}, {
  persist: true, // store in cookies
})