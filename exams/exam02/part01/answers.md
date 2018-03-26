# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)?  Include a description on how to fix it (code to help your answer is okay but not required.  A non-code description of how to fix it is required).  Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => {
  return data;
});

console.log(data.cats);
```
### Answer:

The response should be checked if it's valid, and it should return json instead of data. correct code should be as follows:

```
const data = fetch('example.com/test')
.then( response => response.ok ? response.json() : Promise.reject(response.status))
.then( json => {
  return json;
})
.catch(status => console.log(status));

console.log(data.cats);
```

## Question: What is the scope of a variable in JS?  How does it relate to closures?

### Answer:

##### Scope:
In JavaScript, there are two scopes, global scope and local scope.
Variables declared outside all functions are in the global scope; variables declared within functions or blocks are in the local scope.
Global scope variables can be accessed from anywhere, including functions. Local scope variables can only be accessed within the functions or blocks that the variables are declared in, also in the nested functions.

##### Relationship to closures:
A closure is an inner function created within a function. It has access to its own variables, its  outer function's local scope variables, and the global scope variables.

## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes?

### Answer:

##### Polyfill:
A polyfill is the code that allows modern functionality to work in older browsers which do not support that functionality.

##### Relationship to prototypes:
Since Array instances inherit from Array.prototype, we can always change the constructor's prototype object to make changes to Array instances. This is what a polyfill does. A polyfill adds new methods and properties to extend Array objects, so that the new Array.prototype functions can be supported in older browsers.

## Question: What is CORS and why is it only in browsers?  How does it relate to Same Origin Policy (SOP) ?

### Answer:

##### CORS:
CORS stands for Cross-origin resource sharing. It is a mechanism that uses additional HTTP headers allowing resources to be shared cross domains. CORS is used for restricted resources on web pages to be requested from servers on different origins, so that a web page may embed resources like images and videos from other domains.

##### Why only in browsers:
There are some security issues when using browsers. When visiting a web page using browsers, cookies contain personal information will be sent to browsers. Browsers can also load resources from different domains. CORS can help to restrict resources and domains so that when using browsers, clients' information will be secured.

##### Relationship to SOP:
Same Origin Policy allows browsers to access resources only from the same origin in order to prevent potentially malicious data. However, in some circumstances SOP is too restrictive. Some large websites that use multiple subdomains are restricted to use resources from other origins. This is when CORS are into use. CORS allows the browser and server to communicate about which requests are or are not allowed.

## Question: What is the difference between a bundler and a transpiler?

### Answer:

A JavaScript bundler is a tool that puts the code and all its dependencies together in one JavaScript file. Browserify is an example of bundler.

A JavaScript transpiler is a tool that reads source code written in one programming language, and produces the equivalent code in another language.

You can either first transpile then bundle, or you can use packages to transpile and bundle together.
