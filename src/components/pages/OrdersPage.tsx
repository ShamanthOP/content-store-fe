import { format } from "date-fns";
import useOrders from "../../hooks/useOrders";
import { priceFormatter } from "../../lib/utils";
import { OrderColumn } from "../Orders/OrderColumns";
import Orders from "../Orders/Orders";

const OrdersPage = () => {
    const { data: orders, isLoading } = useOrders();

    if (isLoading || !orders) {
        return null;
    }

    const formattedOrders: OrderColumn[] = orders.map((order) => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        products: order.orderItems
            .map((orderItem) => orderItem.product.name)
            .join(", "),
        totalPrice: priceFormatter.format(
            order.orderItems.reduce((total, item) => {
                return total + Number(item.product.price);
            }, 0)
        ),
        isPaid: order.isPaid,
        createdAt: format(new Date(order.createdAt), "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Orders data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
