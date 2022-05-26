// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'habitue-countries',
        url: 'https://countries.trevorblades.com/graphql',
      },
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }
  