import { BaseDto } from "./baste.dto";

export class RoomCategoryDto extends BaseDto {
    categoryCode: string;
    name: string;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date, 
        categoryCode: string,
        name: string
    ) {
        super(_id, createdAt, updatedAt)
        this.categoryCode = categoryCode
        this.name = name
    }
}
