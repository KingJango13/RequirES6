// Transpile the code to vanilla JS
function transpile(code){
  return code.replaceAll("\n",";").split(";").map(x => {
    return x.split(" ").map(y => {
      if(/require\(((['"]).*(['"]))*\)/g.test(y)){
        var scriptURL = y.match(/(?<=['"]).*/g)[0]
        console.log(scriptURL.substr(0,scriptURL.length - 1))
        return `await import("${scriptURL.substr(0,scriptURL.length - 2)}")`
      }
      return y;
    }).join(" ")
  }).join(";")
}

// Run the transpiled code
function evalRE(transpiled){
  const AsyncFunction = (async() => {}).constructor
  var func = new AsyncFunction(transpiled)
  func()
}

// Run code with a built in transpiler
const transpileEval = (code) => evalRE(transpile(code))
