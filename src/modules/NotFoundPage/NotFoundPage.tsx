import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__info">
          <div className="not-found__image">
            <img src="./images/not-found.png" alt="404 Not Found" />
          </div>

          <button className="not-found__back" onClick={() => navigate(-1)}>
            Go to back
          </button>
        </div>
      </div>
    </div>
  );
};
