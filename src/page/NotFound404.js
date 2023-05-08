import React from "react";
import "../css/NotFound404.scss";
import { Link } from "react-router-dom";
function NotFound404() {

  return (
    <div className="page_404">
      <div className="container">
        <div className="four_zero_four_bg">
          <h1 className="title_text">404</h1>
        </div>
        <div className="contant_box_404">
          <h3 className="content_text">Looks like you're lost</h3>
          <p>The page you are looking for is not avaible!</p>
          <Link to="/"><h4 className="link_404">
            Go to Home
          </h4></Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;
