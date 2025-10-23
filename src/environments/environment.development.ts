export const environment = {
  production: false,
  api: {
    urlPattern: /^(https:\/\/tia-api.zedneycreative.com)(\/.*)?$/i,
    url: 'https://tia-api.zedneycreative.com/api',
  },
  keycloak: {
    enable: true,
    url: 'https://tia-auth.zedneycreative.com/',
    realm: 'tia-realm',
    clientId: 'tia-bo',
  },
  defaultLanguage: 'fr',
};
