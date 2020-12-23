# lichess-review

Lichess-review is a small web app that makes use of Express and MongoDB to Create, Read, Update and Delete data from a dataset stored either locally or remotely in a MongoDB server. Lichess-review is not affiliated with lichess, and the data used is available on Kaggle by user Mitchell J. You can download the dataset either from this repository, or from Kaggle [here](https://www.kaggle.com/datasnaek/chess).

If it is your first time running lichess-review, then you'll need to seed the dataset into a running MongoDB instance.

If you don't have a .env file of your own, then you can use the .env.example that is included in this repository. Simply run

```
$ mv .env.example .env
```

to ensure the app uses .env. From here, edit any of the variables in .env as you need. By default, it'll run the app locally with port 2020 (localhost:2020), reading from MongoDB's port 27017.

Next, ensure that the MongoDB service is running on the machine you wish to seed. On Linux machines running systemd, this is done like so:
```
$ sudo systemctl start mongod.service
```
If MongoDB is not running, the app should, after some delay, inform you about this. You must also ensure that the variables set up in the .env file are valid.

From here, you can install dependencies and run the seeder as follows:
```
$ npm install
$ node seeder.js
```

The time it takes to get dependencies and import the data will depend on the speed of the machine which is being imported to. 

To finally run the app, enter the following from the machine that is serving the app: 
```
$ npm run
```
