import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => ({
  find: jest.fn(),
  generate: jest.fn(),
});

describe("GenerateInvoiceUseCase", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "John Doe",
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Apt 101",
      city: "City",
      state: "State",
      zipCode: "12345-678",
      items: [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
      ],
    };

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.document).toBe(input.document);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
    expect(output.items.length).toBe(2);
    expect(output.total).toBe(300);
    expect(repository.generate).toHaveBeenCalled();
  });
});
