import validateOptions from './optionsValidation';
import initTokenService from './tokenService';

const NoAccessTokenError = Error('Access token is empty');
const TimeoutExpiredError = Error('Timeout expired');

export default (options) => {
  const error = validateOptions(options);

  if (error) {
    throw error;
  }

  const tokenService = initTokenService({
    issuer: options.authServerURI,
    audience: options.appId,
  });

  const scopes = JSON.stringify(options.scopes);

  const handleAuthentication = () => {
    const token = tokenService.parseTokenFromURL(window.location);
    window.location.hash = '';

    if (!token) {
      throw NoAccessTokenError;
    }

    const body = tokenService.decode(token);

    return { token, body };
  };

  const login = () => {
    const loginURL = `${options.authServerURI}/web/login?appId=${options.appId}&scopes=${scopes}`;
    window.location.assign(loginURL);
  };

  const renewSession = () => new Promise((res, rej) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const cleanup = () => {
      document.body.removeChild(iframe);
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      cleanup();
      rej(TimeoutExpiredError);
    }, 30000);

    const handleMessage = message => {
      if (event.origin === window.location.origin) {
        return;
      }

      cleanup();

      const { error, accessToken: token } = message.data;

      if (message.data.error) {
        rej(message.data.error);
      }

      const body = tokenService.decode(token);
      return { body, token };
    };

    window.addEventListener('message', handleMessage);
    iframe.src = `${options.authServerURI}/web/token/renew?appId=${options.appId}&scopes=${scopes}`;
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
