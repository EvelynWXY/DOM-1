//document.createElement("div");
const div = dom.create("<div>newDiv</div>");
console.log(div);
dom.after(test, div);
const div3 = dom.create('<div id = "parent"></div>');
dom.wrap(test, div3); //用于新增爸爸
const nodes = dom.empty(window.empty); //删除后代
console.log(nodes);
dom.attr(test, "title", "Hi,I'm Evelyn"); //用于写属性,三个参数实现了写
const title = dom.attr(test, "title"); //用于读内容，两个参数实现了读，并把读到的值返回给变量title
console.log(`title:${title}`);
dom.text(test, "你好，这是新的内容");
dom.text(test); //获取text
dom.style(test, {
    border: "1px solid red",
    color: "blue"
}); //第二个参数可能是对象也可能是字符串，是对象的话就是设置
console.log(dom.style(test, "border")); //第二个参数是字符串，为获取值
dom.style(test, "border", "1px solid black"); //若为三个参数，为设置style
dom.class.add(test, "red"); //用于添加class
dom.class.add(test, "blue");
dom.class.remove(test, "blue"); //用于删除class
console.log(dom.class.has(test, "blue"));
//test.addEventListener('click') 之前添加时间监听
const fn = ()=>{
    console.log("点击了");
};
dom.on(test, "click", fn); //添加事件监听
dom.off(test, "click", fn); //删除事件监听
const testDiv = dom.find("#test")[0]; //默认是在document里面找
console.log(testDiv);
const test2 = dom.find("#test2")[0];
console.log(dom.find(".red ", test2)[0]); //第二个参数指定了找的范围
console.log(dom.parent(test)); //用于获取父元素
const s2 = dom.find("#s2")[0];
console.log(dom.siblings(s2)); //用于获取兄弟姐妹元素
console.log(dom.next(s2)); //用于获取弟弟
console.log(dom.previous(s2)); //用于获取哥哥
const t = dom.find("#travel")[0];
//找到t的所有children，对其进行一个each操作，每一个用n占位，n的color为red
dom.each(dom.children(t), (n)=>dom.style(n, "color", "red")
); //每一个子元素颜色都变成red
console.log(dom.index(s2)); //用于获取排行老几

//# sourceMappingURL=index.de158e3a.js.map
