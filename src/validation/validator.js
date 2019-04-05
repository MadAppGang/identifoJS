const createValidator = (config) => {
  const entries = Object.entries(config);

  return (value) => {
    for (let [fieldName, rules] of entries) {
      const failedRule = rules.find(r => !r.check(value[fieldName]));

      if (failedRule) {
        return failedRule.error({ name: fieldName });
      }
    }

    return null;
  }
};

export default createValidator;
