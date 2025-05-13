import { Booking } from "..";

export class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(
    name: string,
    bookings: Booking[],
    rate: number,
    discount: number
  ) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOcuppied(date: Date) {
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    return this.bookings.some((booking) => {
      const checkIn = new Date(booking.checkIn).setHours(0, 0, 0, 0);
      const checkOut = new Date(booking.checkOut).setHours(0, 0, 0, 0);
      return targetDate >= checkIn && targetDate < checkOut;
    });
  }

  occupancyPercentage(startDate: Date, endDate: Date) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return Error("Invalid date format");
    }
    if (startDate >= endDate) {
      return Error("startDate must be less than endDate");
    }
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const bookedDays = this.bookings.reduce((acc, booking) => {
      const checkIn = new Date(booking.checkIn).setHours(0, 0, 0, 0);
      const checkOut = new Date(booking.checkOut).setHours(0, 0, 0, 0);
      if (checkIn < endDate.getTime() && checkOut > startDate.getTime()) {
        const overlapStart = Math.max(checkIn, startDate.getTime());
        const overlapEnd = Math.min(checkOut, endDate.getTime());
        return (
          acc + Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24))
        );
      }
      return acc;
    }, 0);
    return (bookedDays / totalDays) * 100;
  }

  static totalOccupancyPercentage(
    rooms: Room[],
    startDate: Date,
    endDate: Date
  ) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return Error("Invalid date format");
    }

    if (startDate >= endDate) {
      return Error("startDate must be less than endDate");
    }
    if (rooms.length === 0) return 0;

    const total = rooms.reduce((sum, room) => {
      const occupancy = room.occupancyPercentage(startDate, endDate);
      if (occupancy instanceof Error) {
        throw occupancy;
      }
      return sum + occupancy;
    }, 0);

    return total / rooms.length;
  }

  static avalaibleRooms(rooms: Room[], startDate: Date, endDate: Date) {
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
