[@react.component]
let make = (~name, ~description, ~href, _) => {
  <div
    style={ReactDOMRe.Style.make(
      ~border="2px solid #898989",
      ~borderRadius="4px",
      ~padding="1rem",
      ~marginBottom="10px",
      ~marginTop="10px",
      (),
    )}>
    <h3>
      <a href target="_blank" rel="noopener noreferrer">
        {ReasonReact.string(name)}
      </a>
    </h3>
    <p> {ReasonReact.string(description)} </p>
  </div>;
};
