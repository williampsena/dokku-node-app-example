# Dokku
## Running

```shell
docker-compose up -d
```
## Set up plugins

```
# TODO: move to dockerfile
docker-compose exec dokku sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo

docker-compose exec dokku dokku mongo:create users
docker-compose exec dokku dokku apps:create web
docker-compose exec dokku dokku mongo:link users web
```

# Application
## Testing application

```shell
docker-compose -f docker-compose.dev.yml logs -f app 
```