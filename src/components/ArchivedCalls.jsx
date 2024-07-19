import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa"; // Import React Icons
import { MdOutlinePhoneMissed } from "react-icons/md";

const ArchivedCalls = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    axios
      .get("https://aircall-backend.onrender.com/activities")
      .then((response) => {
        setCalls(response.data.filter((call) => call.is_archived));
      })
      .catch((error) => {
        console.error("There was an error fetching the calls!", error);
      });
  }, []);

  const handleUnarchive = (id) => {
    axios
      .patch(`https://aircall-backend.onrender.com/activities/${id}`, {
        is_archived: false,
      })
      .then(() => {
        setCalls((prevCalls) => prevCalls.filter((call) => call.id !== id));
      })
      .catch((error) => {
        console.error("There was an error unarchiving the call!", error);
      });
  };

  const handleUnarchiveAll = () => {
    const unarchiveCalls = calls.filter((call) => call.is_archived);
    Promise.all(
      unarchiveCalls.map((call) =>
        axios.patch(
          `https://aircall-backend.onrender.com/activities/${call.id}`,
          { is_archived: false }
        )
      )
    )
      .then(() => {
        setCalls([]);
      })
      .catch((error) => {
        console.error("There was an error unarchiving all calls!", error);
      });
  };

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3>Archived Calls</h3>
        <button className="btn btn-primary" onClick={handleUnarchiveAll}>
          Unarchive All
        </button>
      </div>
      <ul className="list-group">
        {calls.map((call) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={call.id}
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
              <span className="ml-3">
                {call.from} tried to call on {call.to}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-muted px-1">
                {new Date(call.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <button
                className="btn btn-outline-success btn-sm ml-3"
                onClick={() => handleUnarchive(call.id)}
              >
                Unarchive
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchivedCalls;
