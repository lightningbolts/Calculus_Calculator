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