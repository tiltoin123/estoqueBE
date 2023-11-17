import Products from "../../models/Products";

interface Request {
    storeId: string | number
    name: string;
    price: number;
    description: string;
    unity: string;
    quantity: number;
    supplierId: string | number;
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

const CreateProductService = async ({
    storeId,
    name,
    price,
    description,
    unity,
    quantity,
    supplierId,
}: Request): Promise<Response> => {


    const product = await Products.create(
        {
            storeId,
            name,
            price,
            description,
            unity,
            quantity,
            supplierId,
        },
    );

    await product.reload();


    return product
};

export default CreateProductService;
