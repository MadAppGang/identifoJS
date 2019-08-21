import initURLCreator from '../src/URLCreator';

describe('URLCreator', () => {
  let URLCreator;
  const options = {
    scopes: ['scope-1', 'scope-2'],
    appId: 'appId',
    authServerURI: 'https://page.com',
    callbackURL: 'https://site.com/callback'
  };

  beforeAll(() => {
    URLCreator = initURLCreator(options);
  });

  test('invalid options', () => {
    initURLCreator('invalid option', () => {
      expect(initURLCreator('invalid options')).toThrowError()
    })
  })

  test('create login url', () => {
    expect(URLCreator.createLoginURL())
      .toBe('https://page.com/web/login?appId=appId&scopes=["scope-1","scope-2"]&callbackUrl=https://site.com/callback');
  });

  test('create renew session url', () => {
    expect(URLCreator.createRenewSessionURL({ redirectUri: 'https://site.com' }))
      .toBe('https://page.com/web/token/renew?appId=appId&scopes=["scope-1","scope-2"]&redirectUri=https://site.com');
  })

  test('create registration url', () => {
    expect(URLCreator.createRegistrationURL())
      .toBe('https://page.com/web/register?appId=appId&scopes=["scope-1","scope-2"]&callbackUrl=https://site.com/callback');
  })

  test('create logout url', () => {
    expect(URLCreator.createLogoutURL())
      .toBe('https://page.com/web/logout?appId=appId&scopes=["scope-1","scope-2"]&callbackUrl=https://site.com/callback')
  })
});