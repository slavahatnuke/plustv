all: app

app:
	docker-compose up app

app.console:
	docker-compose run --rm app bash

ps:
	docker ps