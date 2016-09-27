const debug = require('debug')('main')
const fs = require('fs')
const path = require('path')
const sander = require('sander')
const yaml = require('js-yaml')
const finders = require('./src/finders')
const merge = require('./src').merge

const libraryDir = path.join(__dirname, 'snippets')
debug('Using libraries found in: %s', libraryDir)

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
    debug('%s/%s', name, templatePath)
    const snippetContent = fs.readFileSync(path.join(snippetHome, templatePath), 'utf8')
    const targetContent = readOrCreateFileSync(templatePath, 'utf8')
    const finalContent = merge(snippetContent, targetContent, finders.firstMarkerSame, finders.lengthSameBlankLines)
    fs.writeFileSync(templatePath, finalContent, 'utf8')
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
