type repository = {
  name: string,
  description: string,
  href: string,
};

type action =
  | UpdateInput(string)
  | UpdateResults(list(repository))
  | Search;

type state = {
  input: string,
  isLoading: bool,
  results: list(repository),
};

//might have to put this module above the react.component decorator
module Api = {
  open Json.Decode;

  let decodeResults =
    field(
      "items",
      list(
        optional(json =>
          {
            name: field("name", string, json),
            description: field("description", string, json),
            href: field("html_url", string, json),
          }
        ),
      ),
    );

  let getResults = query =>
    Js.Promise.(
      Fetch.fetch("https://api.github.com/search/repositories?q=" ++ query)
      |> then_(Fetch.Response.json)
      |> then_(json => decodeResults(json) |> resolve)
      |> then_(results =>
           results
           |> List.filter(optionalItem =>
                switch (optionalItem) {
                | Some(_) => true
                | None => false
                }
              )
           |> List.map(item =>
                switch (item) {
                | Some(item) => item
                }
              )
           |> resolve
         )
    );
};

[@react.component]
let make = _ => {
  //let (input, setInput) = React.useState(_ => "");
  //let (isLoading, setIsLoading) = React.useState(_ => false);
  let myfunc = input => {
    //let value = state.input;
    Js.log(input);
  };

  let (state, dispatch) =
    React.useReducer(
      (state, action) =>
        switch (action) {
        | UpdateResults(results) => {...state, isLoading: false, results}
        | UpdateInput(newInput) => {...state, input: newInput}
        | Search => {...state, isLoading: true}
        },
      {input: "", isLoading: false, results: []},
    );

  <>
    <div>
      <form
        onSubmit={event => {
          ReactEvent.Form.preventDefault(event);
          dispatch(Search);
          //myfunc(state.input);
          let value = state.input;
          
          let _ =
            Api.getResults(value)
            |> Js.Promise.then_(results => {
                 dispatch(UpdateResults(results));
                 Js.Promise.resolve();
               });
          ();
        }}>
        <label htmlFor="search"> {ReasonReact.string("Search")} </label>
        <input
          id="search"
          name="search "
          value={state.input}
          onChange={event => {
            let value = ReactEvent.Form.target(event)##value;
            dispatch(UpdateInput(value));

          }}
        />
        <button type_="submit">
          {ReasonReact.string("Submit Search")}
        </button>
      </form>
      <div>
        {state.isLoading
           ? ReasonReact.string("Loading...")
           : state.results
             |> Array.of_list
             |> Array.map(({name, href, description}) =>
                  <Card key=href name href description />
                )
             |> ReasonReact.array}
      </div>
    </div>
  </>;
};
