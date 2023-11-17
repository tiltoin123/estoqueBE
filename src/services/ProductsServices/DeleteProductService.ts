import AppError from "../../errors/AppError";
import Products from "../../models/Products";


const DeleteProductService = async (id: string | number): Promise<void> => {
    const product = await Products.findOne({
        where: { id }
    });

    if (!product) {
        throw new AppError("ERR_NO_PRODUCT_FOUND", 404);
    }

    ;

    await product.destroy();
};

export default DeleteProductService;
