up:
	docker-compose up -d

build:
	docker-compose build

down:
	docker-compose down

ps:
	docker-compose ps -a

logs:
	docker-compose logs -f api

shell:
	docker-compose exec api bash

install:
	docker-compose --rm front npm install

lint:
	docker-compose run --rm front npm run lint

fix:
	docker-compose run --rm front npm run fix
