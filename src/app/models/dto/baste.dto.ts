export class BaseDto {
    _id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = _id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}