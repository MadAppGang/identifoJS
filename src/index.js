import validateOptions, { validateRenewSessionOptions } from './optionsValidation';
import initTokenService from './tokenService';
import initURLCreator from './URLCReator';
import Iframe from './iframe';
import * as objectHelper from './objectHelper';

const NoAccessTokenError = Error('Access token is empty');
const TimeoutExpiredError = Error('Timeout expired');

const renewSessionBaseOptions = {
  redirectUri: window.origin,
};

const init = function (options) {
  const error = validateOptions(options);

  if (error) {
    throw error;
  }

  const tokenService = initTokenService({
    issuer: options.authServerURI,
    audience: options.appId,
  });

  const URLCreator = initURLCreator(options);

  const handleAuthentication = function () {
    const token = tokenService.parseTokenFromURL(window.location);
    window.location.hash = '';

    if (!token) {
      throw NoAccessTokenError;
    }

    const body = tokenService.decode(token);

    return { token, body };
  };

  const renewSession = (params = {}) => new Promise((resolve, reject) => {
    const options = objectHelper.merge(renewSessionBaseOptions, params);
    const error = validateRenewSessionOptions(options);

    if (error) {
      throw error;
    }

    const iframe = Iframe.create();

    const timeout = setTimeout(() => {
      Iframe.remove(iframe);
      reject(TimeoutExpiredError);
    }, 30000);

    Iframe
      .captureMessage(iframe, URLCreator.createRenewSessionURL(options))
      .then(({ error, accessToken: token }) => {
        clearTimeout(timeout);

        if (error) {
          Iframe.remove(iframe);
          reject(error);
        }

        const body = tokenService.decode(token);

        Iframe.remove(iframe);
        resolve({ token, body });
      });
  });

  const login = function () {
    window.location.assign(URLCreator.createLoginURL());
  };

  const register = function () {
    window.location.assign(URLCreator.createRegistrationURL());
  };

  const logout = function () {
    window.location.assign(URLCreator.createLogoutURL());
  }

  return Object.freeze({
    login,
    logout,
    register,
    renewSession,
    handleAuthentication,
  });
};

export default init;
