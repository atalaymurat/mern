## Basit Teklif Oluşturma Uygulaması

express backend
mongo database Atlas
react-app frontend

## Gerekli ENV Dosyaları

Aşağıdaki dosyaların manuel oluşturulması gerekir:

- `frontend/.env`
- `frontend/.env.production`
- `express/.env`
- `express/.env.production`

---

## express/.env
```env
NODE_ENV=development
SERVER_PORT=3000
JWT_SECRET=xxxCXXXXXCCXXXCXXxxxxXXX
MONGODB_URI="MONGO ATLAS URI"
CORS_LIST='["http://localhost:3001"]'
```

## express/.env.production
```env
NODE_ENV=production
SERVER_PORT=3000
JWT_SECRET=xxxCXXXXXCCXXXCXXxxxxXXX
MONGODB_URI="MONGO ATLAS URI"
mongodb+srv://<db_username>:<db_password>@cluster0.0f6tl3g.mongodb.net/?appName=Cluster0
CORS_LIST='["https://your-frontend-domain.com"]'
```

## frontend/.env
```env
REACT_APP_API_BASE_URL=https://your-domain.com
```

## frontend/.env.production
```env
REACT_APP_API_BASE_URL=https://your-domain.com
```

## Mongo Atlas Db den Hesap Açma ve cluster oluşturma gereklidir.
https://www.mongodb.com/products/platform/atlas-database