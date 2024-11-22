import React from "react";

const OptionsField = ({ id, label, options, value, updateField }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select
        className="form-control"
        id={id}
        value={value}
        onChange={(e) => updateField(e)}
      >
        {options.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
      </select>
    </div>
  );
};

export default OptionsField;
