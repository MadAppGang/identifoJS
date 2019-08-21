const initURLCreator = (options) => {
  if (!options) {
    throw Error('Options have to be an object.')
  }

  const { scopes, appId, authServerURI, callbackURL } = options;
  const scopesJSON = JSON.stringify(scopes);

  return Object.freeze({
    createLoginURL() {
      return `${authServerURI}/web/login?appId=${appId}&scopes=${scopesJSON}&callbackUrl=${callbackURL}`
    },
    createRenewSessionURL(options = {}) {
      return `${authServerURI}/web/token/renew?appId=${appId}&scopes=${scopesJSON}&redirectUri=${options.redirectUri}`;
    },
    createRegistrationURL() {
      return `${authServerURI}/web/register?appId=${appId}&scopes=${scopesJSON}&callbackUrl=${callbackURL}`
    },
    createLogoutURL() {
      return `${authServerURI}/web/logout?appId=${appId}&scopes=${scopesJSON}&callbackUrl=${callbackURL}`;
    }
  });
};

export default initURLCreator;
