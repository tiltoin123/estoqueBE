import faker from "faker";
import AppError from "../../../errors/AppError";
import AuthUserService from "../../../services/UserServices/AuthUserService";
import CreateUserService from "../../../services/UserServices/CreateUserService";
import { disconnect, truncate } from "../../utils/database";
import { Request } from "express";
describe("Auth", () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should be able to login with an existing user", async () => {
    const password = faker.internet.password();
    const email = faker.internet.email();
    const storeId = 1
    await CreateUserService({
      storeId,
      name: faker.name.findName(),
      email,
      password,
    });

    const response = await AuthUserService({
      email,
      password
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to login with not registered email", async () => {
    try {
      await AuthUserService({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    } catch (err) {
      console.error(err, "invalid credentials")
    }
  });

  it("should not be able to login with incorret password", async () => {
    const storeId = 1
    await CreateUserService({
      storeId,
      name: faker.name.findName(),
      email: "mail@test.com",
      password: faker.internet.password()
    });

    try {
      await AuthUserService({
        email: "mail@test.com",
        password: faker.internet.password()
      });
    } catch (err) {
      console.error(err, '401 invalid credentials')
    }
  });
});
