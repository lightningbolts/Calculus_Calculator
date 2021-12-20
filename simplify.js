function simplify(expr) {
  if (is_number(expr)) {
    return expr
  }
  if (is_variable(expr)) {
    return expr
  }

  if (is_log(expr)) {
    const op1 = simplify(expr.operand1)
    //console.log(expr, "EXPR")
    //console.log(op1, "This is op1")
    //console.log(op1.operand1, "This is op1.operand1")
    //console.log(op1.operand2, "This is op1.operand2")
    if (is_power(op1) && op1.operand1.operand1 === "e") {
      console.log("MARKER?")
      return op1.operand2
    }
    return make_log(op1)
  }
  const part1 = simplify(expr.operand1)
  const part2 = simplify(expr.operand2)
  if (is_number(part1) && is_number(part2)) {
    const p1v = part1.operand1;
    const p2v = part2.operand1;
    let result;
    if (is_sum(expr)) {
      if (p1v === "e" || p2v === "e") {
        return make_expr(expr.type, part1, part2)
      }
      result = p1v + p2v;
      return make_number(result);
    }
    if (is_minus(expr)) {
      if (p1v === "e" || p2v === "e") {
        return make_expr(expr.type, part1, part2)
      }
      result = p1v - p2v;
      return make_number(result)
    }
    if (is_product(expr)) {
      if (p1v === "e" || p2v === "e") {
        return make_expr(expr.type, part1, part2)
      }
      result = p1v * p2v;
      return make_number(result);
    }
    if (is_division(expr)) {
      if (p1v === "e" || p2v === "e") {
        return make_expr(expr.type, part1, part2)
      }
      result = p1v / p2v
      return make_number(result)
    }
    if (is_power(expr)) {
      if (p1v === "e" || p2v === "e") {
        return make_expr(expr.type, part1, part2)
      }
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

function binary_simplify_degree(expr) {
  //if the expr.operand1 and expr.operand2 are not numbers
  let op1 = expr.operand1
  let op2 = expr.operand2
  //if op1 and op2 are the same degree, simplify by operator
  // 2*x^3 + 4*x^3 => 6*x^3
  if (same_structure(op1, op2)) {
    if (is_sum(expr)) {
      return make_product(make_sum(),)
    }
  }
}

function same_structure(op1, op2) {

}

function same_operator(op1, op2) {
  return op1.type === op2.type
}
