export default ({ scopes, appId, authServerURI }) => {
  const scopes = JSON.stringify(scopes);

  return Object.freeze({
    createLoginURL() {
      return `${authServerURI}/web/login?appId=${appId}&scopes=${scopes}`
    },
    createRenewSessionURL() {
      return `${authServerURI}/web/token/renew?appId=${appId}&scopes=${scopes}`;
    },
    createRegistrationURL() {
      return `${authServerURI}/web/register?appId=${appId}&scopes=${scopes}`
    },
  });
};
