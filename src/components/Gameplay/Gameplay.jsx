import React from "react";
import Button from "../Button/Button";

const Gameplay = ({ gameplayImage, numberShadow, title, text, buttonTitle,shortText, buttonIcon, iconAlt }) => {
  return (
    <div
      className="gameplay"
      style={{ backgroundImage: `url(${gameplayImage})` }}
    >
      <div className="gameplayTitleShadow"><h3>{numberShadow}</h3></div>
      <div className="gameplayContent">
        <div className="gameplayInfo">
          <h2 className="gameplayTitle">{title}</h2>
          <p className="gameplayTexteLaptop">{text}</p>
          <p className="gameplayTexteMobile">{shortText}</p>
        </div>
        <Button
          title={buttonTitle}
          src={buttonIcon}
          alt={iconAlt}
        />
      </div>
    </div>
  );
};

export default Gameplay;