import { NextPage } from "next";
import { AppShell } from "@components";
import { useSession } from "next-auth/react";
import { api } from "@utils";
import { VStack, Checkbox, Button } from "@chakra-ui/react";
import { useState } from "react";

export const Dashboard: NextPage = () => {
  // Inside your Dashboard component
  const { data: session } = useSession();
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const repoName = e.target.value;

    if (selectedRepos.has(repoName)) {
      // Remove repoName from the set
      setSelectedRepos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(repoName);
        return newSet;
      });
    } else {
      // Add repoName to the set
      setSelectedRepos((prev) => new Set(prev).add(repoName));
    }
  };

  const handleSubmit = (): void => {
    // Submit the selected repos
    console.log(Array.from(selectedRepos));
  };

  const reposQuery = api.github.getRepositories.useQuery({
    accessToken: (session as any)?.accessToken,
  });

  const repos = reposQuery.data?.repositories;

  return (
    <AppShell>
      <h1>Dashboard</h1>

      <VStack align="start" spacing={4}>
        {repos &&
          repos.map((repo) => (
            <Checkbox
              key={repo.id}
              value={repo.id}
              onChange={handleCheckboxChange}
            >
              {repo.name}
            </Checkbox>
          ))}
        <Button onClick={handleSubmit}>Submit Selected Repos</Button>
      </VStack>
    </AppShell>
  );
};

export default Dashboard;
