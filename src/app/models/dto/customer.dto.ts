import { BaseDto } from './baste.dto';

export class CustomerDto extends BaseDto {
    
    idCard: string;

    fullName: string;
    
    phone: string;

    address: string;

    email: string;

  constructor(
    _id: string,
    createdAt: Date,
    updatedAt: Date,
    idCard: string, 
    fullName: string, 
    phone: string, 
    address: string, 
    email: string
) {
    super(_id, createdAt, updatedAt)
    this.idCard = idCard
    this.fullName = fullName
    this.phone = phone
    this.address = address
    this.email = email
  }

}