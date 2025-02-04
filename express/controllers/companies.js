const Company = require("../models/company")
const translit = require("transliteration")
const mongoose = require("mongoose")

module.exports = {
  index: async (req, res, next) => {
    try {
      const companies = await Company.find(
        {},
        {
          // Bu fieldleri veri olarak gönderme
          normalizedTitle: 0,
          "addresses.normalizedTitle": 0,
          "addresses.normalizedLine1": 0,
          "addresses.normalizedLine2": 0,
          "addresses.normalizedDistrict": 0,
          "addresses.normalizedCity": 0,
          "addresses.normalizedCountry": 0,
          __v: 0,
        }
      )

      res.status(200).json(companies)
    } catch (err) {
      console.log(err)
    }
  },
  
  create: async (req, res, next) => {
    try {
      const data = req.body
      const normalizedData = normalizeFields(data)
      const company = new Company(normalizedData)
      await company.save()
      console.log("CNTRL CREATE COMPANY", company)

      res.status(200).json({ success: true, doc: company })
    } catch (err) {
      console.log("CNTRL CREATE COMPANY", err)
    }
  },
}

// NormalizeFields Function
const normalizeFields = (data) => {
  const normalizedData = { ...data }

  // Normalize the main fields
  const fields = ["title"]
  fields.forEach((field) => {
    const normalizedValue = data[field]
      ? translit.transliterate(data[field]).toLowerCase()
      : ""
    normalizedData[
      `normalized${field.charAt(0).toUpperCase()}${field.slice(1)}`
    ] = normalizedValue
  })

  // Normalize the sub-fields
  const subFields = {
    addresses: ["title", "line1", "line2", "district", "city", "country", "vatTitle"],
  }
  for (const field in subFields) {
    if (data[field]) {
      const normalizedSubFields = data[field].map((subField) => {
        const normalizedSubField = {}
        for (const subFieldKey of subFields[field]) {
          const normalizedValue = subField[subFieldKey]
            ? translit.transliterate(subField[subFieldKey]).toLowerCase()
            : ""
          normalizedSubField[
            `normalized${subFieldKey
              .charAt(0)
              .toUpperCase()}${subFieldKey.slice(1)}`
          ] = normalizedValue
        }
        return {
          ...subField,
          ...normalizedSubField,
        }
      })
      normalizedData[field] = normalizedSubFields
    }
  }
  console.log("normalizedData", normalizedData)

  return normalizedData
}
