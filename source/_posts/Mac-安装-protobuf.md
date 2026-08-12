---
title: "Mac 安装 protobuf"
date: "2021-09-30T06:35:28.000Z"
updated: "2021-09-30T06:40:51.705Z"
slug: "Mac-安装-protobuf"
categories:
tags:
---

<!-- Recovered from the legacy generated site. New posts can use normal Markdown. -->
<ol>
<li>从 GitHub 下载<a href="https://github.com/protocolbuffers/protobuf/releases" rel="noopener" target="_blank">源码</a>，选择 protobuf-all-*.tar.gz</li>
<li>解压缩后，进入目录 <code>cd protobuf-3.18.0/</code></li>
<li>设置编译目录 <code>./configure --prefix=/usr/local/protobuf</code></li>
<li>切换root用户后安装</li>
</ol>

<figure class="highlight gauss"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/><span class="line">3</span><br/></pre></td><td class="code"><pre><span class="line">sudo -i</span><br/><span class="line"><span class="built_in">make</span></span><br/><span class="line"><span class="built_in">make</span> install</span><br/></pre></td></tr></table></figure>

<!-- more -->

<ol start="5">
<li>配置环境变量 .bash_profile</li>
</ol>

<figure class="highlight routeros"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/><span class="line">3</span><br/><span class="line">4</span><br/></pre></td><td class="code"><pre><span class="line"><span class="builtin-name">export</span> <span class="attribute">PROTOBUF</span>=/usr/local/protobuf </span><br/><span class="line"><span class="builtin-name">export</span> <span class="attribute">PATH</span>=<span class="variable">$PROTOBUF</span>/bin:$PATH</span><br/><span class="line"></span><br/><span class="line">source ~/.bash_profile</span><br/></pre></td></tr></table></figure>

<ol start="6">
<li>测试安装 <code>protoc --version</code></li>
</ol>
