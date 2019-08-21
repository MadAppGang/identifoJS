import {
  initValidator,requiredRule, makeTypeValidationRule, URLValidationRule,
} from './validation'

const optionsRules = {
  authServerURI: [requiredRule, makeTypeValidationRule({ type: 'string' }), URLValidationRule],
  callbackURL: [requiredRule, makeTypeValidationRule({ type: 'string' }), URLValidationRule],
  appId: [requiredRule, makeTypeValidationRule({ type: 'string' })],
  scopes: [requiredRule, makeTypeValidationRule({ type: 'array' })],
};

const renewSessionOptionsRules = {
  redirectUri: [requiredRule, makeTypeValidationRule({ type: 'string'}), URLValidationRule],
};

export const validateRenewSessionOptions = initValidator(renewSessionOptionsRules);

export default initValidator(optionsRules);
