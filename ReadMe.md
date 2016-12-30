
#rcs 和飞信

##开发规范

1. 每一个页面在`src/pages/`下新建一个文件夹开发，页面资源单独维护;页面取名`index.html`，编译之后会用改成`文件夹名.html`;页面逻辑入口需要为`index.js`
2. less文件可以在`public/less`里面新增，或者直接修改`rsc.less`,新增的在`rsc.less`中导入
3. 业务公共资源可以在`src/pages/`下新建以*_*开头的文件夹
4. api定义在`src/public/common/api`文件，文件内部`dev`变量定义的是开发时的json数据，json文件存放在`/static`目录下，`prod`变量定义的则是线上使用的api地址
5. 非`npm install`的第三方模块，可以放在`static/vendor`目录下，页面引用路径为`./static/vendor/*.js`，打包的时候会把static下所有的文件复制到`dist/static`目录下


##使用方式

1. 开发命令`npm run dev`
 
2. 编译命令`npm run build`

3. 按版本修复，修改package.json **version**属性