import { create } from "zustand";

interface SidebarProps {
    isOpen: boolean;
    onExpand: () => void
    onCollapse: () => void
}

export const useSidebar = create<SidebarProps>((set) => ({
    isOpen: false,
    onExpand: () => set(() => ({ isOpen: true })),
    onCollapse: () => set(() => ({ isOpen: false }))
}))