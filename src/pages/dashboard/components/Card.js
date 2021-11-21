import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import db from "../../../firebase";

const Card = ({ title, collection, avatar, redirectTo }) => {
  const [itemCount, setItemCount] = useState();
  const [lastChangedItem, setLastChangedItem] = useState();

  const history = useHistory();

  useEffect(() => {
    db.firestore()
      .collection(collection)
      .get()
      .then((response) => {
        setItemCount(response.docs.length);
        let newest;
        response.forEach((item) => {
          if (!newest) {
            newest = item.data().lastChange;
          } else {
            if (item.data().lastChange > newest) {
              newest = item.data().lastChange;
            }
          }
        });
        setLastChangedItem(newest?.toDate().toDateString());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [collection]);

  return (
    <div className="card centered" onClick={() => history.push(redirectTo)}>
      <div className="content">
        <img
          className="right floated ui mini circular image"
          src={avatar}
          alt={avatar.toLocaleString()}
        />
        <div className="header">{title}</div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <i className="pencil alternate icon"></i>
          {lastChangedItem}
        </span>
        <span>
          <i className="file icon"></i>
          {itemCount}
        </span>
      </div>
    </div>
  );
};

export default Card;
