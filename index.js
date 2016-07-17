'use strict';
const electron = require('electron');
const AutoLaunch = require('auto-launch');
const Positioner = require('electron-positioner');
const { globalShortcut, app, ipcMain } = electron;

ipcMain.on('resize-height', ( event, args ) => {
	mainWindow.setSize( 600, args );
});

const appLauncher = new AutoLaunch({
	name: 'handy'
});

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let preferenceWindow;
let tray;
let trayMenu;

function position( browserWindow ) {
	const electronScreen = require('electron').screen;
	const screenSize = electronScreen.getDisplayNearestPoint(electronScreen.getCursorScreenPoint()).workArea;
	const windowSize = browserWindow.getSize();

	let x = Math.floor(screenSize.x + ((screenSize.width / 2) - (windowSize[0] / 2)));
	let y = parseInt( screenSize.height / 5 );

	browserWindow.setPosition( x, y );
}

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
	preferenceWindow = null;
}

function createPreference() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		frame: false,
		resizable: false,
		titleBarStyle: 'hidden',
	});

	win.loadURL(`file://${__dirname}/preference.html`);
	win.on('closed', onClosed);

	return win;
}

// 84 + 320
function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 84,
		frame: false,
		show: false,
		skipTaskbar: true,
		// resizable: false,
		// alwaysOnTop: true,
		// show: false,
		// center: true,
		titleBarStyle: 'hidden',
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	position( win );

	// const positioner = new Positioner( win );

	return win;
}

function createTray() {
	const tray = new electron.Tray(`${__dirname}/tray.jpg`);
	tray.setToolTip( 'Handy' );

	tray.on('click', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	tray.on('right-click', () => {
		tray.popUpContextMenu( trayMenu );
	});

	return tray;
}

function createTrayMenu() {
	const preferences = new electron.MenuItem({
		label: 'Preferences',
		enabled: true,
		click: menuItem => {
			if( !preferenceWindow ) {
				preferenceWindow = createPreference();
			}
			preferenceWindow.show();
			preferenceWindow.focus();
		}
	});

	const openAtLogin = new electron.MenuItem({
		label: 'Open at login',
		type: 'checkbox',
		click: menuItem => {
			appLauncher.isEnabled()
				.then(isEnabled => {
					menuItem.checked = !isEnabled;

					if ( isEnabled ) {
						appLauncher.disable();
					} else {
						appLauncher.enable();
					}
				});
		}
	});

	const separator = new electron.MenuItem({
		type: 'separator'
	});

	const quit = new electron.MenuItem({
		label: process.platform === 'darwin' ? `Quit ${app.getName()}` : 'Exit',
		click() {
			app.exit(0);
		}
	});

	const menu = new electron.Menu();

	menu.append( openAtLogin );
	menu.append( preferences );
	menu.append( separator );
	menu.append( quit );

	appLauncher.isEnabled()
		.then(isEnabled => {
			openAtLogin.checked = isEnabled;
		});

	return menu;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	tray = createTray();
	trayMenu = createTrayMenu();

	const ret = globalShortcut.register('Alt+`', () => {
		if( mainWindow.isVisible() ) {
			mainWindow.hide();
		} else {
			mainWindow.show();
			mainWindow.focus();
		}
	});

	if( !ret ) {
		console.log('registration failed');
	}

	// Check whether a shortcut is registered.
	console.log(globalShortcut.isRegistered('Alt+`'));
});

app.on('will-quit', () => {
	// Unregister all shortcuts.
	globalShortcut.unregisterAll();
});
