import { BaseDto } from "./baste.dto";

export class RoomTypeDto extends BaseDto {
    typeCode: string;
    name: string;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        typeCode: string,
        name: string
    ) {
        super(_id,createdAt,updatedAt)
        this.typeCode = typeCode
        this.name = name
    }

}