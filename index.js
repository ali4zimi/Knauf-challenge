const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
////////////////////////////////////////////////////////////////////
function renderColumn(title, users) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    columnDiv.appendChild(h3);
    users.forEach((user) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const nameP = document.createElement('p');
        nameP.textContent = `Name: ${user.name}`;
        cardDiv.appendChild(nameP);
        const usernameP = document.createElement('p');
        usernameP.textContent = `Username: ${user.username}`;
        cardDiv.appendChild(usernameP);
        const websiteP = document.createElement('p');
        websiteP.textContent = `Website: ${user.website}`;
        cardDiv.appendChild(websiteP);
        columnDiv.appendChild(cardDiv);
    });
    const wrapperDiv = document.getElementById('wrapper');
    wrapperDiv.appendChild(columnDiv);
}

function extractDomain(website) {
    // I created the regex pattern on https://regexr.com
    const re = /\.([a-z]*)/

    return re.exec(website)[0];
}

function fetchUsers() {
    const columns = [];

    fetch(USERS_ENDPOINT)
        .then((response) => response.json())
        .then((users) => {
            users.forEach((user) => {
                var domain = extractDomain(user.website);

                if (!columns.includes(domain)) {
                    columns.push(domain)
                }
            })

            columns.forEach((title) => {
                var filtered_users = users.filter((user) => extractDomain(user.website) == title)
                renderColumn(title, filtered_users)
            })
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


fetchUsers()    