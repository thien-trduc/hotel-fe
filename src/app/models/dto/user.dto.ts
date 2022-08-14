
export class UserDto {
    userId: string;
    username: string;
    employee: string;


  constructor(userId: string, username: string, employee: string) {
    this.userId = userId
    this.username = username
    this.employee = employee
  }
  

}