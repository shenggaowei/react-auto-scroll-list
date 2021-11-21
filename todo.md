# react-auto-scroll-list

q1: 如果获取到当前高亮元素的 dom 节点？
通过 dom 操作获取 children 子节点，根据 activeIndex 获取当前的节点。

q2: 如何判断当前高亮的节点处于当前可是区域内的最后一个？
子节点的 offsetTop - 容器的 scrollTop >= 容器的 height - 子节点的 height

q3: 如何计算出向上滚动的 scrollTop 值？
容器的 scrollTop + (子节点的 offsetTop - 容器的 scrollTop)

q4: 如何循环列表？

q5: 
