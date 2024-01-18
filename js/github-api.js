// const GITHUB_API_URL = 'https://api.github.com';

// async function getRepositories(user) {
//     const response = await fetch(`${GITHUB_API_URL}/users/${user}/repos`);
//     const data = await response.json();
//     return data;
// }

// getRepositories('takidilmi')
//     .then(repos => {
//         // Do something with the repositories
//         console.log(repos);
//     })
//     .catch(error => {
//         // Handle the error
//         console.error('Error:', error);
//     });

const GITHUB_API_URL = "https://api.github.com";

async function getRepositories(user, callback) {
  const response = await fetch(`${GITHUB_API_URL}/users/${user}`);
  const data = await response.json();

  const reposResponse = await fetch(`${GITHUB_API_URL}/users/${user}/repos`);
  const reposData = await reposResponse.json();

  for (let i = 0; i < reposData.length; i++) {
    const repo = reposData[i];
    const languagesResponse = await fetch(repo.languages_url);
    const languagesData = await languagesResponse.json();
    repo.languages = Object.keys(languagesData);
  }

  callback(data, reposData);
}
