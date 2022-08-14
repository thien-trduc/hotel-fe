import { BaseDto } from "./baste.dto";

export class BookingOrderDto extends BaseDto {

    roomRank: any;
    quantity: number;
    price: number;
    totalPrice: number;
    user: any;
    customer: any;


    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        roomRank: any,
        quantity: number,
        price: number,
        totalPrice: number,
        user: any,
        customer: any
    ) {
        super(_id, createdAt, updatedAt)
        this.roomRank = roomRank
        this.quantity = quantity
        this.price = price
        this.totalPrice = totalPrice
        this.user = user
        this.customer = customer
    }

}