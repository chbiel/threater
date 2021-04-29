CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS threats (
    id uuid DEFAULT uuid_generate_v4(),
    title varchar(100),
    description varchar(1000)
)