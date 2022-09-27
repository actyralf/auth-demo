import styled from "styled-components";
import axios from "axios";
import Link from "next/link";
import { Container } from "../components/container";

const Students = ({ students }) => {
  return (
    <Container>
      <h1>Otter unter sich</h1>
      <StyledList>
        {students.map((student) => {
          return (
            <li key={student._id}>
              <Link href={`/students/${student._id}`}>
                <a>
                  {student.lastName}, {student.firstName}
                </a>
              </Link>
            </li>
          );
        })}
      </StyledList>
    </Container>
  );
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3000/api/students");

  return { props: { students: response.data } };
}

export default Students;
