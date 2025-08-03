import { useEffect, useState } from "react";
import Fetch from "../fetch/Fetch";

import "./Card.scss";

import Sun from "./../../images/icon-sun.svg";
import Moon from "./../../images/icon-moon.svg";

const Card = () => {
  const extensions = Fetch();
  const [extensionState, setExtensionState] = useState([]);
  const [filteredExtensions, setFilteredExtensions] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    setExtensionState(extensions);
  }, [extensions]);

  const handleActive = () => {
    setFilteredExtensions(extensionState.filter((ext) => ext.isActive));
    setActiveFilter("active");
  };
  const handleNotActive = () => {
    setFilteredExtensions(extensionState.filter((ext) => !ext.isActive));
    setActiveFilter("notActive");
  };

  const showAll = () => {
    setFilteredExtensions([]);
    setActiveFilter("all");
  };

  const handleChecked = (index) => {
    const toUpdateExt = [...extensionState];
    const selectExt = toUpdateExt[index];
    selectExt.isActive = !selectExt.isActive;
    toUpdateExt[index] = selectExt;
    setExtensionState(toUpdateExt);
  };

  const handleLightMode = () => {
    document.body.classList.toggle("lightmode");
    setLightMode((light) => !light);
  };

  const toDisplay =
    filteredExtensions.length > 0 ? filteredExtensions : extensionState;

  return (
    <>
      <header className="header">
        <img src="./assets/images/logo.svg" alt="Logo" />
        <div className="darkmode">
          {!lightMode && (
            <button className="btn btn-mode" onClick={handleLightMode}>
              <img src={Sun} alt="lightmode" />
            </button>
          )}
          {lightMode && (
            <button className="btn btn-mode" onClick={handleLightMode}>
              <img src={Moon} alt="darkmode" />
            </button>
          )}
        </div>
      </header>
      <nav className="nav ">
        <h1 className="nav__title">Extension List</h1>
        <div className="nav__filters">
          <button
            onClick={(e) => showAll(e)}
            className={`btn btn__filter ${
              activeFilter === "all" ? "btn-active" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={(e) => handleActive(e)}
            className={`btn btn__filter ${
              activeFilter === "active" ? "btn-active" : ""
            }`}
          >
            Active
          </button>
          <button
            onClick={(e) => handleNotActive(e)}
            className={`btn btn__filter ${
              activeFilter === "notActive" ? "btn-active" : ""
            }`}
          >
            In Active
          </button>
        </div>
      </nav>

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
                  onChange={() => handleChecked(index)}
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
