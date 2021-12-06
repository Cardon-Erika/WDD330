import Auth from './auth.js';
import { makeRequest } from './authHelpers.js';

let auth = new Auth();

function init() {
  // handle login
  const submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', async () => {
    auth.login(getPosts);
  });

  // handle post
  const postBtn = document.getElementById('submitPost');
  postBtn.addEventListener('click', async () => {
    const post = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value,
      userId: auth.user.id,
      createdAt: new Date().getTime(),
      id: Math.floor(Math.random() * 100),
    };
    const postResponse = await makeRequest(
      'posts',
      'POST',
      post,
      auth.jwtToken
    );
    console.log(postResponse);
  });
}

async function getPosts() {
  const posts = await makeRequest('posts', 'GET', null, auth.jwtToken);
  console.table(posts);
}

window.addEventListener('load', init);
