import axios from "axios";
import { Container } from "../../components/container";

const StudentDetails = ({ student }) => {
  return (
    <Container>
      <h1>{`${student.firstName} ${student.lastName}`}</h1>
      <h4>{`${student.capstoneProject}`}</h4>
      <p>{`${student.capstoneProjectDescription}`}</p>
    </Container>
  );
};

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const response = await axios.get(
      `http://localhost:3000/api/students/${id}`
    );
    const student = response.data;
    return { props: { student } };
  } catch (error) {
    console.log(error);
    return { props: { error: error.message } };
  }
}

export default StudentDetails;
