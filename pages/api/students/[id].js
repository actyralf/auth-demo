import connectDB from "../_db/connect";
import Student from "../_db/models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const student = await Student.findById(req.query.id).exec();
      return res.status(200).json(student);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
};

export default connectDB(handler);
