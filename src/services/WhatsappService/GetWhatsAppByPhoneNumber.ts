import Whatsapp from "../../models/Whatsapp";
import AppError from "../../errors/AppError";

const GetWhatsAppByPhoneNumber = async (whatsappNumber: string): Promise<Whatsapp> => {
    const whatsapp = await Whatsapp.findOne({
        where: {
            whatsappNumber,
        },
    });

    if (!whatsapp) {
        throw new AppError("ERR_NO_WAPP_FOUND", 404);
    }

    return whatsapp;
};

export default GetWhatsAppByPhoneNumber;
