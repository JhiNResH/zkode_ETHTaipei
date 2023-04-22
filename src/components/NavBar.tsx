import { Avatar, Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { AtSignIcon, HamburgerIcon } from "@chakra-ui/icons";
const TopNavBar = (): JSX.Element => {
  return (
    <Flex bg="gray.400" p={4} color="black">
      <Button>
        <AtSignIcon/> ZKode 
      </Button>
      <Spacer />
      <Box>
      </Box>
      <Spacer />
      <Button colorScheme='blue' variant='solid'>
        Profile
      </Button>
      {/* Add more navigation elements here */}
    </Flex>
  );
};

export default TopNavBar;
