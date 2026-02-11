import "./App.css";
import Title from "./Components/Title.tsx";
import Blog from "./Components/Blog.tsx";

export interface List {
  Id: number;
  Name: string;
  IsEmployee: boolean;
  IsSkilled: boolean;
}
function App() {
  const listofEmployees: List[] = [
    {
      Id: 1,
      Name: "Aaa",
      IsEmployee: true,
      IsSkilled: true,
    },
    {
      Id: 2,
      Name: "Aaa",
      IsEmployee: true,
      IsSkilled: true,
    },
    {
      Id: 3,
      Name: "Bbb",
      IsEmployee: false,
      IsSkilled: true,
    },
    {
      Id: 4,
      Name: "Ccc",
      IsEmployee: true,
      IsSkilled: false,
    },
    {
      Id: 5,
      Name: "Ddd",
      IsEmployee: false,
      IsSkilled: false,
    },
  ];

  return (
    <Title title="All Employees" footer={<div>©Feb 2026</div>}>
      <Blog list={listofEmployees} />
    </Title>
  );
}

export default App;
