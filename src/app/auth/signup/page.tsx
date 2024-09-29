"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { BeatLoader } from "react-spinners";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await signup(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black p-4 flex justify-between items-center">
        <div className="text-white text-2xl">Voosh</div>
        <div>
          <Button
            variant="outline"
            className="text-black mr-2"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </div>
      </header>
      <div className="flex-grow flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-black text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4 bg-black hover:bg-gray-800 text-white"
              >
                {isLoading ? (
                  <BeatLoader color="#ffffff" size={8} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <a href="/auth/login" className="text-black">
                Login
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={loginWithGoogle}
            >
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign Up with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
