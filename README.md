待更新

# Express

## 连接到数据库

## 保护隐私

.env

> 在不同的文件夹中的环境配置文件可以分别在对应文件夹的`.gitignore`中加入，以确保它们不被添加到 Git 仓库中。例如，如果你的环境配置文件在 `backend` 文件夹和 `frontend` 文件夹中，你可以在 `backend/.gitignore` 中加入 `*.env`，在 `frontend/.gitignore` 中也加入 `*.env`，这样就能避免它们被 Git 仓库追踪。

> 是的，你可以在同一个项目中创建多个`.gitignore`文件或在一个`.gitignore`文件中列出多个忽略规则。如果你在项目的根目录下创建了一个`.gitignore`文件，则该文件中列出的规则将适用于整个项目。如果你在项目中的特定目录中创建了一个`.gitignore`文件，则该文件中列出的规则将仅适用于该目录及其子目录。

## 跨域

<img src="https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-02-28_23-13-32.png" alt="Snipaste_2023-02-28_23-13-32" style="zoom:50%;" />

![Snipaste_2023-03-01_18-38-03](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_18-38-03.png)

# 前端

## 版本问题

VueX Vue Router

![Snipaste_2023-03-01_18-21-43](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_18-21-43.png)

![Snipaste_2023-03-01_19-04-43](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_19-04-43.png)

## onclick vs @click

一开始写的`onclick`，报错如下

![Snipaste_2023-03-01_19-18-58](https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/Snipaste_2023-03-01_19-18-58.png)

@click 是 Vue 中绑定点击事件的语法糖，它等价于 v-on:click，表示绑定点击事件。

而 onclick 是 HTML 中绑定点击事件的方式，它直接写在 HTML 元素的属性中，例如：

```html
<button onclick="handleClick()">Click me</button>
```

在 Vue 中，建议使用 @click 语法糖或者 v-on:click，因为它们更加符合 Vue 的组件化思想，使得代码更加清晰易读，也更容易进行维护和调试。

# ChatGPT

编写过程中感谢ChatGPT提供的大力支持，非常好的老师orz

如何正确地提问也是一门学问