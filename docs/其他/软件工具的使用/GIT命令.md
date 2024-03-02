# GIT 命令

-   创建并切换分支
    -   `git checkout -b 分支名`
-   回到指定版本
    -   `git reset --hard 版本号`
-   使用某分支强制覆盖
    -   `git reset --hard origin/分支名`
-   合并分支到 master
    -   `git checkout master`
    -   `git merge 分支名` 也可 `git merge --no-commit 分支名`从而部分合并
    -   `git push origin master`
-   删除远程分支
    -   `git fetch -p origin`（如果不能删除的话）
    -   `git push origin --delete 分支名`
-   删除本地分支
    -   `git branch -d 分支名`
-   查询单人提交某段时间所有记录
    -   `git log --since ==2021-01-01 --until=2021-05-31 --author="weisheng" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "新增： %s , 移除： %s , 总计： %s \n ", add, subs, loc }'`
-   查询单人提交所有记录
    -   `git log --author="weisheng" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "新增: %s, 移除 %s, 总计: %s\n", add, subs, loc }'`

# Github所需修改的hosts

```
140.82.112.3 github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
```