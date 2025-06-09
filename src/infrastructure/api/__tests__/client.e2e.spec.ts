import Address from "../../../modules/invoice/value-object/address";
import { app } from "../express";
import request from "supertest";
import { Sequelize } from "sequelize-typescript";
import { migrator } from "../../../test_migrations/config-migrations/migrator";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { Umzug } from "umzug";

describe("E2E test for client", () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([ClientModel]);

    migration = migrator(sequelize);
    await migration.up();
  });

  afterEach(async () => {
    if (migration) await migration.down();
    if (sequelize) await sequelize.close();
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
