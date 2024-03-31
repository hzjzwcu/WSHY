# Wake Lock API: 实现屏幕常亮

## 前言

屏幕常亮在移动设备的Web应用中是一个重要需求，特别是在某些需要持续用户交互的场景下。为了解决这个问题，开发者可以利用JavaScript中的Wake Lock API来阻止设备屏幕自动进入休眠状态。本文将详细介绍如何有效利用这一API，并对不同浏览器的兼容性进行探讨。

## 检测Wake Lock API支持

首先，必须确认你的浏览器是否支持Wake Lock API。可以通过简单的代码行来实现这一检测：

```js
const isWakeLockSupported = 'wakeLock' in navigator;
```

若`isWakeLockSupported`的值为`true`，则当前浏览器支持Wake Lock API。

## 浏览器兼容性

Wake Lock API的支持度因浏览器及其底层操作系统的不同而有所差异。以下是一些主流浏览器的支持情况：

- **Chrome**: 从第85版开始，Chrome支持Wake Lock API。
- **Firefox**: 支持Wake Lock API，但可能需要用户手动在配置中启用。
- **Safari**: 目前，Safari还未提供Wake Lock API支持。作为替代，可以使用像`NoSleep.js`这样的第三方库。
- **Edge**: 基于Chromium的Edge浏览器与Chrome在支持方面相似。
- **Opera**: 作为另一款基于Chromium的浏览器，Opera的支持情况与Chrome大致相同。

> 使用`NoSleep.js`可以通过创建一个不可见的、静音且循环播放的视频元素来阻止设备进入休眠状态。

## 请求唤醒锁以保持屏幕唤醒

要请求唤醒锁并保持屏幕唤醒，可以使用`navigator.wakeLock.request`方法。由于这个方法返回一个Promise，建议在异步函数中调用它：

```js
let wakeLock = null;

async function requestScreenWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock activated, screen will stay awake.');
  } catch (err) {
    console.error(`Failed to activate wake lock: ${err.name}, ${err.message}`);
  }
}

requestScreenWakeLock();
```

## 释放Wake Lock释放唤醒锁

当不再需要保持屏幕唤醒时，应该释放Wake Lock。可以通过调用`wakeLock.release`方法来实现：

```javascript
if (wakeLock) {
  wakeLock.release().then(() => {
    wakeLock = null;
    console.log('Wake Lock has been released.');
  });
}
```

## 监听Wake Lock的释放

如果唤醒锁因某些外部因素（如用户切换到其他应用）被系统自动释放，可以通过监听`release`事件来得知：

```javascript
if (wakeLock) {
  wakeLock.addEventListener('release', () => {
    console.log('Wake Lock was released by the system.');
  });
}
```

## 根据文档可见性重新请求Wake Lock

在一些场景中，如当用户切换回含有Web应用的标签页时，可能**需要重新获取`Wake Lock`**。通过监听`visibilitychange`事件可以实现这一点：

```javascript
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && !wakeLock) {
    await requestScreenWakeLock();
  }
});
```

## 结论

通过合理使用`Wake Lock API`，开发者能够有效地控制Web应用的屏幕常亮状态，提升用户体验。然而，考虑到API在不同浏览器和设备上的支持度以及对电池续航的潜在影响，开发者应当在确实需要时才使用此功能