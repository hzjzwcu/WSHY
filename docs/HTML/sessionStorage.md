# sessionStorage

## 同源共享

`sessionStorage` 属性允许你访问一个，对应当前源的 session `Storage` 对象。它与 `localStorage` 相似，不同之处在于 `localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。

1. 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
2. **在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，** 这点和 session cookies 的运行方式不同。
3. 打开多个相同的 URL 的 Tabs 页面，会创建各自的 `sessionStorage`。
4. 关闭对应浏览器标签或窗口，会清除对应的 `sessionStorage`。

总结：多窗口之间sessionStorage不可以共享状态。但是在本页面中打开的同源页面会复制之前页面的sessionStorage