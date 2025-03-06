import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store";
import { Slide, ToastContainer } from "react-toastify";
import { AuthLayout, CustomerForm } from "./components";
import MainLayout from "./components/MainLayout";

const App = () => {
  return (
    <main>
      <ToastContainer
        transition={Slide}
        position="top-right"
        theme="colored"
        rtl={false}
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        hideProgressBar
        draggable
        newestOnTop
        closeOnClick
      />

      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/customerForm" element={<CustomerForm />} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route index element={<Navigate to="login" />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </main>
  );
};

export default App;
