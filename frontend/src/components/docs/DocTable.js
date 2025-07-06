import React from "react";
import { formPrice } from "../../lib/helpers";
const DocTable = ({ docFields, selectedVersion }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mx-auto">
      <div className="grid grid-cols-3 gap-1">
        {docFields.map((item, i) => (
          <React.Fragment key={i}>
            <div className="px-2 py-1 bg-black text-white text-sm font-bold">
              {item.label}
            </div>
            <div className="px-2 py-1 bg-zinc-200 text-sm border-b col-span-2">
              {item.value}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="">
        {selectedVersion?.lineItems?.map((item, i) => (
          <div key={item._id || i}>
            <div className="grid grid-cols-4 text-sm gap-1 mb-2">
              <div className="col-span-4 bg-black text-white px-2 py-2 font-semibold">
                {item.desc}
              </div>
              <div className="col-span-4 whitespace-pre-line px-2 text-xs text-stone-800 bg-zinc-200 py-2">
                {item.caption}
              </div>
              <div className="px-2">
                <div className="text-xs text-gray-500 font-semibold">
                  Durumu
                </div>
                <div>{item.condition}</div>
              </div>
              <div className="px-2">
                <div className="text-xs text-gray-500 font-semibold">
                  Mensei
                </div>
                <div>{item.origin}</div>
              </div>
              <div className="px-2 col-span-2">
                <div className="text-xs text-gray-500 font-semibold">GTIP</div>
                <div>{item.gtipNo}</div>
              </div>
              {/* LINE BREAK */}

              <div className="px-2">
                <div className="text-xs text-gray-500 font-semibold">
                  Birim Fiyat
                </div>
                <div>
                  {formPrice(item.price)} {selectedVersion.currency}
                </div>
              </div>
              <div className="px-2">
                <div className="text-xs text-gray-500 font-semibold">Adet</div>
                <div>{item.quantity} </div>
              </div>
              <div className="px-2">
                <div className="text-xs text-gray-500 font-semibold">
                  Toplam Fiyat
                </div>
                <div className="font-bold text-purple-600">
                  {formPrice(item.totalPrice)} {selectedVersion.currency}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocTable;
