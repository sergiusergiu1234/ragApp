"use client";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";

export default function LoginHeader() {
  const { user } = useUser();

  return user ? (
    < >
      {/* <span className="text-gray-700 font-medium mr-2">
        {user.name || user.email}
      </span> */}
      <Button asChild variant="outline">
        <a href="/auth/logout">Log out</a>
      </Button>
    </>
  ) : (
    <Button asChild variant="outline">
      <a href="/auth/login">
        <FcGoogle />
        Log in
      </a>
    </Button>
  );
} 