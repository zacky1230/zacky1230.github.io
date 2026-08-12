---
title: "深入理解Java集合类"
date: "2021-06-23T02:22:48.000Z"
updated: "2021-06-27T07:06:57.563Z"
slug: "深入理解Java集合类"
categories:
  - "Java"
tags:
  - "Collections"
  - "Java"
---

<!-- Recovered from the legacy generated site. New posts can use normal Markdown. -->
<h3 id="理解Java集合"><a class="headerlink" href="#理解Java集合" title="理解Java集合"></a>理解Java集合</h3>

<blockquote>
<p>Java集合工具类继承关系图。从下图中能发现<code>Map</code>并没有实现<code>Collection</code>接口，其实现了<code>Map</code>接口。</p>
</blockquote>

<!-- more -->

<p><img alt="Java集合工具类直接关系图" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/java-collection-hierarchy.png"/></p>

<h4 id="Iterable"><a class="headerlink" href="#Iterable" title="Iterable"></a>Iterable</h4>

<blockquote>
<p>迭代器是一种设计模式，它是一个对象，它可以遍历并选择序列中的对象，而开发人员不需要了解该序列的底层结构。迭代器通常被称为“轻量级”对象，因为创建它的代价小。</p>
</blockquote>

<h4 id="Collection"><a class="headerlink" href="#Collection" title="Collection"></a>Collection</h4>

<blockquote>
<p>继承<code>Iterable</code>接口，不能被实例化。</p>
</blockquote>

<h4 id="List"><a class="headerlink" href="#List" title="List"></a>List</h4>

<ul>
<li><p>ArrayList：基于动态数组实现，支持随机访问。</p>
</li>
<li><p>Vector：和 ArrayList 类似，但它是线程安全的。</p>
</li>
<li><p>LinkedList：基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插入和删除元素。不仅如此，LinkedList 还可以用作栈、队列和双向队列。</p>
</li>
</ul>

<h4 id="Set"><a class="headerlink" href="#Set" title="Set"></a>Set</h4>

<ul>
<li><p>TreeSet：基于红黑树实现，支持有序性操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，TreeSet 则为 O(logN)。</p>
</li>
<li><p>HashSet：基于哈希表实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序信息，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。</p>
</li>
<li><p>LinkedHashSet：具有 HashSet 的查找效率，并且内部使用双向链表维护元素的插入顺序。</p>
</li>
</ul>

<h4 id="Queue"><a class="headerlink" href="#Queue" title="Queue"></a>Queue</h4>

<ul>
<li>ArrayDeque：双端队列。</li>
</ul>

<h4 id="Map"><a class="headerlink" href="#Map" title="Map"></a>Map</h4>

<ul>
<li><p>TreeMap：基于红黑树实现。</p>
</li>
<li><p>HashMap：基于哈希表实现。JDK1.8 之前 HashMap 由数组+链表组成的，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的（“拉链法”解决冲突）。JDK1.8 以后在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为 8）（将链表转换成红黑树前会判断，如果当前数组的长度小于 64，那么会选择先进行数组扩容，而不是转换为红黑树）时，将链表转化为红黑树，以减少搜索时间。</p>
</li>
<li><p>HashTable：和 HashMap 类似，但它是线程安全的，这意味着同一时刻多个线程同时写入 HashTable 不会导致数据不一致。它是遗留类，不应该去使用它，而是使用 ConcurrentHashMap 来支持线程安全，ConcurrentHashMap 的效率会更高，因为 ConcurrentHashMap 引入了分段锁。</p>
</li>
<li><p>LinkedHashMap：使用双向链表来维护元素的顺序，顺序为插入顺序或者最近最少使用（LRU）顺序。</p>
</li>
</ul>
