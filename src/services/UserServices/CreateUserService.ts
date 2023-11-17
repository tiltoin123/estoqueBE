import * as Yup from "yup";
import crypto from "crypto"
import AppError from "../../errors/AppError";
import { SerializeUser } from "../../helpers/SerializeUser";
import User from "../../models/User";
import sendEmail from "../../helpers/sendEmail";

interface Request {
  storeId: number
  email: string;
  password: string;
  name: string;
  profile?: string;
}

interface Response {
  email: string;
  name: string;
  id: number;
  profile: string;
}

const CreateUserService = async ({
  storeId,
  email,
  password,
  name,
  profile = "admin",
}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required().min(2),
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

  try {
    await schema.validate({ email, password, name });
  } catch (err) {
    console.error(err)
  }

  const user = await User.create(
    {
      storeId,
      email,
      password,
      name,
      profile,
    },
  );

  await user.reload();

  return SerializeUser(user);
};

export default CreateUserService;
