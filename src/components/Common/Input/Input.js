import React from "react";

export const Input = ({label, ...otherProps}) => (
    <div className="form-group">
        {label && <label htmlFor={otherProps.id}>{label}</label>}
        <input {...otherProps} className="form-control" />
    </div>
);