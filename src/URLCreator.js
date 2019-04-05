export default ({ scopes, appId, authServerURI }) => {
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
