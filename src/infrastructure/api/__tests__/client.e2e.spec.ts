import Address from "../../../modules/invoice/value-object/address";
import { app, sequelize } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { migrator } from "../../../test_migrations/config-migrations/migrator";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { Umzug } from "umzug";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app)
      .post("/client")
      .send({
        id: "1",
        name: "Wesley",
        email: "wesley@fc.com",
        document: "123",
        address: {
          street: "street",
          number: "number",
          city: "city",
          complement: "complement",
          state: "state",
          zipCode: "zipCode",
        },
      });

    expect(response.status).toBe(200);
  });
});
