import { CreditCardIcon, DollarSignIcon, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import Heading from "../ui/Heading";
import { Separator } from "../ui/Separator";
import { getGraphData, priceFormatter } from "../../lib/utils";
import useOrders from "../../hooks/useOrders";
import useProducts from "../../hooks/useProducts";
import Overview from "../Overview";

const DashboardPage = () => {
    const { data: orders, isLoading: isOrdersLoading } = useOrders();
    const { data: products, isLoading: isProductsLoading } = useProducts();

    if (isOrdersLoading || isProductsLoading) {
        return null;
    }

    const paidOrders = orders?.filter((order) => order.isPaid);
    const totalRevenue = paidOrders?.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + Number(item.product.price);
        }, 0);
        return total + Number(orderTotal);
    }, 0);

    const stockCount =
        products?.filter((product) => product.isArchived === false).length ?? 0;

    const graphData = getGraphData(paidOrders ?? []);

    return (
        <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading
                    title="Dashboard"
                    description="Overview of your store"
                />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {priceFormatter.format(totalRevenue ?? 0)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{paidOrders?.length ?? 0}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Products In Stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
