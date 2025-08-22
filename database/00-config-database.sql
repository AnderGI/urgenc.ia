create table if not exists domain_event_failover (
  eventId character varying NOT NULL,
  eventName character varying NOT NULL,
  serializedEvent character varying NOT NULL,
  CONSTRAINT pk_domain_event_failover_primary_key PRIMARY KEY (eventId)
);

create table if not exists product_reviews_config (
  id character varying NOT NULL,
  totalReviews integer NOT NULL,
  negativeReviews integer NOT NULL,
  negativeReviewsThreshold numeric NOT NULL,
  negativeReviewsRoundedPercentage numeric NOT NULL,
  timeWindowStart TIMESTAMP NOT NULL,
  minimumReviews integer NOT NULL,
  CONSTRAINT pk_product_reviews_config_primary_key PRIMARY KEY (id)
);

create table if not exists product_reviews (
  productReviewsId character varying NOT NULL,
  productId character varying NOT NULL,
  publishedDate TIMESTAMP NOT NULL,
  content character varying NOT NULL,
  CONSTRAINT pk_product_reviews_primary_key PRIMARY KEY (productReviewsId)
);

create table if not exists products (
  id character varying NOT NULL,
  name character varying NOT NULL,
  CONSTRAINT pk_products_primary_key PRIMARY KEY (id)
);

create extension if not exists vector;

alter table product_reviews add column if not exists embedding vector(768);
