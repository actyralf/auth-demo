import styled from "styled-components";
import Link from "next/link";
import { Container } from "../components/container";
import { useSession, signIn, signOut } from "next-auth/react";

const isPreview = process.env.VERCEL_ENV === "preview";

const Students = ({ students, error }) => {
  const { data: session } = useSession();

  if (error) {
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  }
  return (
    <Container>
      <p>
        {session ? (
          <>
            <span>
              Hallo{" "}
              <span style={{ color: "#7b2cbf", fontWeight: "bold" }}>
                {session.user.name}
              </span>
            </span>{" "}
            <a style={{ fontSize: "0.6em" }} href="#" onClick={signOut}>
              Abmelden
            </a>
          </>
        ) : (
          <a
            href="#"
            onClick={() => signIn(isPreview ? "credentials" : "github")}
          >
            Anmelden
          </a>
        )}
      </p>
      <h1>Otter unter sich</h1>
      <StyledList>
        {students.map((student) => {
          return (
            <li key={student._id}>
              {session?.user.email === student.githubUserName ? (
                <Link href={`/students/${student._id}`} passHref>
                  <StyledAnchor>
                    {student.lastName}, {student.firstName}
                  </StyledAnchor>
                </Link>
              ) : (
                `${student.lastName}, ${student.firstName}`
              )}
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
