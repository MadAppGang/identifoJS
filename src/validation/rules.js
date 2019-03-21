const makeCheckIsValidType = (type) => {
  if (type === 'array') {
    return value => Array.isArray(value);
  }

  return value => typeof value === type;
};

const checkIsPresented = value => value !== undefined;

const checkURL = (value) => {
  try {
    new URL(value);
  } catch {
    return false;
  }

  return true;
};

export const requiredRule = {
  check: checkIsPresented,
  error: ({ name }) => Error(`Field "${name}" is required.`),
};

export const makeValidTypeRule = ({ type }) => ({
  check: makeCheckIsValidType(type),
  error: ({ name }) => Error(`Field "${name}" has to be a type of "${type}".`),
});

export const validURLRule = {
  check: checkURL,
  error: ({ name }) => Error(`Field "${name}" has to be a valid URL`),
};
