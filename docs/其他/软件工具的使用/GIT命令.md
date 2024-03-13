# GIT 命令

## 基础指令

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

## 修改commit

### 1. 修改最近一次的提交

如果你只想修改最近的一次提交（例如，你忘记添加一个文件或者提交信息写错了），你可以使用`git commit --amend`命令。这会将当前的工作树的更改合并到上一个提交中。

```bash
# 修改最近一次提交的提交信息
git commit --amend -m "新的提交信息"

# 将忘记添加的文件加入到最近一次的提交中
git add 忘记添加的文件
git commit --amend --no-edit  # 使用--no-edit保留之前的提交信息
```

### 2. 修改历史提交

如果需要修改早期的某个提交，可以使用`git rebase`命令进行交互式变基操作。这种方式比较灵活，但如果是已经推送到远程仓库的提交，需要谨慎使用。

```bash
git rebase -i HEAD~N  # N是要回退的版本数，例如想要修改倒数第3次提交，N应为3
```

在打开的编辑器中，找到你想要修改的提交前的文字`pick`改为`edit`，然后保存退出。Git会停在那个提交上，此时你可以使用`git commit --amend`修改提交信息，或者做其他修改然后提交。完成修改后，运行：

```bash
git rebase --continue
```

来继续应用余下的提交。

### 3. 修改多个连续提交

使用`git rebase -i`命令，并且将所有想要修改的提交前面的`pick`改为`reword`。

### 4.合并多个提交

使用`git rebase -i`命令，并且将所有想要合并的提交前面的`pick`改为`squash`或者简写`s`（保留第一个不变）。

### 注意

- 使用`git rebase`修改历史提交会改变提交的哈希值。如果这些提交已经被推送到了远程仓库，修改后需要强制推送（`git push --force`），这可能会影响其他人的工作。因此，在共享的分支上慎用此操作。
- 在进行任何可能会更改提交历史的操作前，建议先创建一个分支备份，以防不测。



## Github所需修改的hosts

```
140.82.112.3 github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
```