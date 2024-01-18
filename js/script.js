document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    getRepositories(username, function(user, repos) {
        const userDiv = document.getElementById('user');
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.name}'s avatar">
            <h2>${user.name}</h2>
        `;

        const reposDiv = document.getElementById('repos');
        reposDiv.innerHTML = '';
        repos.forEach(function(repo) {
            const p = document.createElement('p');
            p.textContent = repo.name;
            reposDiv.appendChild(p);
        });
    });
});
