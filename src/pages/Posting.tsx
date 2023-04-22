import { NextPage } from "next";
import { AppShell } from "@components";
import { useSession } from "next-auth/react";
import { api } from "@utils";
import { Box, Button, Center, Flex, HStack, Icon, Text, VStack, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import TopNavBar from 'components/NavBar';

export const RepoSelector: NextPage = () => {
  // Inside your Dashboard component
  const { data: session } = useSession();
  const [selectedRepo, setSelectedRepo] = useState("");
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());
  const fetchAndSaveReposMutation =
    api.github.fetchAndSaveRepositories.useMutation({
      onSuccess: (res) => {},
    });

  // const handleCheckboxChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   const repoName = e.target.value;

  //   if (selectedRepos.has(repoName)) {
  //     // Remove repoName from the set
  //     setSelectedRepos((prev) => {
  //       const newSet = new Set(prev);
  //       newSet.delete(repoName);
  //       return newSet;
  //     });
  //   } else {
  //     // Add repoName to the set
  //     setSelectedRepos((prev) => new Set(prev).add(repoName));
  //   }
  // };

  const handleSubmit = (): void => {
    // Submit the selected repos
    setSelectedRepos((prev) => new Set(prev).add(selectedRepo))
    console.log(Array.from(selectedRepos));
    fetchAndSaveReposMutation.mutate({
      accessToken: (session as any)?.accessToken,
      repositoryIds: Array.from(selectedRepos),
    });
  };

  const reposQuery = api.github.getRepositories.useQuery({
    accessToken: (session as any)?.accessToken ?? "",
  });

  const repos = reposQuery.data?.repositories;

  return (
    <AppShell>
      <VStack align="start" spacing={8}>
        <Text fontSize="2xl">Select a repository to share:</Text>
        <HStack spacing={4}>
          {
            repos &&
            repos.map((repo) => (
              <Box
                border="1px solid"
                borderColor={selectedRepo === `${repo.id}` ? 'blue.500' : 'gray.200'}
                borderRadius={4}
                p={4}
                cursor="pointer"
                onClick={() => setSelectedRepo(`${repo.id}`)}
                >
                <Text fontWeight="semibold">{repo.name}</Text>
              </Box>
            ))
          }
          </HStack>
        <Button onClick={handleSubmit}>Submit Selected Repos</Button>
      </VStack>
    </AppShell>
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
                  <RepoSelector/>
              </Flex>
          </Center>
      </>
  );
};

export default Posting;
