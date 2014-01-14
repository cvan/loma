(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["heading.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)),"length", env.autoesc), env.autoesc);
output += " ";
output += runtime.suppressValue((lineno = 0, colno = 32, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "pluralise"), "pluralise", ["result",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)])), env.autoesc);
output += "\n";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"query", env.autoesc)) {
output += "\n  for &ldquo;";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"query", env.autoesc), env.autoesc);
output += "&rdquo;\n";
;
}
output += "\n";
var t_1;
t_1 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"timing", env.autoesc) / 1000;
frame.set("timing", t_1);
if(!frame.parent) {
context.setVariable("timing", t_1);
context.addExport("timing");
}
output += "\n<span class=\"speed\">(took ";
output += runtime.suppressValue(env.getFilter("round").call(context, t_1,6,"floor"), env.autoesc);
output += "s)</span>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "results");
if(t_3) {for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("data", t_4);
output += "\n  <li";
if(runtime.memberLookup((t_4),"score", env.autoesc)) {
output += " title=\"Score: ";
output += runtime.suppressValue((lineno = 1, colno = 54, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_4),"score", env.autoesc)),"toFixed", env.autoesc), "data[\"score\"][\"toFixed\"]", [8])), env.autoesc);
output += "\"";
;
}
output += ">\n    ";
var t_5;
t_5 = runtime.memberLookup((t_4),"doc", env.autoesc);
frame.set("doc", t_5);
if(!frame.parent) {
context.setVariable("doc", t_5);
context.addExport("doc");
}
output += "\n    <a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_5),"app_url", env.autoesc), env.autoesc);
output += "\" target=\"_blank\">\n      ";
if(runtime.memberLookup((t_5),"icon", env.autoesc) && runtime.memberLookup((runtime.memberLookup((t_5),"icon", env.autoesc)),"url", env.autoesc)) {
output += "\n        <!--<span class=\"icon\" style=\"background-image: url(";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_5),"icon", env.autoesc)),"url", env.autoesc), env.autoesc);
output += ")\"></span>-->\n      ";
;
}
output += "\n      ";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name", env.autoesc), env.autoesc);
output += "\n    </a>\n  </li>\n";
;
}
}
frame = frame.pop();
output += "\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
