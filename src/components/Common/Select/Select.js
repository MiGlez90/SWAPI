import React, {Fragment} from "react";

export const Select = ({label, options = [],rootStyle, ...otherProps}) => (
    <div className="input-group mb-3" style={rootStyle}>
        {
            label &&
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor={otherProps.id}>{label}</label>
            </div>
        }
        <select {...otherProps} className="custom-select">
            {
                options.map( (option,key) => <option key={key} value={option.value}>{option.label}</option>)
            }
        </select>
    </div>
);