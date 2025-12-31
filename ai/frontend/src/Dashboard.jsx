import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#e74c3c", "#f1c40f", "#2ecc71"];

export default function Dashboard({ data }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Phishing Awareness Dashboard</h1>

      {/* CSV DOWNLOAD BUTTON */}
      <a
        href="http://localhost:5050/export/csv"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download CSV Report
        </button>
      </a>

      <h3>Total Users: {data.totalUsers}</h3>

      {/* PIE CHART */}
      <PieChart width={400} height={300}>
        <Pie
          data={[
            { name: "High", value: Number(data.high) },
            { name: "Medium", value: Number(data.medium) },
            { name: "Low", value: Number(data.low) },
          ]}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          <Cell fill="#e74c3c" />
          <Cell fill="#f1c40f" />
          <Cell fill="#2ecc71" />
        </Pie>
        <Tooltip />
      </PieChart>

      {/* USER TABLE */}
      <h2>User Risk Table</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>User ID</th>
            <th>Campaign</th>
            <th>Risk Level</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.users && data.users.length > 0 ? (
            data.users.map((u, index) => (
              <tr key={index}>
                <td>{u.user_id}</td>
                <td>{u.campaign_id}</td>
                <td>{u.level}</td>
                <td>{u.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}