# IdentifoJS
Browser library for authentication through [Identifo](https://github.com/madappGang/identifo).

## Install
```bash
$ npm install @madappgang/identifo-js
```

## Usage

The pacakge exports the only function that will initialize identifo client.
```javascript
  import initIdentifo from '@madappgang/identifo-js';

  const options = {
    authServerURI: 'http://localhost:8080', // URI of your Identifo server.
    appId: '59fd884d8f6b180001f5b4e3', // ID of application that you want to get access to.
    scopes: ['chat'], // Scopes that you want to request.
    callbackURL: 'http://localhost:3000/callback', // URL that you will be redirected to after a successful login.
  };

  const identifo = initIdentifo(options);
```

### Methods

- **identifo.login** redirects user to the login page
- **identifo.handleAuthentication** parses token from url, you should call it when you are at *callback_url*.
```javascript
  const { body, token } = identifo.handleAuthentication();
```

- **identifo.renewSession** obtains a new access token for a user who already has established SSO session.

```javascript
  identifo.renewSession()
    .then(({ token, body }) => { });
    .catch(() => identifo.login()) // If there's an error you should try to login, probably user hasn't established SSO session.
```
- **identifo.register** redirects user to the registration page.
- **identifo.logout** removes SSO session.