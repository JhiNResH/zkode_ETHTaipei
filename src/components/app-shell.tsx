import { Stack } from "@chakra-ui/react";
import { PropsWithChildren, useState } from "react";
import TopNavBar from "./top-nav";
import SidebarDrawer from "./sidebar-drawer";
import Home from "pages/example";
export const AppShell = ({ children }: PropsWithChildren): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Stack>
      <TopNavBar />
      <SidebarDrawer isOpen={isOpen} onClose={handleToggle} />
      <Home />
      {children}
    </Stack>
  );
};

export default AppShell;
