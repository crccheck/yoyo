const assert = require('assert')
const merge = require('../src').merge
const finders = require('../src/finders')

describe('merge', () => {
  it('works for the trivial case', () => {
    const finalContent = merge('', '', finders.firstMarkerSame, finders.lengthSameBlankLines)
    assert.equal(finalContent, '')
  })

  it('can compose one snippet from scratch', () => {
    const snippetA = 'A\nB\nC\n'
    const finalContent = merge(snippetA, '', finders.firstMarkerSame, finders.lengthSameBlankLines)
    assert.equal(finalContent, 'A\nB\nC\n')
  })

  it('can carry over multiple line breaks', () => {
    const snippetA = 'A\nB\nC\n\n'
    const finalContent = merge(snippetA, '', finders.firstMarkerSame, finders.lengthSameBlankLines)
    assert.equal(finalContent, 'A\nB\nC\n\n')
  })

  it('can compose multiple snippets from scratch', () => {
    const snippetA = 'A\nB\nC\n\n'
    const snippetB = '1\n2\n3\n4\n'
    const intermediateContent = merge(snippetA, '', finders.firstMarkerSame, finders.lengthSameBlankLines)
    const finalContent = merge(snippetB, intermediateContent, finders.firstMarkerSame, finders.lengthSameBlankLines)
    assert.equal(finalContent, 'A\nB\nC\n\n1\n2\n3\n4\n')
  })

  it('can repeatedly apply snippets', () => {
    const snippetA = 'A\nB\nC\n\n'
    const snippetB = '1\n2\n3\n4\n'
    const intermediateContent = merge(snippetA, 'A\nB\nC\n\n1\n2\n3\n4\n', finders.firstMarkerSame, finders.lengthSameBlankLines)
    const finalContent = merge(snippetB, intermediateContent, finders.firstMarkerSame, finders.lengthSameBlankLines)
    assert.equal(finalContent, 'A\nB\nC\n\n1\n2\n3\n4\n')
  })

  it('can update snippets', () => {
    const snippetA = 'A\nB~\nC~\n\n'
    const snippetB = '1\n2~\n3~\n4~\n\n'  // XXX threw in an extra line break
    const intermediateContent = merge(snippetA, 'A\nB\nC\n\n1\n2\n3\n4\n', finders.firstMarkerSame, finders.lengthSameBlankLines)
    const finalContent = merge(snippetB, intermediateContent, finders.firstMarkerSame, finders.lengthSameBlankLines)
    assert.equal(finalContent, 'A\nB~\nC~\n\n1\n2~\n3~\n4~\n\n')
  })
})
