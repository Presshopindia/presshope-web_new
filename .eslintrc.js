module.exports = {
    rules: {
      "react/prop-types": "off",
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: 'React',  // Ignore React being unused
        },
      ],
    },
  };
  