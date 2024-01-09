import { create } from "zustand";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const useSidebar = create<SidebarProps>((set) => ({
    isOpen: false,
    toggleSidebar: () => set(({ isOpen }) => ({
        isOpen: !isOpen
    }))
}))