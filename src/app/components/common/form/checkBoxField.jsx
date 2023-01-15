import React from "react";
import PropTypes from "prop-types";

// в папке form хранятся разные формы для заполнения, которые используются в регистрации, логине,
// при написании комментариев и изменении информации о пользователе в edit

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    // позволяет изменить значение value
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    // в случае если ошибка есть, дизейблит кнопку
    // (название классов взято согласно bootstrap)
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
// здесь не указывается isRequired из-за универсальности данной формы, что позволяет использовать ее во всем приложении
CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckBoxField;
