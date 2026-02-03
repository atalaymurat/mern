function DocSearchBar({ value, onChange }) {
  return (
    <div className="px-2 mx-2">
      <input
        type="text"
        placeholder="ara..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black rounded px-3 py-2 text-sm"
      />
    </div>
  );
}


export default DocSearchBar;