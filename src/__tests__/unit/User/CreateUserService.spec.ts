import faker from "faker";
import AppError from "../../../errors/AppError";
import CreateUserService from "../../../services/UserServices/CreateUserService";
import { disconnect, truncate } from "../../utils/database";

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to create a new user", async () => {
    const storeId = 1
    const user = await CreateUserService({
      storeId,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user with duplicated email", async () => {
    const storeId = 1
    await CreateUserService({
      storeId,
      name: faker.name.findName(),
      email: "teste@sameemail.com",
      password: faker.internet.password()
    });

    try {
      await CreateUserService({
        storeId,
        name: faker.name.findName(),
        email: "teste@sameemail.com",
        password: faker.internet.password()
      });
    } catch (err) {
      console.error(err)
    }
  });
});
