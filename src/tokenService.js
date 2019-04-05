import tokenVerifier from 'idtoken-verifier';

const initTokenService = (options) => {
  const tokenService = new tokenVerifier(options);

  const parseTokenFromURL = ({ hash }) => hash.replace(/^#?\/?/, '');

  return Object.freeze({
    parseTokenFromURL,
    decode: tokenService.decode,
  });
};

export default initTokenService
