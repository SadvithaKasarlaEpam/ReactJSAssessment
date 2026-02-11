import React from "react";

import type { List } from "../App";

const Blog = ({ list }: { list: List[] }) => {
  return (
    <>
      <ul>
        {" "}
        {list.map(
          (item, id) =>
            item.IsEmployee && (
              <>
                <li key={id} style={{ display: "inline", marginRight: "10px" }}>
                  <hr></hr>
                  <strong>Employee Id:</strong> {item.Id}
                  <br />
                  <strong>Employee Name:</strong> {item.Name}
                  <br />
                  <strong>Skilled:</strong> {item.IsSkilled ? "Yes" : "No"}
                  <hr></hr>
                </li>
              </>
            ),
        )}
      </ul>
    </>
  );
};

export default Blog;
