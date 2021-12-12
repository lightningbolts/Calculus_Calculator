/**
 * Description
 *
 * This calculator can calculate derivatives of single variable expressions.
 * This calculator can also calculate linear and quadratic approximations of functions.
 * This calculator can also calculate roots of functions using Newton's method.
 */
//---------------------------------------
//This object defines the type of the expression.
const EXPR_TYPE = {
  Number: "number",
  Variable: "variable",
  Sum: "sum",
  Minus: "minus",
  Product: "product",
  Division: "division",
  Power: "power",
  Exponential: "exponential",
  Log: "log",
  Sin: "sin",
  Cos: "cos",
  Tan: "tan",
  Arcsin: "arcsin",
  Arccos: "arccos",
  Arctan: "arctan"
};
//---------------------------------------
//This section is all about checking whether the type of an expression is a certain type.
function is_Expr_Certain_Type(expr, type) {
  return expr.type === type;
}

function is_number(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Number);
}

function is_variable(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Variable);
}

function is_sum(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Sum);
}

function is_minus(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Minus)
}

function is_product(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Product);
}

function is_division(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Division)
}

function is_power(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Power);
}

function is_exponential(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Exponential);
}

function is_log(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Log);
}

//---------------------------------------
//Derive is the central highway that leads to different formulas for
//different derivatives for different expressions.

function derive(expr, variable) {
  if (is_number(expr)) {
    return make_number(0);
  }
  if (is_variable(expr)) {
    return make_number(1);
  }
  if (is_sum(expr)) {
    return derive_sum(expr, variable);
  }
  if (is_minus(expr)) {
    return derive_minus(expr, variable);
  }
  if (is_product(expr)) {
    return derive_product(expr, variable);
  }
  if (is_division(expr)) {
    return derive_division(expr, variable);
  }
  if (is_power(expr)) {
    return derive_power(expr, variable);
  }
  if (is_exponential(expr)) {
    return derive_exponential(expr, variable);
  }
  if (is_log(expr)) {
    return derive_log(expr, variable);
  }
  return Error;
}

//---------------------------------------
//Display_expr displays the nested objects as a mathematical expression.

function display_expr(expr) {
  if (is_number(expr)) {
    return expr.operand1.toString();
  }
  if (is_variable(expr)) {
    return expr.operand1;
  }
  if (is_sum(expr)) {
    return `(${display_expr(expr.operand1)} + ${display_expr(expr.operand2)})`;
  }
  if (is_minus(expr)) {
    return `(${display_expr(expr.operand1)} - ${display_expr(expr.operand2)})`;
  }
  if (is_product(expr)) {
    return `${display_expr(expr.operand1)} \\cdot ${display_expr(expr.operand2)}`;
  }
  if (is_division(expr)) {
    return `(\\frac{${display_expr(expr.operand1)}}{${display_expr(expr.operand2)}})`;
  }
  if (is_power(expr)) {
    return `${display_expr(expr.operand1)} ^ {${display_expr(expr.operand2)}}`;
  }
  if (is_log(expr)) {
    return `ln(${display_expr(expr.operand1)})`;
  }

}

//---------------------------------------
/*simplify simplifies the mathematical expression (object) partially
before it is converted into a readable expression. (incomplete)*/

/*function basic_simplify_expr1(expr) {
  switch (expr) {
    case is_number(expr):
      return expr;
    case is_variable(expr):
      return expr;

    default:
      return "Object Error";
  }
}*/

function simplify(expr) {
  if (is_number(expr)) {
    return expr
  }
  if (is_variable(expr)) {
    return expr
  }
  //TODO, fix e anomaly, "ln(e^2)*x => ln(2) when it should be => 2" 
  if (is_log(expr)) {
    const op1 = simplify(expr.operand1)
    return make_log(op1)
  }
  const part1 = simplify(expr.operand1)
  const part2 = simplify(expr.operand2)
  if (is_number(part1) && is_number(part2)) {
    const p1v = part1.operand1;
    const p2v = part2.operand1;
    let result;
    if (is_sum(expr)) {
      result = p1v + p2v;
      return make_number(result);
    }
    if (is_minus(expr)) {
      result = p1v - p2v;
      return make_number(result)
    }
    if (is_product(expr)) {
      result = p1v * p2v;
      return make_number(result);
    }
    if (is_division(expr)) {
      result = p1v / p2v
      return make_number(result)
    }
    if (is_power(expr)) {
      result = p1v ^ p2v;
      return make_number(result);
    }
  } else if (is_number(part1) && !is_number(part2)) {
    if (part1.operand1 === 0) {
      if (is_sum(expr)) {
        return simplify(part2)
      }
      if (is_minus(expr)) {
        return simplify(make_product(make_number(-1), part2))
      }
      if (is_product(expr) || is_division(expr) || is_power(expr)) {
        return make_number(0)
      }
    }
    if (part1.operand1 === 1) {
      if (is_sum(expr)) {
        return make_expr(expr.type, part1, part2)
      }
      if (is_minus(expr)) {
        return make_expr(expr.type, part1, part2)
      }
      if (is_product(expr)) {
        return simplify(part2)
      }
      if (is_division(expr)) {
        return make_expr(expr.type, part1, part2)
      }
      if (is_power(make_expr(expr.type, part1, part2))) {
        return make_number(1)
      }
    }
    return make_expr(expr.type, part1, part2)
  } else if (is_number(part2) && !is_number(part1)) {
    if (part2.operand1 === 0) {
      if (is_sum(expr) || is_minus(expr)) {
        return simplify(part1)
      }
      if (is_product(make_expr(expr.type, part1, part2))) {
        return make_number(0)
      }
      if (is_division(expr)) {
        return Error("You cannot divide by zero")
      }
      if (is_power(expr)) {
        return make_number(1)
      }
    }
    if (part2.operand1 === 1) {
      if (is_sum(expr)) {
        return make_expr(expr.type, part1, part2)
      }
      if (is_minus(expr)) {
        return make_expr(expr.type, part1, part2)
      }
      if (is_product(expr)) {
        return simplify(part1)
      }
      if (is_division(expr)) {
        return simplify(part1)
      }
      if (is_power(expr)) {
        return simplify(part1)
      }
    }
    return make_expr(expr.type, part1, part2)
  } else {
    return make_expr(expr.type, part1, part2)
  }
}

//---------------------------------------
//These functions list the different types of directions for the
//different types of expressions.

function derive_sum(expr, variable) {
  return make_sum(
    derive(expr.operand1, variable),
    derive(expr.operand2, variable)
  );
}

function derive_minus(expr, variable) {
  return make_minus(derive(expr.operand1, variable), derive(expr.operand2, variable));
}

function derive_product(expr, variable) {
  // expr = f * g
  // expr' = f' * g + g' * f
  const f = expr.operand1;
  const g = expr.operand2;
  const fp = derive(f, variable);
  const gp = derive(g, variable);
  const part1 = make_product(fp, g);
  const part2 = make_product(gp, f);
  return make_sum(part1, part2);
}

function derive_division(expr, variable) {
  // expr = f / g
  // expr' = (f' * g - g' * f) / (g ^ 2)
  const f = expr.operand1;
  const g = expr.operand2;
  const fp = derive(f, variable);
  const gp = derive(g, variable);
  const part1 = make_product(fp, g);
  const part2 = make_product(gp, f);
  const part3 = make_power(g, make_number(2))
  return make_division(make_minus(part1, part2), part3);
}

function derive_power(expr, variable) {
  // expr = f ^ g (g is constant)
  // expr' = g * f ^ (g - 1) * fp
  // Needs general case
  // If g is constant, then expr' = g * f ^ (g - 1) * fp
  // If f is constant, then expr' = ln(f) * f ^ g * gp
  // x ^ x = e ^ (ln(x) * x) => (ln(x) + 1) * x ^ x
  // If both are not constant, then f ^ g = e ^ (ln(f) * g) => e ^ (ln(f) * g) * '(ln(f) * g)
  const f = expr.operand1;
  //console.log(f)
  const g = expr.operand2;
  //console.log(g)
  const gp = derive(g, variable);
  //console.log(gp)
  const fp = derive(f, variable);
  //console.log(fp)
  if (is_number(g) && is_number(f)) {
    return make_number(make_power(f, g))
  } else if (is_number(g) && !is_number(f)) {
    console.log("HEEERE222222")
    const part1 = make_product(g, fp);
    const part2 = make_product(
      part1,
      make_power(f, make_sum(g, make_number(-1)))
    );
    return part2;
  } else if (is_number(f) && is_number(g) !== true) {
    /*const part1 = make_product(
      make_number(special_functions("ln", parseFloat(display_expr(f)))),
      expr
    );*/
    console.log("HEEERE11111")
    const part2 = make_product(make_product(make_log(f), expr), gp);
    return part2;
  } else if (is_number(f) !== true && is_number(g) !== true) {
    console.log("HEEERE")
    const part3 = make_product(make_log(f), g)
    console.log(display_expr(part3), "PART3")
    const part2 = make_product(expr, derive(part3, "x"))
    console.log(display_expr(part2), "PART2")
    return part2
  }
}

function derive_log(expr, variable) {
  const f = expr.operand1
  return make_product(make_division(make_number(1), f), derive(f, variable))
}

/*function derive_exponential(expr, variable) {
  // expr = f ^ g (f is constant)
  // expr' = ln(f) * (f ^ g) * gp
  const f = expr.operand1;
  const g = expr.operand2;
  const gp = derive(g, variable);
  const part1 = make_product(
    make_number(special_functions("ln", parseFloat(display_expr(f)))),
    make_exponential(f, g)
  );
  const part2 = make_product(part1, gp);
  return part2;
}*/

//---------------------------------------
//Special_functions will soon be able to list all the special functions.

function special_functions(func, arg) {
  if (func === "ln") {
    return Math.log(arg) / Math.log(Math.E);
  }
  if (func === "sin") {
    return Math.sin(arg)
  }
  if (func === "cos") {
    return Math.cos(arg)
  }
  if (func === "tan") {
    return Math.tan(arg)
  }
}
//console.log(special_functions("ln", 12345))
//---------------------------------------
//These next functions are the constructors for the expressions.

function make_number(operand1) {
  return make_expr(EXPR_TYPE.Number, operand1);
}

function make_variable(operand1) {
  return make_expr(EXPR_TYPE.Variable, operand1);
}

function make_product(operand1, operand2) {
  return make_expr(EXPR_TYPE.Product, operand1, operand2);
}

function make_division(operand1, operand2) {
  return make_expr(EXPR_TYPE.Division, operand1, operand2);
}

function make_sum(operand1, operand2) {
  return make_expr(EXPR_TYPE.Sum, operand1, operand2);
}

function make_minus(operand1, operand2) {
  return make_expr(EXPR_TYPE.Minus, operand1, operand2);
}

function make_power(operand1, operand2) {
  return make_expr(EXPR_TYPE.Power, operand1, operand2);
}

function make_exponential(operand1, operand2) {
  return make_expr(EXPR_TYPE.Exponential, operand1, operand2);
}

function make_log(operand1) {
  return make_expr(EXPR_TYPE.Log, operand1);
}

function make_expr(type, operand1, operand2) {
  return {
    type,
    operand1,
    operand2
  };
}

//---------------------------------------
//These objects define the types of expressions. 

const num_expr = { type: EXPR_TYPE.Number, operand1: 0 };

const variable_expr = { type: EXPR_TYPE.Variable, operand1: "x" };

const sum_expr = { type: EXPR_TYPE.Sum, operand1: null, operand2: null };

const minus_expr = { type: EXPR_TYPE.Sum, operand1: null, operand2: null };

const power_expr = { type: EXPR_TYPE.Power, operand1: null, operand2: null };

const product_expr = { type: EXPR_TYPE.Product, operand1: null, operand2: null };

const division_expr = { type: EXPR_TYPE.Division, operand1: null, operand2: null };

const exponential_expr = { type: EXPR_TYPE.Exponential, operand1: null, operand2: null };

const log_expr = { type: EXPR_TYPE.Log, operand1: null, operand2: null };

//---------------------------------------
//These next few functions help solve for the roots of an equation.

function average(x, y) {
  return (x + y) / 2;
}

function close_enough(x, y) {
  return Math.abs(x - y) < 0.0000001;
}

function search(f, neg_point, pos_point) {
  const midpoint = average(neg_point, pos_point);
  if (close_enough(neg_point, pos_point)) {
    return midpoint;
  } else {
    const test_value = f(midpoint);
    if (Math.sign(test_value) > 0) {
      return search(f, neg_point, midpoint);
    } else if (Math.sign(test_value) < 0) {
      return search(f, midpoint, pos_point);
    } else {
      return midpoint;
    }
  }
}

function half_interval_method(f, a, b) {
  const a_value = f(a);
  const b_value = f(b);
  return Math.sign(a_value) < 0 && Math.sign(b_value)
    ? search(f, a, b)
    : Math.sign(b_value) < 0 && Math.sign(a_value) > 0
      ? search(f, b, a)
      : error("values are not of opposite sign");
}
const tolerance = 0.00001;
function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return Math.abs(x - y) < tolerance;
  }
  function try_with(guess, count) {
    const next = f(guess);
    //console.log(next)
    //console.log(count)
    return close_enough(guess, next) ? next : try_with(next, count + 1);
  }
  return try_with(first_guess, 1);
}

//---------------------------------------
//This part parses the string into objects. str -> object which goes through the calculator functions

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
  return outputQueue.trim();
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
        console.log(a, "aaaaaaaaaaaaa")
        resultStack.push(simplify(make_log(a)))
      } else {
        var a = resultStack.pop();
        console.log(a, "aaaaaaaaaaaaa")
        var b = resultStack.pop();
        console.log(b, "bbbbbbbbbbbb")
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
//console.log(infixToPostfix("6*x^2"))
//let expr = solvePostfix(infixToPostfix("3*x^3"))
//console.log(expr)
//console.log(display_expr(basic_simplify_expr(parser("3"))))
//console.log(parser_derive("2 * 2 * 2 * x - 4 * x"))
//console.log(display_expr(basic_simplify_expr(derive(solvePostfix(infixToPostfix("6*x")), "x"))))
//console.log(make_product(make_power(make_variable("x"), make_number(2)), make_number(6)))
//console.log(tester(make_product(make_power(make_variable("x"), make_number(2)), make_number(6)))) 
//---------------------------------------
//---------------------------------------
//console.log(parse("(1 + 2) / 3)"))
//This is the testing arena.
//console.log(tokenize("3 * x"))
//console.log(half_interval_method(x => x * x * x - 2 * x - 3, 1, 2))

//console.log('type of num_expr: ', num_expr.type);
//console.log('is num_expr a number? ', is_number(sum_expr))
let number1 = make_number(-1);
let x = make_variable("x");
const pow1 = make_power(x, make_number(2));

const expr1 = make_sum(pow1, number1);
const fexpr = make_expr(EXPR_TYPE.Power, expr1, number1);
//console.log(display_expr(basic_simplify_expr(derive(fexpr, "x"))));
//console.log(display_expr(derive(make_expr(EXPR_TYPE.Exponential, number1, expr1), "x")))
//expr2 = (4*x)^4
//console.log(expr1)
//console.log(display_expr(expr1))
//console.log(display_expr(basic_simplify_expr(derive(expr2, "x"))))
//console.log(display_expr(derive(make_log(x), "x")))
//console.log(display_expr(derive(make_product(make_log(x), x), "x")))
//console.log(display_expr(derive(make_power(make_product(make_number(2), x), x), "x")))
//console.log(parser_derive("2^x"))
//console.log(infixToPostfix("5*x+ln(x^2+4)"))
console.log(parser_derive("e^x"))
