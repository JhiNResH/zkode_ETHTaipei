import { Stack } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import TopNavBar from "./top-nav";
import SidebarDrawer from "./sidebar-drawer";

export const AppShell = ({ children }: PropsWithChildren): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Stack>
      <TopNavBar />
      <SidebarDrawer isOpen={isOpen} onClose={handleToggle} />
      {children}
    </Stack>
  );
};

export default AppShell;
