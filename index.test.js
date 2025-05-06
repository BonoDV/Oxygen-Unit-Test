const Room = require("./index.js").Room;

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
