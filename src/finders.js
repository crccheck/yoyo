exports.firstMarkerSame = function(snippetLines, targetLines) {
  const firstLine = snippetLines[0]
  const match = targetLines.indexOf(firstLine)

  if (match === -1) {
    return targetLines.length
  }

  return match;
}
