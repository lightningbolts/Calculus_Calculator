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
