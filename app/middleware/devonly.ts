export default defineNuxtRouteMiddleware((to, from) => {
  const config = useRuntimeConfig()
  if (config.public.envMode !== 'development') {
    return createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
});