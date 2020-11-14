const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get post
router.get('/', async(req, res) => {
  const posts = await loadPostsCollection();
  
  res.send(await posts.find({}).toArray());
});

//Add post
router.post('/', async(req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    price: req.body.price,
    name: req.body.name,
    createdAt: new Date()
  });
  
  res.status(201).send();
});

//Delete post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  
  res.status(200).send();
});



async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://renat:renat1@ds263156.mlab.com:63156/jokes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
  });
  
  return client.db('jokes').collection('posts');
}

module.exports = router;