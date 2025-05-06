class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings; // Array of booking objects
    this.rate = rate; // Int price in cents
    this.discount = discount; // Int percentage
  }

  isOcuppied(date) {
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    return this.bookings.some((booking) => {
      const checkIn = new Date(booking.checkIn).setHours(0, 0, 0, 0);
      const checkOut = new Date(booking.checkOut).setHours(0, 0, 0, 0);
      return targetDate >= checkIn && targetDate < checkOut;
    });
  }

  occupancyPercentage(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return Error("Invalid date format");
    }
    if (startDate >= endDate) {
      return Error("startDate must be less than endDate");
    }
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const bookedDays = this.bookings.reduce((acc, booking) => {
      const checkIn = new Date(booking.checkIn).setHours(0, 0, 0, 0);
      const checkOut = new Date(booking.checkOut).setHours(0, 0, 0, 0);
      if (checkIn < endDate && checkOut > startDate) {
        const overlapStart = Math.max(checkIn, startDate);
        const overlapEnd = Math.min(checkOut, endDate);
        return (
          acc + Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24))
        );
      }
      return acc;
    }, 0);
    return (bookedDays / totalDays) * 100;
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return Error("Invalid date format");
    }

    if (startDate >= endDate) {
      return Error("startDate must be less than endDate");
    }
    if (rooms.length === 0) return 0;

    const total = rooms.reduce((sum, room) => {
      return sum + room.occupancyPercentage(startDate, endDate);
    }, 0);

    return total / rooms.length;
  }

  static avalaibleRooms(rooms, startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      throw new Error("Invalid date format");
    }

    if (startDate >= endDate) {
      throw new Error("startDate must be less than endDate");
    }

    if (rooms.length === 0) return [];

    return rooms.filter((room) => {
      for (
        let day = new Date(startDate);
        day < endDate;
        day.setDate(day.getDate() + 1)
      ) {
        if (room.isOcuppied(new Date(day))) {
          return false; // Está ocupada al menos un día → no es válida
        }
      }
      return true; // Libre todo el rango → sí se incluye
    });
  }
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
    const days = Math.ceil((this.checkOut - this.checkIn) / millisecondsPerDay);
    const total = this.room.rate * days;
    return total - (total * this.discount) / 100;
  }
}

module.exports = {
  Room,
  Booking,
};
