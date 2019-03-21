import tokenVerifier from 'idtoken-verifier';

const initTokenService = (options) => {
  const tokenService = new tokenVerifier(options);

  const parseTokenFromURL = (urlStr) => {
    const url = new URL(urlStr);
    
    return url.hash.replace(/^#?\/?/, '');
  }

  return {
    parseTokenFromURL,
    decode: tokenService.decode,
  };
};

export default initTokenService
