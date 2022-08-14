import { BaseDto } from "./baste.dto";

export class RentingDetailDto extends BaseDto {

    checkInDate: Date;

    checkOutDate: Date;

    paymentStatus: boolean;

    billNumber: string;

    renting: any;

    room: any;


    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        checkInDate: Date,
        checkOutDate: Date,
        paymentStatus: boolean,
        billNumber: string,
        renting: any,
        room: any
    ) {
        super(_id, createdAt, updatedAt)
        this.checkInDate = checkInDate
        this.checkOutDate = checkOutDate
        this.paymentStatus = paymentStatus
        this.billNumber = billNumber
        this.renting = renting
        this.room = room
    }

}