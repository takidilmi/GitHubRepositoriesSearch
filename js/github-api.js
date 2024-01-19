const GITHUB_API_URL = "https://api.github.com";

// fetch user data from GitHub API
async function getUser(user, callback) {
  const response = await fetch(`${GITHUB_API_URL}/users/${user}`);
  const data = await response.json();

  // If user not found, display error message
  if (data.message === "Not Found") {
    const userDiv = document.getElementById("user");
    userDiv.innerHTML = '<p style="color: red;">No such user found.</p>';
    return;
  }

  callback(data);
}
// fetch repository data from GitHub API
async function getRepositories(user, page, perPage, callback) {
  const reposResponse = await fetch(
    `${GITHUB_API_URL}/users/${user}/repos?page=${page}&per_page=${perPage}`
  );
  const reposData = await reposResponse.json();
  // Fetch languages used in each repository
  const fetchLanguages = async (repo) => {
    const languagesResponse = await fetch(repo.languages_url);
    const languagesData = await languagesResponse.json();
    repo.languages = Object.keys(languagesData);
  };
  await Promise.all(reposData.map(fetchLanguages));
  callback(reposData);
}