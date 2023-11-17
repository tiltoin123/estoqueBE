import * as Yup from "yup";

import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import ShowSupplierService from "./ShowSupplierService";
import cnpjValidator from "../../helpers/cnpjValidator";

interface SupplierData {
    cnpj?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    tipoJur?: string;
    endereco?: string;
    email?: string;
    telefone?: string
}

interface Request {
    supplierData: SupplierData;
    supplierId: string | number;
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

const UpdateSupplierService = async ({
    supplierData,
    supplierId
}: Request): Promise<Response | undefined> => {
    const supplier = await ShowSupplierService(supplierId);

    const schema = Yup.object().shape({
        email: Yup.string().email(),
    });

    const {
        cnpj,
        razaoSocial,
        nomeFantasia,
        tipoJur,
        endereco,
        email,
        telefone } = supplierData;
    const isCnpjValid = cnpj ? await cnpjValidator(cnpj) : true
    try {
        await schema.validate({ email });
    } catch (err) {
        console.error(err)
    }
    if (isCnpjValid) {

        await supplier.update({
            cnpj,
            razaoSocial,
            nomeFantasia,
            tipoJur,
            endereco,
            email,
            telefone
        });


        await supplier.reload();
        console.log("update f", supplier.id)
        return supplier
    }
};

export default UpdateSupplierService;
