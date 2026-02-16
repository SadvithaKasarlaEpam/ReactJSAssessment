import { NavLink, useNavigate, Outlet } from "react-router";

export interface studenttype {
  id: number;
  name: string;
  courses: string[];
  age: number;
}

export const stuList: studenttype[] = [
  {
    id: 1,
    name: "A",
    courses: ["C1", "C2"],
    age: 78,
  },
  {
    id: 2,
    name: "B",
    courses: ["C4", "C8"],
    age: 89,
  },
  {
    id: 3,
    name: "C",
    courses: ["C9", "C27"],
    age: 58,
  },
  {
    id: 4,
    name: "D",
    courses: ["C16", "C64"],
    age: 38,
  },
];

const StudentsList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Students List </h2>
      <ul>
        {stuList.map((student) => (
          <li key={student.id}>
            <NavLink
              style={({ isActive }) => ({
                textDecoration: isActive ? "none" : "underline",
              })}
              className="studentslink"
              to={`/students/${student.id}`}
            >
              {student.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate("/")}>Back to Home Page</button>
    </div>
  );
};

export default StudentsList;
