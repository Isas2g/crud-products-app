<template>
  <div class="container">
    <h1>Products List</h1>
    <div class="create-post">
      <label for="create-price">Add product price</label>
      <input type="number" id="create-price" v-model="price" placeholder="Price"> <br><br>
      <label for="create-post">Add product name</label>
      <input type="text" id="create-post" v-model="name" placeholder="Name"> 
      <br><br>
      <button v-on:click="createPost">Add</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    
    <div class="posts-conainer">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)">
        
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        
        <p class="text">price: {{ post.price }}$</p>
        <p class="text">{{ post.name }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      price: null,
      name: ''
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.price, this.name);
      this.posts = await PostService.getPosts();
      this.price = '';
      this.name = '';
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div.container {
  max-width: 800px; 
  margin: 0 auto; 
}

p.error {
  border: 1px solid #ff5b5f; 
  background-color: #ffc5c1; 
  padding: 10px; margin-bottom: 15px; 
}

div.post { 
  position: relative; 
  border: 1px solid #5bd658; 
  background-color: #bcffb8; 
  padding: 10px 10px 30px 10px; 
  margin-bottom: 15px; 
}

div.created-at {
  position: absolute;
  top: 0; 
  left: 0; 
  padding: 5px 15px 5px 15px; 
  background-color: darkgreen;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0; 
}
</style>
