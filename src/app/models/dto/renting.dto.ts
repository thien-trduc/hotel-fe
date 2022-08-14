import { BaseDto } from "./baste.dto";
import { RentingDetailDto } from "./renting-detail.dto";

export class RentingDto extends BaseDto {

    employee: any;

    booking: any;

    totalPrice: number;

    totalDiscount: number;

    valueDiscount: number;

    rentingCode: string;

    status: number;

    details!: RentingDetailDto[];

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        employee: any,
        booking: any,
        totalPrice: number,
        totalDiscount: number,
        valueDiscount: number,
        rentingCode: string,
        status: number,
    ) {
        super(_id, createdAt, updatedAt)
        this.employee = employee
        this.booking = booking
        this.totalPrice = totalPrice
        this.totalDiscount = totalDiscount
        this.valueDiscount = valueDiscount
        this.rentingCode = rentingCode
        this.status = status
    }

}