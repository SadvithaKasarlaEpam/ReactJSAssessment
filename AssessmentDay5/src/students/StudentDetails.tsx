import { useParams, useNavigate, Outlet, Link } from "react-router";
import { stuList } from "./StudentsList";

const StudentDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const studentdetails = stuList.find((stu) => stu.id === Number(params.id));

  return (
    <div>
      <h3>Student Details</h3>
      {studentdetails ? (
        <>
          <div>ID: {studentdetails.id}</div>
          <div>Name: {studentdetails.name}</div>
          <div>Age: {studentdetails.age}</div>
          {/* This is the View Courses button */}
          <button
            onClick={() => navigate(`/students/${studentdetails.id}/courses`)}
          >
            View Courses
          </button>
        </>
      ) : (
        <div>Student not found</div>
      )}
      <Outlet />
      <div>
        <Link className="my-link" to="/students">
          Back to Student List
        </Link>
      </div>
    </div>
  );
};

export default StudentDetails;
