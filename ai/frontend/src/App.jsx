import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5050/dashboard/summary")
      .then(res => setData(res.data))
      .catch(err => console.error("API ERROR:", err));
  }, []);

  if (!data) return <h2>Loading dashboard...</h2>;

  return <Dashboard data={data} />;
}

export default App;