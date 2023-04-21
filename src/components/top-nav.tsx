import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const TopNavBar = (): JSX.Element => {
  return (
    <Flex bg="blue.500" p={4} color="white">
      <Button>
        <HamburgerIcon />
      </Button>
      <Spacer />
      <Box>Your Logo</Box>
      <Spacer />
      {/* Add more navigation elements here */}
    </Flex>
  );
};

export default TopNavBar;
