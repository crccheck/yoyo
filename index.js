const fs = require('fs')
const sander = require('sander')
const path = require('path')
const yaml = require('js-yaml')

const data = yaml.safeLoad(fs.readFileSync('.yoyo.yml', 'utf8'))

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

data.snippets.forEach((snippet) => {
  loadSnippet(snippet)
})
