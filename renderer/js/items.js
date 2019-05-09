// Track Items
module.exports.toReadItems = JSON.parse(localStorage.getItem('toReadItems')) || [];

// Save To LocalStorage

module.exports.saveItems = () => {
    localStorage.setItem('toReadItems', JSON.stringify(this.toReadItems));
}

// Toggle item as select
module.exports.selectItem = (e) => {
    $('.read-item').removeClass('is-active');
    $(e.currentTarget).addClass('is-active');
};

// Select next/prev item
module.exports.changeItem = (direction) => {
    // Get current active item
    let activeItem = $('.read-item.is-active');

    // Check Direction and get next or previous read-item

    let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item');

    // Only if item exists, Make Selection Change
    if (newItem.length) {
        activeItem.removeClass('is-active');
        newItem.addClass('is-active');
    }
};

// Window Function For using eval to access the parent window see 'reader.html'
// Delete Item By index
window.deleteItem = (i) => {
    // Remove Item From DOM
    $('.read-item').eq(i).remove();

    //Remove from 'toReadItems' array

    this.toReadItems = this.toReadItems.filter((item, index) => index !== i);

    // Update Storage
    this.saveItems();

    // Select Prev Item Or next Item

    if (this.toReadItems.length) {
        // If First itemWas Deleted, Select New First Item, Else Select Previous Item
        let newIndex = (i === 0) ? 0 : (i - 1)

        // Assign Active Class to new index
        $('.read-item').eq(newIndex).addClass('is-active');
    } else {
        // Show 'no items' message
        $('#no-items').show();
    }
    
};

// Open item for reading
module.exports.openItem = () => {
    // only if items have been added
    if (! this.toReadItems.length) return;

    // Get selected item
    let targetItem = $('.read-item.is-active');

    // Get item's content url (encoded)
    let contentURL = encodeURIComponent(targetItem.data('url'));

    // Get Item Index to pass  to proxy window
    let itemIndex = (targetItem.index() - 1);
    console.log(itemIndex);
    

    // Reader Window URL
    let readerWinURL = `file://${__dirname}/../reader.html?url=${contentURL}&itemIndex=${itemIndex}`;
    
    // Open item in new proxy BrowserWindow
    let readerWin = window.open(readerWinURL, targetItem.data('title'));
};

// Add New Item
module.exports.addItem = (item) => {

    // Hide 'no items' message
    $('#no-items').hide();

    // New item html
    let itemHtml = `
        <a href="#" class="panel-block read-item" data-title="${item.title}" data-url="${item.url}">
            <figure class="image has-shadow is-64x64 thumb">
                <img src="${item.screenshot}" >
            </figure>
            <h2 class="title is-4 column">${item.title}</h2>
        </a>
    `;

    // Append to read-list
    $('#read-list').append(itemHtml);

    // Attach select event handler after remove any previous one because it will add it many times
    $('.read-item')
        .off('click, dblclick')
        .on('click', this.selectItem)
        .on('dblclick', this.openItem);
};

