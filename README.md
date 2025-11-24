# Pokemon Project API

## Installation

Clone the repository:

```bash
git clone https://github.com/nino-mau/pokemon-project.git
cd pokemon-project
```

Install dependencies (pnpm required, install pnpm with `corepack enable pnpm`):

```bash
pnpm install
```

Start the containers

```bash
docker compose up -d
```

Seed the database

```bash
pnpm seed
```

You can now access the API at [http://localhost:3000](http://localhost:3000)

## API Testing

Open the bruno folder with [bruno](https://www.usebruno.com/) (Postman equivalent) and test the routes.

## Unit Testing

Run unit tests:

```bash
pnpm test
```

The tests include:

- **Utility Functions**: Testing validation logic, stats calculations, and type effectiveness
- **Model Validation**: Testing Mongoose model constraints and validations
