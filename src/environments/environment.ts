export const environment = {
  production: false,
  api: {
    urlPattern: /^(https:\/\/tia-api.zedneycreative.com)(\/.*)?$/i,
    url: 'https://tia-api.zedneycreative.com/api',
  },
  keycloak: {
    enable: true,
    url: 'http://localhost:8080/',
    realm: 'tia-realm',
    clientId: 'tia-bo',
  },
  defaultLanguage: 'fr',
};
