document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    // Clear previous user's information
    const reposDiv = document.getElementById("repos");
    reposDiv.innerHTML = "";
    getRepositories(username, function (user, repos) {
      const userDiv = document.getElementById("user");
      userDiv.innerHTML = `
        <div class="d-flex w-75 align-items-center justify-content-around">
          <div class="d-flex justify-content-center align-items-center flex-column mb-3">
            <a href="${
              user.html_url
            }" target="_blank"><i class="fa-solid fa-link"></i> GitHub Profile</a>
            <img class="img-thumbnail rounded-4 w-50" src="${
              user.avatar_url ? user.avatar_url : "../assets/images/avatar.jpg"
            }" alt="${user.name ? user.name : "GitHub User"}'s avatar">
            ${
              user.blog
                ? `<a href="${user.blog}" target="_blank">${user.blog}</a>`
                : ""
            }
          </div>
          <div>
            <h2>${user.name ? user.name : "GitHub User"}</h2>
            <p><i class="fas fa-map-marker-alt"></i> ${
              user.location ? user.location : "Unknown"
            }</p>
            <p>${user.bio ? user.bio : "No Description Provided"}</p>
          </div>
        </div>
      `;

      const reposDiv = document.getElementById("repos");
      reposDiv.innerHTML = "";
      if (repos.length === 0) {
        reposDiv.innerHTML =
          '<p style="color: red;">No Repository Was Found</p>';
        return;
      }
      repos.forEach(function (repo) {
        const div = document.createElement("div");
        div.className = "col-sm-6";
        div.innerHTML = `
          <div class="card p-2 h-100">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${
              repo.description
                ? repo.description
                : "No Description Was Provided"
            }</p>
            <p class="card-text">
              ${repo.languages
                .map(
                  (language) =>
                    `<span class="btn btn-primary">${language}</span>`
                )
                .join(" ")}
            </p>
          </div>
        `;
        reposDiv.appendChild(div);
      });
    });
  });

async function getRepositories(user, callback) {
  const userDiv = document.getElementById("user");
  userDiv.innerHTML = '<div class="loader">Loading...</div>'; // Show loader

  const response = await fetch(`${GITHUB_API_URL}/users/${user}`);
  const data = await response.json();

  if (data.message === "Not Found") {
    userDiv.innerHTML = '<p style="color: red;">No such user found.</p>';
    return;
  }

  const reposResponse = await fetch(`${GITHUB_API_URL}/users/${user}/repos`);
  const reposData = await reposResponse.json();

  for (let i = 0; i < reposData.length; i++) {
    const repo = reposData[i];
    const languagesResponse = await fetch(repo.languages_url);
    const languagesData = await languagesResponse.json();
    repo.languages = Object.keys(languagesData);
  }

  userDiv.innerHTML = ""; // Remove loader when done
  callback(data, reposData);
}
