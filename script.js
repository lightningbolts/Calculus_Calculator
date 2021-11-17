/**
 * Description
 *
 * This calculator can calculate derivatives of single variable expressions.
 * This calculator can also calculate linear and quadratic approximations of functions.
 */

//---------------------------------------
//This object defines the type of the expression.

const EXPR_TYPE = {
  Number: "number",
  Variable: "variable",
  Sum: "sum",
  Product: "product",
  Power: "power",
  Exponential: "exponential"
};

//---------------------------------------
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

function is_product(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Product);
}

function is_power(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Power);
}

function is_exponential(expr) {
  return is_Expr_Certain_Type(expr, EXPR_TYPE.Exponential);
}

//---------------------------------------
//---------------------------------------
//Derive is the central highway that leads to different formulas for
//different derivatives for different expressions.

function derive(expr, variable) {
  if (is_number(expr)) {
    return make_number(0);
  }
  if (is_variable(expr)) {
    return expr.operand1 === variable ? make_number(1) : make_number(0);
  }
  if (is_sum(expr)) {
    return derive_sum(expr, variable);
  }
  if (is_product(expr)) {
    return derive_product(expr, variable);
  }
  if (is_power(expr)) {
    return derive_power(expr, variable);
  }
  if (is_exponential(expr)) {
    return derive_exponential(expr, variable);
  }
  return Error;
}

//---------------------------------------
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
  if (is_product(expr)) {
    return `(${display_expr(expr.operand1)} * ${display_expr(expr.operand2)})`;
  }
  if (is_power(expr)) {
    return `(${display_expr(expr.operand1)} ^ ${display_expr(expr.operand2)})`;
  }
  if (is_exponential(expr)) {
    return `(${display_expr(expr.operand1)} ^ ${display_expr(expr.operand2)})`;
  }
}

//---------------------------------------
//---------------------------------------
//Basic_Simplify_Expr simplifies the mathematical expression (object) partially
//before it is converted into a readable expression.

function basic_simplify_expr(expr) {
  if (is_number(expr)) {
    return expr;
  }
  if (is_variable(expr)) {
    return expr;
  }
  // expr is either a sum, or product, or power
  const part1 = basic_simplify_expr(expr.operand1);
  const part2 = basic_simplify_expr(expr.operand2);
  if (is_number(part1) && is_number(part2)) {
    const p1v = part1.operand1;
    const p2v = part2.operand1;
    let result;
    if (expr.type === EXPR_TYPE.Sum) {
      result = p1v + p2v;
      return make_number(result);
    }
    if (expr.type === EXPR_TYPE.Product) {
      result = p1v * p2v;
      return make_number(result);
    }
    if (expr.type === EXPR_TYPE.Power || expr.type === EXPR_TYPE.Exponential) {
      result = p1v ^ p2v;
      return make_number(result);
    }
  } else {
    if (is_number(part1) && part1.operand1 === 0) {
      if (expr.type === EXPR_TYPE.Sum) {
        return basic_simplify_expr(part2);
      }
      if (expr.type === EXPR_TYPE.Product) {
        return make_number(0);
      }
      if (
        expr.type === EXPR_TYPE.Power ||
        expr.type === EXPR_TYPE.Exponential
      ) {
        if (is_number(part2) && part2.operand1 === 0) {
          return make_number(1);
        }
        return make_number(0);
      }
    }
    if (is_number(part2) && part2.operand1 === 0) {
      if (expr.type === EXPR_TYPE.Sum) {
        return basic_simplify_expr(part1);
      }
      if (expr.type === EXPR_TYPE.Product) {
        return make_number(0);
      }
      if (
        expr.type === EXPR_TYPE.Power ||
        expr.type === EXPR_TYPE.Exponential
      ) {
        return make_number(1);
      }
    }
    return make_expr(
      expr.type,
      basic_simplify_expr(part1),
      basic_simplify_expr(part2)
    );
  }
}

//---------------------------------------
//---------------------------------------
//These functions list the different types of directions for the
//different types of expressions.

function derive_sum(expr, variable) {
  return make_sum(
    derive(expr.operand1, variable),
    derive(expr.operand2, variable)
  );
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

function derive_power(expr, variable) {
  // expr = f ^ g (g is constant)
  // expr' = g * f ^ (g - 1) * fp
  const f = expr.operand1;
  const g = expr.operand2;
  const fp = derive(f, variable);
  const part1 = make_product(g, fp);
  const part2 = make_product(
    part1,
    make_power(f, make_sum(g, make_number(-1)))
  );
  return part2;
}

function derive_exponential(expr, variable) {
  // expr = f ^ g (f is constant)
  // expr' = ln(f) * (f ^ g)
  const f = expr.operand1;
  const g = expr.operand2;
  const gp = derive(g, variable);
  const part1 = make_product(
    make_number(special_functions("ln", parseFloat(display_expr(f)))),
    make_exponential(f, g)
  );
  const part2 = make_product(part1, gp);
  return part2;
}

//---------------------------------------
//---------------------------------------
//Special_functions will soon be able to list all the special functions.

function special_functions(func, arg) {
  if (func === "ln") {
    return Math.log(arg) / Math.log(Math.E);
  }
}
//console.log(special_functions("ln", 12345))
//---------------------------------------
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

function make_sum(operand1, operand2) {
  return make_expr(EXPR_TYPE.Sum, operand1, operand2);
}

function make_power(operand1, operand2) {
  return make_expr(EXPR_TYPE.Power, operand1, operand2);
}

function make_exponential(operand1, operand2) {
  return make_expr(EXPR_TYPE.Exponential, operand1, operand2);
}

function make_expr(type, operand1, operand2) {
  return {
    type,
    operand1,
    operand2
  };
}

//---------------------------------------
//---------------------------------------
//These objects define the types of expressions.

const num_expr = {
  type: EXPR_TYPE.Number,
  operand1: 0
};

const variable_expr = {
  type: EXPR_TYPE.Variable,
  operand1: "x"
};

const sum_expr = {
  type: EXPR_TYPE.Sum,
  operand1: null,
  operand2: null
};

const power_expr = {
  type: EXPR_TYPE.Power,
  operand1: null,
  operand2: null
};

const product_expr = {
  type: EXPR_TYPE.Product,
  operand1: null,
  operand2: null
};

const exponential_expr = {
  type: EXPR_TYPE.Exponential,
  operand1: null,
  operand2: null
};

//---------------------------------------
//---------------------------------------
//These next few functions help solve for the roots of an equation.

function average(x, y) {
  return (x + y) / 2;
}

function positive(x) {
  return x > 0;
}
function negative(x) {
  return x < 0;
}

function abs(x) {
  return x >= 0 ? x : -x;
}

function close_enough(x, y) {
  return abs(x - y) < 0.0000001;
}

function search(f, neg_point, pos_point) {
  const midpoint = average(neg_point, pos_point);
  if (close_enough(neg_point, pos_point)) {
    return midpoint;
  } else {
    const test_value = f(midpoint);
    if (positive(test_value)) {
      return search(f, neg_point, midpoint);
    } else if (negative(test_value)) {
      return search(f, midpoint, pos_point);
    } else {
      return midpoint;
    }
  }
}

function half_interval_method(f, a, b) {
  const a_value = f(a);
  const b_value = f(b);
  return negative(a_value) && positive(b_value)
    ? search(f, a, b)
    : negative(b_value) && positive(a_value)
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
//---------------------------------------

//This is the testing arena.
//console.log(half_interval_method(x => x * x * x - 2 * x - 3, 1, 2))

//console.log('type of num_expr: ', num_expr.type);
//console.log('is num_expr a number? ', is_number(sum_expr))
let number1 = make_number(-1);
let x = make_variable("x");
const pow1 = make_power(x, make_number(2));

const expr1 = make_sum(pow1, number1);
const fexpr = make_expr(EXPR_TYPE.Power, expr1, number1);
console.log(display_expr(basic_simplify_expr(derive(fexpr, "x"))));
//console.log(display_expr(derive(make_expr(EXPR_TYPE.Exponential, number1, expr1), "x")))
//expr2 = (4*x)^4
//console.log(expr1)
//console.log(display_expr(expr1))
//console.log(display_expr(basic_simplify_expr(derive(expr2, "x"))))
