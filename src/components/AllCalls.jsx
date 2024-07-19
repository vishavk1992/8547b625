import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePhoneMissed } from "react-icons/md";

const AllCalls = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios
      .get("https://aircall-backend.onrender.com/activities")
      .then((response) => {
        setCalls(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the calls!", error);
      });
  }, []);

  return (
    <div className="activity-feed">
      <ul className="list-group">
        {calls.map((call) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={call.id}
            style={{
              backgroundColor:
                call.call_type === "missed" ? "#ffe6e6" : "inherit", // Light red background for missed calls
            }}
          >
            <div className="d-flex align-items-center">
              <span
                className="call-icon"
                style={{
                  color: call.call_type === "answered" ? "green" : "red",
                }}
              >
                {call.call_type === "answered" ? (
                  <FaPhoneAlt />
                ) : (
                  <MdOutlinePhoneMissed />
                )}
              </span>
              <Link to={`/activity/${call.id}`} className="ml-3 no-underline">
                {call.from} tried to call on {call.to}
              </Link>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted px-2">
                {new Date(call.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCalls;
