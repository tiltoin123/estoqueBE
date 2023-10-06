import * as Yup from "yup";
import AppError from "../../errors/AppError";
import Store from "../../models/Stores";

interface Request {
    storeName: string
    email: string
    storeSite?: string
}

interface Response {
    storeId: number
    name: string
    email: string
    siteUrl: string
}

const CreateStoreService = async ({
    storeName,
    email,
    storeSite
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
        storeSite: Yup.string().when(
            'storeSite',
            (storeSite: string, schema: any) => {
                if (storeSite !== null && storeSite !== undefined) {
                    return schema
                        .required()
                        .test(
                            'check-site',
                            'A store with this site already exists.',
                            async (value: any) => {
                                if (!value) return false;
                                const siteExists = await Store.findOne({
                                    where: { site: value },
                                });
                                return !siteExists;
                            }
                        );
                }

                // If storeSite is null or undefined, no test is applied
                return schema;
            }
        ),
    });

    try {
        await schema.validate({ email, storeName, storeSite });
    } catch (err) {
        console.error(err)
    }

    const store = await Store.create({
        name: storeName,
        email,
        siteUrl: storeSite
    });

    const newStore = {
        storeId: store.id,
        name: store.name,
        email: store.email,
        siteUrl: store.siteUrl
    };
    return newStore;
};

export default CreateStoreService;
