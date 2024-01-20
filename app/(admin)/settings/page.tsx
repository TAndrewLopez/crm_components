import { PageWrapper } from "@/components/pageWrapper";

const SettingsPage = () => {
    return (
        <PageWrapper>
            <h1 className="text-4xl font-semibold">Settings</h1>
            <p>User can edit their settings.</p>
            <p>Can change their sort setting for bookmarks.</p>
            <p>Can update their contact information.</p>
            <p>New image or new image url?</p>
        </PageWrapper>
    );
};

export default SettingsPage;
