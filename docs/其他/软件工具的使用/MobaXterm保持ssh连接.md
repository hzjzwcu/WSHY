# MobaXterm保持ssh连接

MobaXterm连接ssh时，默认只有一两分钟的时间，每次都要重新连接，并且回不到之前的位置，很麻烦，网上有多种方法，但对现版本服务器都不适用，需要设置多个文件才能成功

> `请结合实际情况，在安全规范允许的范围内设置，建议改为五分钟即可`

## 客户端配置

`Setting` => `SSH` => 勾选 `SSH keepalive`

## 服务器配置

> 以下文件如果不存在就自己新建

- `/etc/profile`

  ```
  export TMOUT=0
  ```

- ` /etc/ssh/sshd_config `

  ```
  TCPKeepAlive yes
  ClientAliveInterval 60
  ClientAliveCountMax 10
  ```

- `/etc/.ssh/config`

  ```
  ServerAliveInterval 60
  ```

- `/root/.ssh/config`

  ```
  ServerAliveInterval 60 
  ```

  
