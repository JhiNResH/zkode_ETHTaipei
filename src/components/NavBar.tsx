import { Flex, Text, Button } from "@chakra-ui/react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const TopNavBar = (): JSX.Element => {
  const router = useRouter();

  return (
    <>
    <Flex
          bg="gray.900"
          color="white"
          alignItems="center"
          justify="space-between"
          p={4}
          >
          <Link href="/">
            <Text fontSize="3xl" fontWeight="bold" cursor="pointer">
              ZKode
            </Text>
          </Link>
          <Flex>
            <Link href="/Posting">
              <Button colorScheme="blackAlpha" variant="solid" mr={4} size="lg">
                Post
              </Button>
            </Link>
            <Link href="/Proving">
              <Button colorScheme="blackAlpha" variant="solid" mr={4} size="lg">
                Prove
              </Button>
              </Link>
              <Link href="/dashboard">
                <Button colorScheme="blackAlpha" variant="solid" size="lg">
                  Profile
                </Button>
              </Link>
            </Flex>
        </Flex>
        </>
  );
};

export default TopNavBar;
