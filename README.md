# Intro

This example uses Dokku as a container and listen 9022 as an ssh port.

- [Here's an example of Dokku](
https://github.com/williampsena/dokku-recipes) being used to set up and execute this application.

# Up and running application

```shell
docker-compose up -d
```

# Deploying to dokku

Remember to include the Dokku ssh key before pushing the application.

```shell
ssh-add ~/.ssh/your_id_rsa
git remote add dokku ssh://dokku@dokku.me:9022/web 
```

You can now push updates after everything is in place.

```shell
git push dokku
```

The application is available at `http://web.dokku.me`.

Remember to set your /etc/hosts:

```
127.0.1.1       localhost     dokku.me node.dokku.me web.dokku.me
```

# Testing

Run the command below to verify if the application is running.

```
curl http://web.dokku.me
```

With the [postman collection](./postman_collection.json), you may test all endpoints.