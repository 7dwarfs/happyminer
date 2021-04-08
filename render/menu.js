const {Menu, BrowserWindow, dialog, shell} = require('electron')
template = [
    {
        label: 'about',
        submenu: [
            {
                label: 'about',
				click:()=>{
                    dialog.showMessageBox({
                        type:'info',
                        title:'happyminer版本信息',
                        message:'happyminer v1.0正式版\n    Copyright © happyminer.cn    \n   email: sevendwarfs@163.com',
                        buttons:['ok']
                    })

				}
            },
        ]
    },
    {
        label: 'help',
        submenu: [
            {
                label: 'github',
				click:()=>{
                    shell.openExternal("http://www.github.com/7dwarfs/happyminer").catch(err=>{
                        console.log(err)
                    })
				}
            },
            {
                label: 'happyminer.cn',
				click:()=>{
                    shell.openExternal("http://www.happyminer.cn").catch(err=>{
                        console.log(err)
                    })
				}
            },
        ]
    }
]
var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)


