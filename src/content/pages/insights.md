---
title: "一次研究，怎样成为下一轮的优势？"
description: "从四份材料出发，理解瓶颈迁移、学习机会和研究经验的积累，并说明这些判断成立的条件。"
---

我更关注自动研究是否能持续发现当前约束、扩大有效学习机会，并把获得的经验留给下一轮研究。下面六条判断来自四份材料，前三个重点是**瓶颈迁移、速度与学习机会、经验积累**；预算、验收和环境则说明它们在什么条件下成立。

<h2 id="bottleneck">01 · 一次优化，会改变下一步值得研究什么</h2>

Flint 的研发说明把专家配置、输出层量化、蒸馏与推理 kernel 连在一起：主干变得稀疏后，输出层开销更值得处理；降低表示成本，又需要恢复精度。[Flint 原文](https://recursive.com/updates/introducing-recursive-flint)

我的理解是，自动研究的价值不只在于提出更多候选，还在于**系统改变后，重新选择下一项干预**。如果把模型结构或运行程序中的任一部分永久固定，可能漏掉组合收益。我因此更看重能够跨组件重新判断瓶颈的研究过程。

这些选择有依赖，收益不能简单相加。不同 batch、prefill 和解码负载也可能需要不同方案。它体现了 [L2 的策略自主权](/rsi-notes/levels/l2/)，尚不能仅凭产品变快认定改进机制已递归继承。

[展开 Flint 案例 →](/rsi-notes/posts/flint/)

<h2 id="experience-speed">02 · 推理速度，可能影响模型能学到哪些经验</h2>

Naive 解释了长轨迹 RL 的一个问题：同步训练要等待慢轨迹；异步训练中，轨迹若跨过太多策略版本，可能因过时而被整条丢弃。[Naive 原文](https://naive.ai/en/research/)

这让我把速度看成学习过程中的一个条件。若被丢弃的长轨迹恰好包含有价值的困难经验，更快完成就可能减少这部分经验的损失。**运行效率有机会改变实际进入训练的数据组成。**我会先问提速作用于哪段流程，再解释 tokens/s 的价值。

这里的最终能力收益仍是条件推测：长轨迹可能只是绕路，长度不代表学习价值；训练、排队也可能才是主要瓶颈。材料没有证明“推理更快必然学得更好”。经验能否及时进入训练，与 [L3 中谁决定接下来学什么](/rsi-notes/levels/l3/)，也是两个问题。

[展开 Naive 案例 →](/rsi-notes/posts/naive/)

<h2 id="constraints">03 · 资源约束参与定义“更好的方法”</h2>

Recursive 在固定训练时间下采用便宜的哈希局部记忆；Apex 的 DDPO 案例通过降低去噪开销、调整停止方式，利用更多可用训练时间。[Recursive 原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)、[Apex 原文](https://www.apexin.com/apex-35b/#ai)

每步效果更好，却耗时更多的方法，不一定在固定时间下胜出。我更看重研究代理在具体硬件、预算与质量要求下作出选择。固定时间、固定计算量和固定质量门槛对应不同问题；五分钟训练中的优势不能直接外推到大规模长时间训练。

<h2 id="verification">04 · 好的验收，也要保住真正有效的方向</h2>

Naive 的 TMA 预取在微基准中略慢，却让完整模型更快；MoE 融合数值正确，整体反而更慢。Recursive 则披露了缓存与计时漏洞产生的虚假优势。[Naive 原文](https://naive.ai/en/research/)、[Recursive 原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)

验收会影响后续研究走向：既可能错误保留无效方案，也可能错过有价值的组合。我的取舍是用局部检查定位问题，用实际任务决定采用。不同检查各有成本，不要求每一步都做最昂贵的测试；人工加固验收，也不能自动算作 [L5 的评估机制自改进](/rsi-notes/levels/l5/)。

<h2 id="environment">05 · 能操作、能得到反馈，科研才容易形成闭环</h2>

Recursive 偏好指标清楚、反馈较快的任务。Apex 将翼片运动表示为 Fourier 系数，由模拟器评价；机器人任务也通过代码与执行反馈迭代。[Recursive 原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)、[Apex 原文](https://www.apexin.com/apex-35b/#ai)

这些领域共享的是可修改对象、可执行过程和可观察结果。我会优先关注反馈可靠、验证成本可承担的任务，而不只看学科名称。模拟优化不代表现实效果已经成立；能获得交互反馈，也不足以说明形成了 [L4 的跨任务持续适应](/rsi-notes/levels/l4/)。

<h2 id="memory">06 · 研究经验，需要以合适的方式留下来</h2>

Recursive 复用实验历史、并行探索与合并分支；Apex 描述了研究轨迹参与训练，并通过失败分析构造定向数据。[Recursive 原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)、[Apex 原文](https://www.apexin.com/apex-35b/#ai)

这启发我区分两种积累：具体、可能被推翻的结果先留在外部记录；希望跨任务反复使用的决策规律，再考虑通过训练沉淀。例如，某个 shape 下的失败值得保留细节，判断融合何时增加同步开销则可能成为可迁移能力。

**值得保留的不只是结果，还包括结果成立的条件。**我更看重经验能否帮助下一轮减少重复判断、选对起点，而非轨迹数量。这种分工是我对两份材料的综合推导，尚非被证明的最优架构；失败也可能来自环境故障和噪声。

记录被保留不自动等于 L4 或 L5。还要继续追问：它改变了后续任务行为、学习议程，还是产生改进的机制？

[读 Recursive 的历史复用 →](/rsi-notes/posts/recursive-first-steps/) · [读 Apex 的经验回流 →](/rsi-notes/posts/apex/)

---

这些 insight 解释各项进展为什么有用，而不把它们合并成“已经实现持续递归增长”的结论。[查看分层与证据边界](/rsi-notes/levels/l5/) · [追溯全部来源](/rsi-notes/references/)
