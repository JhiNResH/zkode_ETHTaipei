import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarDrawer = ({
  isOpen,
  onClose,
}: SidebarDrawerProps): JSX.Element => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Sidebar</DrawerHeader>

          <DrawerBody>{/* Add your sidebar content here */}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SidebarDrawer;
