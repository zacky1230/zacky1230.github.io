---
title: "LeetCode--反转链表"
date: "2021-08-01T03:19:06.000Z"
updated: "2021-08-01T03:57:25.831Z"
slug: "LeetCode-反转链表"
categories:
  - "LeetCode"
tags:
  - "算法"
  - "链表"
---

<!-- Recovered from the legacy generated site. New posts can use normal Markdown. -->
<h3 id="206-反转链表"><a class="headerlink" href="#206-反转链表" title="206.反转链表"></a>206.反转链表</h3>

<p>给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。</p>

<!-- more -->

<h4 id="示例1"><a class="headerlink" href="#示例1" title="示例1"></a>示例1</h4>

<p><img alt="示例1" src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg"/></p>

<figure class="highlight accesslog"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/></pre></td><td class="code"><pre><span class="line">输入：head = <span class="string">[1,2,3,4,5]</span></span><br/><span class="line">输出：<span class="string">[5,4,3,2,1]</span></span><br/></pre></td></tr></table></figure>

<h4 id="示例2"><a class="headerlink" href="#示例2" title="示例2"></a>示例2</h4>

<p><img alt="示例2" src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg"/></p>

<figure class="highlight inform7"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/></pre></td><td class="code"><pre><span class="line">输入：head = <span class="comment">[1,2]</span></span><br/><span class="line">输出：<span class="comment">[2,1]</span></span><br/></pre></td></tr></table></figure>

<h4 id="示例3"><a class="headerlink" href="#示例3" title="示例3"></a>示例3</h4>

<figure class="highlight inform7"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/></pre></td><td class="code"><pre><span class="line">输入：head = <span class="comment">[]</span></span><br/><span class="line">输出：<span class="comment">[]</span></span><br/></pre></td></tr></table></figure>

<h3 id="Solution"><a class="headerlink" href="#Solution" title="Solution"></a>Solution</h3>

<figure class="highlight gradle"><table><tr><td class="gutter"><pre><span class="line">1</span><br/><span class="line">2</span><br/><span class="line">3</span><br/><span class="line">4</span><br/><span class="line">5</span><br/><span class="line">6</span><br/><span class="line">7</span><br/><span class="line">8</span><br/><span class="line">9</span><br/><span class="line">10</span><br/><span class="line">11</span><br/><span class="line">12</span><br/><span class="line">13</span><br/><span class="line">14</span><br/><span class="line">15</span><br/><span class="line">16</span><br/><span class="line">17</span><br/><span class="line">18</span><br/><span class="line">19</span><br/><span class="line">20</span><br/><span class="line">21</span><br/><span class="line">22</span><br/><span class="line">23</span><br/><span class="line">24</span><br/><span class="line">25</span><br/><span class="line">26</span><br/><span class="line">27</span><br/><span class="line">28</span><br/><span class="line">29</span><br/><span class="line">30</span><br/><span class="line">31</span><br/><span class="line">32</span><br/><span class="line">33</span><br/><span class="line">34</span><br/><span class="line">35</span><br/><span class="line">36</span><br/><span class="line">37</span><br/><span class="line">38</span><br/><span class="line">39</span><br/><span class="line">40</span><br/><span class="line">41</span><br/><span class="line">42</span><br/><span class="line">43</span><br/><span class="line">44</span><br/><span class="line">45</span><br/><span class="line">46</span><br/><span class="line">47</span><br/><span class="line">48</span><br/><span class="line">49</span><br/><span class="line">50</span><br/><span class="line">51</span><br/></pre></td><td class="code"><pre><span class="line"><span class="keyword">public</span> <span class="keyword">class</span> ListNode {</span><br/><span class="line"></span><br/><span class="line"></span><br/><span class="line">    <span class="keyword">int</span> val;</span><br/><span class="line">    ListNode <span class="keyword">next</span>;</span><br/><span class="line"></span><br/><span class="line">    ListNode() {</span><br/><span class="line">    }</span><br/><span class="line"></span><br/><span class="line">    ListNode(<span class="keyword">int</span> val) {</span><br/><span class="line">        <span class="keyword">this</span>.val = val;</span><br/><span class="line">    }</span><br/><span class="line"></span><br/><span class="line">    ListNode(<span class="keyword">int</span> val, ListNode <span class="keyword">next</span>) {</span><br/><span class="line">        <span class="keyword">this</span>.val = val;</span><br/><span class="line">        <span class="keyword">this</span>.<span class="keyword">next</span> = <span class="keyword">next</span>;</span><br/><span class="line">    }</span><br/><span class="line"></span><br/><span class="line"></span><br/><span class="line">    <span class="keyword">public</span> <span class="keyword">static</span> <span class="keyword">void</span> main(String[] args) {</span><br/><span class="line"></span><br/><span class="line">        ListNode head = <span class="keyword">new</span> ListNode(<span class="number">1</span>, <span class="keyword">new</span> ListNode(<span class="number">2</span>, <span class="keyword">new</span> ListNode(<span class="number">3</span>)));</span><br/><span class="line"></span><br/><span class="line">        ListNode reverseList = reverseList(head);</span><br/><span class="line">        <span class="keyword">while</span> (Objects.nonNull(reverseList)) {</span><br/><span class="line">            System.out.<span class="keyword">println</span>(reverseList.val);</span><br/><span class="line">            reverseList = reverseList.<span class="keyword">next</span>;</span><br/><span class="line">        }</span><br/><span class="line">    }</span><br/><span class="line"></span><br/><span class="line">    <span class="comment">/**</span></span><br/><span class="line"><span class="comment">     * 迭代方式</span></span><br/><span class="line"><span class="comment">     *</span></span><br/><span class="line"><span class="comment">     * @param head</span></span><br/><span class="line"><span class="comment">     * @return</span></span><br/><span class="line"><span class="comment">     */</span></span><br/><span class="line">    <span class="keyword">public</span> <span class="keyword">static</span> ListNode reverseList(ListNode head) {</span><br/><span class="line">        <span class="keyword">if</span> (head == <span class="keyword">null</span>) {</span><br/><span class="line">            <span class="keyword">return</span> <span class="keyword">null</span>;</span><br/><span class="line">        }</span><br/><span class="line"></span><br/><span class="line">        ListNode prev = <span class="keyword">null</span>;</span><br/><span class="line">        <span class="keyword">while</span> (head != <span class="keyword">null</span>) {</span><br/><span class="line">            ListNode <span class="keyword">next</span> =  head.<span class="keyword">next</span>;</span><br/><span class="line">            head.<span class="keyword">next</span> = prev;</span><br/><span class="line">            prev = head;</span><br/><span class="line">            head = <span class="keyword">next</span>;</span><br/><span class="line">        }</span><br/><span class="line">        <span class="keyword">return</span> prev;</span><br/><span class="line">    }</span><br/><span class="line">}</span><br/></pre></td></tr></table></figure>
