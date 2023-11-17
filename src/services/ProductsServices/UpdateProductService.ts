import * as Yup from "yup";
import ShowProductService from "./ShowProductService";


interface ProductData {
    name?: string;
    price?: number;
    description?: string;
    unity?: string;
    quantity?: number;
    supplierId?: string | number;
}

interface Request {
    productData: ProductData;
    productsId: string | number;
}

interface Response {
    id: number
    storeId: string | number
    name: string;
    price: number;
    description: string;
    unity: string;
    quantity: number;
    supplierId: string | number;
}

const UpdateProductService = async ({
    productData,
    productsId
}: Request): Promise<Response | undefined> => {
    const product = await ShowProductService(productsId);


    const {
        name,
        price,
        description,
        unity,
        quantity,
        supplierId, } = productData;


    await product.update({
        name,
        price,
        description,
        unity,
        quantity,
        supplierId,
    });


    await product.reload();

    return product

};

export default UpdateProductService