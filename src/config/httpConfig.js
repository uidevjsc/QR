const isDesa = process.env.NODE_ENV === 'development'

export const apiRoute = {
  apiPath: isDesa
    ? 'http://localhost:3003/'
    : 'https://qr-app-2021.herokuapp.com/',
}
