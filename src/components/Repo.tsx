import { Card, Stack, StackDivider, CardBody, CardHeader, Box, Button, Text, Heading, Spacer} from "@chakra-ui/react";
import { AtSignIcon, HamburgerIcon, StarIcon } from "@chakra-ui/icons";
const Repo = (): JSX.Element => {

  return (
    <Card mb={10}>
        <CardHeader>
          <Heading size='md'>Title</Heading>
        </CardHeader>
      
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Description
              </Heading>
              <Text pt='2' fontSize='sm'>
                This is a description part of the repo!
              </Text>
            </Box>
            
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Owner
              </Heading>
              <Text pt='2' fontSize='sm'>
                Every repo is owned by an anonymous person on the Internet.
              </Text>
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Button>Enter</Button>
              <Spacer></Spacer>
              <Button>Give Rep</Button>
            </Box>

          </Stack>
        </CardBody>
      </Card>
  );
};

export default Repo;
