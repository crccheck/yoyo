const fs = require('fs')
const sander = require('sander')
const path = require('path')
const yaml = require('js-yaml')

const library = '../snippets'

function loadSnippet(name) {
  const snippetHome = path.join(`${library}`, name)
  const templates = sander.lsrSync(`${snippetHome}`)
  templates.forEach((templatePath) => {
    console.log('copying', path.join(snippetHome, templatePath), templatePath)
    sander.copyFileSync(path.join(snippetHome, templatePath)).to(templatePath)
  })
  return templates
}

if (!sander.existsSync('.yoyo.yml')) {
  console.error(`Missing configuration file: ${__dirname}/.yoyo.yml`)
  process.exit(1)
}

const data = yaml.safeLoad(fs.readFileSync('.yoyo.yml', 'utf8'))

data.snippets.forEach((snippet) => {
  loadSnippet(snippet)
})
