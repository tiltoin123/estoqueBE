import Whatsapp from "../../models/Whatsapp";
import AppError from "../../errors/AppError";

const GetWhatsAppByStoreId = async (storeId: number): Promise<Whatsapp> => {
    const whatsapp = await Whatsapp.findOne({
        where: {
            storeId,
        },
    });

    if (!whatsapp) {
        throw new AppError("ERR_NO_WAPP_FOUND", 404);
    }

    return whatsapp;
};

export default GetWhatsAppByStoreId;
