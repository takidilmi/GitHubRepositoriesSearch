const GITHUB_API_URL = "https://api.github.com";

// fetch user data from GitHub API
async function getUser(user, callback) {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${user}`);
    const data = await response.json();

    // If user not found, display error message
    if (data.message === "Not Found") {
      displayError("No such user found.");
      return;
    }

    callback(data);
  } catch (error) {
    displayError(
      "An error occurred while fetching the user data. Please try again."
    );
  }
}

async function getRepositories(user, page, perPage, callback) {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  try {
    const reposResponse = await fetch(
      `${GITHUB_API_URL}/users/${user}/repos?page=${page}&per_page=${perPage}`
    );

    // Check if rate limit has been exceeded
    if (reposResponse.status === 403) {
      displayError("GitHub API rate limit exceeded. Please try again later.");
      return;
    }

    let reposData = await reposResponse.json();

    // Fetch languages used in each repository
    const fetchLanguages = async (repo) => {
      const languagesResponse = await fetch(repo.languages_url);
      const languagesData = await languagesResponse.json();
      repo.languages = Object.keys(languagesData);
    };
    await Promise.all(reposData.map(fetchLanguages));

    const totalReposResponse = await fetch(`${GITHUB_API_URL}/users/${user}`);
    const totalReposData = await totalReposResponse.json();
    const totalRepos = totalReposData.public_repos;

    callback(reposData, totalRepos);
  } catch (error) {
    displayError(
      "An error occurred while fetching the repositories. Please try again."
    );
  }
  loader.style.display = "none";
}

function displayError(message) {
  const userDiv = document.getElementById("user");
  userDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
