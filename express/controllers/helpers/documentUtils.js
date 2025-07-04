
const { getNextSequence } = require("./counters");

const generateDocCode = async (DocumentModel, version) => {
  const year = new Date().getFullYear();
  const sequence = await getNextSequence(`docCode-${year}`);

  const sequencePadded = String(sequence).padStart(3, "0");
  const versionPadded = String(version).padStart(2, "0");

  return `${year}-${sequencePadded}-${versionPadded}`;
};


const updateDocCodeVersion = (oldDocCode, newVersion) => {
  // Eski kod örneği: "2025-005-01"
  // Yeni version ile: "2025-005-02"
  
  if (!oldDocCode) return null;

  const parts = oldDocCode.split('-'); // ["2025", "005", "01"]
  if (parts.length !== 3) return null;

  const year = parts[0];
  const sequence = parts[1];
  const versionPadded = String(newVersion).padStart(2, '0');

  return `${year}-${sequence}-${versionPadded}`;
};


const calculateLineItemsAndTotals = (doc) => {
  if (doc.lineItems && doc.lineItems.length > 0) {
    doc.lineItems.forEach((item) => {
      item.totalPrice = item.price * item.quantity;
    });
  }

  const subtotal = doc.lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = Number(doc.discount) || 0;
  const kdv = Number(doc.kdv) || 0;

  doc.totalPrice = subtotal;
  doc.discountPrice = subtotal - discount;
  doc.netPrice = subtotal - discount;
  doc.kdvPrice = (doc.netPrice * kdv) / 100;
  doc.grandTotal = doc.netPrice + doc.kdvPrice;

  if (doc.docDate && !doc.validDate) {
    doc.validDate = new Date(doc.docDate);
    doc.validDate.setDate(doc.validDate.getDate() + 30);
  }

  return doc;
};

module.exports = { generateDocCode, calculateLineItemsAndTotals, updateDocCodeVersion };
