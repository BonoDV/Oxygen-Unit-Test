import { Room } from "./room";

export class Booking {
  name: String;
  email: String;
  checkIn: Date;
  checkOut: Date;
  discount: number;
  room: Room;

  constructor(
    name: string,
    email: String,
    checkIn: Date,
    checkOut: Date,
    discount: number,
    room: Room
  ) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee() {
    if (!(this.checkIn instanceof Date) || !(this.checkOut instanceof Date)) {
      throw new Error("checkIn and checkOut must be Date objects");
    }
    if (this.checkIn >= this.checkOut) {
      throw new Error("checkIn must be less than checkOut");
    }
    if (this.discount < 0 || this.discount > 100) {
      throw new Error("discount must be between 0 and 100");
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const days = Math.ceil(
      (this.checkOut.getTime() - this.checkIn.getTime()) / millisecondsPerDay
    );
    const total = this.room.rate * days;
    return total - (total * this.discount) / 100;
  }
}
