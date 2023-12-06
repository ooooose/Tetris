up:
	docker-compose up -d

up-prod:
	docker-compose -f docker-compose.prod.yml up -d

build:
	docker-compose build

build-prod:
	docker-compose -f docker-compose.prod.yml build

down:
	docker-compose down

down-prod:
	docker-compose -f docker-compose.prod.yml down

ps:
	docker-compose ps -a

ps-prod:
	docker-compose -f docker-compose.prod.yml ps

setup:
	docker-compose run --rm api poetry install --no-root

setup-prod:
	docker-compose -f docker-compose.prod.yml run --rm api-prod poetry install --no-root

logs:
	docker-compose logs -f api

logs-prod:
	docker-compose -f docker-compose.prod.yml logs -f api-prod

shell:
	docker-compose exec api bash

install:
	docker-compose --rm front npm install

lint:
	docker-compose run --rm front npm run lint

fix:
	docker-compose run --rm front npm run fix

postgres:
	docker-compose exec db sh -c "PGPASSWORD=password psql -U postgres postgres"
