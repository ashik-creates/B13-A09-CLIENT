"use client";
import { authClient } from "@/lib/auth-client";
import {
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
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";
import { BsGoogle } from "react-icons/bs";

const LoginPage = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Successfully logged in");
      router.push("/");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-[#E6FAFD] ">
      <Card className="max-w-96 w-full shadow-lg border bg-[#FFF7D6] border-gray-200">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
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

          <div></div>
          <div className="flex gap-2 ">
            <Button className={"w-full bg-[#06B6D4] text-white"} type="submit">
              <BiCheck />
              Login
            </Button>
          </div>
        </Form>
        <div className="flex justify-center items-center gap-3">
          <Separator />
          <div className="whitespace-nowrap"> Or sign up with </div>
          <Separator />
        </div>
        <Button className="max-w-96 w-full mx-auto bg-white" variant="outline">
          <BsGoogle className="text-[#06B6D4]" />
          Login with google
        </Button>

        <p className="text-center">
          {"Don't have an account? "}
          <Link href={"/register"}>
            <span className="text-[#b4930c] cursor-pointer bl">Register</span>
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
