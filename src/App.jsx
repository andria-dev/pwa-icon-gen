const React = require('react');
const { useState, useEffect, useCallback, useMemo } = React;

const { format } = require('@chbphone55/pretty-bytes');

const { Box, Color, Text } = require('ink');
const Spinner = require('ink-spinner').default;

const sharp = require('sharp');
const path = require('path');

const defaultSizes = [48, 72, 96, 144, 168, 192, 256, 512];

function App({ iconPath, out, sizes = defaultSizes }) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const currentSize = sizes[sizeIndex];

  const completeIconPath = useMemo(() => path.resolve(iconPath), [iconPath]);
  const currentOutPath = useMemo(
    () => path.join(path.resolve(out), `${currentSize}x${currentSize}.png`),
    [out, currentSize]
  );

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

  const currentMessage =
    sizeIndex < sizes.length ? (
      <Text bold>
        <Box marginRight={2}>
          <Spinner type="bouncingBar" />
        </Box>
        Creating {path.join(out, `${currentSize}x${currentSize}.png`)}
      </Text>
    ) : null;

  const previousMessages = results.map(([size, successful, fileSize]) => (
    <Text key={size}>
      <Box marginRight={1}>{successful ? '✅' : '❌'}</Box>
      <Color bgGreen={successful} bgRed={!successful}>
        <Box>
          {' '}
          Created {path.join(out, `${size}x${size}.png`)}
          {fileSize && ` – ${fileSize}B`}{' '}
        </Box>
      </Color>
    </Text>
  ));

  useEffect(() => {
    if (sizeIndex >= sizes.length) {
      return;
    }

    sharp(completeIconPath)
      .resize(currentSize, currentSize)
      .toFile(currentOutPath)
      .then(({ size: fileSize }) => {
        logResult(
          true,
          format(fileSize)
            .slice(0, 2)
            .join('')
        );
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
