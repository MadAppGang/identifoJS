import initURLCreator from '../src/URLCreator';

describe('URLCreator', () => {
  let URLCreator;
  const options = {
    scopes: ['scope-1', 'scope-2'],
    appId: 'appId',
    authServerURI: 'https://page.com',
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
      .toBe('https://page.com/web/login?appId=appId&scopes=["scope-1","scope-2"]');
  });

  test('create renew session url', () => {
    expect(URLCreator.createRenewSessionURL())
      .toBe('https://page.com/web/token/renew?appId=appId&scopes=["scope-1","scope-2"]');
  })

  test('create registration url', () => {
    expect(URLCreator.createRegistrationURL())
      .toBe('https://page.com/web/register?appId=appId&scopes=["scope-1","scope-2"]');
  })

  test('create logout url', () => {
    expect(URLCreator.createLogoutURL())
      .toBe('https://page.com/web/logout?appId=appId&scopes=["scope-1","scope-2"]')
  })
});