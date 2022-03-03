// Helper function to get functions from a string
function captureStrFunc(str,funcName){
  var rgx = new RegExp(`(?<=\\s|^)${funcName}\\((["'](.*)["'],?)*\\)`)
  return {
    fullFunc: str.match(rgx)[0],
    strArgs: str.match(rgx)[1].split(",")
  }
}

// Transpile the code to vanilla JS
function transpile(code){
  return code.replaceAll("\n",";").split(";").map(x => {
    return x.split(" ").map(y => {
      var getRequire = captureStrFunc(y,"require");
      var getFetchSync = captureStrFunc(y,"fetchSync");
      return y.replaceAll(getRequire.fullFunc,`await import(${getRequire.strArgs[0]})`)
        .replaceAll(getFetchSync.fullFunc,`await fetch(${getFetchSync.strArgs[0]})${getFetchSync.strArgs[1] ? ".then(x => x." + getFetchSync.strArgs[1] + "())"}`)
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

window.RequirES6 = window.RequirES6 || {
  transpile: transpile,
  evalRE: evalRE,
  transpileEval: transpileEval
}
