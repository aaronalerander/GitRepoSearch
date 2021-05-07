'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Card$MyReactApp = require("../Card/Card.bs.js");
var LoadingCard$MyReactApp = require("../Card/LoadingCard.bs.js");

function decodeResults(param) {
  return Json_decode.field("items", (function (param) {
                return Json_decode.list((function (param) {
                              return Json_decode.optional((function (json) {
                                            return {
                                                    name: Json_decode.field("name", Json_decode.string, json),
                                                    description: Json_decode.field("description", Json_decode.string, json),
                                                    href: Json_decode.field("html_url", Json_decode.string, json)
                                                  };
                                          }), param);
                            }), param);
              }), param);
}

function getResults(query) {
  return fetch("https://api.github.com/search/repositories?q=" + query).then(function (prim) {
                  return prim.json();
                }).then(function (json) {
                return Promise.resolve(decodeResults(json));
              }).then(function (results) {
              return Promise.resolve(List.map((function (item) {
                                if (item !== undefined) {
                                  return item;
                                }
                                throw {
                                      RE_EXN_ID: "Match_failure",
                                      _1: [
                                        "SearchBar.re",
                                        49,
                                        16
                                      ],
                                      Error: new Error()
                                    };
                              }), List.filter(function (optionalItem) {
                                    return optionalItem !== undefined;
                                  })(results)));
            });
}

var Api = {
  decodeResults: decodeResults,
  getResults: getResults
};

function SearchBar(Props) {
  var match = React.useReducer((function (state, action) {
          if (typeof action === "number") {
            return {
                    input: state.input,
                    isLoading: true,
                    results: state.results
                  };
          } else if (action.TAG === /* UpdateInput */0) {
            return {
                    input: action._0,
                    isLoading: state.isLoading,
                    results: state.results
                  };
          } else {
            return {
                    input: state.input,
                    isLoading: false,
                    results: action._0
                  };
          }
        }), {
        input: "",
        isLoading: false,
        results: /* [] */0
      });
  var dispatch = match[1];
  var state = match[0];
  return React.createElement(React.Fragment, undefined, React.createElement("div", undefined, React.createElement("form", {
                      onSubmit: (function ($$event) {
                          $$event.preventDefault();
                          Curry._1(dispatch, /* Search */0);
                          var value = state.input;
                          getResults(value).then(function (results) {
                                Curry._1(dispatch, {
                                      TAG: /* UpdateResults */1,
                                      _0: results
                                    });
                                return Promise.resolve(undefined);
                              });
                          
                        })
                    }, React.createElement("label", {
                          htmlFor: "search"
                        }, "Search"), React.createElement("input", {
                          id: "search",
                          name: "search ",
                          value: state.input,
                          onChange: (function ($$event) {
                              var value = $$event.target.value;
                              return Curry._1(dispatch, {
                                          TAG: /* UpdateInput */0,
                                          _0: value
                                        });
                            })
                        }), React.createElement("button", {
                          type: "submit"
                        }, "Submit Search")), React.createElement("div", undefined, state.isLoading ? React.createElement(LoadingCard$MyReactApp.make, {}) : $$Array.map((function (param) {
                              var href = param.href;
                              return React.createElement(Card$MyReactApp.make, {
                                          name: param.name,
                                          description: param.description,
                                          href: href,
                                          key: href
                                        });
                            }), $$Array.of_list(state.results)))));
}

var make = SearchBar;

exports.Api = Api;
exports.make = make;
/* react Not a pure module */
