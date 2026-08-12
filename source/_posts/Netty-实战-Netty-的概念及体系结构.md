---
title: "Netty 实战- Netty 的概念及体系结构"
date: "2021-08-03T01:12:16.000Z"
updated: "2021-08-03T01:16:12.775Z"
slug: "Netty-实战-Netty-的概念及体系结构"
categories:
  - "Netty"
tags:
  - "Netty"
---

<!-- Recovered from the legacy generated site. New posts can use normal Markdown. -->
<h1 id="Netty-的概念及体系结构"><a class="headerlink" href="#Netty-的概念及体系结构" title="Netty 的概念及体系结构"></a>Netty 的概念及体系结构</h1>

<h2 id="Netty–异步和事件驱动"><a class="headerlink" href="#Netty–异步和事件驱动" title="Netty–异步和事件驱动"></a>Netty–异步和事件驱动</h2>

<blockquote>
<p> Netty 提供了极丰富的网络编程工具集，但其只是一个框架，它的架构方法和设计原则是：每一个笑点都和它的技术内容一样重要。</p>
</blockquote>

<ul>
<li>关注点分离—-业务和网络逻辑解耦</li>
<li>模块化和可复用性</li>
<li>可测试性味首要的要求</li>
</ul>

<!-- more -->

<h3 id="Java-网络编程"><a class="headerlink" href="#Java-网络编程" title="Java 网络编程"></a>Java 网络编程</h3>

<p>    早期的 Java API（java.net）只支持本地系统的套接字库来提供所谓的阻塞函数。</p>

<figure class="highlight processing"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/><span class="line">3</span><br/><span class="line">4</span><br/><span class="line">5</span><br/><span class="line">6</span><br/><span class="line">7</span><br/><span class="line">8</span><br/><span class="line">9</span><br/><span class="line">10</span><br/><span class="line">11</span><br/><span class="line">12</span><br/><span class="line">13</span><br/><span class="line">14</span><br/><span class="line">15</span><br/><span class="line">16</span><br/><span class="line">17</span><br/><span class="line">18</span><br/><span class="line">19</span><br/><span class="line">20</span><br/><span class="line">21</span><br/><span class="line">22</span><br/><span class="line">23</span><br/><span class="line">24</span><br/><span class="line">25</span><br/><span class="line">26</span><br/><span class="line">27</span><br/><span class="line">28</span><br/><span class="line">29</span><br/><span class="line">30</span><br/><span class="line">31</span><br/><span class="line">32</span><br/><span class="line">33</span><br/><span class="line">34</span><br/><span class="line">35</span><br/><span class="line">36</span><br/><span class="line">37</span><br/><span class="line">38</span><br/><span class="line">39</span><br/><span class="line">40</span><br/><span class="line">41</span><br/><span class="line">42</span><br/><span class="line">43</span><br/><span class="line">44</span><br/><span class="line">45</span><br/><span class="line">46</span><br/><span class="line">47</span><br/><span class="line">48</span><br/><span class="line">49</span><br/><span class="line">50</span><br/><span class="line">51</span><br/><span class="line">52</span><br/><span class="line">53</span><br/><span class="line">54</span><br/><span class="line">55</span><br/><span class="line">56</span><br/><span class="line">57</span><br/><span class="line">58</span><br/><span class="line">59</span><br/><span class="line">60</span><br/><span class="line">61</span><br/><span class="line">62</span><br/><span class="line">63</span><br/><span class="line">64</span><br/><span class="line">65</span><br/><span class="line">66</span><br/><span class="line">67</span><br/><span class="line">68</span><br/><span class="line">69</span><br/><span class="line">70</span><br/><span class="line">71</span><br/><span class="line">72</span><br/><span class="line">73</span><br/><span class="line">74</span><br/><span class="line">75</span><br/><span class="line">76</span><br/><span class="line">77</span><br/></pre></td><td class="code"><pre><span class="line"></span><br/><span class="line"><span class="keyword">package</span> nia.chapter1;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.io.<span class="keyword">BufferedReader</span>;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.io.IOException;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.io.InputStreamReader;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.io.PrintWriter;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.net.ServerSocket;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.net.Socket;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">public</span> class BlockingIoExample {</span><br/><span class="line"></span><br/><span class="line"><span class="comment">/**</span></span><br/><span class="line"><span class="comment"></span></span><br/><span class="line"><span class="comment">* 代码清单 1-1 阻塞 I/O 示例</span></span><br/><span class="line"><span class="comment"></span></span><br/><span class="line"><span class="comment">* */</span></span><br/><span class="line"></span><br/><span class="line"><span class="keyword">public</span> <span class="keyword">void</span> serve(<span class="built_in">int</span> portNumber) <span class="keyword">throws</span> IOException {</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//创建一个新的 ServerSocket，用以监听指定端口上的连接请求</span></span><br/><span class="line"></span><br/><span class="line">ServerSocket serverSocket = <span class="keyword">new</span> ServerSocket(portNumber);</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//对accept()方法的调用将被阻塞，直到一个连接建立</span></span><br/><span class="line"></span><br/><span class="line">Socket clientSocket = serverSocket.accept();</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//这些流对象都派生于该套接字的流对象</span></span><br/><span class="line"></span><br/><span class="line"><span class="keyword">BufferedReader</span> in = <span class="keyword">new</span> <span class="keyword">BufferedReader</span>(</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">new</span> InputStreamReader(clientSocket.getInputStream()));</span><br/><span class="line"></span><br/><span class="line">PrintWriter out =</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">new</span> PrintWriter(clientSocket.getOutputStream(), <span class="keyword">true</span>);</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">String</span> request, response;</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//处理循环开始</span></span><br/><span class="line"></span><br/><span class="line"><span class="keyword">while</span> ((request = in.readLine()) != <span class="keyword">null</span>) {</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">if</span> (<span class="string">"Done"</span>.equals(request)) {</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">break</span>;</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//请求被传递给服务器的处理方法</span></span><br/><span class="line"></span><br/><span class="line">response = processRequest(request);</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//服务器的响应被发送给了客户端</span></span><br/><span class="line"></span><br/><span class="line">out.<span class="built_in">println</span>(response);</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//继续执行处理循环</span></span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">private</span> <span class="keyword">String</span> processRequest(<span class="keyword">String</span> request){</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">return</span> <span class="string">"Processed"</span>;</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/></pre></td></tr></table></figure>

<h4 id="Java-NIO"><a class="headerlink" href="#Java-NIO" title="Java NIO"></a>Java NIO</h4>

<p>Java 对非阻塞I/O的支持在JDK1.4的 java.nio包中。</p>

<h4 id="选择器"><a class="headerlink" href="#选择器" title="选择器"></a>选择器</h4>

<p>java.nio.channels.Selector 是Java的非阻塞I/O实现的关键。使用了事件通知API以确定一组非阻塞套接字中农有哪些已经就绪能够进行I/O相关操作。</p>

<ul>
<li>使用较少的县城可以处理许多连接，因此也减少了内存管理和上下文切换带来的开销</li>
<li>当没有I/O操作需要的时候，线程可以用于其他任务</li>
</ul>

<h3 id="Netty-简介"><a class="headerlink" href="#Netty-简介" title="Netty 简介"></a>Netty 简介</h3>

<blockquote>
<p> 想要实现更高的吞吐量和可扩展性，在更低的成本基础上进行交付。如果直接使用底层的API，显得较为复杂。在网络编程领域，Netty是 Java的卓越框架。它驾驭了Java高级API的能力，并将其隐藏在一个易于使用的API之后。其特性主要体现在以下。</p>
</blockquote>

<ul>
<li>设计：统一的API，支持多种传输类型，阻塞和非阻塞，简单而强大的线程模型，真正的无连接数据报套接字支持，链接逻辑组建以支持复用</li>
<li>易于使用：详实的文档和示例集</li>
<li>性能：拥有比Java的核心API更高的吞吐量以及更低的延迟，得益于池化和复用，拥有更低的资源消耗，最少的内存复制</li>
<li>健壮性：不会因为慢速、快速或者超载的连接导致OutOfMemoryError</li>
<li>安全性：完整的SSL/TLS支持</li>
<li>社区驱动：发布快速且频繁</li>
</ul>

<h4 id="异步和事件驱动"><a class="headerlink" href="#异步和事件驱动" title="异步和事件驱动"></a>异步和事件驱动</h4>

<p>异步和可伸缩性之间的联系：</p>

<ul>
<li>非阻塞网络调用使我们可以不必等待一个操作的完成。完全异步的I/O正是基于这个特性构建的，异步方法会立即返回，并且在它完成时，会直接或者稍后的某个时间通知用户。</li>
<li>选择器是的我们能够通过较少的线程见识许多连接上的事件</li>
</ul>

<h3 id="Netty-的核心组件"><a class="headerlink" href="#Netty-的核心组件" title="Netty 的核心组件"></a>Netty 的核心组件</h3>

<ul>
<li>Channel</li>
<li>回调</li>
<li>Future</li>
<li>事件和ChannelHandler</li>
</ul>

<p>这些构建块代表了不同类型的构造：资源、逻辑以及通知。你的应用将使用它们来访问网络以及流经网络的数据。</p>

<h4 id="Channel"><a class="headerlink" href="#Channel" title="Channel"></a>Channel</h4>

<p>Channel 是Java NIO 的一个基本构造。代表了一个实体的开放连接，如读操作和写操作。</p>

<h4 id="回调"><a class="headerlink" href="#回调" title="回调"></a>回调</h4>

<p>回调其实就是一个方法，一个指向已经被提供给另一个方法的方法的引用。回调在广泛的编程场景中都有应用，而且是在操作完成后通知相关方最常见的方式。在Netty内部使用了回调来处理事件，当一个回调被触发时，相关事件可以被 ChannelHandler 接口实现来处理。</p>

<figure class="highlight java"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/><span class="line">3</span><br/><span class="line">4</span><br/><span class="line">5</span><br/><span class="line">6</span><br/><span class="line">7</span><br/><span class="line">8</span><br/><span class="line">9</span><br/><span class="line">10</span><br/><span class="line">11</span><br/><span class="line">12</span><br/><span class="line">13</span><br/><span class="line">14</span><br/><span class="line">15</span><br/><span class="line">16</span><br/><span class="line">17</span><br/><span class="line">18</span><br/><span class="line">19</span><br/><span class="line">20</span><br/><span class="line">21</span><br/><span class="line">22</span><br/></pre></td><td class="code"><pre><span class="line"><span class="keyword">import</span> io.netty.channel.ChannelHandlerContext;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.channel.ChannelInboundHandlerAdapter;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">public</span> <span class="class"><span class="keyword">class</span> <span class="title">ConnectHandler</span> <span class="keyword">extends</span> <span class="title">ChannelInboundHandlerAdapter</span> </span>{</span><br/><span class="line"></span><br/><span class="line"><span class="meta">@Override</span></span><br/><span class="line"></span><br/><span class="line"><span class="comment">//当一个新的连接已经被建立时，channelActive(ChannelHandlerContext)将会被调用</span></span><br/><span class="line"></span><br/><span class="line"><span class="function"><span class="keyword">public</span> <span class="keyword">void</span> <span class="title">channelActive</span><span class="params">(ChannelHandlerContext ctx)</span></span></span><br/><span class="line"><span class="function"></span></span><br/><span class="line"><span class="function"><span class="keyword">throws</span> Exception </span>{</span><br/><span class="line"></span><br/><span class="line">System.out.println(</span><br/><span class="line"></span><br/><span class="line"><span class="string">"Client "</span> + ctx.channel().remoteAddress() + <span class="string">" connected"</span>);</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/></pre></td></tr></table></figure>

<h4 id="Future"><a class="headerlink" href="#Future" title="Future"></a>Future</h4>

<p>Future 提供了另一种在操作完成时通知应用程序的方式。可以看做是异步操作的结果占位符；它将在未来的某个时刻完成，并提供对其结果的访问。每个 Netty 的出站I/O操作都返回一个ChannelFuture，也就是说都不会阻塞。</p>

<figure class="highlight arduino"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/><span class="line">3</span><br/><span class="line">4</span><br/><span class="line">5</span><br/><span class="line">6</span><br/><span class="line">7</span><br/><span class="line">8</span><br/><span class="line">9</span><br/><span class="line">10</span><br/><span class="line">11</span><br/><span class="line">12</span><br/><span class="line">13</span><br/><span class="line">14</span><br/><span class="line">15</span><br/><span class="line">16</span><br/><span class="line">17</span><br/><span class="line">18</span><br/><span class="line">19</span><br/><span class="line">20</span><br/><span class="line">21</span><br/><span class="line">22</span><br/><span class="line">23</span><br/><span class="line">24</span><br/><span class="line">25</span><br/><span class="line">26</span><br/><span class="line">27</span><br/><span class="line">28</span><br/><span class="line">29</span><br/><span class="line">30</span><br/><span class="line">31</span><br/><span class="line">32</span><br/><span class="line">33</span><br/><span class="line">34</span><br/><span class="line">35</span><br/><span class="line">36</span><br/><span class="line">37</span><br/><span class="line">38</span><br/><span class="line">39</span><br/><span class="line">40</span><br/><span class="line">41</span><br/><span class="line">42</span><br/><span class="line">43</span><br/><span class="line">44</span><br/><span class="line">45</span><br/><span class="line">46</span><br/><span class="line">47</span><br/><span class="line">48</span><br/><span class="line">49</span><br/><span class="line">50</span><br/><span class="line">51</span><br/><span class="line">52</span><br/><span class="line">53</span><br/><span class="line">54</span><br/><span class="line">55</span><br/><span class="line">56</span><br/><span class="line">57</span><br/><span class="line">58</span><br/><span class="line">59</span><br/><span class="line">60</span><br/><span class="line">61</span><br/><span class="line">62</span><br/><span class="line">63</span><br/><span class="line">64</span><br/><span class="line">65</span><br/><span class="line">66</span><br/><span class="line">67</span><br/><span class="line">68</span><br/><span class="line">69</span><br/><span class="line">70</span><br/><span class="line">71</span><br/><span class="line">72</span><br/><span class="line">73</span><br/><span class="line">74</span><br/><span class="line">75</span><br/><span class="line">76</span><br/><span class="line">77</span><br/></pre></td><td class="code"><pre><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.buffer.ByteBuf;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.buffer.Unpooled;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.channel.Channel;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.channel.ChannelFuture;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.channel.ChannelFutureListener;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> io.netty.channel.socket.nio.NioSocketChannel;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.net.InetSocketAddress;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">import</span> java.nio.charset.Charset;</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">public</span> <span class="class"><span class="keyword">class</span> <span class="title">ConnectExample</span> {</span></span><br/><span class="line"></span><br/><span class="line"><span class="keyword">private</span> <span class="keyword">static</span> <span class="keyword">final</span> Channel CHANNEL_FROM_SOMEWHERE = <span class="keyword">new</span> <span class="built_in">NioSocketChannel</span>();</span><br/><span class="line"></span><br/><span class="line"><span class="function"><span class="keyword">public</span> <span class="keyword">static</span> <span class="keyword">void</span> <span class="title">connect</span><span class="params">()</span> </span>{</span><br/><span class="line"></span><br/><span class="line">Channel channel = CHANNEL_FROM_SOMEWHERE; <span class="comment">//reference form somewhere</span></span><br/><span class="line"></span><br/><span class="line"><span class="comment">// Does not block</span></span><br/><span class="line"></span><br/><span class="line"><span class="comment">//异步地连接到远程节点</span></span><br/><span class="line"></span><br/><span class="line">ChannelFuture future = channel.<span class="built_in">connect</span>(</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">new</span> <span class="built_in">InetSocketAddress</span>(<span class="string">"192.168.0.1"</span>, <span class="number">25</span>));</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//注册一个 ChannelFutureListener，以便在操作完成时获得通知</span></span><br/><span class="line"></span><br/><span class="line">future.<span class="built_in">addListener</span>(<span class="keyword">new</span> <span class="built_in">ChannelFutureListener</span>() {</span><br/><span class="line"></span><br/><span class="line">@Override</span><br/><span class="line"></span><br/><span class="line"><span class="keyword">public</span> <span class="keyword">void</span> <span class="built_in">operationComplete</span>(ChannelFuture future) {</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//检查操作的状态</span></span><br/><span class="line"></span><br/><span class="line"><span class="keyword">if</span> (future.<span class="built_in">isSuccess</span>()) {</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//如果操作是成功的，则创建一个 ByteBuf 以持有数据</span></span><br/><span class="line"></span><br/><span class="line">ByteBuf buffer = Unpooled.<span class="built_in">copiedBuffer</span>(</span><br/><span class="line"></span><br/><span class="line"><span class="string">"Hello"</span>, Charset.<span class="built_in">defaultCharset</span>());</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//将数据异步地发送到远程节点。返回一个 ChannelFuture</span></span><br/><span class="line"></span><br/><span class="line">ChannelFuture wf = future.<span class="built_in">channel</span>()</span><br/><span class="line"></span><br/><span class="line">.<span class="built_in">writeAndFlush</span>(buffer);</span><br/><span class="line"></span><br/><span class="line"><span class="comment">// ...</span></span><br/><span class="line"></span><br/><span class="line">} <span class="keyword">else</span> {</span><br/><span class="line"></span><br/><span class="line"><span class="comment">//如果发生错误，则访问描述原因的 Throwable</span></span><br/><span class="line"></span><br/><span class="line">Throwable cause = future.<span class="built_in">cause</span>();</span><br/><span class="line"></span><br/><span class="line">cause.<span class="built_in">printStackTrace</span>();</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line">});</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/><span class="line">}</span><br/><span class="line"></span><br/></pre></td></tr></table></figure>

<h4 id="事件和-ChannelHandler"><a class="headerlink" href="#事件和-ChannelHandler" title="事件和 ChannelHandler"></a>事件和 ChannelHandler</h4>

<p>Netty 使用不同的事件通知我们状态的改变或者是操作的改变。使我们能够基于已经发生的事件来触发适当的动作。如：</p>

<ul>
<li>记录日志</li>
<li>数据转换</li>
<li>流控制</li>
<li>应用程序逻辑</li>
</ul>

<p>Netty 入站数据或者相关的状态变更而触发的事件包括：</p>

<ul>
<li>连接已被激活或连接失活</li>
<li>数据读取</li>
<li>用户事件</li>
<li>错误事件</li>
</ul>

<p>Netty 出站事件是未来将会触发的某个动作的操作结果,如：</p>

<ul>
<li>打开或关闭到远程节点的连接</li>
<li>将数据写到或者冲刷到套接字</li>
</ul>
