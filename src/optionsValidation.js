import {
  initValidator, requiredRule, makeValidTypeRule, validURLRule,
} from './validation'

const optionsRules = {
  'authServerURI': [requiredRule, makeValidTypeRule({ type: 'string' }), validURLRule],
  'appId': [requiredRule, makeValidTypeRule({ type: 'string' })],
  'scopes': [requiredRule, makeValidTypeRule({ type: 'array' })],
};

export default initValidator(optionsRules);
