const parseMultiline = (text) => {
  if (!text) return "";
  return text.replace(/\\n/g, "\n");
};

export const TERMS_CONFIG = {
  TITLES: {
    DELIVERY_TIME: "TESLİM SÜRESİ",
    DELIVERY_PLACE: "TESLİM YERİ",
    WARRANTY: "GARANTİ",
    PAYMENT: "ÖDEME ŞEKLİ",
    EXPLANATION: "AÇIKLAMALAR",
  },

  FOOTERS: {
    DELIVERY_TIME:
      "Sipariş Avansının Alınmasından Sonra Geçerli Olmak Üzere",

    WARRANTY: parseMultiline(
      process.env.REACT_APP_WARRANTY_FOOTER ||
        "Sarf malzemeleri garanti kapsamında değildir."
    ),

    EXPLANATION: parseMultiline(
      process.env.REACT_APP_TERMS_FOOTER ||
        "- Özellikle belirtilmedikçe fiyatlarımıza KDV dahil değildir.\n- CE belgesine haizdir.\n- Mücbir nedenlerden satıcı sorumlu değildir."
    ),
  },

  EXTRA: {
    NEW_MACHINE:
      process.env.REACT_APP_NEW_MACHINE_TEXT ||
      "Makineler Yeni ve Kullanılmamıştır.",
  },
};