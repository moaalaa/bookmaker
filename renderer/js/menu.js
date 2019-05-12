// Modules
const {remote, shell} = require('electron');

// Menu Template Object
const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: "Search ...",
                accelerator: 'CmdOrCtrl+S',
                click() { $('#search').focus() }
            },
            {
                type: "separator"
            },
            {
                label: "Add New",
                accelerator: 'CmdOrCtrl+O',
                click() { $('.open-add-modal').click() }
            },
            {
                label: "Read Item",
                accelerator: 'CmdOrCtrl+Enter',
                click() { window.openItem() }
            },
            {
                label: "Delete Item",
                accelerator: 'CmdOrCtrl+Backspace',
                click() { window.deleteItem() }
            },
            {
                type: "separator"
            },
            {
                label: "Open In Browser",
                accelerator: 'CmdOrCtrl+Shift+Enter',
                click() { window.openInBrowser() }
            },

        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click () { shell.openExternalSync('https://github.com/moaalaa/bookmaker') }
            },
            {
                label: `Version ${remote.app.getVersion()}`,
                click () { shell.openExternalSync('https://github.com/moaalaa/bookmaker') }
            },
        ]
    }
];

// Mac Specific
if (process.platform === 'darwin') {
    
    // Add First Menu Item
    template.unshift({ role: 'appMenu' });


}

// Add Menu to App
const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);