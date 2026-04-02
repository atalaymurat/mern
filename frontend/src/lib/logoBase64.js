const firmId = process.env.REACT_APP_FIRM_ID

let logoBase64

if (firmId === 'postiva') {
  logoBase64 = require('./logos/postiva_logo').logoBase64
} else {
  logoBase64 = require('./logos/varol_teknik_logo').logoBase64
}

export { logoBase64 }
