# Redis
`docker run -d -p 6379:6379 --name redis123 -v /c/Users/DC/.docker/redis/data:/data redis --appendonly yes`

# MongoDB

### Create data volume
`docker volume create --name=mongodata123`

### Create container
`docker run --name mongodb123 -v mongodata123:/data/db -d -p 27017:27017 mongo`

### Connect to mongo shell
`docker exec -it mongodb123 mongo`
