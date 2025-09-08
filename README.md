
#### 1) What is the difference between var, let, and const?
    1.    In JavaScript, var, let, and const differ mainly in scope and mutability. var is function-scoped and allows redeclaration, while let and const are block-scoped and do not allow redeclaration within the same block. Variables declared with let can be reassigned, whereas const creates a constant reference that cannot be reassigned.
#### 2) What is the difference between map(), forEach(), and filter()? 
.    map(), forEach(), and filter() are array methods with different purposes. forEach() executes a function for each element but returns undefined. map() transforms each element and returns a new array of the same length. filter() returns a new array containing only elements that pass a given condition.
#### 3) What are arrow functions in ES6?
Arrow functions in ES6 provide a shorter syntax for writing functions using () => {}. They automatically bind the this keyword from their surrounding context, unlike regular functions. This makes them particularly useful in callbacks and object methods.
#### 4) How does destructuring assignment work in ES6?
Destructuring assignment allows you to extract values from arrays or properties from objects into variables in a concise way. For example, const [a, b] = [1, 2] assigns 1 to a and 2 to b. Similarly, const {name, age} = person extracts those properties directly from the object.
#### 5) Explain template literals in ES6. How are they different from string concatenation?
5.    Template literals in ES6 use backticks (`) instead of quotes and support string interpolation with ${expression}. Unlike string concatenation with +, they make it easier to embed variables and expressions directly inside strings. They also allow multi-line strings without needing \n.
