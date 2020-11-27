const React = require('react')
const {render} = require('ink')

const jsxImport = require('import-jsx')
const App = jsxImport('./App.jsx')

module.exports = (iconPath, out, sizes) => {
	render(<App iconPath={iconPath} out={out} sizes={sizes} />)
}
