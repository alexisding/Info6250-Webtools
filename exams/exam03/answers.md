# Questions and Answers for Exam 3

## Question:  Why do I say that JS does not actually have 'classes'?  What is the distinction between a language with (real) classes and a language without?

### Answer:
##### JS does not have 'classes':
JavaScript has prototypes, and prototypes are not classes. Classes are objects that have responsibilities and methods. Classes can manufacture new objects and define the behavior of the objects they manufacture. However, in JavaScript, the constructor manufactures new objects, and the prototype defines the behavior of new objects manufactured by the constructor. The responsibilities that taken by classes are actually distributed to the constructor and the prototype in JavaScript. Therefore, JS does not actually have 'classes'.

##### Distinctions:
Language with classes:

* Classes encapsulate their internal state, presenting an interface for querying and updating object behavior through methods.
* The behavior of an object is defined by classes.

Language without classes:

* (JavaScript) Prototypes provide almost zero encapsulation of their internal state. Methods and other properties are exposed and accessed directly.
* (JavaScript) Prototypes do not inherit behavior from a specialized prototype.


## Question:  Why is it a bad idea to directly modify the DOM when using React?

### Answer:

Direct DOM manipulation makes the whole process inefficient and slow. Each manipulation can trigger layout changes, tree modifications and rendering. Most modern web pages have huge DOM structures and a tiny modification on the DOM would result in slower loading pages. Therefore, React popularized the Virtual DOM: whatever changes need to be made to the DOM, React does that to this Virtual DOM and syncs the Real DOM accordingly.

## Question:  What is composition, and why is it often favored over inheritance?

### Answer:

##### Composition:
When a Field’s type is a class, the field will hold a reference to another object. Composition is an instance of an object has references to instances of other objects. It is when the class uses another object to provide some or all of its functionality.

##### Composition over inheritance:
Javascript doesn't have multiple inheritance. Composition, however, can give the functionality. There are no limits on combining functionality.

## Question:  Why can code using 'import' not be run directly by NodeJS?  

### Answer:

NodeJS is using CommonJS module format. It uses 'require' to cache modules and doesn't support 'import'. 'Import' is a new syntax using in ES6. It needs to be converted to ES5 using babel and then to be run by NodeJS.

## Question:  Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:

The module loading with 'import' or 'require' are not supported by most browsers. The specification for the modules is not complete. To run directly in most browsers, we have to use module bundlers like Browserify, Rollup or Webpack to bundle the small packages into one for browsers to execute.

## Question:  What is a 'side-effect'?  Why do we want to minimize them?

### Answer:

##### Side-effect:
A side-effect is any application state change that is observable outside the called function other than its return value.

##### Why minimize side-effect:
Side effects can cause bugs by interacting in unpredictable ways, and the functions that produce them are harder to test thanks to their reliance on the context and history of the program’s state. To minimize side effects can make the effects of a program much easier to understand, and much easier to test.
