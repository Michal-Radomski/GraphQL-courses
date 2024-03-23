import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.scss";
import { getUser } from "./lib/auth";
import { apolloClient } from "./lib/graphql/queries";
import NavBar from "./components/NavBar";
import CompanyPage from "./pages/CompanyPage";
import CreateJobPage from "./pages/CreateJobPage";
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import LoginPage from "./pages/LoginPage";

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(getUser);

  const handleLogin = (user: User):void => {
    setUser(user);
    navigate("/");
  };

  const handleLogout = ():void => {
    setUser(null);
    navigate("/");
  };

  return (
    <React.Fragment>
      <ApolloProvider client={apolloClient}>
        <NavBar user={user!} onLogout={handleLogout} />
        <main className="section">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/companies/:companyId" element={<CompanyPage />} />
            <Route path="/jobs/new" element={<CreateJobPage />} />
            <Route path="/jobs/:jobId" element={<JobPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        </main>
      </ApolloProvider>
    </React.Fragment>
  );
};

export default App;
