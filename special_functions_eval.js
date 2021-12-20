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