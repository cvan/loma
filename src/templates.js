(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/templates/browse.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/templates/header.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<nav>\n  <a href=\"/submit\" class=\"submit\">";
output += runtime.suppressValue((lineno = 1, colno = 37, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Submit a site","navSubmit"])), env.autoesc);
output += "</a>\n  <a href=\"/\" class=\"browse\">";
output += runtime.suppressValue((lineno = 2, colno = 31, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Browse sites","navBrowse"])), env.autoesc);
output += "</a>\n  <a class=\"button only-signed-out sign-in\">";
output += runtime.suppressValue((lineno = 3, colno = 46, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Sign in","navSignIn"])), env.autoesc);
output += "</a>\n  <a class=\"button only-signed-in sign-out\">";
output += runtime.suppressValue((lineno = 4, colno = 46, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Sign out","navSignOut"])), env.autoesc);
output += "</a>\n  <a class=\"auth only-signed-in avatar sign-out\">\n     <img src=\"";
output += runtime.suppressValue((lineno = 6, colno = 31, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"getSetting", env.autoesc), "user[\"getSetting\"]", ["avatar"])), env.autoesc);
output += "\"> ";
output += runtime.suppressValue((lineno = 6, colno = 61, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "user")),"getSetting", env.autoesc), "user[\"getSetting\"]", ["email"])), env.autoesc);
output += "</a>\n</nav>\n<form class=\"form-search\" action=\"/\">\n  <input type=\"search\" name=\"q\" title=\"\" x-inputmode=\"verbatim\" autocapitalize=\"off\" autocomplete=\"off\" autocorrect=\"off\" placeholder=\"";
output += runtime.suppressValue((lineno = 9, colno = 137, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Search by keyword","searchPlaceholder"])), env.autoesc);
output += "\">\n</form>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/templates/heading.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/templates/results-header.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"query", env.autoesc)) {
output += "\n  <h1>\n    ";
output += runtime.suppressValue((lineno = 2, colno = 6, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["{n} results","resultsNum",{"n": runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"results", env.autoesc)),"length", env.autoesc)}])), env.autoesc);
output += "\n    ";
var t_1;
t_1 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"timing", env.autoesc) / 1000;
frame.set("timing", t_1);
if(!frame.parent) {
context.setVariable("timing", t_1);
context.addExport("timing");
}
output += "\n    <span class=\"speed\">";
output += runtime.suppressValue((lineno = 4, colno = 26, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["(took {time}s)","resultsTime",{"time": env.getFilter("round").call(context, t_1,6,"floor")}])), env.autoesc);
output += "</span>\n  </h1>\n";
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/templates/results.html"] = (function() {function root(env, context, frame, runtime, cb) {
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
output += " title=\"";
output += runtime.suppressValue((lineno = 1, colno = 30, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Score: {score}","resultsScore",{"score": (lineno = 1, colno = 91, runtime.callWrap(runtime.memberLookup((runtime.memberLookup((t_4),"score", env.autoesc)),"toFixed", env.autoesc), "data[\"score\"][\"toFixed\"]", [8]))}])), env.autoesc);
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
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["src/templates/submit.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<h1>";
output += runtime.suppressValue((lineno = 0, colno = 6, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Submit a site","navSubmit"])), env.autoesc);
output += "</h1>\n";
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
