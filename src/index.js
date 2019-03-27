import validateOptions from './optionsValidation';
import initTokenService from './tokenService';

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

  const scopes = JSON.stringify(options.scopes);

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
    const loginURL = `${options.authServerURI}/web/login?appId=${options.appId}&scopes=${scopes}`;
    window.location.assign(loginURL);
  };

  const createIframe = function () {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    return iframe;
  };

  const captureWindowMessage = iframe => new Promise((resolve, reject) => {
    const handleMessage = (event) => {
      if (event.origin === window.location.origin) {
        return;
      }

      resolve(event.data);

      window.removeEventListener('message', handleMessage);
    };

    window.addEventListener('message', handleMessage);

    // iframe.src = `${options.authServerURI}/web/token/renew?appId=${options.appId}&scopes=${scopes}`;
    iframe.embed();
  });

  const renewSession = () => new Promise((resolve, reject) => {
    const iframe = createIframe();

    const cleanup = () => {
      document.body.removeChild(iframe);
    }

    const timeout = setTimeout(() => {
      cleanup();
      reject(TimeoutExpiredError);
    }, 30000);

    return captureWindowMessage(iframe).then((message) => {
      const { error, accessToken: token } = message;

      if (error) {
        reject(error);
      }

      clearTimeout(timeout);
      cleanup();

      const body = tokenService.decode(token);

      resolve({ token, body });
    });
  });

  const register = () => {
    const registerURL = `${options.authServerURI}/web/register?appId=${options.appId}&scopes=${scopes}`;
    window.location.assign(registerURL);
  }

  return {
    handleAuthentication,
    login,
    register,
    renewSession,
  };
};

export default init;
