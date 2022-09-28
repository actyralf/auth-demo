import styled from "styled-components";
import Link from "next/link";
import { Container } from "../components/container";

const Students = ({ students, error }) => {
  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }
  return (
    <Container>
      <h1>Otter unter sich</h1>
      <StyledList>
        {students.map((student) => {
          return (
            <li key={student._id}>
              <Link href={`/students/${student._id}`} passHref>
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

const StyledAnchor = styled.a`
  font-weight: bold;
  &:link,
  &:visited {
    color: #7b2cbf;
  }
  &:active,
  &:hover {
    color: white;
  }
`;

export async function getServerSideProps({ req }) {
  try {
    const response = await fetch(`http://${req.headers.host}/api/students`);
    if (response.ok) {
      const students = await response.json();
      return { props: { students } };
    } else {
      throw new Error(response.statusText);
    }
  } catch (err) {
    return { props: { error: err.message } };
  }
}

export default Students;
