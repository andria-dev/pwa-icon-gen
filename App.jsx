const React = require('react');
const { useState, useEffect, useCallback } = React;
const { Box, Color, Text, Static } = require('ink');
const Spinner = require('ink-spinner').default;
const sharp = require('sharp');

const defaultSizes = [48, 72, 96, 144, 168, 192, 256, 512];

function App({ iconPath, out, sizes = defaultSizes }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const currentSize = sizes[sizeIndex];

  const [results, setResults] = useState([]);

  const logResult = useCallback(
    successful => {
      setResults(prev => [...prev, [currentSize, successful]]);
      setSizeIndex(prev => prev + 1);
    },
    [sizeIndex, setSizeIndex, setResults, sizes]
  );

  const currentMessage =
    sizeIndex < sizes.length ? (
      <Text bold>
        <Box marginRight={2}>
          <Spinner type="bouncingBar" />
        </Box>
        Creating {out}
        {currentSize}x{currentSize}.png
      </Text>
    ) : null;

  const previousMessages = results.map(([size, successful]) => (
    <Text key={size}>
      <Box marginRight={1}>{successful ? '✅' : '❌'}</Box>
      <Color bgGreen={successful} bgRed={!successful}>
        <Box>
          {' '}
          Created {out}
          {size}x{size}.png{' '}
        </Box>
      </Color>
    </Text>
  ));

  useEffect(() => {
    const id = setInterval(() => {
      if (sizeIndex < sizes.length) {
        logResult(sizeIndex % 3);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [setResults, sizeIndex, sizes]);

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
