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

export interface Category {
    id: string;
    name: string;
    storeId: string;
    billboardId: string;
    billboard: Billboard;
    createdAt: Date;
    updatedAt: Date;
}

export interface Size {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Color {
    id: string;
    name: string;
    value: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Image {
    id: string;
    url: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    isFeatured: boolean;
    isArchived: boolean;
    storeId: string;
    categoryId: string;
    category: Category;
    sizeId: string;
    size: Size;
    colorId: string;
    color: Color;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
}
