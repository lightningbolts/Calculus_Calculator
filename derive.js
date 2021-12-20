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