FROM postgres:13

RUN apt-get update \
  && apt-get install -y \
  git make gcc \
  postgresql-server-dev-13 \
  libicu-dev \
  libcurl4-openssl-dev \
  && cd /tmp \
  && git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git \
  && cd pgvector && make && make install \
  && cd .. \
  && git clone https://github.com/supabase/pg_net.git \
  && cd pg_net && make && make install 