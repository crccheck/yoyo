exports.firstMarkerSame = function (snippetLines, targetLines) {
  const firstLine = snippetLines[0]
  const match = targetLines.indexOf(firstLine)

  if (match === -1) {
    return targetLines.length
  }

  return match
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
  const match = targetLines.indexOf(lastLine, firstLineNumber)

  if (match === -1) {
    return targetLines.length
  }

  return match
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
        return i
      }
    }
  }

  return i - 1
}
