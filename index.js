const fs = require('fs')
const path = require('path')
const sander = require('sander')
const yaml = require('js-yaml')
const finders = require('./src/finders')

// FIXME magic constant
const libraryDir = '../snippets'

function readOrCreateFileSync (path, options) {
  try {
    return fs.readFileSync(path, options)
  } catch (e) {
    if (e.code === 'ENOENT') {  // File missing
      return ''
    }
  }
}

function loadSnippetFromLibrary (name) {
  const snippetHome = path.join(libraryDir, name)
  const templates = sander.lsrSync(snippetHome)
  templates.forEach((templatePath) => {
    const snippetContent = fs.readFileSync(path.join(snippetHome, templatePath), 'utf8')
    const snippetLines = snippetContent.split('\n')

    const targetContent = readOrCreateFileSync(templatePath, 'utf8')
    const targetLines = targetContent.split('\n')

    const fromIndex = finders.firstMarkerSame(snippetLines, targetLines)
    const indexEnd = finders.lengthSameBlankLines(snippetLines, targetLines, fromIndex)
    targetLines.splice(fromIndex, indexEnd - fromIndex, snippetContent)
    fs.writeFileSync(templatePath, targetLines.join('\n'), 'utf8')
  })
  return templates
}

if (!sander.existsSync('.yoyo.yml')) {
  console.error(`Missing configuration file: ${__dirname}/.yoyo.yml`)
  process.exit(1)
}

const projectConfig = yaml.safeLoad(fs.readFileSync('.yoyo.yml', 'utf8'))

projectConfig.snippets.forEach((snippet) => {
  loadSnippetFromLibrary(snippet)
})
