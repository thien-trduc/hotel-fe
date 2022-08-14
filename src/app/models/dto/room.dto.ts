import { BaseDto } from './baste.dto';

export class RoomDto extends BaseDto {

    roomCode: string;

    description: string;

    roomRank: any;

    roomStatus: any;


    constructor(
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        roomCode: string,
        description: string,
        roomRank: any,
        roomStatus: any
    ) {
        super(_id,createdAt,updatedAt)
        this.roomCode = roomCode
        this.description = description
        this.roomRank = roomRank
        this.roomStatus = roomStatus
    }

}