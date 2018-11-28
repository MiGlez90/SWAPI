import React from "react";

export const SectionTitle = ({title, ...otherProps}) => {
	return (
		<div {...otherProps} >
			<h1 className="display-4 ">{title}</h1>
			<hr className="my-4"/>
		</div>
	)
};