import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { Context } from "./context/Context";
import Home from "./Home";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://vwlyc.sse.codesandbox.io/",
  });

  const [page, setPage] = useState("1");
  const [name, setName] = useState("");

  return (
    <Context.Provider value={{ page, name, setPage, setName }}>
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </Context.Provider>
  );
}

export default App;
