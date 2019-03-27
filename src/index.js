import validateOptions from './optionsValidation';
import initTokenService from './tokenService';
import initURLCreator from './URLCReator';
import Iframe from './iframe';

const NoAccessTokenError = Error('Access token is empty');
const TimeoutExpiredError = Error('Timeout expired');

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

  const login = function () {
    const loginURL = URLCreator.createLoginURL();
    window.location.assign(loginURL);
  };

  const renewSession = () => new Promise((resolve, reject) => {
    const iframe = Iframe.create();

    const timeout = setTimeout(() => {
      Iframe.delete(iframe);
      reject(TimeoutExpiredError);
    }, 30000);

    Iframe
      .captureMessage(iframe, URLCreator.createRenewSessionURL())
      .then(({ error, accessToken: token }) => {
        clearTimeout(timeout);

        if (error) {
          reject(error);
        }

        const body = tokenService.decode(token);

        Iframe.delete(iframe);
        resolve({ token, body });
      });
  });

  const register = function () {
    window.location.assign(URLCreator.createRegistrationURL());
  };

  return Object.freeze({
    login,
    register,
    renewSession,
    handleAuthentication,
  });
};

export default init;
