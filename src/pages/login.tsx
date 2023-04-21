import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";

export const Login: NextPage = () => {
  return (
    <>
      <Button onClick={() => signIn()}>Login</Button>
    </>
  );
};

export default Login;
