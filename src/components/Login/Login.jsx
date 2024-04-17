import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div>
        <div>
          <Logo width="100%" />
        </div>
        <h2>Sign in to your account</h2>
        <p>
          Don&apos;t have any account?&nbsp;
          <Link to="/signup">Sign Up</Link>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="passwword"
              {...register("password", { required: true })}
            />
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
