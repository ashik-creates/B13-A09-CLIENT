"use client";

import { authClient } from "@/lib/auth-client";
import {
  Alert,
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    toast.success("Registration successful! Please login.");

    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center py-10 bg-[#FFF7D6]">
      <Card className="max-w-96 w-full shadow-lg border bg-[#E6FAFD] border-gray-200">
        <h1 className="text-center text-2xl font-bold">
          Register
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image" type="url">
            <Label>ImageUrl</Label>
            <Input placeholder="Enter imageUrl" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <FieldError />
          </TextField>

          {message && (
            <Alert
              className="bg-blue-100"
              variant="solid"
              color="primary"
              title="Info"
            >
              {message}
            </Alert>
          )}

          <div className="flex gap-2">
            <Button
              className="w-full bg-[#FACC15] text-black"
              type="submit"
            >
              <BiCheck />
              Create Account
            </Button>
          </div>
        </Form>

        <div className="flex justify-center items-center gap-3">
          <Separator />
          <div className="whitespace-nowrap">
            Or sign up with
          </div>
          <Separator />
        </div>

        <Button
          className="max-w-96 w-full mx-auto bg-white"
          variant="outline"
        >
          <BsGoogle className="text-[#FACC15]" />
          Login with google
        </Button>

        <p className="text-center">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-[#06B6D4] cursor-pointer">
              Login
            </span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;