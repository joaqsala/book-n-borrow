document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#search-form').addEventListener('submit', event => {
        event.preventDefault();

        const filter = document.querySelector('input[name="filter"]:checked').value;
        const query = document.querySelector('#searchbar').value;

        // Perform a POST request to the search route
        fetch('/api/search', {
            method: 'POST',
            body: JSON.stringify({ filter, query }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.text())  // Assuming server responds with HTML
        .then(html => {
            // Insert the server-rendered HTML into the page
            document.querySelector('#listing-section').innerHTML = html;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});