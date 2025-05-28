import { app, sequelize } from "../express";
import request from "supertest";

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
        address: "address1"
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Wesley");
  });
});
 