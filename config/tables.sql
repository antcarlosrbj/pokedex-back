CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teams (
   id SERIAL PRIMARY KEY,
   "userId" INTEGER NOT NULL REFERENCES users(id),
   name TEXT NOT NULL UNIQUE,
   "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pokemons (
   id SERIAL PRIMARY KEY,
   "teamId" INTEGER NOT NULL REFERENCES teams(id),
   "pokemonId" INTEGER NOT NULL,
   "speciesId" INTEGER NOT NULL,
   "createdAt" TIMESTAMP DEFAULT NOW()
);