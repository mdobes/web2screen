# web2screen
A simple website API written in express and phantomjs to creating a screenshots of websites!


### How to install?
Run in SSH:
```
git clone https://github.com/mdobes/web2screen.git
```
Go to folder web2screen
```
cd web2screen
```
Install libs
```
npm install
```
Open config.json and edit it
```
{
    "port": 3000, // the port to listen to
    "token": "token", // security token
    "defaults":{
        "size": "1920,1080", // default resolution of screenshot
        "sleep": 2000 // waiting time to load page
    }
}
```
Install PM2
```
npm install pm2 -g
```
Run it in PM2
```
pm2 start index.js --name web2screen
```
Save PM2 and start it on startup
```
pm2 startup && pm2 save
```


### How to use?
```
GET ipadress.com:port/screenshot
```

| Parameter | Description                | Example             | Required      |
|-----------|----------------------------|---------------------|---------------|
| url       | A valid URL                | https://example.com | Yes           |
| token     | Security token from config | token               | Yes           |
| size      | Size of screenshot         | 1920,1080           | No (optional) |
| sleep     | Miliseconds to load a page | 1000                | No (optional) |
