# NasaSearch

Search backend created with Express JS

## Because Space is cool!

### Node Version

`v24.14.1`

### Steps to run locally

1. run `npm install` in root level

2. Create a `.env.local` file at the root level and add the following keys:

```
PORT=
API_URL=
NODE_ENV=
WEBSITE_URL=
```

3. run `npm run dev` to start server (note: uses nodemon to reload server automatically on detected change)

4. App is now runnng at `http://localhost:${process.env.PORT}`

5. Search route is `/search/{YOUR_QUERY_PARAM}` (ex: http://localhost:3001/search/space)
