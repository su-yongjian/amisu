const allowMiniPixel = () => {
  let allow = false;
  if (window.devicePixelRatio && devicePixelRatio >= 2) {
    let ele = document.createElement("div");
    ele.style.border = ".5px solid transparent";
    document.body.appendChild(ele);
    allow = 1 === ele.offsetHeight;
    document.body.removeChild(ele);
  }
  return allow;
}();
function unitParser(unit) {
  let type = void 0 === unit ? "undefined" : getType(unit);
  if ("number" === type) {
    unit += "dp"
  }
  if ("string" !== type) {
    return unit;
  }

  let regExp = /^([\d\.]+)(np|dp)?$/g;
  return unit.replace(regExp, (chars, count, suffix) => {
    count = Number(count)
    switch (suffix) {
      case "np":
        // np不做转换。1np就是1px 100np就是100px
        break;
      case "dp":
      default:
        // 注意这里375。说明的上文说了，设计稿是按照iphone 6的375进行设计的。
        // deviceWidth为屏幕的宽度。iphone 5/SE为320、iphone 6/7/8为375
        count = count / 375 * deviceWidth
    };

    if (!allowMiniPixel && count < 1) {
      count = 1
    }
    return count + "px";
  })
}