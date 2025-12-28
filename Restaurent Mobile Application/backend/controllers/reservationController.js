import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  const { tableId, reservedBy, date, time } = req.body;
  const reservation = await Reservation.create({ tableId, reservedBy, date, time });
  res.json(reservation);
};

export const getReservations = async (req, res) => {
  const reservations = await Reservation.find().populate("tableId reservedBy");
  res.json(reservations);
};
