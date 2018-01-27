cd web
ng build --prod

cd ..

docker build -t chatter-server ./server
docker build -t chatter-web ./web

docker-compose up -d