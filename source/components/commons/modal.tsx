import React from "react";
import PropTypes from "prop-types";
import style from "style/components/commons/modal.css";

export default function Modal({ show = false, setShow = () => {}, children = null }) {
	return show ? (
		<div style={style.modalLayout} onClick={() => setShow(false)}>
			<div style={style.modal}>{children}</div>
		</div>
	) : null;
}

Modal.propTypes = {
	show: PropTypes.bool,
	setShow: PropTypes.func,
	children: PropTypes.any
};
