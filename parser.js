String.prototype.isNumeric = function () {
  return !isNaN(parseFloat(this)) && isFinite(this);
}

Array.prototype.clean = function () {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
}

const infixToPostfix = (infix) => {
  var outputQueue = "";
  var operatorStack = [];
  var operators = {
    "ln": {
      precedence: 5,
      associativity: "Right"
    },
    "^": {
      precedence: 4,
      associativity: "Right"
    },
    "/": {
      precedence: 3,
      associativity: "Left"
    },
    "*": {
      precedence: 3,
      associativity: "Left"
    },
    "+": {
      precedence: 2,
      associativity: "Left"
    },
    "-": {
      precedence: 2,
      associativity: "Left"
    }
  }
  infix = infix.replace(/\s+/g, "");
  infix = infix.split(/([\+\-\*\/\^\(\)])/).clean();
  console.log(infix)
  for (var i = 0; i < infix.length; i++) {
    var token = infix[i];
    if (token.isNumeric() || /^[x]+$/.test(token)) {
      outputQueue += token + " ";
    } else if (token === "e") {
      outputQueue += token + " "
    } else if ("ln^*/+-".indexOf(token) !== -1) {
      var o1 = token;
      var o2 = operatorStack[operatorStack.length - 1];
      while ("ln^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
        outputQueue += operatorStack.pop() + " ";
        o2 = operatorStack[operatorStack.length - 1];
      }
      operatorStack.push(o1);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        outputQueue += operatorStack.pop() + " ";
      }
      operatorStack.pop();
    }
  }
  while (operatorStack.length > 0) {
    outputQueue += operatorStack.pop() + " ";
  }
  let outputQueueOutput = outputQueue.trim()
  console.log(outputQueueOutput)
  return outputQueueOutput;
}

const solvePostfix = (postfix) => {
  var resultStack = [];
  postfix = postfix.split(" ");
  for (var i = 0; i < postfix.length; i++) {
    if (postfix[i].isNumeric()) {
      resultStack.push(make_number(parseFloat(postfix[i])));
    } else {
      if (postfix[i] === "x") {
        resultStack.push(make_variable(postfix[i]))
      } else if (postfix[i] === "e") {
        resultStack.push(make_number(postfix[i]))
      } else if (postfix[i] === "ln") {
        var a = resultStack.pop();
        //console.log(a, "aaaaaaaaaaaaa")
        resultStack.push(simplify(make_log(a)))
      } else {
        var a = resultStack.pop();
        //console.log(a, "aaaaaaaaaaaaa")
        var b = resultStack.pop();
        //console.log(b, "bbbbbbbbbbbb")
        if (postfix[i] === "+") {
          resultStack.push(simplify(make_sum(b, a)));
        } else if (postfix[i] === "-") {
          resultStack.push(simplify(make_minus(b, a)));
        } else if (postfix[i] === "*") {
          resultStack.push(simplify(make_product(b, a)));
        } else if (postfix[i] === "/") {
          resultStack.push(simplify(make_division(b, a)));
        } else if (postfix[i] === "^") {
          resultStack.push(simplify(make_power(b, a)));
        }
      }
    }
  }
  if (resultStack.length > 1) {
    return "error";
  } else {
    //console.log(resultStack) 
    return resultStack.pop();
  }
}

function initialize() {
  resetText()
}