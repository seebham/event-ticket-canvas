import React from "react";
import "./styles.css";
import Ticket from "./Ticket";

export default function App() {
  const [data, setData] = React.useState({
    firstname: "Shubham",
    lastname: "Lingayat",
    subt: "Student Developer",
    events: ["101: WebDev 30/9", "102: Droid 01/10"]
  });
  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleDownload = () => {};
  return (
    <div className="App">
      <h1>Here's your Ticket</h1>
      <div className="form">
        <label>
          First name
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
          />
        </label>
        <label>
          Last name
          <input
            type="text"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
          />
        </label>
        <label>
          Subtitle
          <input
            type="text"
            name="subt"
            value={data.subt}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <Ticket data={data} />
      </div>
    </div>
  );
}
