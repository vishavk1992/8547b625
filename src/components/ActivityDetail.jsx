import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActivityDetail = () => {
  const { id } = useParams();
  const [call, setCall] = useState(null);

  useEffect(() => {
    axios
      .get(`https://aircall-backend.onrender.com/activities/${id}`)
      .then((response) => {
        setCall(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the call details!", error);
      });
  }, [id]);

  if (!call) return <div>Loading...</div>;

  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-header">Call Detail</div>
        <div className="card-body">
          <p>
            <strong>From:</strong> {call.from}
          </p>
          <p>
            <strong>To:</strong> {call.to}
          </p>
          <p>
            <strong>Duration:</strong> {call.duration} seconds
          </p>
          <p>
            <strong>Direction:</strong> {call.direction}
          </p>
          <p>
            <strong>Via:</strong> {call.via}
          </p>
          <p>
            <strong>Call Type:</strong> {call.call_type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
