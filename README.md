# whu-library-seat-ghauth

> whu-library-seat 后台认证中间件

## 认证步骤

请按照以下步骤登录本软件并获取永久授权

1. 点击软件下方的**钥匙**进入软件授权页面(第一次打开软件会默认进入本页面)

    ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/1.png)

1. 点击`GitHub Star 永久授权`按钮，软件会打开系统浏览器访问认证页面

    ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/3.png)

1. 点击`确定通过 GitHub 账号登录`，此时 GitHub 会让你确认是否授权(如果没有登录 GitHub，此时会进入登录页面)

    ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/4.png)

1. 点击`Authorize CS-Tao`即可成功登录

    ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/5.png)

1. 登录成功后返回软件，如果出现下面的弹窗，说明您还未对本仓库点星，请进行下一步

    ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/5.1.png)

1. 如果您还给本仓库点星，请到指定仓库点星以供管理员了解软件使用情况。桌面端进入：[whu-library-seat](https://github.com/CS-Tao/whu-library-seat)，移动端进入：[whu-library-seat-mobile](https://github.com/CS-Tao/whu-library-seat-mobile)

    - 桌面端点击右上角的`Star`按钮，按钮如下图所示：

        ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/5.2.png)

    - 移动端需要登录才会显示`Star`按钮，登录状态下直接点击即可，按钮如下图所示：
    
        ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/5.3.png)

1. 点星后回到本软件，点击确定即可

    ![图片加载失败](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/github/whu-library-seat/OAuth/6.png)

## 构建步骤

```bash
# 安装依赖
yarn

# 启动服务
yarn start
```
