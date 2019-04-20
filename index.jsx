const React = require('react');
const { render } = require('ink');

const jsxImport = require('import-jsx');
const App = jsxImport('./App.jsx');

const args = require('minimist')(process.argv.slice(2));

function logHelp() {
  console.log('Usage: pwa-icon-gen <icon-path> --out=<out-dir> [options]');
  console.log('       pwa-icon-gen logo.svg --out=public/icons/');
  console.log('       pwa-icon-gen logo.png --out=public/ --sizes=72,144,512');
  console.log('');
  console.log('Options:');
  console.log('\t--out\tDestination directory for the icons.');
  console.log(
    '\t--sizes\tThe different sizes to be generated. Format: comma separated list'
  );
}

if (args.help || args.h) {
  logHelp();
} else if (args._.length && args.out) {
  let sizes;
  if (typeof args.sizes === 'string') {
    sizes = args.sizes
      .split(',')
      .map(Number)
      .filter(x => !!x);
  } else if (typeof args.sizes === 'number') {
    sizes = [args.sizes];
  }

  const iconPath = args._[0];
  const out = args.out;

  render(<App iconPath={iconPath} out={out} sizes={sizes} />);
} else {
  console.log('Invalid usage. Try `pwa-icon-gen --help` for help.');
}
