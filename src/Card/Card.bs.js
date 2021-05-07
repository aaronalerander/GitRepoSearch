'use strict';

var React = require("react");

function Card(Props) {
  var name = Props.name;
  var description = Props.description;
  var href = Props.href;
  return React.createElement("div", {
              style: {
                border: "2px solid #898989",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "1rem",
                borderRadius: "4px"
              }
            }, React.createElement("h3", undefined, React.createElement("a", {
                      href: href,
                      rel: "noopener noreferrer",
                      target: "_blank"
                    }, name)), React.createElement("p", undefined, description));
}

var make = Card;

exports.make = make;
/* react Not a pure module */
