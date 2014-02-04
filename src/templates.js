(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["browse.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<header></header>\n<ol></ol>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["header.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<nav>\n  <a href=\"/submit\" class=\"submit\">Submit a site</a>\n  <a href=\"/\" class=\"browse\">Browse sites</a>\n</nav>\n<form class=\"form-search\" action=\"/\">\n  <input type=\"search\" name=\"q\" title=\"\" x-inputmode=\"verbatim\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\" placeholder=\"Search by keyword\">\n</form>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["heading.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"query", env.autoesc)) {
output += "\n  <h1>\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)),"length", env.autoesc), env.autoesc);
output += " ";
output += runtime.suppressValue((lineno = 2, colno = 36, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "pluralise"), "pluralise", ["result",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)])), env.autoesc);
output += "\n      for <b>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"query", env.autoesc), env.autoesc);
output += "</b>\n    ";
var t_1;
t_1 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"timing", env.autoesc) / 1000;
frame.set("timing", t_1);
if(!frame.parent) {
context.setVariable("timing", t_1);
context.addExport("timing");
}
output += "\n    <span class=\"speed\">(took ";
output += runtime.suppressValue(env.getFilter("round").call(context, t_1,6,"floor"), env.autoesc);
output += "s)</span>\n  </h1>\n";
;
}
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results-header.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"query", env.autoesc)) {
output += "\n  <h1>\n    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)),"length", env.autoesc), env.autoesc);
output += " ";
output += runtime.suppressValue((lineno = 2, colno = 36, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "pluralise"), "pluralise", ["result",runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)),"length", env.autoesc)])), env.autoesc);
output += "\n    ";
var t_1;
t_1 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"timing", env.autoesc) / 1000;
frame.set("timing", t_1);
if(!frame.parent) {
context.setVariable("timing", t_1);
context.addExport("timing");
}
output += "\n    <span class=\"speed\">(took ";
output += runtime.suppressValue(env.getFilter("round").call(context, t_1,6,"floor"), env.autoesc);
output += "s)</span>\n  </h1>\n";
;
}
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["results.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc);
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
output += "\" target=\"_blank\">\n      <div class=\"screenshot\" style=\"background-image: url(http://localhost:7000/screenshot?url=";
output += runtime.suppressValue(runtime.memberLookup((t_5),"app_url", env.autoesc), env.autoesc);
output += ")\"></div>\n      <span class=\"name\">";
output += runtime.suppressValue(runtime.memberLookup((t_5),"name", env.autoesc), env.autoesc);
output += "</span>\n    </a>\n  </li>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["submit.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<h1>Submit a site</h1>\n";
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
