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
  queueIds?: number[];
  profile?: string;
  whatsappId?: number;
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
  queueIds = [],
  profile = "admin",
  whatsappId
}: Request): Promise<Response> => {
  const confirmationToken = crypto.randomBytes(20).toString('hex')
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
    throw new AppError(err.message);
  }

  const user = await User.create(
    {
      storeId,
      email,
      confirmationToken,
      password,
      name,
      profile,
      whatsappId: whatsappId ? whatsappId : null
    },
    { include: ["queues", "whatsapp"] }
  );

  await user.$set("queues", queueIds);

  await user.reload();

  await sendEmail(user.email, user.confirmationToken)

  return SerializeUser(user);
};

export default CreateUserService;
