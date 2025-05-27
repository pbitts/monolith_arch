import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import Address from "../../value-object/address";
import { GenerateInvoiceUseCaseInputDto,
    GenerateInvoiceUseCaseOutputDto
 } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface   {
    private _invoiceRepository: InvoiceGateway;
  
    constructor(invoiceRepository: InvoiceGateway) {
      this._invoiceRepository = invoiceRepository;
    }
  
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode
          );
      
          const items = input.items.map((item) => {
            return new InvoiceItems({
              id: new Id(item.id),
              name: item.name,
              price: item.price,
            });
          });
      
          const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address,
            items,
          });
      
          await this._invoiceRepository.generate(invoice);
      
          return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
              id: item.id.id,
              name: item.name,
              price: item.price,
            })),
            total: invoice.total,
          };
    }
  }