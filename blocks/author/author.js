const aTag = document.querySelector('a.button');
//const url = aTag.getAttribute('href');
// const mainURL = 'https://main--eds-training--adobevijay.aem.page/customers.json'
const mainURL = aTag ? aTag.getAttribute('href') : block.textContent.trim();

const container = document.createElement('div');
container.id = 'table-container';
aTag.replaceWith(container);


let currentPage = 1;
const pageSize = 20;


async function fetchData(page) {
    const offset = (page - 1) * pageSize;
    const response = await fetch(`${mainURL}?offset=${offset}&limit=${pageSize}`);
    const result = await response.json();
console.log('result',result.data)
    renderTable(result.data);
    renderPagination(result.total, pageSize, page);
}

// Render the table with data
function renderTable(data) {
    const tableHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Segment</th>
                    <th style="border: 1px solid #ddd; padding: 8px;">Product Category</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(row => `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.Name}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row.Segment}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${row['Product Category']}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    container.innerHTML = tableHTML;
}

// Render pagination buttons
function renderPagination(totalItems, pageSize, currentPage) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let paginationHTML = '<div style="margin: 10px 0; text-align: center;">';

    // Create pagination buttons with classes for styling
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-button ${i === currentPage ? 'selected' : ''}" data-page="${i}">${i}</button>`;
    }

    paginationHTML += '</div>';
    container.innerHTML += paginationHTML;

    // Add event listeners for each button
    const buttons = container.querySelectorAll('.pagination-button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const page = parseInt(event.target.getAttribute('data-page'), 10);
            changePage(page);
        });
    });
}

// Ensure changePage is defined in the same scope
function changePage(page) {
    currentPage = page;
    fetchData(currentPage);
}






fetchData(currentPage);

