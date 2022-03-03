# RequirES6
### Synchronized module loading in JavaScript (kind of)
Use this API to execute a script with synchronized module loading. Scripts using this API will be executed asynchronously, meaning you can also use await in the global scope!
[Script URL](https://kingjango13.github.io/RequirES6/index.js)

## Build Functions
#### transpile(code: string)
Takes the code that you have written using require() and transpiles it to vanilla Javascript

#### evalRE(transpiled: string)
Runs the code that you have transpiled

#### transpileEval(code: string)
Runs the code you have written without having to transpile first

## Code Functions
#### require(url: string)
Load a module synchronously from the url specified. Local urls (./ or ../) not yet supported.

#### fetchSync(url: string, type?: string)
Fetch a resource synchronously fron the specified url. If a type is not specified, a regular response will be returned.
Types:
- **text**: Return the response as text
- **json**: Return the response as json
- **arrayBuffer**: Return the response as an array buffer
- **blob**: Return the response as a blob
