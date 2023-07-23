import React from "react";
import { cn } from "../../lib/utils";
import { NavLink, useParams } from "react-router-dom";

const NavbarItems = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const params = useParams();

    if (!params.storeId) {
        return null;
    }

    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
        },
    ];

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
        >
            {routes.map((route) => {
                return (
                    <NavLink
                        key={route.href}
                        to={route.href}
                        className={({ isActive }) =>
                            cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive
                                    ? "text-black dark:text-white"
                                    : "text-muted-foreground"
                            )
                        }
                    >
                        {route.label}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default NavbarItems;
