const React = require('react');
const { useState, useEffect, useCallback } = React;
const { Box, Color, Text } = require('ink');
const Spinner = require('ink-spinner').default;
const sharp = require('sharp');

const defaultSizes = [48, 72, 96, 144, 168, 192, 256, 512];

function App({ iconPath, out, sizes = defaultSizes }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const currentSize = sizes[sizeIndex];

  const [results, setResults] = useState([]);

  const logResult = useCallback(
    (successful, fileSize) => {
      setResults(prev => [
        ...prev,
        [currentSize, successful, fileSize || null]
      ]);
      setSizeIndex(prev => prev + 1);
    },
    [sizeIndex, setSizeIndex, setResults, sizes]
  );

  const currentFilePath = `${out}${currentSize}x${currentSize}.png`;
  const currentMessage =
    sizeIndex < sizes.length ? (
      <Text bold>
        <Box marginRight={2}>
          <Spinner type="bouncingBar" />
        </Box>
        Creating {currentFilePath}
      </Text>
    ) : null;

  const previousMessages = results.map(([size, successful, fileSize]) => (
    <Text key={size}>
      <Box marginRight={1}>{successful ? '✅' : '❌'}</Box>
      <Color bgGreen={successful} bgRed={!successful}>
        <Box>
          {' '}
          Created {out}
          {size}x{size}.png{fileSize && ` – ${fileSize}B`}{' '}
        </Box>
      </Color>
    </Text>
  ));

  useEffect(() => {
    if (sizeIndex >= sizes.length) {
      return;
    }

    sharp(iconPath)
      .resize(currentSize, currentSize)
      .toFile(currentFilePath)
      .then(({ size: fileSize }) => {
        logResult(true, fileSize);
      })
      .catch(() => {
        logResult(false);
      });
  }, [sizeIndex]);

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
