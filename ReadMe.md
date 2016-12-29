
#rcs 和飞信

##开发规范

1. 每一个页面在`src/pages/`下新建一个文件夹开发，页面资源单独维护;页面取名`index.html`，编译之后会用改成`文件夹名.html`;页面逻辑入口需要为`index.js`
2. less文件可以在`public/less`里面新增，或者直接修改`rsc.less`,新增的在`rsc.less`中导入


##使用方式

1. 开发命令`npm run dev`
 
2. 编译命令`npm run build`

3. 按版本修复，修改package.json **version**属性