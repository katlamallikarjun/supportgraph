const API_URL = "http://localhost:5000/api/issues";

const issuesContainer = document.getElementById("issuesContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const showAllButton = document.getElementById("showAllButton");

// ==========================================
// LOAD ALL ISSUES
// ==========================================

async function loadIssues() {
    try {
        issuesContainer.innerHTML = "Loading issues...";

        const response = await fetch(API_URL);
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error);
        }

        displayIssues(result.data);

    } catch (error) {
        console.error(error);

        issuesContainer.innerHTML =
            `<p class="error">Failed to load issues.</p>`;
    }
}


// ==========================================
// SEARCH ISSUES
// ==========================================

async function searchIssues() {
    const query = searchInput.value.trim();

    // Empty search
    if (!query) {
        issuesContainer.innerHTML =
            `<p class="error">Search query is required.</p>`;
        return;
    }

    try {
        issuesContainer.innerHTML = "Searching...";

        const response = await fetch(
            `${API_URL}/search?q=${encodeURIComponent(query)}`
        );

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error);
        }

        displayIssues(result.data);

    } catch (error) {
        console.error(error);

        issuesContainer.innerHTML =
            `<p class="error">Search failed.</p>`;
    }
}


// ==========================================
// DISPLAY ISSUES
// ==========================================

function displayIssues(issues) {

    if (!issues || issues.length === 0) {
        issuesContainer.innerHTML =
            "<p>No issues found.</p>";
        return;
    }

    issuesContainer.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.className = "issue-card";

        card.innerHTML = `
            <h3>${issue.name}</h3>

            <p>
                <strong>ID:</strong>
                ${issue.id}
            </p>

            <p>
                ${issue.description}
            </p>

            <p class="severity">
                <strong>Severity:</strong>
                ${issue.severity}
            </p>

            <button onclick="viewIssue('${issue.id}')">
                View Details
            </button>
        `;

        issuesContainer.appendChild(card);
    });
}


// ==========================================
// VIEW SINGLE ISSUE
// ==========================================

async function viewIssue(issueId) {

    try {

        const response = await fetch(
            `${API_URL}/${issueId}/troubleshooting`
        );

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error);
        }

        displayTroubleshooting(result.data);

    } catch (error) {

        console.error(error);

        alert("Failed to load issue details.");
    }
}


// ==========================================
// DISPLAY TROUBLESHOOTING
// ==========================================

function displayTroubleshooting(data) {

    const detailsSection =
        document.getElementById("detailsSection");

    const issueDetails =
        document.getElementById("issueDetails");

    const issue = data.issue;

    issueDetails.innerHTML = `
        <h3>${issue.name}</h3>

        <p>
            <strong>ID:</strong>
            ${issue.id}
        </p>

        <p>
            <strong>Description:</strong>
            ${issue.description}
        </p>

        <p>
            <strong>Severity:</strong>
            ${issue.severity}
        </p>

        <h3>Symptoms</h3>
        ${createList(data.symptoms)}

        <h3>Causes</h3>
        ${createList(data.causes)}

        <h3>Components</h3>
        ${createList(data.components)}

        <h3>Resolutions</h3>
        ${createList(data.resolutions)}

        <h3>Technologies</h3>
        ${createList(data.technologies)}

        <h3>Related Issues</h3>
        ${createList(data.relatedIssues)}
    `;

    detailsSection.classList.remove("hidden");

    detailsSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// CREATE LIST
// ==========================================

function createList(items) {

    if (!items || items.length === 0) {
        return "<p>None</p>";
    }

    return `
        <ul>
            ${items.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;
}


// ==========================================
// BUTTON EVENTS
// ==========================================

searchButton.addEventListener(
    "click",
    searchIssues
);

showAllButton.addEventListener(
    "click",
    loadIssues
);


// ==========================================
// INITIAL LOAD
// ==========================================

loadIssues();