//variables
let currentLikes
const commentList = document.querySelector('#comments-list');

// fetch request
fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(postForFlatagram => {
        displayFlatagramPost(postForFlatagram);
        removeCurrentLiItems();
        showComments(postForFlatagram);
    })

//event listeners
//click on the heart icon to increase the like (no persist needed)
document.getElementById('like-button').addEventListener('click', function increaseLikes(){
        let likeCount = document.querySelector('#like-count');
        const current = parseInt(likeCount.textContent) + 1
        likeCount.textContent = `${current} likes`;
    }
)

//prevent refresh on post comment form & post new comment value
document.querySelector('#comment-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const newComment = document.getElementById('comment').value;
    const postNewComment = document.createElement('li');
    postNewComment.textContent = newComment;
    commentList.append(postNewComment);
    e.target.reset();
})

//I can see the image, title, likes
function displayFlatagramPost(postForFlatagram){
    document.querySelector('#card-image').src = postForFlatagram.image; 
    document.querySelector('#card-title').textContent = postForFlatagram.title;
    currentLikes = document.querySelector('#like-count').textContent = `${postForFlatagram.likes} likes`;
}

//shows comments
function showComments(postForFlatagram){
    postForFlatagram['comments'].forEach(comment => {
        let postComment = document.createElement('li');
        postComment.textContent = comment.content;
        commentList.appendChild(postComment);
    })
}

//removes current li items
function removeCurrentLiItems(){
    const myList = document.getElementById('comments-list');
    myList.innerHTML = '';
}