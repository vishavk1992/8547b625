import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import ActivityFeed from "./components/ActivityFeed.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";
import ArchivedCalls from "./components/ArchivedCalls.jsx";
import Footer from "./Footer.jsx";
import "./css/app.css";
import AllCalls from "./components/AllCalls.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="container-view">
          <Routes>
            <Route path="/" element={<ActivityFeed />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
            <Route path="/archived" element={<ArchivedCalls />} />
            <Route path="/call-log" element={<AllCalls />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
