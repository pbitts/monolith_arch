import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
  GenerateInvoiceFacadeInputDto,
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export interface UseCasesProps {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecasesProps: UseCasesProps) {
    this._findUsecase = usecasesProps.findUseCase;
    this._generateUsecase = usecasesProps.generateUseCase;
  }
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        throw new Error("Method not implemented.");
    }
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        throw new Error("Method not implemented.");
    }

  generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<void> {
    // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
    return this._generateUsecase.execute(input);
  }
  findInvoice(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return this._findUsecase.execute(input);
  }
}
