import { createContext, useState } from "react";

interface SidebarContextType {
  open: boolean;
  toggleDrawer: VoidFunction;
}

const DEFAULT_VALUE = {
  open: true,
  toggleDrawer: () => {},
};

export const SidebarContext = createContext<SidebarContextType>(
    DEFAULT_VALUE
);

interface ToggleDrawerProps {
  children: React.ReactNode;
}

const ToggleDrawer = ({ children }: ToggleDrawerProps) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default ToggleDrawer;
