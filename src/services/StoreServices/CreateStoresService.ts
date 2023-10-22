import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Store from "../../models/Stores";

interface Request {
    name: string
    email: string
}

interface Response {
    storeId: number
    name: string
    email: string
}

const CreateStoreService = async ({
    name,
    email
}: Request): Promise<Response> => {
    const schema = Yup.object().shape({
        name: Yup.string()
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
        await schema.validate({ email, name });
    } catch (err) {
        throw new AppError(err.message);
    }

    const store = await Store.create({
        name,
        email
    })
    const newStore = {
        storeId: store.id,
        name: store.name,
        email: store.email
    }
    return newStore
}

export default CreateStoreService;