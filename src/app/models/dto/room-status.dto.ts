import { BaseDto } from "./baste.dto";

export class RoomStatusDto extends BaseDto {
    status: string;
    color: string;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date, 
        status: string,
        color: string
    ) {
        super(_id, createdAt, updatedAt)
        this.status = status
        this.color = color
    }
}
