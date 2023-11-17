import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Store from "../../models/Stores";

interface Request {
    storeName: string;
    email: string;
}

interface Response {
    storeId: number;
    name: string;
    email: string;
}

const CreateStoreService = async ({
    storeName,
    email,
}: Request): Promise<Response> => {
    const schema: any = Yup.object().shape({
        storeName: Yup.string()
            .required()
            .min(6)
            .test(
                "check-name",
                "A store with this name already exists.",
                async (value) => {
                    if (!value) return false;
                    const nameExists = await Store.findOne({
                        where: { name: value },
                    });
                    return !nameExists;
                }
            ),
        email: Yup.string()
            .email()
            .required()
            .test(
                "check-email",
                "A store with this email already exists.",
                async (value) => {
                    if (!value) return false;
                    const emailExists = await Store.findOne({
                        where: { email: value },
                    });
                    return !emailExists;
                }
            ),
    });

    try {
        await schema.validate({ email, storeName });
    } catch (err) {
        console.error(err);
    }

    const store = await Store.create({
        name: storeName,
        email,
    });

    const newStore = {
        storeId: store.id,
        name: store.name,
        email: store.email,
    };
    return newStore;
};

export default CreateStoreService;
