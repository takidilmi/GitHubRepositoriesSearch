let currentPage = 1;
let perPage = 10;
let currentUsername = "";

// Get the input field and search button
const inputField = document.getElementById("username");
const searchButton = document.querySelector("#search-form button");

// Add an input event listener to the input field
inputField.addEventListener("input", function () {
  // If the input value length is less than 2, disable the search button and change the cursor style
  if (inputField.value.length < 2) {
    searchButton.disabled = true;
    searchButton.style.cursor = "not-allowed";
  } else {
    // Otherwise, enable the search button and change the cursor style back to default
    searchButton.disabled = false;
    searchButton.style.cursor = "pointer";
  }
});
// clear pagination after a new search
function clearPagination() {
  const pageNumbersDiv = document.getElementById("page-numbers");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  pageNumbersDiv.innerHTML = "";
  prevPageButton.style.display = "none";
  nextPageButton.style.display = "none";
}

// Call the event listener once at the start to initialize the button state
inputField.dispatchEvent(new Event("input"));

// Manipulating the DOM to display the user data
function displayUser(user) {
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
      user.blog ? `<a href="${user.blog}" target="_blank">${user.blog}</a>` : ""
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
}
// Manipulating the DOM to display the repository data
function displayRepos(repos, totalRepos) {
  const reposDiv = document.getElementById("repos");
  const pageNumbersDiv = document.getElementById("page-numbers");
  pageNumbersDiv.innerHTML = "";
  reposDiv.innerHTML = "";
  if (repos.length === 0) {
    reposDiv.innerHTML = '<p style="color: red;">No Repository Was Found</p>';
    return;
  }
  for (const repo of repos) {
    const div = document.createElement("div");
    div.className = "col-sm-6";
    div.innerHTML = `
      <div class="card p-2 h-100">
        <h5 class="card-title text-primary">${repo.name}</h5>
        <p class="card-text">${
          repo.description ? repo.description : "No Description Was Provided"
        }</p>
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
  }
  const totalPages = Math.ceil(totalRepos / perPage);
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  prevPageButton.style.display = totalPages > 1 ? "block" : "none";
  nextPageButton.style.display = totalPages > 1 ? "block" : "none";
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.className = "btn btn-outline-primary me-2";
    button.addEventListener("click", () => {
      currentPage = i;
      getRepositories(currentUsername, currentPage, perPage, displayRepos);
    });
    pageNumbersDiv.appendChild(button);
  }

  // Remove the 'bg-primary' class from all page number buttons
  const pageNumberButtons = document.querySelectorAll("#page-numbers button");
  pageNumberButtons.forEach((button) => {
    button.classList.remove("bg-primary");
    button.classList.add("btn-outline-primary"); // Add the original color back
  });

  // Add the 'bg-primary' class to the current page number button
  const currentPageButton = document.querySelector(
    `#page-numbers button:nth-child(${currentPage})`
  );
  if (currentPageButton) {
    currentPageButton.classList.remove("btn-outline-primary"); // Remove the original color
    currentPageButton.classList.add("bg-primary");
  }
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    // Stops the browser's default form submission process
    event.preventDefault();
    // Get username from input field
    currentUsername = document.getElementById("username").value;
    // Clear previous user's information
    const reposDiv = document.getElementById("repos");
    reposDiv.innerHTML = "";
    // Clear pagination
    clearPagination();
    // Fetch and display user and repository data
    getUser(currentUsername, displayUser);
    getRepositories(currentUsername, currentPage, perPage, displayRepos);
    document.getElementById("repo-search").style.display = "block";
    document
      .getElementById("repo-search")
      .addEventListener("input", function (event) {
        // Get the search term
        const searchTerm = event.target.value.toLowerCase();

        // Get all the repository cards
        const repoCards = document.querySelectorAll("#repos .card");

        // Loop through the repository cards and hide those that don't match the search term
        repoCards.forEach((card) => {
          const repoName = card
            .querySelector(".card-title")
            .textContent.toLowerCase();
          if (repoName.includes(searchTerm)) {
            card.parentElement.style.display = "block";
          } else {
            card.parentElement.style.display = "none";
          }
        });
      });
  });

document.getElementById("prev-page").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    getRepositories(currentUsername, currentPage, perPage, displayRepos);
  }
});

document.getElementById("next-page").addEventListener("click", function () {
  currentPage++;
  getRepositories(currentUsername, currentPage, perPage, displayRepos);
});

function updatePerPage() {
  perPage = document.getElementById("perPage").value;
  currentPage = 1;
  getRepositories(currentUsername, currentPage, perPage, displayRepos);
}
