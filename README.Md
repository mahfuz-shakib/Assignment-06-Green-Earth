<h3 style="text-align:center; color:white;background-color:gray; padding:5px 8px">Netlify Live Link --> <a href="https://green-earth-explore.netlify.app/" style="background-color:p; color:yellow; padding:4px 8px; border-radius:5px; ">Green Earth Explore</a> </h3>

---
##  Featured Questions and Answer

### Q-1) What is the difference between var, let, and const?
***var***, ***let*** and ***const*** are the variable declaration keywords in JavaScript. Basically older verison used ***var*** keyword but modern JavaScript version ES6+ uses ***let*** and ***const***.

Those have some key differences such as:
- #### `var` (old)
    - Function-scoped
    - Re-declaration allowed
    - Re-assignment allowed
    - Hoisted (undefined)
    - Avoid in modern JS

- #### `let` (ES6+)
    - Block-scoped
    - Re-declaration not allowed
    - Re-assignment allowed
    - Hoisted (not initialized)
    - Use when value changes.

- #### `const` (ES6+)
    - Block-scoped
    - Re-declaration not allowed
    - Re-assignment not allowed
    - Hoisted (not initialized)
    - Use for constant.

#### `Example`
    // var -> old way, so Avoid
    var x = 10;
    var x = 20;     //  Allowed

    // let -> Preferred for variables
    let y = 30;
    y = 40;         // Works
    let y = 50;     // Error

    // const -> Preferred for constants
    const PI = 3.1416;
    PI = 3.14;      // Error

---
### Q-2) What is the difference between map(), forEach(), and filter()?
map(), forEach() and filter() are the array methods in JavaScript version ES6+.
They have some particular uses such as :

- #### `map()`
    - Transform each element and returns a **new arrray**
    - Original array not modified
    - Chainable
- #### `forEach()`
    - Loop over elements and returns **undefined**
    - Original array not modified
    - Not chainable
- #### `filter()`
    - Get elements matching a condition and returns a **new arrray**
    - Original array not modified
    - Not chainable

#### `Example`
    const nums = [1, 2, 3, 4, 5];

    // map  -->  Creates new transformed array
    const squared = nums.map(n => n * n);  
    console.log(squared); // [1, 4, 9, 16, 25]

    // forEach  -->  Only loops, no return
    nums.forEach(n => console.log(n * 2));  
    // output: 2 4 6 8 10

    // filter  -->  Returns elements that match condition
    const evens = nums.filter(n => n % 2 === 0);
    console.log(evens); // [2, 4]

---

### Q-3) What are arrow functions in ES6?

Arrow functions are a shorter syntax for writing functions introduced in ES6.

#### `Key Features`

- Shorter syntax 
- No need for function keyword 
- Implicit return when using one-liner 
- Manual return needed when using multi-liner
- Used arror => sign instead of function keyword.

#### `Syntax`
    // Traditional function
    function add(a, b) {
    return a + b;
    }

    // Arrow function
    const addArrow = (a, b) => a + b;

    console.log(addArrow(5, 3)); // 8

---
### Q-4) How does destructuring assignment work in ES6?

Destructuring allows you to unpack values from arrays or objects into separate variables. But variable name must be same as like as keys for object.

#### `Array Destructuring`
    const colors = ['red', 'green', 'blue'];
    const [first, second] = colors;

    console.log(first);  // 'red'
    console.log(second); // 'green'

#### `Object Destructuring`
    const user = { name: 'Alice', age: 25, city: 'Paris' };
    const { name, city } = user;

    console.log(name); // Alice
    console.log(city); // Paris


#### `Default Values`
    const [a = 10, b = 20] = [5];
    console.log(a, b); // 5, 20


---
### Q-5) Explain template literals in ES6. How are they different from string concatenation?

Template literals are introduced in ES6 and allow us to embed variables and write multi-line strings using backticks (``).


#### `Example`

    const name = "Bob";
    const age = 25;

    // Before ES6 → String concatenation ❌
    console.log("My name is " + name + " and I am " + age + " years old.");

    // With ES6 → Template literals ✅
    console.log(`My name is ${name} and I am ${age} years old.`);

#### `Multi-line Strings`

    const html = `
    <div>
    <h1>Hello</h1>
    <p>This is multi-line text</p>
    </div>`;
    console.log(html);

---