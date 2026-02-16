import "./App.css";
import { Route } from "react-router";
import { Routes } from "react-router";
import { Navigate } from "react-router";
import { useState, Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import Home2 from "./components/Home2";
import About from "./components/About";
import Login from "./components/Login";
import PathNotFoundPage from "./components/PathNotFoundPage";
import Students from "./students/Students";

// Lazy loaded components
const StudentsList = lazy(() => import("./students/StudentsList"));
const StudentDetails = lazy(() => import("./students/StudentDetails"));
const Courses = lazy(() => import("./students/Courses"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <h1>Student Management Portal</h1>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="box">
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          {/* Protected Students Section with nested routes */}
          <Route
            path="/students"
            element={
              <Suspense fallback={<div>Loading Students...</div>}>
                <Students />
              </Suspense>
            }
          >
            <Route
              index
              element={
                isLoggedIn ? (
                  <Suspense fallback={<div>Loading Students...</div>}>
                    <StudentsList />
                  </Suspense>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path=":id"
              element={
                <Suspense fallback={<div>Loading Student Details...</div>}>
                  <StudentDetails />
                </Suspense>
              }
            >
              <Route
                path="courses"
                element={
                  <Suspense fallback={<div>Loading Courses...</div>}>
                    <Courses />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          {/* 404 Page */}
          <Route path="*" element={<PathNotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
