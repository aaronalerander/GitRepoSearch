[@react.component]
let make = (~name, ~description, ~href, _) => {
  //let (show, setShow) = React.useState(() => true);
  // Notice that instead of `useEffect`, we have `useEffect0`. See
  /*React.useEffect0(() => {
      let id =
        Js.Global.setInterval(
          () => setShow(previousShow => !previousShow),
          1000,
        );

      Some(() => Js.Global.clearInterval(id));
    });

    let style =
      if (show) {
        ReactDOMRe.Style.make(~opacity="1", ~transition="opacity 1s", ());
      } else {
        ReactDOMRe.Style.make(~opacity="0", ~transition="opacity 1s", ());
      };
      */
  <div
    style={ReactDOMRe.Style.make(
      ~border="2px solid #898989",
      ~borderRadius="4px",
      ~padding="1rem",
      (),
    )}>
    // reasonml.github.io/reason-react/docs/en/components#hooks for more info

      <h3>
        <a href target="_blank" rel="noopener noreferrer">
          {ReasonReact.string(name)}
        </a>
      </h3>
      <p> {ReasonReact.string(description)} </p>
    </div>;
};
