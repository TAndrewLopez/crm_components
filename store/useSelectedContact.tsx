import { create } from "zustand";

interface SelectedContactProps {
    selected_contact_id: number | null;
    setSelectedContactID: (id: number) => void
    resetSelectedContactID: () => void
}

export const useContacts = create<SelectedContactProps>((set) => ({
    selected_contact_id: null,
    setSelectedContactID: (selected_contact_id) => set(() => ({
        selected_contact_id,
    })),
    resetSelectedContactID: () => set(() => ({
        selected_contact_id: null
    }))
}));