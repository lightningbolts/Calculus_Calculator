function initialize() {
  resetText()
}

function calculate() {
  initialize()
  const element = document.getElementById("strtext")
  console.log(element)
  let result = latex(parser_derive(element.value))
  console.log(result)
  render(result)
}

MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};

function render(text) {
  const content = document.createElement('span')
  content.textContent = text
  const syncTypeset = document.querySelector('#output')
  syncTypeset.appendChild(content.cloneNode(true))
  MathJax.typeset()
  console.log(text)
}


function resetText() {
  let newText = document.getElementById("output")
  newText.innerHTML = ""
}

function parser_derive(str) {
  return display_expr(simplify(derive(solvePostfix(infixToPostfix(str))), "x"))
}

function parser(str) {
  return solvePostfix(infixToPostfix(str));
}

function latex(str) {
  let str1 = str.replaceAll("*", "\\cdot")
  let str2 = str1.replaceAll("ln", "\\ln")
  return `$$${str2}$$`
}