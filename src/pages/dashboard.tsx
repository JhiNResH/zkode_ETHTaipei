import { NextPage } from "next";
import AppShell from "~/components/app-shell";
import { useSession } from "next-auth/react";

export const Dashboard: NextPage = () => {
  // Inside your Dashboard component
  const { data: session } = useSession();
  console.log(session);

  return (
    <AppShell>
      <h1>Dashboard</h1>
    </AppShell>
  );
};

export default Dashboard;
