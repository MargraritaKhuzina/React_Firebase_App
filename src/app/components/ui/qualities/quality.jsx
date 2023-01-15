import React from "react";
import PropTypes from "prop-types";

// отображение одного конкретного качества
const Quality = ({ color, name }) => {
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
