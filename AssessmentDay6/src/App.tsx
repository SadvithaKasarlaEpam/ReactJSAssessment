import { useState } from "react";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>Mini Blog Management App</h2>
      <UserList selectedUserId={selectedUserId} onSelect={setSelectedUserId} />
      <hr />
      <PostList userId={selectedUserId} />
    </div>
  );
};

export default App;
