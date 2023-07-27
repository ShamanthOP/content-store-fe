export interface Store {
    name: string;
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Billboard {
    id: string;
    storeId: string;
    label: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
