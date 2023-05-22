document.querySelector('#submit').addEventListener('click', function (event) {
    event.preventDefault();
    
    // gather the search query and filter
    let query = document.querySelector('#searchbar').value;
    let filter;
    let radios = document.getElementsByName('flexRadioDefault');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // get value of the checked radio button
            filter = radios[i].value;
            break;
        }
    }

    console.log("Query:", query);  // Log query and filter for debugging
    console.log("Filter:", filter);
    
    // If query or filter is not defined, print an error message and return
    if(!query || !filter) {
        console.error("Filter or query is not defined.");
        return;
    }

    // make a request to the server with the search query and filter
    fetch(`/api/search?query=${query}&filter=${filter}`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // update the page with the search results
    })
    .catch(error => {
        console.error('Error:', error);
    });
});