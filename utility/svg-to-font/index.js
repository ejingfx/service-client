const fs = require('fs-extra')
const webfontsGenerator = require('webfonts-generator')
const SVG_TO_FONT = 'utility/svg-to-font/'
const SVG_FOLDER = `${SVG_TO_FONT}svg/`
const SVG_FILES = []

fs.readdirSync(SVG_FOLDER)
  .forEach(file => {
    // eslint-disable-next-line no-console
    console.log(file)
    if (!(/^\..*/).test(file)) {
      SVG_FILES.push(`${SVG_FOLDER + file}`)
    }
  })

const options = {
  files: SVG_FILES,
  dest: 'static/fonts/SvgFont',
  cssDest: 'assets/_sfi.scss',
  cssFontsUrl: '../static/fonts/SvgFont',
  cssTemplate: `${SVG_TO_FONT}templates/css.hbs`,
  fontName: 'sfi',
  templateOptions: {
    classPrefix: 'sfi-',
    baseSelector: '.sfi'
  }
}

webfontsGenerator(options, function (error) {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Fail!', error)
  } else {
    // eslint-disable-next-line no-console
    console.log('Done!')
  }
})
