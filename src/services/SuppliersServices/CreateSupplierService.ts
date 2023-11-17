import * as Yup from "yup";
import crypto from "crypto"
import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import User from "../../models/User";
import sendEmail from "../../helpers/sendEmail";
import cnpjValidator from "../../helpers/cnpjValidator";
import Suppliers from "../../models/Suppliers";

interface Request {
    storeId: number
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    tipoJur: string;
    endereco: string;
    email: string;
    telefone: string
}

interface Response {
    id: number
    storeId: number
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    tipoJur: string;
    endereco: string;
    email: string;
    telefone: string
}

const CreateSupplierService = async ({
    storeId,
    cnpj,
    razaoSocial,
    nomeFantasia,
    tipoJur,
    endereco,
    email,
    telefone
}: Request): Promise<Response> => {
    const isCnpjValid = await cnpjValidator(cnpj)
    const schema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required()
            .test(
                "Check-email",
                "An user with this email already exists.",
                async value => {
                    if (!value) return false;
                    const emailExists = await User.findOne({
                        where: { email: value }
                    });
                    return !emailExists;
                }
            ),
        password: Yup.string().required().min(5)
    });

    if (isCnpjValid) {
        try {
            await schema.validate({ email, });
        } catch (err) {
            console.error(err)
        }
    }

    const supplier = await Suppliers.create(
        {
            storeId,
            cnpj,
            razaoSocial,
            nomeFantasia,
            tipoJur,
            endereco,
            email,
            telefone
        },
    );

    await supplier.reload();


    return supplier
};

export default CreateSupplierService;
