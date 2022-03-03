// Helper function to get functions from a string
function captureStrFunc(str,funcName){
  var rgx = new RegExp(`(?<=\\s|^)${funcName}\\((["'].*["'],?)*\\)`)
  var match = str.match(rgx) || [null];
  return {
    rgx: rgx,
    fullFunc: match[0],
    strArgs: match[1] ? match[1].split(",") : null
  }
}

// Transpile the code to vanilla JS
function transpile(code){
  return code.replaceAll("\n",";").split(";").map(x => {
    return x.split(" ").map(y => {
      var getRequire = captureStrFunc(y,"require");
      var getFetchSync = captureStrFunc(y,"fetchSync");
      if(getRequire){
        y = y.replaceAll(getRequire.fullFunc,`await import(${getRequire.strArgs[0]})`);
      }
      if(getFetchSync){
        var type = getFetchSync.strArgs[1];
        y = y.replaceAll(getFetchSync.fullFunc,`await fetch(${getFetchSync.strArgs[0]})${type ? ".then(x => x." + type + "())" : ""}`);
      }
      return y;
    }).join(" ");
  }).join(";");
}

// Run the transpiled code
function evalRE(transpiled){
  const AsyncFunction = (async() => {}).constructor;
  var func = new AsyncFunction(transpiled);
  func();
}

// Run code with a built in transpiler
const transpileEval = (code) => evalRE(transpile(code));

window.RequirES6 = window.RequirES6 || {
  transpile: transpile,
  evalRE: evalRE,
  transpileEval: transpileEval
};
