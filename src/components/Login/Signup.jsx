import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { set, useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div>
        <Logo width="100%" />
      </div>
      <h2>Sign in to your account</h2>
      <p>
        Already have an account?&nbsp;
        <Link to="/login">Sign In</Link>
      </p>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit(create)}>
        <div>
          <Input
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
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
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
