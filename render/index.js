const BrowserWindow = require('electron').remote.BrowserWindow;
const {ipcMain, app, shell, Tray, Menu, nativeImage} = require('electron').remote;
var sharedObject = require('electron').remote.getGlobal('sharedObject');

const fs = require('fs');
const path = require('path');
//const iconv = require('iconv-lite');
var execFile = require('child_process').execFile;
var spawn = require('child_process').spawn;
var kernelPath = './kernel/happyminer.exe';

var bash_process = null;
var running_flag = false;
var running_status = false;
var totalshow = null;
var appTray = null;

for (i = 0; i < 8; i++) {
    var objdiv = document.createElement('div');
    document.querySelector('#treasure_list').appendChild(objdiv);
}

// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray(app, mainWindow) {
    // 展示主窗口，隐藏主窗口 mainWindow.hide()
    mainWindow.hide();
	if(appTray){
		return
	}
    // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
    // 通常被添加到一个 context menu 上.
    // 系统托盘右键菜单
    const trayMenuTemplate = [
        {
            label: '关于',
            click:()=>{
                shell.openExternal("http://www.happyminer.cn").catch(err=>{
                    console.log(err)
                })
            }
        },
        {
            // 系统托盘图标目录
            label: '退出',
            click: () => {
                app.quit();
            }
        }
    ];
    // 设置系统托盘图标
    const iconPath = path.join(__dirname, 'img/happyminer.ico');
    appTray = new Tray(iconPath);
    // 图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    // 设置托盘悬浮提示
    appTray.setToolTip('happyminer');
    // 设置托盘菜单
    appTray.setContextMenu(contextMenu);
    // 单击托盘小图标显示应用
    appTray.on('click', () => {
        // 显示主程序
        mainWindow.show();
        // 关闭托盘显示
        // appTray.destroy();
    });
    return appTray;
}

function peoplemoveover(e) {
    var box = document.getElementById("box");
    var boxtext = document.getElementById("boxtext");
    if(!totalshow) {
        boxtext.value = "啊哈，\r\n我的小伙伴！\r\nWelcome！";
    }
    else {
        boxtext.value = "看,我们的工作效率已经达到" + totalshow + "\r\n    咯！";
    }
    box.style.display="";
}
function peoplemoveout(e) {
    var box = document.getElementById("box")
	box.style.display="none";
}

function clickanimation(e) {
    document.getElementById(e.id).setAttribute('style', 'animation: star .2s');
    setTimeout(() => {
        document.getElementById(e.id).removeAttribute('style');

    }, 500);
}
function clicknarrow(e) {
	appTray = setTray(app, sharedObject.mainWindow);
}
function clickclose(e) {
    global.sharedObject.mainWindow.close()
    app.exit()
}
function kill_child_process_and_quit() {
    if (!running_status) {
        bash_process = null;
		app.exit()
        return;
    }
    bash_process.kill('SIGKILL');
    setTimeout(function (bash_process) {
        kill_child_process_and_quit(bash_process);
    }, 500);
}
function click_about(e) {
    shell.openExternal("http://www.happyminer.cn").catch(err=>{
        console.log(err)
    })
}

function kill_child_process() {
    if (!running_status) {
        bash_process = null;
        var btn = this.document.querySelector('#btn');
        btn.innerHTML = '开工';
        btn.setAttribute("class", "start_btn"); 

		totalshow = null;
        for(i = 0 ; i< 8; i++){
			treasure_list.children[i].setAttribute('class', 'treagary');
			treasure_list.children[i].innerHTML = "";
        }
        return;
    }

    bash_process.kill('SIGKILL');
    setTimeout(function () {
        kill_child_process();
    }, 1000);
}

treasure_list = document.querySelector('#treasure_list')
function process_log(log_data) {
    fs.appendFile("./happyminer.log", log_data + "\r\n", (error)  => {
    });
    if(log_data.substr(8,4)=="Hash") {
        var nums = log_data.split(" ");
        var c = nums[2];
        var speed_unit = "h/s"
        if(c[c.length-3] in {"K":1,"M":1,"G":1}) {
            speed_unit = c[c.length-3] + speed_unit
            totalshow = (Math.round(parseFloat(c)*10)/10).toFixed(1) + speed_unit
        }

        var i = 4;
        var gpu_nums = []
        while(i<nums.length) {
			var gpu_num = (Math.round(parseFloat(nums[i])*10)/10).toFixed(1)
			if(gpu_num>1000){
				gpu_num = 0.0;
			}
            gpu_nums.push(gpu_num)
            i += 2;
        }
        for(i = 0 ; i< 8; i++){
            if(gpu_nums[i]==null){
                treasure_list.children[i].setAttribute('class', 'treagary');
                treasure_list.children[i].innerHTML = "";
            }
            else {
                treasure_list.children[i].setAttribute('class', 'treasure');
                treasure_list.children[i].innerHTML = gpu_nums[i];
            }
        }
    }
}

function run_child_process(cmd, args) {
    var btn = this.document.querySelector('#btn');
    if (!running_status) {
		bash_process = spawn(cmd, args);
        running_status = true;
    }
    else {
		if(bash_process.exitCode) {
			btn.innerHTML = '异常';
			btn.setAttribute("class", "noclick"); 
			return
		}
        btn.innerHTML = '停工';
        btn.setAttribute("class", "start_btn"); 
        return
    }
    bash_process.stdout.on('data', function (chunk) {
        //log_data = iconv.decode(chunk, 'cp936')
		log_data = chunk.toString().trim();
        process_log(log_data);
    });
    bash_process.stderr.on('data', (chunk) => {
        //log_error = iconv.decode(chunk, 'cp936')
		log_error = chunk.toString().trim();
        process_log(log_error)
    });
    bash_process.on('close', (code) => {
        running_status = false;
		if(running_flag) {
			btn.setAttribute("class", "noclick"); 
		}
        if (running_flag) {
            btn.innerHTML = '重启中';
            run_child_process(cmd, args);
        }
    });
    setTimeout(function () {
        run_child_process(cmd, args);
    }, 30000);
}

window.onload = function () {
    // button new window
    var btn_new_window = this.document.querySelector('#btn_open_window');
    btn_new_window.onclick = () => {
        document.getElementById('btn_open_window').setAttribute('style', 'animation: star .2s');
        setTimeout(() => {
            document.getElementById('btn_open_window').removeAttribute('style');

        }, 500);
        sharedObject.settingWindow = new BrowserWindow({
            width: 782,
            height: 521,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            },
            transparent: true,
            backgroundColor: '#00000000',
            frame: false,
            resizable: false,
            parent: sharedObject.mainWindow,
            //modal: true,
            show: false
        });
        sharedObject.settingWindow.loadFile('./render/open_window.html'); 
        sharedObject.settingWindow.once('ready-to-show', () => {
            sharedObject.settingWindow.show();
        });
        sharedObject.settingWindow.on('closed', () => {
            sharedObject.settingWindow = null;
        });
        //sharedObject.settingWindow.webContents.openDevTools()
    };

    // button read file
    var btn = this.document.querySelector('#btn');
    var div_ele = this.document.querySelector('#divid');
    btn.onclick = () => {
        document.getElementById('btn').setAttribute('style', 'animation: star .2s');
        setTimeout(() => {
            document.getElementById('btn').removeAttribute('style');

        }, 500);
        if (running_flag) {
            btn.innerHTML = 'ing......';
            btn.setAttribute("class", "noclickwaiting"); 
            running_flag = false;
            kill_child_process(bash_process);
        }
        else {
			try{
				var rawdata = fs.readFileSync('settings.json');
				var setting_json = JSON.parse(rawdata);
				if(!("area" in setting_json)){
					setting_json['area'] ="cn";
				}
				var pool_url = setting_json['account'] + "@" + setting_json['pool'];
				var args = ['--area',setting_json['area'],'--pool', pool_url];
			}
			catch(e){
				btn.innerHTML = '请配置';
				console.log(e)
				return
			}

            btn.innerHTML = 'ing......';
            btn.setAttribute("class", "noclickwaiting"); 
            running_flag = true;
            run_child_process(kernelPath, args);
        }
    };
};
