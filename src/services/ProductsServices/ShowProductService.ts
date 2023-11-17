import AppError from "../../errors/AppError";
import Products from "../../models/Products";
import Suppliers from "../../models/Suppliers";

const ShowProductService = async (id: string | number): Promise<Products> => {
    const product = await Products.findByPk(id, {
        include: [{
            model: Suppliers,
            as: "supplier",
            attributes: ["nomeFantasia"],
            required: false,
            duplicating: false,
        },],
    });
    if (!product) {
        throw new AppError("ERR_NO_PRODUCT_FOUND", 404);
    }
    return product;
};

export default ShowProductService;
