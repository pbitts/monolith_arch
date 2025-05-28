import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: "1",
        name: "P1",
        description: 'des1',
        purchasePrice: 10,
        stock: 1
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("P1");
    expect(response.body.purchasePriceprice).toBe(10);
  });
});