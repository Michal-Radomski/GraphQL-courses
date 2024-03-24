import React from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/graphql/client";

import { getUser, logout } from "./lib/auth";
import Chat from "./components/Chat";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";

function App(): JSX.Element {
  const [user, setUser] = React.useState<string | null | undefined>(getUser);

  const handleLogout = (): void => {
    logout();
    setUser(null);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <header>
        <NavBar user={user as string | null} onLogout={handleLogout} />
      </header>
      <main>{Boolean(user) ? <Chat user={user as string} /> : <LoginForm onLogin={setUser} />}</main>
    </ApolloProvider>
  );
}

export default App;
