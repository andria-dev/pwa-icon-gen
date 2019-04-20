const React = require('react');
const { useState, useEffect } = React;
const { Box, Color, Text, Static } = require('ink');
const sharp = require('sharp');

const defaultSizes = [48, 72, 96, 144, 168, 192, 256, 512];

function App({ iconPath, out, sizes = defaultSizes }) {
  const [sizeIndex, setSizeIndex] = useState(0);

  const currentSize = sizes[sizeIndex];
  const currentMessage =
    currentSize < sizes.length ? (
      <Text bold>
        Creating {out}
        {currentSize}x{currentSize}.png
      </Text>
    ) : null;

  const previousMessages = defaultSizes.slice(0, sizeIndex).map(size => (
    <Color bgGreen>
      <Text>
        Created {out}
        {size}x{size}.png
      </Text>
    </Color>
  ));

  useEffect(() => {
    let current = sizeIndex;
    const id = setInterval(() => {
      if (current === sizes.length) {
        return;
      }
      setSizeIndex(++current);
    });
    return () => clearInterval(id);
  }, []);

  return (
    <Box flexDirection="column">
      <Box justifyContent="center">
        <Text>Welcome to pwa-icon-gen</Text>
      </Box>
      {previousMessages}
      {currentMessage}
    </Box>
  );
}

module.exports = App;
