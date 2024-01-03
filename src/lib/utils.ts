import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Order } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
});

export const getGraphData = (paidOrders: Order[]) => {
    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of paidOrders) {
        const month = new Date(order.createdAt).getMonth();
        let revenueForOrder = 0;

        for (const item of order.orderItems) {
            revenueForOrder += Number(item.product.price);
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const graphData: { name: string; total: number }[] = [
        { name: "Jan", total: 0 },
        { name: "Feb", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Apr", total: 0 },
        { name: "May", total: 0 },
        { name: "Jun", total: 0 },
        { name: "Jul", total: 0 },
        { name: "Aug", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ];

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return graphData;
};
