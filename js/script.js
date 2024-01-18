// script.js
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    getRepositories(username, function(user, repos) {
        const userDiv = document.getElementById('user');
        userDiv.innerHTML = `
            <div class="d-flex w-75 align-items-center justify-content-around"><img class="img-thumbnail rounded-4 w-50" src="${user.avatar_url}" alt="${user.name}'s avatar">
            <h2>${user.name}</h2></div>
        `;

        const reposDiv = document.getElementById('repos');
        reposDiv.innerHTML = '';
        repos.forEach(function(repo) {
            const div = document.createElement('div');
            div.className = 'col-sm-6';
            div.textContent = repo.name;
            reposDiv.appendChild(div);
        });
    });
});
