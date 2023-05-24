### To run dev server
1. Create database (you can use ./scripts/create_db.sh)
2. Run knex migrations and seeds
```bash
knex migrate:latest --knexfile knexfile.js
knex seed:run --knexfile knexfile.js
```
3. Create .env file in root directory
```bash
cp .env.example .env
```
4. Fill .env file with your data
5. Install dependencies
```bash
npm install
```
6. Run server
```bash
npm run dev
```

### To run tests
```bash
npm run test
```

### To run linter
```bash
npm run lint
```

### To build project
```bash
npm run build
```
