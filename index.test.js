const Room = require("./index.js").Room;

test("Return false if the room is not booked", () => {
  const room = new Room("Room 1", [], 100, 0);
  const date = new Date("2023-10-01");
  expect(room.isOcuppied(date)).toBe(false);
});

test("Return true if the room is booked", () => {
    const room = new Room("Room 1", [{ checkIn: new Date("2023-10-01"), checkOut: new Date("2023-10-02") }], 100, 0);
    const date = new Date("2023-10-01");
    expect(room.isOcuppied(date)).toBe(true);
});
