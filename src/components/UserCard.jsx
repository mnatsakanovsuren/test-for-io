import React from "react";
import PropTypes from "prop-types";

const UserCard = ({
  number,
  user: { name, count_pub, pageviews },
  medalists: { gold, silver, bronze }
}) => {
  return (
    <div
      style={{ display: "flex", width: 500, justifyContent: "space-between" }}
    >
      <div>{number}</div>
      <div>{name.charAt(0)}</div>
      <div>{name}</div>
      <div>{pageviews}</div>
      <div>
        {gold === pageviews && "Gold"}
        {silver === pageviews && "Silver"}
        {bronze === pageviews && "Bronze"}
      </div>
      <div>{count_pub} публикации</div>
    </div>
  );
};

UserCard.propTypes = {
  number: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    count_pub: PropTypes.number.isRequired,
    pageviews: PropTypes.number.isRequired
  }).isRequired
};

export default UserCard;
