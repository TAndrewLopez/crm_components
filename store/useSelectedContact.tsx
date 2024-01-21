import { create } from "zustand";

interface SelectedContactProps {
    contact_id: number | null;
    setContactID: (id: number) => void
    resetContactID: () => void
}

export const useSelectedContact = create<SelectedContactProps>((set) => ({
    contact_id: null,
    setContactID: (contact_id) => set(() => ({
        contact_id,
    })),
    resetContactID: () => set(() => ({
        contact_id: null
    }))
}));