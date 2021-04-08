var path = require('path')
var {globalShortcut, BrowserWindow, app, clipboard, dialog, document} = require('electron') 
global.sharedObject = {
	mainWindow: null,
	settingWindow: null,
	totalshow: null,
}

app.on('ready', ()=>{
	// main window
	global.sharedObject.mainWindow = new BrowserWindow({
		width:782, 
		height:521,
		webPreferences:{
			nodeIntegration:true, 
			contextIsolation: false,
			enableRemoteModule: true
		},
		transparent: true,
		backgroundColor: '#00000000',
		frame: false,
		resizable: false,
		show: false,
	})
	global.sharedObject.mainWindow.once('ready-to-show', () => {
	    global.sharedObject.mainWindow.show()
	})
	global.sharedObject.mainWindow.loadFile('index.html')
	global.sharedObject.mainWindow.on('closed', ()=>{
		global.sharedObject.mainWindow = null
	})

	// menu
    require('./render/menu.js')

	// register short cut
	globalShortcut.register('ctrl+shift+x', ()=>{
		global.sharedObject.mainWindow.close()
		app.exit()
	})
	//if(globalShortcut.isRegistered('ctrl++shift+x')){
	//}
	//global.sharedObject.mainWindow.webContents.openDevTools()
})

app.on('will-quit', ()=>{
	globalShortcut.unregisterAll()
})

// open
//var BrowserWindowProxy = window.open('./render/open_window.html', 'setttings', 'width=200, height=100,alwaysOnTop=1')
//
// send
// window.onload = () => {
//     console.log("zfsa")
//     var btn_send = this.document.querySelector("#send")
//     btn_send.onclick = function(e){
//         window.opener.postMessage('我是子窗口的消息')
//     }
// }
//
// receive
//window.addEventListener('message', (msg)=>{
//    let mytext = document.querySelector('#subwindow')
//    mytext.innerHTML = JSON.stringify(msg)
//})

// shareObject.settingWindow.webContents.openDevTools()

//ipcMain.on('sendMessage', (event, data) => {
//    let mytext = document.querySelector('#subwindow');
//    mytext.innerHTML = JSON.stringify(data);
//});
//
// const { ipcRenderer } = require('electron')
// var sharedObject = require('electron').remote.getGlobal('sharedObject');
// var btn_send = this.document.querySelector("#bt_send")
// btn_send.onclick = function(){
//     ipcRenderer.send("sendMessage","this is renderer");
//     sharedObject.settingWindow.close()
// }

//window.location.href = './render/open_window.html'; // 跳转页面

// var remote = require('electron').remote;
// var rigthTemplate = [
//     {
//         label:'粘贴',
//         click:()=>{
//             var btn = document.getElementById('textareclass');
//             btn.innerHTML = clipboard.readText();
//         }
//     },
//     {
//         label:'复制',
//         click:()=>{
//             var btn = document.getElementById('textareclass');
//             clipboard.writeText("btn.innerHTML")
//         }
//     }
// ]
// var m = Menu.buildFromTemplate(rigthTemplate)
// window.addEventListener('contextmenu',function(e){
//     //阻止当前窗口默认事件
//     e.preventDefault();
//     //把菜单模板添加到右键菜单
//     m.popup({window:remote.getCurrentWindow()})
// 
// })

// icotool -c icon_16x16.png icon_32x32.png icon_64x64.png -o icon.ico
