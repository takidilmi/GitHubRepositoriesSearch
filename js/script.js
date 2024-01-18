document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    getRepositories(username, function (user, repos) {
      const userDiv = document.getElementById("user");
      userDiv.innerHTML = `
            <div class="d-flex w-75 align-items-center justify-content-around">
            <img class="img-thumbnail rounded-4 w-50" src="${user.avatar_url}" alt="${user.name}'s avatar">
            <h2>${user.name}</h2>
            </div>
        `;

      const reposDiv = document.getElementById("repos");
      reposDiv.innerHTML = "";
      repos.forEach(function (repo) {
        const div = document.createElement("div");
        div.className = "col-sm-6";
        div.innerHTML = `
          <div class="card p-2 h-100">
              <h5 class="card-title">${repo.name}</h5>
              <p class="card-text">${repo.description}</p>
              <p class="card-text">
            ${repo.languages
              .map(
                (language) => `<span class="btn btn-primary">${language}</span>`
              )
              .join(" ")}
          </p>
          </div>
        `;
        reposDiv.appendChild(div);
      });
    });
  });
