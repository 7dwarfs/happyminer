rm -rf Release
electron-packager . HappyMiner --platform=win32 --arch=x64 --icon=img/happyminer.ico --out=./Release --asar --app-version=1.0 --overwrite --ignore=node_modules --electron-version 5.0.0
