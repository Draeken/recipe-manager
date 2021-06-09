module.exports = {
  displayName: 'recipes-manager-api-feature-graphql',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/recipes-manager-api/feature-graphql',
};
