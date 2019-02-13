import React from "react";
import PropTypes from "prop-types";

//Import medals
import goldMedal from '../images/1st.svg'
import silverMedal from '../images/2nd.svg'
import bronzeMedal from '../images/3rd.svg'



const UserCard = ({
  number,
  user: { name, count_pub, pageviews },
  medalists: { gold, silver, bronze }
}) => {
  return (
    <div className="users">
        <div className="users--number">{number}</div>
        <div className="users--icon">
          <p>{name.charAt(0)}</p>
        </div>
        <div className="users__info">
            <div className="users--name">{name}</div>
            <div className="users--count">{count_pub} публикации</div>
        </div>
        <div className="users--medal">
            {gold === pageviews && <img src={goldMedal} alt="Gold"/>}
            {silver === pageviews && <img src={silverMedal} alt="Gold"/>}
            {bronze === pageviews && <img src={bronzeMedal} alt="Gold"/>}
        </div>
        <div className="users--views">{pageviews}</div>
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
