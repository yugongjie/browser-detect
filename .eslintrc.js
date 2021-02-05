module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    BUILD_DATE: '',
    VERSION: '2.0.0',
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
