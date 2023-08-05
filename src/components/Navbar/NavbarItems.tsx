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
            href: `/${params.storeId}`,
            label: "Dashboard",
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
        },
        {
            href: `/${params.storeId}/categories`,
            label: "Categories",
        },
        {
            href: `/${params.storeId}/sizes`,
            label: "Sizes",
        },
        {
            href: `/${params.storeId}/colors`,
            label: "Colors",
        },
        {
            href: `/${params.storeId}/products`,
            label: "Products",
        },
        {
            href: `/${params.storeId}/orders`,
            label: "Orders",
        },
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
                        end
                    >
                        {route.label}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default NavbarItems;
