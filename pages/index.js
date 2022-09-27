import styled from "styled-components";
import axios from "axios";
import Link from "next/link";
import { Container } from "../components/container";
import { useSession, signIn, signOut } from "next-auth/react";

const Students = ({ students }) => {
  const { data: session } = useSession();
  return (
    <Container>
      <p>{session ? session.user.email : <a onClick={signIn}>Anmelden</a>}</p>
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

export async function getServerSideProps({ req }) {
  const response = await axios.get(`http://${req.headers.host}/api/students`);

  return { props: { students: response.data } };
}

export default Students;
