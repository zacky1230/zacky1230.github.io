---
title: "JVM - 理解Java 内存区域和溢出异常"
date: "2021-08-01T08:48:28.000Z"
updated: "2021-08-01T10:39:36.005Z"
slug: "JVM-理解Java-内存区域和溢出异常"
categories:
  - "JVM"
tags:
  - "JVM"
---

<!-- Recovered from the legacy generated site. New posts can use normal Markdown. -->
<p>本文主要梳理了 JVM 内存区域相关知识点，同时分析了内存溢出异常的情况及常见JVM参数。</p>

<!-- more -->

<p><img alt="JVM - Java内存区域" src="https://zc-tuchuang.oss-cn-beijing.aliyuncs.com/uPic/JVM%20-%20Java%20%E5%86%85%E5%AD%98%E5%8C%BA%E5%9F%9F.png"/></p>

<h1 id="JVM-Java-内存区域"><a class="headerlink" href="#JVM-Java-内存区域" title="JVM - Java 内存区域"></a>JVM - Java 内存区域</h1>

<h2 id="运行时数据区域"><a class="headerlink" href="#运行时数据区域" title="运行时数据区域"></a>运行时数据区域</h2>

<h3 id="程序计数器-Program-Counter-Register"><a class="headerlink" href="#程序计数器-Program-Counter-Register" title="程序计数器(Program Counter Register)"></a>程序计数器(Program Counter Register)</h3>

<ul>
<li>描述：较小的内存空间，可理解为当前线程所执行的字节码的行号指示器</li>
<li>作用：字节码解释器通过改变这个计数器的值来选取下一条需要执行的字节码指令，如：分支、循环、跳转、异常处理等</li>
<li>特点：多线程下每条线程都有一个独立的程序计数器，且互不影响，独立存储</li>
<li>注意：当执行 Native 方法时，计数器值为空(Undefined)</li>
</ul>

<h3 id="Java-虚拟机栈-Java-Virtual-Machine-Stack"><a class="headerlink" href="#Java-虚拟机栈-Java-Virtual-Machine-Stack" title="Java 虚拟机栈(Java Virtual Machine Stack)"></a>Java 虚拟机栈(Java Virtual Machine Stack)</h3>

<ul>
<li>描述：线程私有，生命周期同线程</li>
<li>作用：存储局部变量表、操作数栈、动态连接、方法出口等</li>
<li>局部变量表：存放编译器可知的各种Java虚拟机基本数据类型(boolean、byte、char、short、int、float)，其中(long、double)占用两个局部变量槽(slot)及对象引用(reference类型)</li>
</ul>

<h3 id="本地方法栈-Native-Method-Stack"><a class="headerlink" href="#本地方法栈-Native-Method-Stack" title="本地方法栈(Native Method Stack)"></a>本地方法栈(Native Method Stack)</h3>

<ul>
<li>描述：本地方法栈是为虚拟机使用到的本地(Native)方法服务</li>
<li>作用：本地方法被执行的时候，在本地方法栈会创建一个栈帧，来存储局部变量表、操作数栈、动态连接、方法出口</li>
</ul>

<h3 id="Java-堆-Java-Heap"><a class="headerlink" href="#Java-堆-Java-Heap" title="Java 堆(Java Heap)"></a>Java 堆(Java Heap)</h3>

<ul>
<li>描述：虚拟机所管理的内存最大的一块</li>
<li>作用：存放对象实例，”几乎“所有的对象实例都在此分配</li>
<li>特点：Java堆是垃圾收集器管理的主要区域，因此成为 GC 堆</li>
</ul>

<h3 id="方法区-Method-Area-Non-Heap"><a class="headerlink" href="#方法区-Method-Area-Non-Heap" title="方法区(Method Area [Non-Heap])"></a>方法区(Method Area [Non-Heap])</h3>

<ul>
<li>描述：用于存储已被虚拟机加载的类型信息、常量、静态变量等数据</li>
</ul>

<h3 id="运行时常量池-Runtime-Constant-Pool"><a class="headerlink" href="#运行时常量池-Runtime-Constant-Pool" title="运行时常量池(Runtime Constant Pool)"></a>运行时常量池(Runtime Constant Pool)</h3>

<ul>
<li>描述：是方法区的一部分。</li>
<li>作用：将除Class文件中类的版本、字段、方法、接口等描述信息，常量池表存放编译期生成的各种字面量与符号引用</li>
</ul>

<h3 id="直接内存-Direct-Memory"><a class="headerlink" href="#直接内存-Direct-Memory" title="直接内存(Direct Memory)"></a>直接内存(Direct Memory)</h3>

<ul>
<li>描述：JDK1.4中NIO类，引入一种基于(Channel)与缓冲区(Buffer)的I/O方式，可以使用Native函数直接分配堆外内存，通过存储在Java堆中DirectByteBuffer对象作为这块内存的引用来进行操作。某些场景提高性能，避免了Java堆和Native堆中来回复制数据</li>
</ul>

<h2 id="HotSpot虚拟机对象探秘"><a class="headerlink" href="#HotSpot虚拟机对象探秘" title="HotSpot虚拟机对象探秘"></a>HotSpot虚拟机对象探秘</h2>

<h3 id="对象创建过程"><a class="headerlink" href="#对象创建过程" title="对象创建过程"></a>对象创建过程</h3>

<ul>
<li><p>类加载检查</p>
<ul>
<li>new 指令，检查常量池是否有符号引用，且是否被加载过、解析和初始化过</li>
</ul>
</li>
<li><p>分配内存</p>
<ul>
<li><p>指针碰撞(Bump The Pointer)</p>
<ul>
<li>使用场景：堆内存规整(无碎片)</li>
<li>原理：用过的内存全部整合到一边，没有用的内存放到一边，中间放一个指针作为分界点的指示器，分配内存就仅仅吧指针向空闲方向挪动对象大小相等的距离</li>
<li>GC收集器：Serial、ParNew，简单高效</li>
</ul>
</li>
<li><p>空闲列表(Free List)</p>
<ul>
<li>使用场景：堆内存不规整</li>
<li>原理：虚拟机维护一个列表，列表中记录哪些内存块是可用的，分配时，找一块足够大的空间分配给对象，并更新列表记录</li>
</ul>
</li>
<li><p>内存分配并发问题</p>
<ul>
<li>CAS + 失败重试保证更新操作的原子性</li>
<li>TLAB(Thread Local Allocation Buffer)</li>
</ul>
</li>
</ul>
</li>
<li><p>初始化零值</p>
<ul>
<li>保证了对象的实例字段在Java代码中可以不赋值就直接使用，程序访问到是这些字段的数据类型所对应的零值</li>
</ul>
</li>
<li><p>设置对象头</p>
<ul>
<li>对象头中存储对象是哪个类的实例，如何才能找到类的元数据信息、对象的哈希吗、对象的GC分代年龄等信息</li>
</ul>
</li>
<li><p>执行init方法</p>
</li>
</ul>

<h3 id="对象内存布局"><a class="headerlink" href="#对象内存布局" title="对象内存布局"></a>对象内存布局</h3>

<ul>
<li><p>对象头(Header)</p>
<ul>
<li>运行时数据：哈希码、GC分代年龄、锁状态标志等</li>
<li>类型指针：对象指向它的类型元数据的指针</li>
</ul>
</li>
<li><p>实例数据(Instance Data)</p>
<ul>
<li>对象真正存储的有效信息</li>
</ul>
</li>
<li><p>对齐填充(Padding)</p>
<ul>
<li>不是必然存在，只是占位，因为对象头起始地址必须是8字节的整数倍</li>
</ul>
</li>
</ul>

<h3 id="对象访问定位"><a class="headerlink" href="#对象访问定位" title="对象访问定位"></a>对象访问定位</h3>

<ul>
<li><p>使用句柄</p>
<ul>
<li>Java堆中划分一块内存作为句柄池，reference中存储对象的句柄地址，句柄中存储包含对象实例数据与类型数据的各自具体地址信息</li>
<li>优势：存储的是稳定的句柄地址，对象被移动只会改变句柄中的实例数据指针</li>
</ul>
</li>
<li><p>直接指针</p>
<ul>
<li>Java 堆对象的布局中就必须考虑如何放置访问类型数据的相关信息，而 reference 中存储的直接就是对象的地址</li>
<li>优势：速度快，节省一次指针定位的时间开销</li>
</ul>
</li>
</ul>

<h2 id="Java-虚拟机异常情况"><a class="headerlink" href="#Java-虚拟机异常情况" title="Java 虚拟机异常情况"></a>Java 虚拟机异常情况</h2>

<h3 id="StackOverFlowError"><a class="headerlink" href="#StackOverFlowError" title="StackOverFlowError"></a>StackOverFlowError</h3>

<ul>
<li>线程请求的栈深度大于虚拟机所允许的深度</li>
</ul>

<h3 id="OutOfMemoryError"><a class="headerlink" href="#OutOfMemoryError" title="OutOfMemoryError"></a>OutOfMemoryError</h3>

<ul>
<li>Java虚拟机栈、本地方法栈容量扩展时无法申请足够的内存</li>
<li>Gc Overhead Limit Exceeded:当JVM花太多时间执行垃圾回收且只能收回很少的堆空间</li>
<li>Java Heap Space：在创建新的对象是，堆内存中空间不足以存放新创建的对象(通过-Xmx和-Xms设定)</li>
<li>运行时常量池无法再申请到内存</li>
<li>当各个内存区域综合大于物理内存限制，从而导致动态扩展失败</li>
</ul>

<h2 id="重要JVM参数"><a class="headerlink" href="#重要JVM参数" title="重要JVM参数"></a>重要JVM参数</h2>

<h3 id="堆内存"><a class="headerlink" href="#堆内存" title="堆内存"></a>堆内存</h3>

<ul>
<li>-Xms：最小堆</li>
<li>-Xmx：最大堆</li>
<li>-XX:NewSize：初始化新生代</li>
<li>-XX:MaxNewSize：新生代最大</li>
<li>-XX:PermSize：初始化永久代</li>
<li>-XX:MaxPermSize：永久代最大</li>
<li>-XX:MetaspaceSize：初始化元空间</li>
<li>-XX:MetaspaceSize：元空间最大</li>
</ul>

<h3 id="垃圾收集"><a class="headerlink" href="#垃圾收集" title="垃圾收集"></a>垃圾收集</h3>

<ul>
<li>-XX:+UserSerialGC：串行垃圾收集器</li>
<li>-XX:+UserParallelGC：并行垃圾收集器</li>
<li>-XX:+UserParNewGC：CMS垃圾收集器</li>
<li>-XX:+UserG1GC：G1垃圾收集器</li>
</ul>
