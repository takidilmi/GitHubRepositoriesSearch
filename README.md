# GitHub Repositories Search

## Description
This application allows users to search for GitHub users and view their public repositories. It fetches data from the GitHub API and displays it in a user-friendly manner. Users can paginate through the results and filter repositories by name. And it shows the languages used in the repositories.

## Live Demo
You can view a live demo of the application [here](https://git-hub-repositories-search-five.vercel.app/).

## Assumptions
- The GitHub API always returns data in the expected format.
- The GitHub API returns fetched repositories to render alphabetically.
- The user will always enter a valid GitHub username. If a non-existent username is entered, the application will display a "User not found or doesn't exist" message.
- The user can't click the search button if the input is less than 2 letters.
- The application handles GitHub API rate limits. If the rate limit is exceeded, the application will display a "GitHub API rate limit exceeded. Please try again later." message.
- The application assumes that all repositories have a 'name' and 'description' field. If these fields are not present in the API response, the application will display "No Description Was Provided".
- The application assumes that all GitHub users have a 'location' field. If this field is not present in the API response, or if the user did not provide their location, the application will display "Unknown" for that user's location.
- The application assumes that all repositories have a 'languages_url' field and that this URL returns a list of languages used in the repository.
- The application handles 404 errors by displaying a "Page Not Found" message and a countdown timer. After 5 seconds, the user is redirected to the homepage.

## Installation
1. Clone the repository to your local machine.
2. Open the `index.html` file in your browser.

## Usage
1. Enter a GitHub username in the input field and click the "Search" button.
2. The application will display the user's public repositories.
3. Use the pagination buttons to navigate through the pages.
4. Use the "Repositories per page" dropdown to change the number of repositories displayed per page.
5. Use the repository search bar to filter repositories by name.