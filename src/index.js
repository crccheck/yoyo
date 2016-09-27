
function merge (snippetContent, targetContent, fromIndexStrategy, indexEndStrategy) {
  const snippetLines = snippetContent.split('\n')
  const targetLines = targetContent.split('\n')

  // XXX Here are some hacks:
  // HACK ''.split('/n') is [''] but we want []
  if (targetLines.length === 1 && targetLines[0] === '') {
    targetLines.pop()
  }

  const fromIndex = fromIndexStrategy(snippetLines, targetLines)
  const indexEnd = indexEndStrategy(snippetLines, targetLines, fromIndex)
  const before = targetLines.slice(0, fromIndex).join('\n')
  const after = targetLines.slice(indexEnd).join('\n')
  console.log(before.replace(/\n/g, '\\n') + snippetContent.replace(/\n/g, '\\n'), after.replace(/\n/g, '\\n'))
  return before + snippetContent + after

  // old way:
  targetLines.splice(
    fromIndex,
    indexEnd - fromIndex + 1,
    snippetContent.substr(0, snippetContent.length)
  )
  console.log(targetLines)
  return targetLines.join('\n')
}

exports.merge = merge
