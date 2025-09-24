import React from "react";
import { Link } from "react-router-dom";

export const GoCreate: React.FC = () => {
  return (
    <Link to="/create" className="go-create">
      Add project
    </Link>
  );
};
