const fs = require('fs')
const sander = require('sander')
const path = require('path')
const yaml = require('js-yaml')

// FIXME magic constant
const libraryDir = '../snippets'

function readOrCreateFileSync(path, options) {
  try {
    return fs.readFileSync(path, options)
  } catch (e) {
    console.log(e)
  }
}

function loadSnippetFromLibrary(name) {
  const snippetHome = path.join(libraryDir, name)
  const templates = sander.lsrSync(snippetHome)
  templates.forEach((templatePath) => {
    const content = fs.readFileSync(path.join(snippetHome, templatePath), 'utf8')
    const firstLine = content.split('\n')[0]

    const destinationContent = readOrCreateFileSync(templatePath, 'utf8')
    sander.copyFileSync(path.join(snippetHome, templatePath)).to(templatePath)
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
