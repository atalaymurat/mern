import React from "react";
import { localeDate } from "../../lib/helpers";

const VersionSelector = ({ versions = [], selectedIndex = 0, onChange }) => {
  return (
    <div className="flex flex-row items-center gap-2 my-4">
      <label className="text-sm font-medium">Versiyon</label>
      <select
        className="border px-2 py-1 text-sm rounded"
        value={selectedIndex}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {versions.map((v, index) => (
          <option key={v._id} value={index}>
            v{v.version} - {localeDate(v.docDate)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VersionSelector;
