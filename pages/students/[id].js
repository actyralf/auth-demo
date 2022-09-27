import axios from "axios";
import { Container } from "../../components/container";
import Link from "next/link";
import styled from "styled-components";

const StudentDetails = ({ student }) => {
  return (
    <Container>
      <Link href="/">
        <StyledBackLink>{"<<"} Zurück zur Übersicht</StyledBackLink>
      </Link>
      <h1>{`${student.firstName} ${student.lastName}`}</h1>
      <h4>{`${student.capstoneProject}`}</h4>
      <p>{`${student.capstoneProjectDescription}`}</p>
    </Container>
  );
};

export async function getServerSideProps({ req, params }) {
  try {
    const { id } = params;
    const response = await axios.get(
      `http://${req.headers.host}/api/students/${id}`
    );
    const student = response.data;
    return { props: { student } };
  } catch (error) {
    console.log(error);
    return { props: { error: error.message } };
  }
}

const StyledBackLink = styled.a`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 0.6em;
`;

export default StudentDetails;
