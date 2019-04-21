# pwa-icon-gen

A CLI tool for generating Progressive Web App icons of different sizes in PNG format from an existing image. Built using [Ink](https://npm.im/ink), [React](https://npm.im/react), and [Sharp](https://npm.im/sharp).

[A list of image types supported by Sharp can be found here](https://sharp.pixelplumbing.com/en/stable/#formats). And below:

- JPEG
- PNG
- WebP
- TIFF
- GIF
- SVG

# Usage

## Installation

To install `pwa-icon-gen` you can use `yarn` or `npm`.

```bash
yarn global add pwa-icon-gen

# or

npm install --global pwa-icon-gen
```

## Example

```bash
pwa-icon-gen logo.svg --out=public/icons/

# custom sizes
pwa-icon-gen logo.svg --out=public/icons/ --sizes=50,100,150,200
```

## All CLI Options

```
Usage: pwa-icon-gen <icon-path> --out=<out-dir> [options]
       pwa-icon-gen logo.svg --out=public/icons/
       pwa-icon-gen logo.png --out=public/ --sizes=72,144,512

Options:
	--out	Destination directory for the icons.
	--sizes	The different sizes to be generated.
		Format: comma separated list (i.e. 128,256,512)
```
