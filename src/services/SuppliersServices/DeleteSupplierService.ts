import AppError from "../../errors/AppError";
import Suppliers from "../../models/Suppliers";


const DeleteSupplierService = async (id: string | number): Promise<void> => {
    const supplier = await Suppliers.findOne({
        where: { id }
    });

    if (!supplier) {
        throw new AppError("ERR_NO_USER_FOUND", 404);
    }

    ;

    await supplier.destroy();
};

export default DeleteSupplierService;
