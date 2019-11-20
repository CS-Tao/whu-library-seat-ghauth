# whu-library-seat-ghauth

> whu-library-seat 后台认证中间件

## 认证步骤

请按照以下步骤登录本软件并获取永久授权

1. 点击软件下方的**钥匙**进入软件授权页面(第一次打开软件会默认进入本页面)

    ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/1.png)

1. 点击`GitHub Star 永久授权`按钮，软件会打开系统浏览器访问认证页面

    ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/3.png)

1. 点击`确定通过 GitHub 账号登录`，此时 GitHub 会让你确认是否授权(如果没有登录 GitHub，此时会进入登录页面)

    ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/4.png)

1. 点击`Authorize CS-Tao`即可成功登录

    ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/5.png)

1. 登录成功后返回软件，如果出现下面的弹窗，说明您还未对本仓库点星，请进行下一步

    ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/5.1.png)

1. 如果您还给本仓库点星，请到指定仓库点星以供管理员了解软件使用情况。桌面端进入：[whu-library-seat](https://github.com/CS-Tao/whu-library-seat)，移动端进入：[whu-library-seat-mobile](https://github.com/CS-Tao/whu-library-seat-mobile)

    - 桌面端点击右上角的`Star`按钮，按钮如下图所示：

        ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/5.2.png)

    - 移动端需要登录才会显示`Star`按钮，登录状态下直接点击即可，按钮如下图所示：
    
        ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/5.3.png)

1. 点星后回到本软件，点击确定即可

    ![图片加载失败](https://home.cs-tao.cc/github-content/contents/github/whu-library-seat/OAuth/6.png)

## 构建步骤

```bash
# 安装依赖
yarn

# 启动服务
yarn start
```

## 认证原理

![工作流程](https://home.cs-tao.cc/github-content/contents/blog/image/others/github-oauth-flow.png)

1. 客户端主动建立 Socket 连接，得到 Socket id
1. 将 Socket id 和其他必要的参数 (比如区分是否是移动端的参数) 嵌入到一个让用户确认是否继续认证的链接中，打开浏览器访问该链接，这个网页需要做的工作是在用户点击确认后，把 Socket id 和其他参数存到本地缓存中，然后访问认证链接
(即 `https://github.com/login/oauth/authorize?client_id={Client_ID}&scope=user:email`)
1. 在认证页面，用户确认授权后，网页会被重定向到我们在注册 App 时提供的回调地址，并附带 **code** 参数，回调地址产生的连接进入阻塞状态，等待服务器返回 **access_token**
1. 回调地址对应的后台处理模块将 **code** 参数、**Client ID** 和 **Client Secret** 发送至 GitHub 后台
(链接是：`https://github.com/login/oauth/access_token?client_id=${Client_ID}&client_secret=${Client_Secret}&code=${code}`)
1. GitHub 后台验证 **code** 等参数的可用性，如果可用，GitHub 后台会将 **access_token** 返回给后台服务
1. 后台得到 **access_token** 后，将它发送给浏览器 (第 3 步的阻塞状态结束)
1. 浏览器得到 **access_token** 后，再将 **access_token**、缓存的 Socket id 和其他参数发送到后台，然后显示发送成功或失败的信息
1. 后台相应的处理模块通过这些参数，将 **access_token** 发送到指定 Socket id 的桌面端
