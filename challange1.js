class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    render() {
        const userItem = document.createElement('li');
        userItem.className = 'user-item';
        userItem.textContent = `${this.name} (${this.email})`;
        userItem.onclick = () => this.showPosts();

        return userItem;
    }

    showPosts() {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.id}`)
            .then(response => response.json())
            .then(posts => {
                Post.renderPosts(posts);
            });
    }
}

class Post {
    constructor(title, body) {
        this.title = title;
        this.body = body;
    }

    render() {
        const postItem = document.createElement('li');
        postItem.className = 'post-item';
        postItem.innerHTML = `<strong>${this.title}</strong><p>${this.body}</p>`;

        return postItem;
    }

    static renderPosts(posts) {
        const postList = document.querySelector('.post-list');
        postList.innerHTML = '';
        posts.forEach(postData => {
            const post = new Post(postData.title, postData.body);
            postList.appendChild(post.render());
        });
    }
}

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.querySelector('.user-list');
            users.forEach(userData => {
                const user = new User(userData.id, userData.name, userData.email);
                userList.appendChild(user.render());
            });
        });
}

document.addEventListener('DOMContentLoaded', fetchUsers);