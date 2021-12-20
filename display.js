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