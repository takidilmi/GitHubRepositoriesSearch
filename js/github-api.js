// github-api.js
const GITHUB_API_URL = 'https://api.github.com';

async function getRepositories(user) {
    const response = await fetch(`${GITHUB_API_URL}/users/${user}/repos`);
    const data = await response.json();
    return data;
}

getRepositories('takidilmi')
    .then(repos => {
        // Do something with the repositories
        console.log(repos);
    })
    .catch(error => {
        // Handle the error
        console.error('Error:', error);
    });
