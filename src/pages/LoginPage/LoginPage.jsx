import React from "react";
import { Link } from "react-router-dom";

import MainContent from "../../components/Layouts/MainContent/MainContent";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";

import "./login-page-styles.css";

const LoginPage = () => {
  return (
    <section className="login-page">
      <MainContent>
        <div className="login-form-container">
          <header className="login-header-container">
            <h1>Sign in</h1>
          </header>

          <LoginForm />

          <ul>
            <li className="register-text">
              Don't have an account yet?{" "}
              <Link to="/register" className="link">
                Sign up!
              </Link>
            </li>

            <li className="access-help-text">
              <Link to="/login" className="link">
                Can't access your account?
              </Link>
            </li>
          </ul>
        </div>
      </MainContent>
    </section>
  );
};

export default LoginPage;
