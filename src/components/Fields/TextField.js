import React from "react";
export default function TextField({ id, label, value, updateField, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control title-field"
        id={id}
        value={value}
        onChange={(e) => updateField(e)}
        placeholder={placeholder != undefined ? placeholder : `Enter ${label}`}
        required
      />
    </div>
  );
}
