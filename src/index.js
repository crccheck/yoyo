
function merge (snippetContent, targetContent, fromIndexStrategy, indexEndStrategy) {
  const snippetLines = snippetContent.split('\n')
  const targetLines = targetContent.split('\n')

  const fromIndex = fromIndexStrategy(snippetLines, targetLines)
  const indexEnd = indexEndStrategy(snippetLines, targetLines, fromIndex)
  targetLines.splice(
    fromIndex,
    indexEnd - fromIndex + 1,
    snippetContent.substr(0, snippetContent.length)
  )
  return targetLines.join('\n')
}

exports.merge = merge
