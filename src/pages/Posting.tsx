import { useState } from 'react';
import { Box, Button, Center, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import TopNavBar from 'components/NavBar';

const RepoSelector = ({ onNextStep }) => {
    const [selectedRepo, setSelectedRepo] = useState('');

    const handleSelectRepo = (repoName) => {
        setSelectedRepo(repoName);
    };

    const handleSubmit = () => {
        // Send selected repo to server
        onNextStep();
    };

    return (
        <VStack align="start" spacing={8}>
            <Text fontSize="2xl">Select a repository to share:</Text>
            <HStack spacing={4}>
                <Box
                    border="1px solid"
                    borderColor={selectedRepo === 'repo1' ? 'blue.500' : 'gray.200'}
                    borderRadius={4}
                    p={4}
                    cursor="pointer"
                    onClick={() => handleSelectRepo('repo1')}
                >
                    <Text fontWeight="semibold">Repo 1</Text>
                    <Text color="gray.500">Lorem ipsum dolor sit amet</Text>
                </Box>
                <Box
                    border="1px solid"
                    borderColor={selectedRepo === 'repo2' ? 'blue.500' : 'gray.200'}
                    borderRadius={4}
                    p={4}
                    cursor="pointer"
                    onClick={() => handleSelectRepo('repo2')}
                >
                    <Text fontWeight="semibold">Repo 2</Text>
                    <Text color="gray.500">Lorem ipsum dolor sit amet</Text>
                </Box>
            </HStack>
            <Button onClick={handleSubmit} disabled={!selectedRepo}>
                Submit
            </Button>
        </VStack>
    );
};

const Posting = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    return (
        <>
            <TopNavBar />
            <Center h="100vh">
                <Flex flexDir="column" justifyContent="center">
                    <RepoSelector onNextStep={handleNextStep} />
                </Flex>
            </Center>
        </>
    );
};

export default Posting;
