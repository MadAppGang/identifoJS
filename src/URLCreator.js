const initURLCreator = (options) => {
  if (!options) {
    throw Error('Options have to be an object.')
  }

  const { scopes, appId, authServerURI, callbackURL } = options;
  const scopesJSON = JSON.stringify(scopes);

  return Object.freeze({
    createLoginURL() {
      return `${authServerURI}/web/login?appId=${appId}&scopes=${scopesJSON}&callbackURL=${callbackURL}`
    },
    createRenewSessionURL() {
      return `${authServerURI}/web/token/renew?appId=${appId}&scopes=${scopesJSON}&callbackURL=${callbackURL}`;
    },
    createRegistrationURL() {
      return `${authServerURI}/web/register?appId=${appId}&scopes=${scopesJSON}&callbackURL=${callbackURL}`
    },
    createLogoutURL() {
      return `${authServerURI}/web/logout?appId=${appId}&scopes=${scopesJSON}&callbackURL=${callbackURL}`;
    }
  });
};

export default initURLCreator;
