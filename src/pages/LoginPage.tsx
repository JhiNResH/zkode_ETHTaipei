import { Button, Text, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { Center, Heading, VStack, HStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { useState } from "react";

const Login: NextPage = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  const handleGithubLogin = () => {
    setCurrentStep(2);
    // signIn();
  };

  const handleSecondStep = () => {
    setCurrentStep(3);
  };

  const handleNavigation = () => {
    router.push("/NavigationPage");
  };

  return (
    <>
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
      <Center height="80vh" flexDirection="column">
        <Heading as="h1" mb={8}>
          ZKode
        </Heading>
        {currentStep === 1 ? (
          <>
            <Button mt={4} onClick={handleGithubLogin}>
              Github Login
            </Button>
            <HStack spacing="16px" mt={8}>
              <Icon as={MdRadioButtonChecked} boxSize="32px" />
              <Icon as={MdRadioButtonUnchecked} boxSize="32px" />
              <Icon as={MdRadioButtonUnchecked} boxSize="32px" />
            </HStack>
          </>
        ) : currentStep === 2 ? (
          <>
            <Text mb={4}>github log in</Text>
            <Button mt={4} onClick={handleSecondStep}>
              next
            </Button>
            <HStack spacing="16px" mt={8}>
              <Icon as={MdRadioButtonUnchecked} boxSize="32px" />
              <Icon as={MdRadioButtonChecked} boxSize="32px" />
              <Icon as={MdRadioButtonUnchecked} boxSize="32px" />
            </HStack>
          </>
        ) : (
          <>
            <Text mb={4}>Successful!</Text>
            <Button mt={4} onClick={handleNavigation}>
              Go to navigation
            </Button>
            <HStack spacing="16px" mt={8}>
              <Icon as={MdRadioButtonUnchecked} boxSize="32px" />
              <Icon as={MdRadioButtonUnchecked} boxSize="32px" />
              <Icon as={MdRadioButtonChecked} boxSize="32px" />
            </HStack>
          </>
        )}
      </Center>
      </Flex>
    </>
  );
};

export default Login;
