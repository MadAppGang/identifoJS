const makeCheckTypeValidity = (type) => {
  if (type === 'array') {
    return value => Array.isArray(value);
  }

  return value => typeof value === type;
};

const checkPresence = value => value !== undefined;

const checkURL = (value) => {
  try {
    new URL(value);
  } catch {
    return false;
  }

  return true;
};

export const requiredRule = {
  check: checkPresence,
  error: ({ name }) => Error(`Field "${name}" is required.`),
};

export const makeTypeValidationRule = ({ type }) => ({
  check: makeCheckTypeValidity(type),
  error: ({ name }) => Error(`Field "${name}" has to be a type of "${type}".`),
});

export const URLValidationRule = {
  check: checkURL,
  error: ({ name }) => Error(`Field "${name}" has to be a valid URL`),
};
