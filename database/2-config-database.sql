create extension if not exists vector;
create extension if not exists pg_net;

create table if not exists domain_event_failover (
  event_id character varying NOT NULL,
  event_name character varying NOT NULL,
  serialized_event character varying NOT NULL,
  CONSTRAINT pk_domain_event_failover_primary_key PRIMARY KEY (event_id)
);

create table if not exists product_reviews_config (
  id character varying NOT NULL,
  total_reviews integer NOT NULL,
  negative_reviews integer NOT NULL,
  negative_reviews_threshold numeric NOT NULL,
  negative_reviews_rounded_percentage numeric NOT NULL,
  time_window_start TIMESTAMP NOT NULL,
  minimum_reviews integer NOT NULL,
  CONSTRAINT pk_product_reviews_config_primary_key PRIMARY KEY (id)
);

create table if not exists product_reviews (
  product_reviews_id character varying NOT NULL,
  product_id character varying NOT NULL,
  sentiment character varying NOT NULL,
  published_date TIMESTAMP NOT NULL,
  content character varying NOT NULL,
  embedding vector(768),
  CONSTRAINT pk_product_reviews_primary_key PRIMARY KEY (product_reviews_id)
);

create table if not exists products (
  id character varying NOT NULL,
  name character varying NOT NULL,
  CONSTRAINT pk_products_primary_key PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION create_product_reviews_embeddings()
    RETURNS TRIGGER
    LANGUAGE plpgSQL
AS $$
BEGIN
    PERFORM net.http_post(
		url := 'http://app:5000/app/productReviews/' || NEW.product_reviews_id || '/embeddings',
		body := JSONB_BUILD_OBJECT(
			'content', NEW.content
		),
		headers := JSONB_BUILD_OBJECT('Content-Type', 'application/json')
	);
	RETURN new;
END; $$;

create trigger backoffice_backend__generate_embeddings_on_review_created 
  after insert on product_reviews
  for each row
  execute function create_product_reviews_embeddings();

