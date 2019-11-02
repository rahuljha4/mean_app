const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://rahul:AYEPP4kg4f15pt1c@cluster0-01eji.mongodb.net/node-angular?retryWrites=true&w=majority',
{ useUnifiedTopology: true, useNewUrlParser: true}).then( () => {
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
  post.save()
  .then(createdPost => {
    console.log(post);
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  // const posts = [
  //   {
  //     id: 'dsfsdf1234dsfsdf',
  //     title: 'First post',
  //     content: 'First post from server side.'
  //   },
  //   {
  //     id: '132456fdsfyrbn',
  //     title: 'Second post',
  //     content: 'Second post from server side!'
  //   }
  // ];

  Post.find()
    .then(documents => {
      // console.log(documents);
      res.status(200).json({
        message: 'Post fetched sucessfully',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    console.log(result);
    res.status(200).json({messgae: 'Post deleted'});
  });
})

module.exports = app;
