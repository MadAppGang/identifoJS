const initURLCreator = (options) => {
  if (!options) {
    throw Error('Options have to be an object.')
  }

  const { scopes, appId, authServerURI } = options;
  const scopesJSON = JSON.stringify(scopes);

  return Object.freeze({
    createLoginURL() {
      return `${authServerURI}/web/login?appId=${appId}&scopes=${scopesJSON}`
    },
    createRenewSessionURL() {
      return `${authServerURI}/web/token/renew?appId=${appId}&scopes=${scopesJSON}`;
    },
    createRegistrationURL() {
      return `${authServerURI}/web/register?appId=${appId}&scopes=${scopesJSON}`
    },
  });
};

export default initURLCreator;
