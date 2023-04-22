import { NextPage } from "next";
import { useRouter } from 'next/router'
import { Text, Flex, Heading, Box, Divider } from "@chakra-ui/react";
import Link from 'next/link';
import Repo from "components/Repo"; 

const NavigationPage: NextPage = () => {

  const arr = Array (100)
  console.log(arr);
  
  return (
    <>
      <Flex
          height="100vh"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
      >
        <Box maxH={'100%'} mt={200}>
          <Repo/>
          
        </Box>
      </Flex>
    </>
  )
};

export default NavigationPage;
