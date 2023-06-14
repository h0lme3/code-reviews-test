import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  employeeId?: string;
  dob?: string;
}

interface SignupFormProps {
  onSubmit: (values: FormValues) => void;
  userType: "admin" | "customer";
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean // For HTML5 attribute
}

function Input({ label, ...inputProps } : InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps}/>
    </div>
  );
}

export default function SignupForm({ onSubmit, userType }: SignupFormProps) {
  const [values, setValues] = useState<FormValues>({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    password: "",
    employeeId: userType === "admin" ? "" : undefined,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // ------------------------method 1----------------------------
    if (!values.firstName.trim()) {
      alert("Please enter your first name");
      return;
    }
    if (!values.lastName.trim()) {
      alert("Please enter your last name");
      return;
    }
    if (!values.email.trim()) {
      alert("Please enter your email address");
      return;
    }
    if (!values.password.trim()) {
      alert("Please enter your password");
      return;
    }
    if (userType === "admin" && !values.employeeId) {
      alert("Please enter your employee ID");
      return;
    }

    // ------------------------method 2----------------------------
    // const { firstName, lastName, email, password } = values;
    // if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    // if (userType === "admin" && !values.employeeId) {
    //   alert("Please enter your employee ID");
    //   return;
    // }

    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{userType === "admin" ? "Admin Login" : "User Login"}</h1>
      <Input
        label="First Name"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        required
      />
      <Input
        label="Last Name"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        required
      />
      {userType === "admin" && (
        <Input
          label="Employee ID"
          name="employeeId"
          value={values.employeeId || ""}
          onChange={handleChange}
          required
        />
      )}
      <Input
        label="DOB"
        name="dob"
        value={values.dob || ""}
        onChange={handleChange}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
