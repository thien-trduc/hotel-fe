
export class UserCustomerDto {
    userId: string;
    username: string;
    customer: string;


  constructor(userId: string, username: string, customer: string) {
    this.userId = userId
    this.username = username
    this.customer = customer
  }
  

}