import React from "react";
import {Link} from "react-router-dom";

export const Card = ({title, text, anchor, image, styleImage, ...otherProps }) => {
    const defaultImage = image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png";
    return (
        <div {...otherProps} className="card shadow mb-3 bg-white rounded">
            <img style={styleImage} className="card-img-top" src={defaultImage} alt="Star wars"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                {anchor && <Link to={anchor.link} className="btn btn-dark text-uppercase">{anchor.label}</Link>}
            </div>
        </div>
    )
};