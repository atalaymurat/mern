const Counter = require("../../models/counter");

async function getNextSequence(name) {
  const result = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return result.seq;
}

module.exports = { getNextSequence };