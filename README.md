# 项目简介

想学一学 Express.js，同时也想自己搭一遍从前端到后端实现注册登录的过程，遂创建此项目。

前端：简简单单的 Vue2 + Axios + Vue-router + Vuex。对界面颜值的要求也不高，仅仅是为了体验一把连通的感觉，直接用 HTML 写页面了

后端：Express.js + MongoDB

Express是基于Nodejs的一款后端框架，使用JavaScript，易于上手，且配套组件库也较为丰富。

# Express.js

## 连接到数据库

数据库使用 MongoDB，通过 mongoose 库进行操作很方便。此外我也没有在本地配置 MongoDB 数据库，而是使用了他家的[ Altas 服务](https://www.mongodb.com/atlas/database)，也就是云端的可直接连接使用的 MongoDB 数据库。使用免费的配置即可。

<img src="https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/image-20230304193945458.png" alt="image-20230304193945458" style="zoom:50%;" />

点击其中的`connect`按钮，即可获取连接的方式

<img src="https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/image-20230304194026035.png" alt="image-20230304194026035" style="zoom:50%;" />

## 保护隐私

上学期的两个课程项目都遇到了这个问题：项目通常通过 Github 进行代码同步，但是数据库的 ip 地址和密码等敏感信息，却不知道应该怎么处理。反正上学期由于时间原因，最后都变成了直接把服务器的 link 写在代码里（）然而这显然是不够优雅的。

查询一番后得出了这样的推荐方案：

- 将此类敏感信息放入到`.env`文件中

- 将`.env`放入`.gitignore`中，以避免被加入到仓库中

- 创建`.env.example`，保持`.env`的格式，但隐去敏感信息。`.env.example`是可以放入到仓库中的

- 团队协作时通过其他途径获取敏感信息并填入`.env`
  ```javascript
  require("dotenv").config(); // store in .env file for security and privacy
  const mongodb_link = process.env.MONGODB_LINK;
  ```

同时让我受益匪浅的一点是，之前我一直认为`.gitignore`只能放在Git项目的根目录位置中，而事实上`.gitignore`可以在多处，每个`.gitignore`的规则适用于它所在的文件夹。引用ChatGPT的话（后续介绍）：

> 在不同的文件夹中的环境配置文件可以分别在对应文件夹的`.gitignore`中加入，以确保它们不被添加到 Git 仓库中。例如，如果你的环境配置文件在 `backend` 文件夹和 `frontend` 文件夹中，你可以在 `backend/.gitignore` 中加入 `*.env`，在 `frontend/.gitignore` 中也加入 `*.env`，这样就能避免它们被 Git 仓库追踪。

> 是的，你可以在同一个项目中创建多个`.gitignore`文件或在一个`.gitignore`文件中列出多个忽略规则。如果你在项目的根目录下创建了一个`.gitignore`文件，则该文件中列出的规则将适用于整个项目。如果你在项目中的特定目录中创建了一个`.gitignore`文件，则该文件中列出的规则将仅适用于该目录及其子目录。

## 跨域

跨域问题可以说每次前后端开发都会出现orz。使用PostMan时，它不会受到同源策略的限制，因此不会报错。而前后端运行在不同的IP和端口，因此会产生安全警告。

<img src="https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-02-28_23-13-32.png" alt="Snipaste_2023-02-28_23-13-32" style="zoom:50%;" />

![Snipaste_2023-03-01_18-38-03](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_18-38-03.png)

解决方法很简单，加上一层cors的中间件就好（）

```javascript
const cors = require("cors");
app.use(cors());
```

# 前端

## yarn npm

这回用上了yarn作为包管理器，不得不说它的缓存机制和处理方式都非常不错，安装速度比npm快了太多

## 版本问题

有几个奇怪的bug处理半天，最后发现还是因为自己偷懒用了Vue2，然后直接用yarn add了VueX、Vue Router。但事实上这两个库的最新版本目前已经不再对Vue2支持了，需要降级安装。

```
yarn add vuex@3
yarn add vue-router@3
```

![Snipaste_2023-03-01_18-21-43](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_18-21-43.png)

![Snipaste_2023-03-01_19-04-43](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_19-04-43.png)

## onclick vs @click

好久没写前端，一开始想简单地用HTML里的button触发函数，直接写上`onclick`，报错如下

![Snipaste_2023-03-01_19-18-58](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_19-18-58.png)

查阅以后发现自己被自己干沉默了，连Vue是搞啥的都不记得了。

@click 是 Vue 中绑定点击事件的语法糖，它等价于 v-on:click，表示绑定点击事件。

而 onclick 是 HTML 中绑定点击事件的方式，它直接写在 HTML 元素的属性中，例如：

```html
<button onclick="handleClick()">Click me</button>
```

# 登录逻辑

梳理一遍，感觉面试中也是很常见的hh

1. 初始假设用户未登录
2. 用户进入一个需要权限验证的页面
3. vue-router路由拦截，从vuex中获取用户信息
4. 由于未登录，无法获取用户信息
5. vue-router重定向到登录页面，加上redirect参数以便后续返回原页面
6. 用户输入账号密码，发送post请求到后端
7. 后端连接数据库，校验账号密码（密码需加密后与数据库中比对，不能明文存储）
8. 校验完成，发送Token给前端，Token中包括过期时间，用户信息等加密信息
9. 前端接收Token，存储在cookie中
10. 前端登录成功，通过之前的redirect参数重新返回原页面
11. 进入路由拦截，前端未获得用户信息，但有Token的cookie
12. 前端再次发送一个user_info的get请求，通过Token获取用户的信息，如用户名，用户角色（普通用户或管理员）
13. 后端校验Token是否过期，如无过期则返回信息
14. 前端接收后将信息存在vuex中
15. （optional）前端根据用户的角色，生成可访问的路由（这一步在前后端都能实现）
16. 前端检查角色权限是否满足，满足则放行
17. 进入页面，发送get请求（当有Token时，请求头中都会有Token字段以校验）
18. 后端接收到get请求，校验Token合法性，成功则返回数据
19. 成功返回

# ChatGPT

编写过程中感谢ChatGPT提供的大力支持，非常好的老师orz

几乎是有问必答

此外，如何正确地提问也是门学问，这里有一篇[tutorial](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md)

关于ChatGPT的更多玩法见[此](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)