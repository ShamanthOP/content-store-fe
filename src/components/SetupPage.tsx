import { UserButton } from "@clerk/clerk-react";

const SetupPage = () => {
    return (
        <div className="p-4">
            <UserButton afterSignOutUrl="/" />
        </div>
    );
};

export default SetupPage;
