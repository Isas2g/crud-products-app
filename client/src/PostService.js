import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

class PostService {
  // Get Posts
  static getPosts() {
    
    return new Promise( (resolve, reject) => {
      try {
        axios.get(url)
          .then(response => {
              const res = response;
              const data = res.data;
              
              resolve(
                data.map(post => ({
                ...post,
                createdAt: new Date(post.createdAt)
                }))
              );
          });
      } catch(err) {
        reject(err);
      }
    });
    
  }
  
  // Create Post
  static insertPost(price, name) {
    return axios.post(url, {
      price,
      name
    });
  }
  
  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;