import { BaseDto } from "./baste.dto";

export class DiscountDto extends BaseDto {

    name: string;
    startDate: Date;
    endDate: Date;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        name: string,
        startDate: Date,
        endDate: Date
    ) {
        super(_id, createdAt, updatedAt)
        this.name = name
        this.startDate = startDate
        this.endDate = endDate
    }

}
