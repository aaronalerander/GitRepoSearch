'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var SearchBar$MyReactApp = require("./SearchBar/SearchBar.bs.js");
var ExampleStyles$MyReactApp = require("./ExampleStyles.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$MyReactApp.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(SearchBar$MyReactApp.make, {}), makeContainer("Github Repo Search"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
