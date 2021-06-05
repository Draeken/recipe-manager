// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withWorkbox = require('next-with-workbox');

module.exports = withNx(
  withWorkbox({
    workbox: {
      swSrc: 'worker.js',
      dest: 'public',
      swDest: 'sw.js',
      force: true,
    },
    nx: {
      // Set this to false if you do not want to use SVGR
      // See: https://github.com/gregberge/svgr
      svgr: true,
    },
    compress: false,
  })
);
