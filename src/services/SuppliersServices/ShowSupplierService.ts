import AppError from "../../errors/AppError";
import Suppliers from "../../models/Suppliers";


const ShowSupplierService = async (id: string | number): Promise<Suppliers> => {
    const supplier = await Suppliers.findByPk(id);
    if (!supplier) {
        throw new AppError("ERR_NO_USER_FOUND", 404);
    }
    return supplier;
};

export default ShowSupplierService;
