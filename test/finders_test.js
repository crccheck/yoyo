const assert = require('assert')
const finders = require('../src/finders')

describe('firstMarker', () => {
  const targetLines = [
    'hello',
    'goodbye'
  ]

  describe('same first line', () => {
    it('identifies correct line index', () => {
      const snippetLines = [
        'hello'
      ]
      assert.equal(finders.firstMarkerSame(snippetLines, targetLines), 0)
    })

    it('suggests the end of the file if line does not exist', () => {
      const snippetLines = [
        'foo'
      ]
      assert.equal(finders.firstMarkerSame(snippetLines, targetLines), 2)
    })
  })
})
