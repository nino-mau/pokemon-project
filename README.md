# Pokemon Project API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nino-mau/pokemon-project.git
cd pokemon-project
```

2. Install dependencies:

```bash
npm install
```

4. Start the application and database containers and access the app at [localhost:3000]

```bash
docker compose up -d
```

## Testing

Run tests:

```bash
npm test
```

The tests include:

- **Utility Functions**: Testing validation logic, stats calculations, and type effectiveness
- **Model Validation**: Testing Mongoose model constraints and validations
