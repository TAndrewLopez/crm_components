type iLog = {
    username: string;
    description: string;
    createdAt: Date;
};

export const randomLogs: iLog[] = [
    {
        username: "",
        description: "New submission created.",
        createdAt: new Date(2024, 0, 6),
    },

    {
        username: "tandrewlopez",
        description: "Tattoo information updated.",
        createdAt: new Date(2024, 0, 7),
    },

    {
        username: "tandrewlopez",
        description: "Contact information updated.",
        createdAt: new Date(2024, 0, 7),
    },

    {
        username: "",
        description: "Appointment information updated.",
        createdAt: new Date(2024, 0, 7),
    },

    {
        username: "",
        description: "Reference photo updated.",
        createdAt: new Date(2024, 0, 8),
    },

    {
        username: "",
        description: "Deposit paid.",
        createdAt: new Date(2024, 0, 9),
    },

    {
        username: "tandrewlopez",
        description: "Consultation created.",
        createdAt: new Date(2024, 0, 11),
    },

    {
        username: "",
        description: "Appointment created.",
        createdAt: new Date(2024, 0, 1),
    },

    {
        username: "",
        description: "Appointment completed.",
        createdAt: new Date(2024, 0, 16),
    },

    {
        username: "",
        description: "Appointment completed.",
        createdAt: new Date(2024, 0, 16),
    },

    {
        username: "",
        description: "Review created.",
        createdAt: new Date(2024, 0, 18),
    },
];

export const LOGS = randomLogs.sort((a, b) =>
    a.createdAt > b.createdAt ? 1 : -1
);
