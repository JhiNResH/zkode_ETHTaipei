import { NextPage } from "next";
import { useRouter } from 'next/router'
import { Text, Flex, Heading, Button } from "@chakra-ui/react";


export const Index: NextPage = () => {
  const router = useRouter()  
  const handleOnClick = () => {
    router.push('/LoginPage')
  }

  return (
    <>

      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
      <Heading size="3xl">ZKode</Heading>
      <Text fontSize='2xl'> an anonymous coding sharing platform </Text>
      <Button onClick={handleOnClick} mt={8} bgColor="gray.700" color="white">
        Login
      </Button>
    </Flex>
    </>
  )

};

export default Index;
