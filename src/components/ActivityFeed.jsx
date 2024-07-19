import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePhoneMissed } from "react-icons/md";

const ActivityFeed = () => {
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

  const handleArchive = (id) => {
    axios
      .patch(`https://aircall-backend.onrender.com/activities/${id}`, {
        is_archived: true,
      })
      .then(() => {
        setCalls((prevCalls) => prevCalls.filter((call) => call.id !== id));
      })
      .catch((error) => {
        console.error("There was an error archiving the call!", error);
      });
  };

  const handleArchiveAll = () => {
    const archiveCalls = calls.filter((call) => !call.is_archived);
    Promise.all(
      archiveCalls.map((call) =>
        axios.patch(
          `https://aircall-backend.onrender.com/activities/${call.id}`,
          { is_archived: true }
        )
      )
    )
      .then(() => {
        setCalls((prevCalls) => prevCalls.filter((call) => call.is_archived));
      })
      .catch((error) => {
        console.error("There was an error archiving all calls!", error);
      });
  };

  return (
    <div className="activity-feed">
      <div className="text-center mb-2">
        <button
          className="btn btn-outline-secondary"
          onClick={handleArchiveAll}
        >
          Archive all calls
        </button>
      </div>
      <ul className="list-group">
        {calls
          .filter((call) => !call.is_archived)
          .map((call) => (
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
                <Link
                  to={`/activity/${call.id}`}
                  className="ml-3 no-underline"
                  style={{
                    color: call.call_type === "missed" ? "red" : "inherit",
                  }}
                >
                  {call.from} tried to call on {call.to}
                </Link>
              </div>
              <div className="d-flex align-items-center">
                <span
                  className="text-muted px-2"
                  style={{
                    color: call.call_type === "missed" ? "red" : "inherit",
                  }}
                >
                  {new Date(call.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <button
                  className="btn btn-outline-danger btn-sm ml-3"
                  onClick={() => handleArchive(call.id)}
                >
                  Archive
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
