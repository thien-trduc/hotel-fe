import { BaseDto } from './baste.dto';

export class ReceiptDto extends BaseDto {

    receiptCode: string;

    date: Date;

    taxCode: string;

    owner: string;

    totalPrice: number;

    employee: any;

    renting: any;


    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        receiptCode: string,
        date: Date,
        taxCode: string,
        owner: string,
        totalPrice: number,
        employee: any,
        renting: any
    ) {
        super(_id, createdAt, updatedAt)
        this.receiptCode = receiptCode
        this.date = date
        this.taxCode = taxCode
        this.owner = owner
        this.totalPrice = totalPrice
        this.employee = employee
        this.renting = renting
    }

}