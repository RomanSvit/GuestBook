import React from "react";
import "./Comments.css";
import { v4 as uuidv4 } from "uuid";

const Comments = ({ props , onDelete}) => {
    // console.log(props);
  return (
    <>
      <h2>Comments</h2>
      <ul className="comments">
        {props.map((elem) => (
          <li className="comments-item" key={uuidv4()}>
            <p className="comments-item-massage">{elem.message}</p>
            <span className="comments-item-author">Author: 
              <b>
                <em>{elem.name}</em>
              </b>
            </span>
            <button className="btn-del" onClick={onDelete} id={elem._id}>
              Delete comment
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};


export default Comments;
