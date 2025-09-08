docker exec -it db bash

apt-get update
apt-get install -y git make gcc postgresql-server-dev-15

cd /tmp
git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git
cd pgvector
make
make install

CREATE EXTENSION vector;
