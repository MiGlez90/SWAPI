import React from "react";
import "./DetailFieldStyles.css";

export const DetailField = ({title, value}) => (
	<div className="b-display-field">
		<p className="b-display-field__name">{title}</p>
		<p className="b-display-field__value">{value}</p>
	</div>
);