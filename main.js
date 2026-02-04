/************************************************************
 * Callbacks & Arrow Functions — Beginner Tutorial (STUDENT)
 *
 * Run with:
 *   node callbacks-and-arrows.js
 *
 * GOALS
 * - Understand that functions are values
 * - Learn what a callback actually is
 * - Practice arrow functions safely
 * - See how callbacks appear in Shopkeeper
 *
 * INSTRUCTIONS
 * 1) Work top to bottom.
 * 2) Only write code where it says "WRITE HERE".
 * 3) Run often. The file should never crash.
 ************************************************************/

/***********************
 * Helper: safe tester
 ***********************/

function runTest(label, fn) {
  try {
    console.log(label, fn());
  } catch (err) {
    const msg = String(err?.message || err);
    if (msg.includes("is not defined") || msg.includes("not a function")) {
      console.log(label, "❌ Not implemented yet");
    } else {
      console.log(label, "❌ Error:", msg);
    }
  }
}

/************************************************************
 * SECTION 1 — Functions are values
 ************************************************************/

console.log("\n=== Section 1: functions as values ===");

/*
In Python:
  def greet():
      ...

In JavaScript:
  function greet() { ... }

In BOTH languages:
- Functions can be stored in variables
- Functions can be passed around like data
*/

/*
EXERCISE 1.1
------------
Store a function in a variable called sayHi.
The function should return "Hi!"

HINT:
You can use either:
- function () { ... }
or
- () => ...
*/

let sayHi = () => "Hi!"; // WRITE HERE

runTest("Exercise 1.1 (expect 'Hi!'):", () => sayHi());

/*
EXERCISE 1.2
------------
Write callTwice(fn) that:
- calls fn twice
- returns an array of the two results

Example:
callTwice(() => "Hello") -> ["Hello", "Hello"]
*/

function callTwice(fn) {
  const first = fn();
  const second = fn();
  return [first, second];
}

runTest("Exercise 1.2 (expect ['Hello','Hello']):", () =>
  callTwice(() => "Hello")
);

/************************************************************
 * SECTION 2 — What is a callback?
 ************************************************************/

console.log("\n=== Section 2: callbacks ===");

/*
A callback is simply:
"A function passed into another function"

The name comes from the idea that the function
gets "called back" later.
*/

/*
EXERCISE 2.1
------------
Write runWithLogging(fn) that:
- logs "Starting..."
- calls fn
- logs "Finished."
- returns fn's result

IMPORTANT:
Calling a function does NOT automatically return its value.
You must explicitly return it.
*/

function runWithLogging(fn) {
  console.log("Starting...");
  const result = fn();
  console.log("Finished.");
  return result;
}

runTest("Exercise 2.1 (expect 'Work done'):", () =>
  runWithLogging(() => "Work done")
);

/*
Key idea:
- Passing fn does nothing
- Calling fn() executes it
*/

/*
EXERCISE 2.2
------------
Predict the output order BEFORE running.

Complete runLater(fn) so it:
- logs "Before"
- returns fn (NOT fn())
Then we will call the returned function.
*/

function runLater(fn) {
  console.log("Before");
  return fn;
}

runTest("Exercise 2.2 (expect 'Callback ran!'):", () => {
  const returnedFn = runLater(() => "Callback ran!");
  return returnedFn(); // should run the callback later
});

/************************************************************
 * SECTION 3 — Arrow functions (basic)
 ************************************************************/

console.log("\n=== Section 3: arrow functions ===");

/*
Regular function:
function add(a, b) {
  return a + b;
}

Arrow function:
const add = (a, b) => {
  return a + b;
};
*/

/*
EXERCISE 3.1
------------
Create an arrow function multiply(a, b) that returns a * b.
Use the long form with { } and return.
*/

const multiply = (a, b) => {
  return a * b;
};

runTest("Exercise 3.1 (expect 12):", () => multiply(3, 4));

/*
EXERCISE 3.2
------------
Arrow shortcut:
If the body is ONE expression,
you can omit `return` and `{}`.

Rewrite multiplyShort using implicit return.
*/

const multiplyShort = (a, b) => a * b; // WRITE HERE ;

runTest("Exercise 3.2 (expect 12):", () => multiplyShort(3, 4));

/************************************************************
 * SECTION 4 — Callbacks + arrow functions
 ************************************************************/

console.log("\n=== Section 4: callbacks + arrows ===");

/*
EXERCISE 4.1
------------
Write applyToNumber(n, fn) that:
- returns fn(n)

Example:
applyToNumber(5, x => x * 2) -> 10
*/

function applyToNumber(n, fn) {
  return fn(n);
}

runTest("Exercise 4.1 (expect 10):", () =>
  applyToNumber(5, x => x * 2)
);

/*
EXERCISE 4.2
------------
Call applyToNumber with:
- a named function
- an arrow function
*/

function square(n) {
  return n * n;
}

// Tests (do not change)
runTest("Exercise 4.2 (square, expect 16):", () =>
  applyToNumber(4, square)
);

runTest("Exercise 4.2 (arrow, expect 5):", () =>
  applyToNumber(4, n => n + 1)
);

/************************************************************
 * SECTION 5 — Callbacks in arrays
 ************************************************************/

console.log("\n=== Section 5: callbacks in arrays ===");

const numbers = [1, 2, 3, 4];

/*
EXERCISE 5.1
------------
Use map() to double each number.
Store the result in doubled.
*/

const doubled = numbers.map(n => n * 2); // WRITE HERE ;

runTest("Exercise 5.1 (expect [2,4,6,8]):", () => doubled);

/*
EXERCISE 5.2
------------
Use filter() to keep numbers > 2.
Store the result in filtered.
*/

const filtered = numbers.filter(n => n > 2); // WRITE HERE ;

runTest("Exercise 5.2 (expect [3,4]):", () => filtered);

/************************************************************
 * SECTION 6 — Callback style in Shopkeeper
 ************************************************************/

console.log("\n=== Section 6: Shopkeeper connection ===");

/*
In Shopkeeper you wrote code like:

inventoryEl.addEventListener("change", (e) => {
  dispatch({ type: "SET_PRICE", ... });
});

The arrow function is a callback.
The browser calls it and passes an event object.
*/

/*
EXERCISE 6.1
------------
Write simulateClick(handler) that:
- creates a fake event object:
    { target: { id: "promo", value: "300" } }
- calls handler with that object
- returns the result
*/

function simulateClick(handler) {
  const event = { target: { id: "promo", value: "300" } };
  return handler(event);
}

runTest(
  "Exercise 6.1 (expect 'Clicked promo, value=300'):",
  () => simulateClick(e => `Clicked ${e.target.id}, value=${e.target.value}`)
);

/************************************************************
 * SECTION 7 — Common arrow function mistakes
 ************************************************************/

console.log("\n=== Section 7: fixing mistakes ===");

/*
EXERCISE 7.1
------------
Fix this function so it returns the doubled value.

BROKEN:
const broken = (n) => { n * 2 };

Write a corrected version named fixed.
*/

const fixed = n => n * 2; // WRITE HERE ;

runTest("Exercise 7.1 (expect 10):", () => fixed(5));

/*
EXERCISE 7.2
------------
Fix this function so it actually calls the callback.

BROKEN:
function runLaterFixed(fn) {
  fn;
}

Write a corrected version named runLaterFixed.
*/

function runLaterFixed(fn) {
  return fn();
}

runTest("Exercise 7.2 (expect 'Ran!'):", () =>
  runLaterFixed(() => "Ran!")
);

/*
EXERCISE 7.3
------------
Why does this return undefined?

BROKEN:
const addOne = n => { n + 1 };

Write a corrected version named addOne.
*/

const addOne = n => n + 1; // WRITE HERE ;

runTest("Exercise 7.3 (expect 6):", () => addOne(5));

/************************************************************
 * SECTION 8 — Reflection (answer in comments)
 ************************************************************/

/*
1) What is a callback in your own words?
2) When do arrow functions save typing?
3) When do arrow functions cause confusion?
4) Where do callbacks appear in Shopkeeper?
*/