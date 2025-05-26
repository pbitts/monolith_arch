import {
    Column,
    Model,
    PrimaryKey,
    Table,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import {InvoiceModel} from "./invoice.model";
  
  @Table({
    tableName: "invoice_items",
    timestamps: false,
  })
  export class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @ForeignKey(() => InvoiceModel)
    @Column
    declare invoiceId: string;
  
    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel;
  
    @Column
    declare name: string;
  
    @Column
    declare price: number;
  }
  