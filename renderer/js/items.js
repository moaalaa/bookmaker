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

// Open item for reading
module.exports.openItem = () => {
    // only if items have been added
    if (! this.toReadItems.length) return;

    // Get selected item
    let targetItem = $('.read-item.is-active');

    // Get item's content url (encoded)
    let contentURL = encodeURIComponent(targetItem.data('url'));

    // Reader Window URL
    let readerWinURL = `file://${__dirname}/../reader.html?url=${contentURL}`;
    console.log(readerWinURL);
    
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

