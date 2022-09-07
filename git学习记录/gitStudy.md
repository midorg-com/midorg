# git 重要命令操作



---

---



1. 查看git 版本号

> 操作：
>
> ```sh
> git version  //git --version
> ```
>
> 结果：
>
> ```sh
> git version 2.32.1 (Apple Git-133)
> ```

---



2. 创建用户名

   > 操作：
   >
   > ```sh
   > git config --global user.name "xxx（写用户名）"  
   > ```

---



3. 创建邮箱

   > 操作：
   >
   > ```sh
   > git config --global user.email "xxx@xx.com（写自己的邮箱）" 
   > ```

---



4. 初始化git

   > 操作:
   >
   > ```sh
   > git init
   > ```
   >
   > 结果：
   >
   > - 在当前目录创建一个.git*隐藏*文件夹，此文件夹会保存我们每个git版本记录和变化

---



5. 将文件添加至版本控制系统

   > 操作:
   >
   > ```sh
   > git add 当前目录下要上传的文件名
   > 或
   > git add . 点 表示当前目录下的所有文件
   > ```

---



6. 提交变更记录

> 操作：
>
> ```sh
> git commit 
> 或
> git commit -m "第N次提交"
> ```
>
> 结果：
>
> - 会出现一个Vim编辑器，在里面填写修改信息并提交
>
> - 也可以像第三行那样，直接在后面写提交说明，不用打开vim
>
> - 提交成功后会显示：
>
>   - ```sh
>     [master xxxxxx] 第N次提交
>      1 file changed, 1 insertion(+), 1 deletion(-)
>     ```

7. 查看已提交的变更记录

   > 操作：
   >
   > ```sh
   > git log
   > ```
   >
   > 结果：
   >
   > ```sh
   > commit 0c8d966e1e4d09107a16df69c5cad4d1bc53ef33 (HEAD -> master)
   > Author: xxx <xxx@xx.com>
   > Date:   Wed Sep 7 20:37:03 2022 +0800
   > 
   > 		第N次提交
   > ```
   >
   > - commit ：后面的是提交的随机id，成为唯一标识
   > - Author ：之前填写的用户名和邮箱
   > - Date： 提交变更时间
   > - 最下面的是提交变更时写的内容

8. 回退某个版本

   > 操作：
   >
   > ```sh
   > git reset --hard 0c8d966e1e4d09107a16df69c5cad4d1bc53ef33(填写想回退到某个版本的commit id号)
   > ```
   >
   > - reset是回退到某个版本，重置之后的操作
   > - --hard 是重置模式 （硬重置即覆盖所有变更），还有soft模式和mixed模式
   > - 回退的同时，把后面的版本清空了
   >
   > 结果:
   >
   > ```sh
   > HEAD is now at da9ead2 第N次提交
   > 
   > 文件显示回退到版本后的内容
   > ```
   >

9. 分支

   1. 创建分支

      > 操作：
      >
      > ```sh
      > git branch xx（填写分支名 如1等）
      > ```
      >
      > - 这个操作是在把某个版本已经提交变更以后才能去创建breach

   2. 切换分支

      > 操作：
      >
      > ```sh
      > git checkout xx （填写分支名 如1等）
      > ```
      >
      > 结果：
      >
      > ```sh
      > Switched to branch 'xx'
      > ```
      >
      > - 可以在创建的不同分支上切换
      > - 可以在主流写代码，也可以在支流写代码

   3. 合并分支

      > 操作：
      >
      > ```sh
      > git merge xx （填写分支名 如1等）
      > ```
      >
      > - 在某个分支下写入上面命令就会把当前分支和写入的分支合并成一个分支
      >
      > 显示：
      >
      > ```sh
      > Already up to date
      > ```
      >
      > 