import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={`${className}`}
        type={type}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
