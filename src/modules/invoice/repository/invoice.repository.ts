import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import Address from "../value-object/address";
import { InvoiceItemModel } from "./invoice-items.model";
import { InvoiceModel } from "./invoice.model";


export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address._state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
      },
      {
        include: [InvoiceItemModel],
      }
    );
  }

  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id },
      include: ["items"],
    });

    if (!invoiceModel) {
      throw new Error(`Invoice with id ${id} not found`);
    }

    const address = new Address(
      invoiceModel.street,
      invoiceModel.number,
      invoiceModel.complement,
      invoiceModel.city,
      invoiceModel.state,
      invoiceModel.zipCode
    );

    const items = invoiceModel.items.map(
      (item) =>
        new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price,
        })
    );

    return new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address,
      items,
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt,
    });
  }
}
