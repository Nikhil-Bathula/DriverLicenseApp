const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentsSchema = new Schema({
    date: Date,
    time: String,
    createdDate: {type: Date, default: new Date()}
});

const Appointments = mongoose.model("Appointments", AppointmentsSchema);

module.exports = Appointments;