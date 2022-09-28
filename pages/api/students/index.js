import connectDB from "../_db/connect";
import Student from "../_db/models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const students = await Student.find({}).exec();
      return res.status(200).json(
        students.map((student) => {
          const {
            capstoneProject,
            capstoneProjectDescription,
            ...reducedStudent
          } = student.toObject();
          return reducedStudent;
        })
      );
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
};

export default connectDB(handler);
