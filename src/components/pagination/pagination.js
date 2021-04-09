import React from "react";
import "./pagination.css";

const Pagination = (props) => {
  return (
    <div className="container">
      <div className="row">
        <ul className="pagination">
          {
            <li
              className={`waves-effect`}
              onClick={() => props.nextPage(props.currentPage - 1)}
            >
              <a href="#">Prev</a>
            </li>
          }
          {
            <li
              className={`waves-effect`}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <a href="#">Next</a>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
