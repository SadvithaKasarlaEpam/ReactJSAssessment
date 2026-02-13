import { useParams } from "react-router";
import { stuList } from "./StudentsSection";

const Courses = () => {
  const params = useParams();
  const studentdetails = stuList.find((stu) => stu.id === Number(params.id));

  return (
    <div>
      <h4>Courses</h4>
      {studentdetails?.courses?.length ? (
        <ul>
          {studentdetails.courses.map((course, idx) => (
            <li key={idx}>{course}</li>
          ))}
        </ul>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default Courses;
