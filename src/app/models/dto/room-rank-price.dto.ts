import { BaseDto } from "./baste.dto";
import { RoomRankDto } from "./room-rank.dto";

export class RoomRankPriceDto extends BaseDto {

    roomRank: RoomRankDto;
    date: Date;
    price: number;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        roomRank: RoomRankDto,
        date: Date,
        price: number
    ) {
        super(_id, createdAt, updatedAt)
        this.roomRank = roomRank
        this.date = date
        this.price = price
    }

}