const debug = require('debug')('finders')

// FIRST
////////

exports.firstMarkerSame = function (snippetLines, targetLines) {
  const firstLine = snippetLines[0]
  const idx = targetLines.indexOf(firstLine)

  if (idx === -1) {
    debug('NOTFOUND')
    return targetLines.length
  }

  debug('start idx: %s', idx)
  return idx
}

exports.firstMarkerRegexp = function (regexp, targetLines) {
  let i = 0
  for (; i < targetLines.length; i++) {
    if (regexp.test(targetLines[i])) {
      return i
    }
  }
  return i
}

// LAST
///////

function lastNonblankLine (lines) {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i]) {
      return lines[i]
    }
  }
  return lines[lines.length - 1]
}

exports.lastMarkerSame = function (snippetLines, targetLines, firstLineNumber) {
  const lastLine = lastNonblankLine(snippetLines)
  const idx = targetLines.indexOf(lastLine, firstLineNumber)

  if (idx === -1) {
    return targetLines.length
  }

  return idx
}

exports.lastMarkerRegexp = function (regexp, targetLines, firstLineNumber) {
  let i = firstLineNumber
  for (; i < targetLines.length; i++) {
    if (regexp.test(targetLines[i])) {
      return i
    }
  }
  return i
}

// LENGTH
/////////

exports.lengthSameLines = function (snippetLines, targetLines, firstLineNumber) {
  return firstLineNumber + snippetLines.length - 1
}

exports.lengthSameBlankLines = function (snippetLines, targetLines, firstLineNumber) {
  let numBlankInSnippet = snippetLines.filter((x) => x === '').length
  let i = firstLineNumber
  for (; i < targetLines.length; i++) {
    if (targetLines[i] === '') {
      numBlankInSnippet--
      if (numBlankInSnippet === 0) {
        debug('end %s', i)
        return i
      }
    }
  }

  debug('end %s gave up looking', i)
  return i - 1
}
