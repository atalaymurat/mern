import React from "react";

const Header = () => {
  return (
    <div>
      <div className="my-2 border-t border-b p-2 bg-slate-100 flex flex-row items-center justify-center">
        <img
          src="/varolLogo.png"
          className="mx-2 mr-auto"
          style={{
            height: "130px",
            width: "auto",
            objectFit: "contain",
          }}
        />
        <div className="text-sm text-center font-semibold text-gray-600 pr-4">
          Ufuk Varol
        </div>
      </div>
    </div>
  );
};

export default Header;
