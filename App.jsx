const React = require('react');
const { useState, useEffect } = React;
const { Box, Color, Text, Static } = require('ink');
const Spinner = require('ink-spinner').default;
const sharp = require('sharp');

const defaultSizes = [48, 72, 96, 144, 168, 192, 256, 512];

function App({ iconPath, out, sizes = defaultSizes }) {
  const [sizeIndex, setSizeIndex] = useState(0);

  const currentSize = sizes[sizeIndex];
  const currentMessage =
    sizeIndex < sizes.length ? (
      <Text bold>
        <Box marginRight={2}>
          <Color blueBright>
            <Spinner type="bouncingBar" />
          </Color>
        </Box>
        Creating {out}
        {currentSize}x{currentSize}.png
      </Text>
    ) : null;

  const previousMessages = sizes.slice(0, sizeIndex).map(size => (
    <Text key={size}>
      <Box marginRight={1}>✅</Box>
      <Color bgGreen>
        <Box>
          {' '}
          Created {out}
          {size}x{size}.png{' '}
        </Box>
      </Color>
    </Text>
  ));

  useEffect(() => {
    let current = sizeIndex;
    const id = setInterval(() => {
      if (current === sizes.length) {
        return;
      }
      setSizeIndex(++current);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box flexDirection="column" width="100%">
      <Box
        flexDirection="row"
        justifyContent="center"
        marginBottom={1}
        width="100%"
        justifyContent="center"
      >
        Welcome to pwa-icon-gen
      </Box>
      <Text italic>We are creating your icons...</Text>
      {previousMessages}
      {currentMessage}
    </Box>
  );
}

module.exports = App;
