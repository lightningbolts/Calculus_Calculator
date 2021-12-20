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
    if (g.operand1 === "e") {
      return make_power(make_number(Math.E), f)
    }
    return make_number(make_power(f, g))
  } else if (is_number(g) && !is_number(f)) {
    //console.log("HEEERE222222")
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
    //console.log("HEEERE11111")
    const part2 = make_product(make_product(make_log(f), expr), gp);
    return part2;
  } else if (is_number(f) !== true && is_number(g) !== true) {
    c//onsole.log("HEEERE")
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