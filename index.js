const renderList = document.getElementById("tbody");
const addBookButton = document.getElementById("add-btn");
const searchInput = document.getElementById('searchinput');
const searchButton = document.getElementById('searchbutton');
const tableBody = document.getElementById('mytable').getElementsByTagName('tbody')[0];

class Book {
    constructor(title, author, currentpage, totalpages, status) {
        this.title = title;
        this.author = author;
        this.currentpage = currentpage;
        this.totalpages = totalpages;
        this.status = status;
    }
}

let books = [
    new Book("", "", "", "", ""),
    new Book("", "", "", "", "")
];

function renderBookList() {
    let listItems = "";

    for (let i = 0; i < books.length; i++) {
        listItems += `
        <tr>
            <td id="index-${i}">${i}</td>
            <td>
                <input class="input-field input-${i}" type="text" required pattern=".{3,}" placeholder="Clean Code" value="${books[i].title}"
                onkeydown="handleEnter(event, ${i}, 'title')" ondblclick="handleDoubleClick(${i})" onblur="handleBlur(event, ${i}, 'title')"/>
            </td>
            <td>
                <input class="input-field input-${i}" type="text" required pattern=".{3,}" placeholder="Robert C. Martin" value="${books[i].author}"
                onkeydown="handleEnter(event, ${i}, 'author')" ondblclick="handleDoubleClick(${i})" onblur="handleBlur(event, ${i}, 'author')"/>
            </td>
            <td>
                <input class="input-field input-${i}" type="text" required pattern=".{3,}" placeholder="1" value="${books[i].currentpage}"
                onkeydown="handleEnter(event, ${i}, 'currentpage')" ondblclick="handleDoubleClick(${i})" onblur="handleBlur(event, ${i}, 'currentpage')"/>
            </td>
            <td>
                <input class="input-field input-${i}" type="text" required pattern=".{3,}" placeholder="10" value="${books[i].totalpages}"
                onkeydown="handleEnter(event, ${i}, 'totalpages')" ondblclick="handleDoubleClick(${i})" onblur="handleBlur(event, ${i}, 'totalpages')"/>
            </td>
            <td>
                <input class="input-field input-${i}" type="text" required pattern=".{3,}" placeholder="Read" value="${books[i].status}"
                onkeydown="handleEnter(event, ${i}, 'status')" ondblclick="handleDoubleClick(${i})" onblur="handleBlur(event, ${i}, 'status')"/>
            </td>
        </tr>
    `
    }

    renderList.innerHTML = listItems;
}

function addNewBook() {
    books.push(new Book("", "", "", "", ""));
    renderBookList();
}

function enableEditing() {
    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach(input => {
        input.removeAttribute("readonly");
    });
}

function disableEditing() {
    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach(input => {
        input.setAttribute("readonly", "");
    });
}

function convertToInt(num) {
    return parseInt(num);
}

function modifyBookProperty(books, index, propertyName, inputValue) {
    if (typeof books[index] === "object" && ["title", "author", "currentpage", "totalpages", "status"].includes(propertyName)) {
        books[index][propertyName] = inputValue;
    } else {
        console.error("Invalid object or property name:", index, propertyName);
    }
}

function handleEnter(event, num, type) {
    if (event.key === "Enter") {
        const inputValue = event.target.value;
        modifyBookProperty(books, convertToInt(num), type, inputValue);
        console.log("Input value:", inputValue);
        disableEditing();
    }
}

function handleDoubleClick(nums) {
    const index = convertToInt(nums);
    const inputField = document.getElementsByClassName(`input-${index}`);
    if (inputField) {
        console.log("Tag value:", inputField.value);
        enableEditing();
    }
}

function handleBlur(event, num, type) {
    const inputValue = event.target.value;
    modifyBookProperty(books, convertToInt(num), type, inputValue);
    console.log("Input value:", inputValue);
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const tableRows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < tableRows.length; i++) {
        const row = tableRows[i];
        const tableCells = row.getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < tableCells.length; j++) {
            const cell = tableCells[j];
            const inputElement = cell.querySelector('input');
            if (inputElement) {
                const inputValue = inputElement.value.toLowerCase();
                if (inputValue.indexOf(searchTerm) !== -1) {
                    found = true;
                    break;
                }
            } else {
                const cellText = cell.textContent.toLowerCase();
                if (cellText.indexOf(searchTerm) !== -1) {
                    found = true;
                    break;
                }
            }
        }

        row.style.display = found ? '' : 'none';
    }
}

addBookButton.addEventListener("click", addNewBook);

searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

searchButton.addEventListener('click', performSearch);

renderBookList();
