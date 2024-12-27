let list = $('#list__container');

let items = [];

const ctxCreate = $("#createChart");
let myChartCreate = new Chart(ctxCreate, {});

$('#create__btn').click(() => {
    // Set values for new item
        let randColor = Math.floor(Math.random()*16777215).toString(16);
        let idedntifier = Math.random().toString(36).substring(7);

    // Create object for item
        let itemObject = {
            id: idedntifier,
            name: 'New item',
            color: '#'+randColor,
            value: 0
        };

    // Add item object to items array
        items.push(itemObject);

    // Prepare HTML for new item
        prepareHTML_ListItems();

    // Save items to local storage
        saveItems();
});

// Save or Update items in local storage
function saveItems() {
    try {
        localStorage.setItem('items', JSON.stringify(items));
        // Reload chart
            reloadChart();

        // Show or hide elements
            showOrHideElements();
    } catch (error) {
        console.error(error);
    }
}   

// Load items from local storage
function loadItems() {
    try {
        if(localStorage.getItem('items')) {
            items = JSON.parse(localStorage.getItem('items'));
            prepareHTML_ListItems();
            // Reload chart
                reloadChart();
        } else {
            items = [];
            showOrHideElements();
        }
    } catch (error) {
        console.error(error);
    }
}

function prepareHTML_ListItems() {
    try {
        list.html('');

        items.forEach(item => {
            let idedntifier = item.id;

            // Create new item
                let itemElement = document.createElement('div');
                itemElement.setAttribute('data-id', idedntifier);
                itemElement.classList.add('data__list-item');

            // Create name item container
                let nameItemContainer = document.createElement('div');

                // Create name item input
                    nameItemContainer.classList.add('data__list-item-name');
                    nameItemContainer.classList.add('data__list-item-setting');
                    let nameItem = document.createElement('input');
                    nameItem.setAttribute('type', 'text');
                    nameItem.setAttribute('value', item.name);
                    nameItem.addEventListener('change', () => {
                        let index = items.findIndex(item => item.id === idedntifier);
                        items[index].name = nameItem.value;
                        saveItems();
                    });

                // Create label for name item
                    let labelForNameItem = document.createElement('label');
                    labelForNameItem.innerText = 'Name';
                    labelForNameItem.setAttribute('for', idedntifier);
                    nameItemContainer.appendChild(labelForNameItem);
                    nameItemContainer.appendChild(nameItem);

            // Create color item container
                let colorItemContainer = document.createElement('div');

                // Create color item input
                    colorItemContainer.classList.add('data__list-item-color');
                    colorItemContainer.classList.add('data__list-item-setting');
                    let colorItem = document.createElement('input');
                    colorItem.setAttribute('type', 'color');
                    colorItem.setAttribute('value', item.color);
                    colorItem.addEventListener('change', () => {
                        let index = items.findIndex(item => item.id === idedntifier);
                        items[index].color = colorItem.value;
                        saveItems();
                    });

                // Create label for color item
                    let labelForColorItem = document.createElement('label');
                    labelForColorItem.innerText = 'Color';
                    labelForColorItem.setAttribute('for', idedntifier);
                    colorItemContainer.appendChild(labelForColorItem);
                    colorItemContainer.appendChild(colorItem);

            // Create value item container

                let valueItemContainer = document.createElement('div');

                // Create value item input
                    valueItemContainer.classList.add('data__list-item-value');
                    valueItemContainer.classList.add('data__list-item-setting');
                    let valueItem = document.createElement('input');
                    valueItem.setAttribute('type', 'number');
                    valueItem.setAttribute('value', item.value);
                    valueItem.addEventListener('change', () => {
                        let index = items.findIndex(item => item.id === idedntifier);
                        items[index].value = valueItem.value;
                        saveItems();
                    });

                // Create label for value item
                    let labelForValueItem = document.createElement('label');
                    labelForValueItem.innerText = 'Value';
                    labelForValueItem.setAttribute('for', idedntifier);
                    valueItemContainer.appendChild(labelForValueItem);
                    valueItemContainer.appendChild(valueItem);

            // Create buttons container
                let buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('data__list-item-buttons');

            // Create remove button

                let removeButton = document.createElement('button');
                removeButton.classList.add('data__list-item-remove');
                removeButton.innerText = 'X';
                removeButton.addEventListener('click', () => {
                    items = items.filter(item => item.id !== idedntifier);
                    saveItems();
                    prepareHTML_ListItems();
                });
                buttonsContainer.appendChild(removeButton);

            // Create up button

                let upButton = document.createElement('button');
                upButton.classList.add('data__list-item-up');
                upButton.innerText = '<<';
                upButton.addEventListener('click', () => {
                    let index = items.findIndex(item => item.id === idedntifier);
                    if (index > 0) {
                        let temp = items[index - 1];
                        items[index - 1] = items[index];
                        items[index] = temp;
                        saveItems();
                        prepareHTML_ListItems();
                    }
                });
                buttonsContainer.appendChild(upButton);

            // Create down button

                let downButton = document.createElement('button');
                downButton.classList.add('data__list-item-down');
                downButton.innerText = '>>';
                downButton.addEventListener('click', () => {
                    let index = items.findIndex(item => item.id === idedntifier);
                    if (index < items.length - 1) {
                        let temp = items[index + 1];
                        items[index + 1] = items[index];
                        items[index] = temp;    
                        saveItems();
                        prepareHTML_ListItems();
                    }
                });
                buttonsContainer.appendChild(downButton);

            // Add all elements to item
                itemElement.appendChild(nameItemContainer);
                itemElement.appendChild(colorItemContainer);
                itemElement.appendChild(valueItemContainer);
                itemElement.appendChild(buttonsContainer);

            // Add item to list
                list.append(itemElement);
        });

    } catch (error) {
        console.error(error);
    }
}

// Clear items from local storage
    function clearItems() {
        localStorage.removeItem('items');
        items = [];
        list.html('');
        // Reload chart
            reloadChart();
        // Show or hide elements
            showOrHideElements();
    }

    $('#clear__btn').click(() => {
        clearItems();
    });

// Reload Chart
    function reloadChart() {
        if(myChartCreate) {
            myChartCreate.destroy();
        }
        let datasets = items.map(item => {
            return {
                label: item.name,
                data: [item.value],
                backgroundColor: item.color,
                borderColor: item.color,
            }
        });

        myChartCreate = new Chart(ctxCreate, {
            type: 'bar',
            data: {
                labels: [''],
                datasets: datasets
            },
        });
    }

    function showOrHideElements() {
        try {
            console.log(items.length);
            if(items.length == 0) {
                $('#clear__btn').hide();
                $('#asc__btn').hide();
                $('#desc__btn').hide();
                $('#download__btn').hide();
                $('#createChart').hide();
            } else {
                $('#clear__btn').show();
                $('#asc__btn').show();
                $('#desc__btn').show();
                $('#download__btn').show();
                $('#createChart').show();
            }
        } catch (error) {
            console.error(error);
        }
    }

// Sort items by value ascending
    $('#asc__btn').click(() => {
        items.sort((a, b) => a.value - b.value);
        saveItems();
        prepareHTML_ListItems();
    });

// Sort items by value descending
    $('#desc__btn').click(() => {
        items.sort((a, b) => b.value - a.value);
        saveItems();
        prepareHTML_ListItems();
    });

// Download PNG
    $('#download__btn').click(() => {
        let canvas = document.getElementById('createChart');
        let dataURL = canvas.toDataURL('image/png');
        let a = document.createElement('a');
        a.href = dataURL;
        a.download = 'chart.png';
        a.click();
    });


// Load items from local storage
    loadItems();
