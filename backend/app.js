const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://rahul:AYEPP4kg4f15pt1c@cluster0-01eji.mongodb.net/test?retryWrites=true&w=majority').then( () => {
  console.log('Connected to database.');
}).catch(() => {
  consoe.log('Connection failed,');l
})

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);

  res.status(201).json({
    message: "Post added successfully"
  });
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'dsfsdf1234dsfsdf',
      title: 'First post',
      content: 'First post from server side.'
    },
    {
      id: '132456fdsfyrbn',
      title: 'Second post',
      content: 'Second post from server side!'
    }
  ];
  res.status(200).json({
    message: 'Post fetched sucessfully',
    posts: posts
  });
});

module.exports = app;
