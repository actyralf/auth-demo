import styled from "styled-components";
import axios from "axios";
import Link from "next/link";
import { Container } from "../components/container";

const Students = ({ students }) => {
  return (
    <Container>
      <h1>Students</h1>
      <ul>
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
      </ul>
    </Container>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3000/api/students");

  return { props: { students: response.data } };
}

export default Students;
