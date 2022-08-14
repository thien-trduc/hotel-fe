import { BaseDto } from "./baste.dto";
import { DiscountDto } from "./discount.dto";
import { RoomCategoryDto } from "./room-category.dto";
import { RoomTypeDto } from "./room-type.dto";

export class RoomRankDto extends BaseDto {

    name: string;
    description: string;
    images: string[];
    roomType: any;
    roomCategory: any;
    priceText: string;
    dateText: string;
    price: number;
    priceDiscount: number;
    priceDiscountText: string;
    discount: any;
    isDiscount: boolean;
    discountValue!: number;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        name: string,
        description: string,
        images: string[],
        roomType: any,
        roomCategory: any,
        priceText: string,
        dateText: string,
        price: number,
        priceDiscount: number,
        priceDiscountText: string,
        isDiscount: boolean,
        discount: any,
    ) {
        super(_id, createdAt, updatedAt)
        this.name = name
        this.description = description
        this.images = images
        this.roomType = roomType
        this.roomCategory = roomCategory
        this.priceText = priceText
        this.dateText = dateText
        this.price = price
        this.priceDiscount = priceDiscount
        this.priceDiscountText = priceDiscountText
        this.isDiscount = isDiscount
        this.discount= discount
    }

}