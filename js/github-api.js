const GITHUB_API_URL = "https://api.github.com";

async function getRepositories(user, page, perPage, callback) {
  // loader
  const userDiv = document.getElementById("user");
  userDiv.innerHTML = '<div class="loader">Loading...</div>';

  const response = await fetch(`${GITHUB_API_URL}/users/${user}`);
  const data = await response.json();
  if (data.message === "Not Found") {
    const userDiv = document.getElementById("user");
    userDiv.innerHTML = '<p style="color: red;">No such user found.</p>';
    return;
  }

  const reposResponse = await fetch(
    `${GITHUB_API_URL}/users/${user}/repos?page=${page}&per_page=${perPage}`
  );
  const reposData = await reposResponse.json();

  for (let i = 0; i < reposData.length; i++) {
    const repo = reposData[i];
    const languagesResponse = await fetch(repo.languages_url);
    const languagesData = await languagesResponse.json();
    repo.languages = Object.keys(languagesData);
  }

  callback(data, reposData);
}
