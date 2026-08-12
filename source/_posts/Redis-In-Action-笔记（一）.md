---
title: "Redis In Action 笔记（一）"
date: "2021-06-27T05:30:08.000Z"
updated: "2021-07-04T09:26:14.621Z"
slug: "Redis-In-Action-笔记（一）"
categories:
  - "Redis"
tags:
  - "Redis"
  - "数据库"
---

<!-- Recovered from the legacy generated site. New posts can use normal Markdown. -->
<p>本文是对 <a href="https://u.jd.com/GmmQD3o" rel="noopener" target="_blank"><code>Redis In Action</code></a> 一书的内容进行了个人知识的梳理和总结。</p>

<!-- more -->

<h3 id="Redis-概念"><a class="headerlink" href="#Redis-概念" title="Redis 概念"></a>Redis 概念</h3>

<blockquote>
<p>Redis 是一个远程内存数据库，它提供了5种不同的类型的数据结构，可以支持复制、持久化和客户端分片等功能。</p>
</blockquote>

<ul>
<li>Redis同其他数据库之间的对比<br/><img alt="Redis同其他数据库之间的对比" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/TToAoX.png"/></li>
</ul>

<h3 id="Redis-数据结构"><a class="headerlink" href="#Redis-数据结构" title="Redis 数据结构"></a>Redis 数据结构</h3>

<ol>
<li>String<div class="spoiler collapsed">
<div class="spoiler-title">
        常见命令
    </div>
<div class="spoiler-content">
<p><img alt="String" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/Gb5QjA.png"/></p>
</div>
</div> </li>
<li>List<div class="spoiler collapsed">
<div class="spoiler-title">
        常见命令
    </div>
<div class="spoiler-content">
<p><img alt="List" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/cBghPP.png"/></p>
</div>
</div> </li>
<li>Hash<div class="spoiler collapsed">
<div class="spoiler-title">
        常见命令
    </div>
<div class="spoiler-content">
<p><img alt="Hash" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/9QYt24.png"/></p>
</div>
</div> </li>
<li>Set<div class="spoiler collapsed">
<div class="spoiler-title">
        常见命令
    </div>
<div class="spoiler-content">
<p><img alt="Set" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/jlJWkN.png"/></p>
</div>
</div> </li>
<li>SortedSet(ZSet)<div class="spoiler collapsed">
<div class="spoiler-title">
        常见命令
    </div>
<div class="spoiler-content">
<p><img alt="SortedSet" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/CYiFYi.png"/></p>
</div>
</div> </li>
</ol>

<h3 id="持久化及复制"><a class="headerlink" href="#持久化及复制" title="持久化及复制"></a>持久化及复制</h3>

<blockquote>
<p>持久化选项可以让用户将自己的数据存储到硬盘上面，复制特性保证更新数据副本存储到附加的机器上面，来提升系统的性能和数据的可靠性。</p>
</blockquote>

<ol>
<li><p>快照</p>
<blockquote>
<p>Redis 通过创建快照来获得存储在内存里面的数据在某个时间点的副本。在创建快照后，用户可以对快照进行备份，将快照复制到其他服务器从而创建具有相同的数据的服务器副本，也可以将快照留在原地以便重启服务器使用。</p>
</blockquote>
</li>
<li><p>AOF</p>
<blockquote>
<p>AOF 持久化将被执行的写命令写到AOF文件的尾部，来记录数据发生的变化。</p>
</blockquote>
</li>
</ol>
