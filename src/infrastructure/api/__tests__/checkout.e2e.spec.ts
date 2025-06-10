import { app, sequelize } from "../express";
import request from "supertest";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductAdmModel } from "../../../modules/product-adm/repository/product.model";
import { Sequelize } from "sequelize-typescript";
import { migrator } from "../../../test_migrations/config-migrations/migrator";
import { Umzug } from "umzug";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "1",
      name: "client 1",
      email: "client@email.com",
      street: "street",
      number: "number",
      city: "city",
      complement: "complement",
      state: "state",
      zipcode: "zipCode",
      document: "0",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductAdmModel.create({
      id: "1",
      name: "P1",
      description: "description",
      purchasePrice: 100,
      salesPrice: 200,
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductAdmModel.create({
      id: "2",
      name: "P2",
      description: "description",
      purchasePrice: 200,
      salesPrice: 200,
      stock: 200,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(400);
    expect(response.body.status).toEqual("approved");
  });
});
