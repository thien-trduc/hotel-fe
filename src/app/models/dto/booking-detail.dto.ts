import { BaseDto } from './baste.dto';

export class BookingDetailDto extends BaseDto {

    roomRank: any;

    booking: any;

    quantity: number;

    price: number;

    totalPrice: number;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        roomRank: any,
        booking: any,
        quantity: number,
        price: number,
        totalPrice: number
    ) {
        super(_id, createdAt, updatedAt)
        this.roomRank = roomRank
        this.booking = booking
        this.quantity = quantity
        this.price = price
        this.totalPrice = totalPrice
    }

}