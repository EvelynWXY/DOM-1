window.dom = {
  //增
  create(string) {
    // return document.createElement(tagName);
    //用于创建节点
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim函数去掉string字符串两边的空格，此处防止访问到的第一个孩子变成文本
    console.log(container);
    return container.content.firstChild; //template元素返回div的第一个儿子的方式
  },
  after(node, node2) {
    //找到node节点的爸爸，然后调用爸爸的insertBefore的方法，然后把node2插到node的下一个节点的前面

    node.parentNode.insertBefore(node2, node.nextSibling); //用于新增弟弟
    //如果node节点是最后一个节点，没有下一个sibling，也依然能插入成功
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node); //用于新增哥哥，把node2放到node前面
  },
  append(parent, node) {
    parent.appendChild(node); //用于新增儿子，在parent下加
  },
  wrap(node, parent) {
    //用于新增爸爸，parent包住node
    dom.before(node, parent); //把新节点放到node前面
    dom.append(parent, node); //把node放到parent里面
  },
  //删
  remove(node) {
    //用于删除节点
    node.parentNode.removeChild(node); //让爸爸删除儿子，把元素从树中删除
    return node; ////返回移除的对象，return可以让外面保留这个节点的引用
  },
  empty(node) {
    //用于删除后代
    //const childNodes = node.childNodes;
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //改
  //用于读写属性
  attr(node, name, value) {
    //重载：根据参数个数写不同的代码
    //用于读属性
    if (arguments.length === 3) {
      node.setAttribute(name, value); //set
    } else if (arguments.length === 2) {
      return node.getAttribute(name); //读取
    }
  },
  //用于读写文本内容
  text(node, string) {
    if (arguments.length === 2) {
      //适配：判断是否有innerText，若有就使用innerText（ie），若没有就使用textContent（firefox/chrome）
      //用于写文本内容
      if ("innerText" in node) {
        node.innerText = string; // ie
      } else {
        node.textContent = string; // firefox / chrome}
      }
    } else if (arguments.length === 1) {
      //用于读文本内容
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  //用于读写HTML内容
  html(node, string) {
    //重载：根据参数的长度实现不同的效果
    if (arguments.length === 2) {
      node.innerHTML = string; //写HTML内容
    } else if (arguments.length === 1) {
      return node.innerHTML; //读HTML内容
    }
  },
  //用于修改style
  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div, 'color', 'red' ) 设置style
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color') 读取div的color
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in name) {
          //key:border / color
          //node.style.border = ...
          //node.style.color = ...
          //key是变量要放到[]中若是node.style.key,key就变成了字符串
          node.style[key] = object[key];
        }
      }
    }
  },
  //对class操作
  class: {
    //class是个对象，对象里有个add
    add(node, className) {
      node.classList.add(className); //用于添加class
    },
    remove(node, className) {
      node.classList.remove(className); //用于删除class
    },
    has(node, className) {
      return node.classList.contains(className); //用于判断是否有class
    },
  },
  //用于添加事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //用于删除事件监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //查
  //dom.find('选择器',范围)用于获取标签或标签们,
  find(selector, scope) {
    //如果有scope就在scope中调用querySelectorAll，如果没有scope就在document来querySelectorAll
    return (scope || document).querySelectorAll(selector);
  },
  //用于获取父元素
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  //用于获取兄弟姐妹元素
  siblings(node) {
    //children是伪数组，要变成数组才能使用filter对元素进行过滤
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //用于获取弟弟
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //用于获取哥哥
  previous(node) {
    let x = node.previousSibling;
    while (x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //用于遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //用于获取排行老几
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
