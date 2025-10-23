export const environment = {
  production: true,
  api: {
    urlPattern: /^(https:\/\/api-rec.tia.gov.mr)(\/.*)?$/i,
    url: 'https://api-rec.tia.gov.mr/api',
  },
  keycloak: {
    enable: true,
    url: 'https://tia-auth.zedneycreative.com/',
    realm: 'tia-realm',
    clientId: 'tia-bo',
  },
  defaultLanguage: 'fr',
};
