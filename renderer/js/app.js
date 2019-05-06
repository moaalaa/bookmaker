// Modules
const {ipcRenderer} = require('electron'); 
const items = require('./items');

// Navigate selected items with uop/down keys
$(document).on('keydown', (e) => {
    
    switch (e.key) {
        case 'ArrowUp':
            items.changeItem('up');
            break;
        case 'ArrowDown':
            items.changeItem('down');
            break;
        default:
            break;
    }
});

// Show add-modal
$('.open-add-modal').on('click', () => $('#add-modal').addClass('is-active'));

// Hide add-modal
$('.close-add-modal').on('click', () => $('#add-modal').removeClass('is-active'));

// Handle add-modal submission
$('#add-button').on('click', () => {
    // Get URL from input
    let newItemUrl = $('#item-input').val();

    if (newItemUrl) {

        // Disable Modal UI
        $('#item-input').prop('disabled', true);
        $('#add-button').addClass('is-loading');
        $('.close-add-modal').addClass('is-disabled');

        // Send URL to main process via IPC
        ipcRenderer.send('new-item', newItemUrl);
        
    }
});

// Listen For New Item From Main
ipcRenderer.on('new-item-success', (e, item) => {
    
    // Add item to items array
    items.toReadItems.push(item);

    // Save item to storage
    items.saveItems();

    // Add Item To UI
    items.addItem(item);


    // Enable Modal UI
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('');
    $('#add-button').removeClass('is-loading');
    $('.close-add-modal').removeClass('is-disabled');

    // If first item being added, Select it
    if (items.toReadItems.length === 1) {
        $('.read-item:first()').addClass('is-active');
    }

});

// Simulate add click on enter
$('#item-input').on('keyup', (e) => {
    if (e.key == 'Enter') $('#add-button').click();
});

// Filter Items By its Title
$('#search').on('keyup', (e) => {
    // Get current '#search' input value
    // Because We Are Using arrow function 'this' keyword will refer to window not the element
    let filter = $(e.currentTarget).val();
    
    $('.read-item').each((i, el) => {
        $(el).text().toLowerCase().includes(filter) ? $(el).show() : $(el).hide();
    })

});

// Add Items When App Start
if (items.toReadItems.length) {
    items.toReadItems.forEach(items.addItem);
    $('.read-item:first()').addClass('is-active');
}