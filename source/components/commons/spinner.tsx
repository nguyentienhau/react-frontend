import React from "react";
import PropTypes from "prop-types";
import style from "style/components/commons/spinner.css";

export default function Spinner({ show = false, size = 0 }) {
	return show ? <div style={style.spinner} data-size={size}></div> : null;
}

Spinner.propTypes = {
	show: PropTypes.bool,
	size: PropTypes.number
};
