CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  bypass BOOLEAN DEFAULT FALSE
);

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  secret_key VARCHAR(255) NOT NULL
);

CREATE TABLE access_tokens (
  id SERIAL PRIMARY KEY,
  store_id INTEGER REFERENCES stores(id),
  game_id INTEGER REFERENCES games(id),
  access_token VARCHAR(255)
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  receipt VARCHAR(255) NOT NULL,
  user_identifier VARCHAR(255) NOT NULL,
  store_id INTEGER REFERENCES stores(id),
  game_id INTEGER REFERENCES games(id),
  status VARCHAR(10) CHECK (status IN ('success', 'failed')) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
