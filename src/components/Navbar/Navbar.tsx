import { UserButton } from "@clerk/clerk-react";
import useStore from "../../hooks/useStore";
import NavbarItems from "./NavbarItems";
import StoreSwitcher from "./StoreSwitcher";
import { ModeToggle } from "../ui/ModeToggle";

const Navbar = () => {
    const { data: stores } = useStore();

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores!} />
                <NavbarItems className="mx-6" />

                <div className="ml-auto flex items-center space-x-4">
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
