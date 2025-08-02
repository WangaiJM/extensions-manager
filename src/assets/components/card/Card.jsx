import { useState } from "react";
import Fetch from "../fetch/Fetch";

import "./Card.scss";

const Card = () => {
  const extensions = Fetch();
  const [filteredExtensions, setFilteredExtensions] = useState([]);

  const handleActive = () => {
    setFilteredExtensions(extensions.filter((ext) => ext.isActive));
  };

  const toDisplay =
    filteredExtensions.length > 0 ? filteredExtensions : extensions;
  return (
    <>
      <button onClick={handleActive}>Active</button>

      <article className="card">
        {toDisplay.map((extension, index) => {
          const checkboxId = `check-${index}`;
          return (
            <div className="card__content" key={index}>
              <div className="card__body">
                <div className="card__body-image">
                  <img src={extension.logo} alt={`image-${extension.name}`} />
                </div>
                <div className="card__body-text">
                  <h1 className="card__title">{extension.name}</h1>
                  <p className="card__description">{extension.description}</p>
                </div>
              </div>
              <div className="card__footer">
                <button className="card__footer-btn">Remove</button>
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={extension.isActive}
                />
                <label
                  htmlFor={checkboxId}
                  className="card__footer-toggle"
                ></label>
              </div>
            </div>
          );
        })}
      </article>
    </>
  );
};

export default Card;
