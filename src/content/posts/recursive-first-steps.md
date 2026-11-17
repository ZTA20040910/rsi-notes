---
title: "Recursive：在明确约束下，找到值得保留的改进"
description: "通过 NanoGPT 与 NanoChat，理解自动研究的策略选择、资源约束，以及实验历史的价值。"
order: 2
level: "L2"
label: "Recursive"
source: "https://recursive.com/updates/first-steps-toward-automated-ai-research"
readingTime: "5 分钟"
insight: "最终程序更便宜，与发现这个程序的研究过程更便宜，是两个问题。"
---

Eureka Machine 的价值，在于把反馈转成下一项研究决策。它是四份材料中与 survey 分类直接对齐的案例：Appendix B，p.68 将 Recursive Automated AI Research 映射为 [L2：改进策略自主权](/rsi-notes/levels/l2/)。[survey v3](https://arxiv.org/abs/2609.11873v3)

## 成果

First Steps 展示了三个方向：固定时间内训练得更好、达到质量门槛所需时间更短，以及 GPU kernel 更快。[原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)

NanoGPT 的公开重复运行记录提供了一个具体切面：

| Modal 8×H100，同硬件记录 | 原纪录方案重跑 | Recursive 候选 |
|---|---:|---:|
| 运行次数 | 10 | 13 |
| 平均训练时间 | 80.6114 秒 | 77.3376 秒 |
| 平均验证 loss | 3.27850 | 3.27893 |

按这两组公开记录计算，平均时间减少 **3.2738 秒，约 4.06%**，速度比约 1.0423×。原文的 79.7→77.5 秒采用另一呈现口径，不能与这里的均值混用。[基线记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/baseline_logs/statistics.md)、[候选记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/reproducibility_logs/statistics.md)、[产物说明](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/README.md)

NanoChat 则在单 B200、每次训练五分钟的约束下比较方案，以越低越好的 BPB 衡量质量。**五分钟是最终训练执行预算，不是完整研究搜索成本。**[NanoChat 记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanochat_autoresearch/README.md)

## 机制

公开系统描述包括并行研究分支、历史记录复用、实验验证和候选合并。AI 根据结果决定下一项训练或 kernel 干预，有效程序被保留。系统边界是这一自动研发流程，而不是只看最后被训练出来的小模型。[系统说明](https://recursive.com/updates/first-steps-toward-automated-ai-research)

这符合 L2：AI 选择改进策略，人仍规定任务、目标、预算与验收边界。作者披露过利用缓存、持久状态或计时细节获取虚假优势的候选，评估加固涉及人工反馈。基础模型也可能已知公开技巧，因此“重新找到一种方案”不足以证明独立发现。

历史复用帮助选择后续实验，但记录存在本身不等于更高层自主权。公开材料没有因此证明研究框架已被 AI 改写，并作为后继改进器再次使用；不能直接升到 [L5](/rsi-notes/levels/l5/)。公开最终程序，也不等于 Eureka 系统完整开放。

## 理解与取舍

NanoChat 使用便宜的哈希局部记忆，提醒我：资源约束会参与决定什么方法更好。每步效果稍强但耗时更长的方法，在固定训练时间下可能反而落后。固定时间、固定 FLOPs 和固定质量门槛，是不同问题。

我也看重实验历史的价值。刚发现、依赖硬件或 shape 的结果，适合连同条件保存在外部记录中，便于修正与复用。结合 Apex 的轨迹训练，我倾向于让较稳定、可迁移的规律再进入模型能力；这是两份材料引出的理解，并非已经证明的最优分工。

在成熟训练代码上找到几个百分点的改善有实际意义。决定是否采用时，我会同时考虑失败试验、代理推理、复验和人工筛查的成本，分别评价研究产物与研究过程。

继续阅读：[资源约束与算法选择](/rsi-notes/insights/#constraints) · [研究经验如何留下来](/rsi-notes/insights/#memory)
