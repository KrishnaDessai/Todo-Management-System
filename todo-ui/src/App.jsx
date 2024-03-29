import "./App.css";
import ListTodoComponent from "./components/ListTodoComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import TodoComponent from "./components/TodoComponent";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./Services/Authservice";
function App() {
  function AuthenticatedRoute({children}) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }
    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path="/" element={<LoginComponent />}></Route>

          {/* http://localhost:3000/todos */}
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* http://localhost:3000/add-todo */}
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* http://localhost:3000/update-todo/id */}
          <Route
            path="/update-todo/:id"
            element={
              <AuthenticatedRoute>
                <TodoComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/*http://Localhost:3000/delete-todo/id */}
          <Route
            path="/delete-todo/:id"
            element={<ListTodoComponent />}
          ></Route>

          {/* http://Localhost:3000/register */}
          <Route path="/register" element={<RegisterComponent />}></Route>

          {/* http://Localhost:3000/login */}
          <Route path="/login" element={<LoginComponent />}></Route>
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
