const Room = require("./index.js").Room;
const Booking = require("./index.js").Booking;

test("Return false if the room is not booked", () => {
  const room = new Room("Room 1", [], 100, 0);
  const date = new Date("2023-10-01");
  expect(room.isOcuppied(date)).toBe(false);
});

test("Return true if the room is booked", () => {
  const room = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-02") }],
    100,
    0
  );
  const date = new Date("2023-10-01");
  expect(room.isOcuppied(date)).toBe(true);
});

test("Return false if the data isn't a date", () => {
  const room = new Room("Room 1", [], 100, 0);
  const date = "2023-10-01";
  expect(room.isOcuppied(date)).toBe(false);
});

// Test the occupancyPercentage method
test("Return 75 percentage", () => {
  const room = new Room(
    "Room 1",
    [
      { checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-02") },
      { checkIn: new Date("2023-10-03"), checkOut: new Date("2023-10-05") },
    ],
    100,
    0
  );
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(room.occupancyPercentage(startDate, endDate)).toBe(75);
});

test("Return 100 percentage", () => {
  const room = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(room.occupancyPercentage(startDate, endDate)).toBe(100);
});

test("Return 0 percentage", () => {
  const room = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-06");
  const endDate = new Date("2023-10-08");
  expect(room.occupancyPercentage(startDate, endDate)).toBe(0);
});

test("Return error if invalid format", () => {
  const room = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = 2020;
  const endDate = 2021;
  expect(room.occupancyPercentage(startDate, endDate)).toStrictEqual(
    Error("Invalid date format")
  );
});

test("Return error if startDate > endDate", () => {
  const room = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-08");
  const endDate = new Date("2023-10-06");
  expect(room.occupancyPercentage(startDate, endDate)).toStrictEqual(
    Error("startDate must be less than endDate")
  );
});

// Test the static method totalOccupancyPercentage
test("Return 100 percentage", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(
    Room.totalOccupancyPercentage([room1, room2], startDate, endDate)
  ).toBe(100);
});

test("Return 50 percentage", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-06"), checkOut: new Date("2023-10-08") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(
    Room.totalOccupancyPercentage([room1, room2], startDate, endDate)
  ).toBe(50);
});

test("Return invalid date format", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-06"), checkOut: new Date("2023-10-08") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = 123;
  const endDate = 456;
  expect(
    Room.totalOccupancyPercentage([room1, room2], startDate, endDate)
  ).toStrictEqual(Error("Invalid date format"));
});

test("Return startDate must be less than endDate", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-06"), checkOut: new Date("2023-10-08") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-06");
  const endDate = new Date("2023-10-05");
  expect(
    Room.totalOccupancyPercentage([room1, room2], startDate, endDate)
  ).toStrictEqual(Error("startDate must be less than endDate"));
});

test("Return 0 with empty array", () => {
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(Room.totalOccupancyPercentage([], startDate, endDate)).toStrictEqual(
    0
  );
});

// Test the static method avalaibleRooms
test("Return avalaible rooms", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-06"), checkOut: new Date("2023-10-08") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(Room.avalaibleRooms([room1, room2], startDate, endDate)).toStrictEqual(
    [room1]
  );
});

test("Return invalid date format", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-06"), checkOut: new Date("2023-10-08") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = 123;
  const endDate = 456;
  expect(() => Room.avalaibleRooms([room1, room2], startDate, endDate)).toThrow(
    "Invalid date format"
  );
});

test("Return startDate must be less than endDate", () => {
  const room1 = new Room(
    "Room 1",
    [{ checkIn: new Date("2023-10-06"), checkOut: new Date("2023-10-08") }],
    100,
    0
  );
  const room2 = new Room(
    "Room 2",
    [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-05") }],
    100,
    0
  );
  const startDate = new Date("2023-10-06");
  const endDate = new Date("2023-10-05");
  expect(() => Room.avalaibleRooms([room1, room2], startDate, endDate)).toThrow(
    "startDate must be less than endDate"
  );
});

test("Return 0 with empty array", () => {
  const startDate = new Date("2023-10-01");
  const endDate = new Date("2023-10-05");
  expect(Room.avalaibleRooms([], startDate, endDate)).toStrictEqual([]);
});

// BOOKING TESTS

test("Return the correct fee for a booking with discount", () => {
  const room = new Room("Room 1", [], 100, 0);
  const booking = new Booking(
    "John Doe",
    "john@example.com",
    new Date("2023-10-01"),
    new Date("2023-10-04"),
    10,
    room
  );

  expect(booking.getFee()).toBe(270); // 100 * 3 = 300 - 10% = 270
});

test("Return error if the booking dates are invalid", () => {
  const room = new Room("Room 1", [], 100, 0);
  const booking = new Booking(
    "John Doe",
    "john@example.com",
    123,
    456,
    10,
    room
  );
  expect(() => booking.getFee()).toThrow(
    "checkIn and checkOut must be Date objects"
  );
});

test("Return error if checkIn > checkOut", () => {
  const room = new Room("Room 1", [], 100, 0);
  const booking = new Booking(
    "John Doe",
    "john@example.com",
    new Date("2023-10-06"),
    new Date("2023-10-04"),
    10,
    room
  );
  expect(() => booking.getFee()).toThrow("checkIn must be less than checkOut");
});

test("Return error if discount < 0", () => {
  const room = new Room("Room 1", [], 100, 0);
  const booking = new Booking(
    "John Doe",
    "john@example.com",
    new Date("2023-10-02"),
    new Date("2023-10-04"),
    -2,
    room
  );
  expect(() => booking.getFee()).toThrow("discount must be between 0 and 100");
});

test("Return error if discount > 100", () => {
  const room = new Room("Room 1", [], 100, 0);
  const booking = new Booking(
    "John Doe",
    "john@example.com",
    new Date("2023-10-02"),
    new Date("2023-10-04"),
    143,
    room
  );
  expect(() => booking.getFee()).toThrow("discount must be between 0 and 100");
});
