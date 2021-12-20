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