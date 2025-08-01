export const apiRoutes = {
  auth: {
    csrf: '/api/v1/auth/csrf/',
    login: '/api/v1/auth/login/',
    logout: '/api/v1/auth/logout/',
    refresh: '/api/v1/auth/refresh/'
  },
  product: {
    categories: {
      tree: '/api/v1/product/categories/tree/',
    },
  },
}