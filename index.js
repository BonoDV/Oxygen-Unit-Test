class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings; // Array of booking objects
    this.rate = rate; // Int price in cents
    this.discount = discount; // Int percentage
  }

  isOcuppied(date) {}

  occupancyPercentage(rooms, startDate, endDate) {}

  static totalOccupancyPercentage(rooms, startDate, endDate) {}

  static avalaibleRooms(rooms, startDate, endDate) {}
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name; // String
    this.email = email; // String
    this.checkIn = checkIn; // Date
    this.checkOut = checkOut; // Date
    this.discount = discount; // Int percentage
    this.room = room; // Room object
  }

  getFee() {}
}
