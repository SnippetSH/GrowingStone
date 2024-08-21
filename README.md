## branch: server-go

If you want to run server-go, you should run the following command.
```bash
cd server-go
go mod download
go run main.go
fresh
```

And, if you don't want to build client, you have to add .env file at client folder with VITE_SERVER_URL=YOUR_IP:8000
```bash
cd client
npm install
echo "VITE_SERVER_URL=[YOUR_IP]:8000" > .env
npm run dev
```