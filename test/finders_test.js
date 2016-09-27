const assert = require('assert')
const finders = require('../src/finders')

const targetLines = [
  'hello',
  'goodbye',
  'hello',
  'goodbye'
]

describe('firstMarker', () => {
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
      assert.equal(finders.firstMarkerSame(snippetLines, targetLines), 4)
    })
  })

  describe('regexp', () => {
    it('identifies correct line index', () => {
      assert.equal(finders.firstMarkerRegexp(/^good/, targetLines), 1)
    })

    it('suggests the end of the file if line does not exist', () => {
      assert.equal(finders.firstMarkerRegexp(/foo/, targetLines), 4)
    })
  })
})

describe('lastMarker', () => {
  describe('same last line index', () => {
    it('identifies correct line index', () => {
      const snippetLines = [
        'nevermind',
        'goodbye'
      ]
      assert.equal(finders.lastMarkerSame(snippetLines, targetLines, 0), 1)
    })

    it('identifies correct line index with empty lines in snippet', () => {
      const snippetLines = [
        'nevermind',
        'goodbye',
        '',
        ''
      ]
      assert.equal(finders.lastMarkerSame(snippetLines, targetLines, 0), 1)
    })

    it('skips past irrevelent lines', () => {
      const snippetLines = [
        'nevermind',
        'goodbye'
      ]
      assert.equal(finders.lastMarkerSame(snippetLines, targetLines, 2), 3)
    })
  })

  describe('regexp', () => {
    it('identifies correct line index', () => {
      assert.equal(finders.lastMarkerRegexp(/^good/, targetLines, 2), 3)
    })

    it('suggests the end of the file if line does not exist', () => {
      assert.equal(finders.lastMarkerRegexp(/foo/, targetLines, 0), 4)
    })
  })
})

describe('length', () => {
  describe('same lines', () => {
    const snippetLines = [
      'a',
      'b',
      '',
      'c',
      'd',
      '',
      ''
    ]
    it('selects correct ending line', () => {
      assert.equal(finders.lengthSameLines(snippetLines, targetLines, 0), 6)
    })
  })

  describe('same blank lines', () => {
    const snippetLines = [
      'a',
      'b',
      '',
      'c',
      'd',
      '',
      ''
    ]
    const testTargetLines = [
      'a',
      'a2',
      'b',
      '',
      'c',
      'd',
      'd2',
      '',
      '',  // <-- should select this one
      'extra',
      ''  // <-- then this one
    ]
    it('selects correct ending line', () => {
      assert.equal(finders.lengthSameBlankLines(snippetLines, testTargetLines, 0), 8)
      assert.equal(finders.lengthSameBlankLines(snippetLines, testTargetLines, 1), 8)
      assert.equal(finders.lengthSameBlankLines(snippetLines, testTargetLines, 4), 10)
    })
  })

  describe('same blank lines but the target is too short', () => {
    const snippetLines = [
      'a',
      'b',
      '',
      'c',
      'd',
      '',
      ''
    ]
    const testTargetLines = [
      'a',
      'a2',
      'b',
      '',
      'extra'  // <-- should select this one
    ]
    it('selects correct ending line', () => {
      assert.equal(finders.lengthSameBlankLines(snippetLines, testTargetLines, 0), 4)
    })
  })
})
