import { BaseDto } from "./baste.dto";
import { BookingDetailDto } from "./booking-detail.dto";

export class BookingDto extends BaseDto {

    bookingCode: string;

    date: Date;

    checkInDate: Date;

    checkOutDate: Date;

    price: number;

    status: number;

    customer: any;

    description: string;

    details!: BookingDetailDto[];


    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        bookingCode: string,
        date: Date,
        checkInDate: Date,
        checkOutDate: Date,
        price: number,
        status: number,
        customer: any,
        description: string
    ) {
        super(_id, createdAt, updatedAt)
        this.bookingCode = bookingCode
        this.date = date
        this.checkInDate = checkInDate
        this.checkOutDate = checkOutDate
        this.price = price
        this.status = status
        this.customer = customer
        this.description = description
    }


}