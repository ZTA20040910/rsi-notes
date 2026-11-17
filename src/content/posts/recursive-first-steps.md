---
title: "Recursive：什么才算更好的训练方法"
description: "从 NanoGPT 与 NanoChat 看资源约束、可信验收，以及实验历史怎样帮助下一轮研究。"
order: 2
level: "L2 · L3"
label: "Recursive"
source: "https://recursive.com/updates/first-steps-toward-automated-ai-research"
readingTime: "5 分钟"
insight: "更好的训练方法，必须连同预算一起定义。"
metrics:
  - value: "4.06%"
    label: "NanoGPT 平均训练时间减少"
    context: "同为 Modal 8×H100；公开记录均值 80.6114 → 77.3376 秒。"
  - value: "10 / 13"
    label: "基线 / 候选运行次数"
    context: "两组平均验证 loss 分别为 3.27850 / 3.27893。"
  - value: "5 min"
    label: "NanoChat 单次训练预算"
    context: "单 B200、以 BPB 比较质量；不含发现方案的研究搜索。"
takeaways:
  - title: "预算会参与算法选择"
    text: "每步效果更强的方法可能因运行更慢而落后；固定时间、固定计算量与固定质量是不同问题。"
  - title: "环境决定研究能否反复推进"
    text: "明确指标和较快反馈，让代理能执行、比较并继续尝试；选任务应看反馈结构，而不只看学科。"
  - title: "先留条件，再沉淀规律"
    text: "具体且易变的结果适合外部记录，可迁移的可靠规律再考虑进入训练，避免反复踩同一个坑。"
---

## 成果

Eureka Machine 把反馈转成下一项研究决策。First Steps 展示了三类产物：**固定时间内训练得更好、达到质量门槛更快，以及更快的 GPU kernel。**[原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)

NanoGPT 的同硬件重复运行记录，展示了一个具体改进：

| Modal 8×H100，同硬件记录 | 原纪录方案重跑 | Recursive 候选 |
|---|---:|---:|
| 运行次数 | 10 | 13 |
| 平均训练时间 | 80.6114 秒 | 77.3376 秒 |
| 平均验证 loss | 3.27850 | 3.27893 |

两组均值相差 **3.2738 秒，时间减少约 4.06%**。这个比较使用公开重复运行记录，两组平均验证 loss 均低于 3.28。[基线记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/baseline_logs/statistics.md) · [候选记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/reproducibility_logs/statistics.md)

NanoChat 换了一个问题：在单 B200、**每次训练五分钟**的约束下，比较越低越好的 BPB。五分钟限制最终训练执行，不包括找到方案所花的搜索时间。[NanoChat 记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanochat_autoresearch/README.md)

## 机制

### 历史记录帮助选择下一次试验

系统复用历史实验上下文，并行探索研究分支，验证后合并候选。在人规定的任务、运行环境和预算内，AI 根据反馈决定下一项训练或 kernel 干预，这体现 [L2 的策略优化](/rsi-notes/levels/l2/)。[系统说明](https://recursive.com/updates/first-steps-toward-automated-ai-research)

把实验结果连同条件保留，并用于后续研究选择，则体现 [L3 的经验积累](/rsi-notes/levels/l3/)：评估执行结果，留下可复用经验，再影响下一轮试验。

[L5 的自主递归继承](/rsi-notes/levels/l5/) 还要看系统如何自主管理研究任务与改进机制，并让后继继承使用。复用实验记录，本身尚未说明改进器、验证器或后代生成程序怎样被改进。

### 验收决定哪些路径能够继续

Recursive 披露过利用缓存、持久状态或计时细节获得虚假优势的候选，评估加固也需要人工反馈。若这些候选被保留，后续预算就可能继续投入错误方向。与 [Naive 的局部／整体反例](/rsi-notes/posts/naive/) 放在一起看，验收既要排除虚假收益，也要避免因局部退化淘汰真正有效的组合。[评估与失败案例](https://recursive.com/updates/first-steps-toward-automated-ai-research)

## 理解与取舍

### 算法价值取决于什么资源最贵

NanoChat 使用便宜的哈希局部记忆。每步效果稍强却耗时更长的方法，在固定训练时间下可能反而落后；工程实现由此参与了算法选择。**固定时间、固定 FLOPs 和固定质量门槛，回答的是不同问题。**[NanoChat 案例](https://recursive.com/updates/first-steps-toward-automated-ai-research)

我会先说明硬件、时间与质量目标，再判断方案好在哪里。五分钟训练下有效的设计，不必然适合长时间训练；减少计算也可能增加存储。最终程序更便宜，与发现它的研究过程更便宜，同样需要分开看。

### 任务适不适合自动研究，要看反馈结构

Recursive 偏好指标明确、反馈较快的任务。这使代理能够反复修改、执行、观察后果，再调整方向。结合 Apex 的模拟环境，我会优先看一个任务能否形成可靠的反馈循环，而不只看它属于哪个学科。[任务选择](https://recursive.com/updates/first-steps-toward-automated-ai-research)

因此，搭建执行环境本身就是研究投入。验证很慢、代价很高或目标模糊时，模型更强也未必能快速推进；模拟器提供的反馈仍受目标完整性和模拟可信度限制。

### 经验先保留条件，再考虑沉淀成能力

“某个 kernel 在某个 shape 下失败”适合记录具体条件，方便纠正；“如何判断融合会不会增加同步开销”则更接近可迁移的决策规律。结合 [Apex 的数据回流](/rsi-notes/posts/apex/)，我倾向于让易变结果先留在外部记录中，再把经过筛选的稳定规律用于训练。

这不要求每产生一条经验就更新模型，也不要求每次都重读全部历史。我要保留的是结果、成立条件和可复用判断，避免把环境故障或偶然成功固化为能力。在决定是否采用一项改进时，还应算上失败试验、代理推理、复验和人工筛查的成本。

继续阅读：[资源约束](/rsi-notes/insights/#constraints) · [实验环境](/rsi-notes/insights/#environment) · [经验积累](/rsi-notes/insights/#memory)
