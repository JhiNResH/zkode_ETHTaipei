import { NextPage } from "next";
import { AppShell } from "@components";
import { useSession } from "next-auth/react";
import { api } from "@utils";

export const Dashboard: NextPage = () => {
  // Inside your Dashboard component
  const { data: session } = useSession();
  console.log(session);

  const reposQuery = api.github.getRepositories.useQuery({
    accessToken: "",
  });

  console.log(reposQuery.data);

  return (
    <AppShell>
      <h1>123</h1>
    </AppShell>
  );
};

export default Dashboard;
