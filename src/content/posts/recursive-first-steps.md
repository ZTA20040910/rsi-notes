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
  - title: "先记清条件，再学习规律"
    text: "具体且易变的结果适合单独记录，能用于其他任务的可靠规律再考虑拿来训练，避免反复踩同一个坑。"
---

## 成果

Eureka Machine 根据实验反馈决定下一步研究什么。First Steps 展示了三类成果：**固定时间内训练得更好、达到质量门槛更快，以及运行更快的 GPU 计算程序（kernel）。**[原文](https://recursive.com/updates/first-steps-toward-automated-ai-research)

NanoGPT 发布稿报告 **79.7 → 77.5 秒**；下面采用官方仓库中两组方案在同一硬件上的重复运行记录，比较其均值：

| Modal 8×H100，同硬件记录 | 原纪录方案重跑 | Recursive 候选 |
|---|---:|---:|
| 运行次数 | 10 | 13 |
| 平均训练时间 | 80.6114 秒 | 77.3376 秒 |
| 平均验证 loss | 3.27850 | 3.27893 |

两组均值相差 **3.2738 秒，时间减少约 4.06%**。这个比较使用公开重复运行记录，两组平均验证 loss 均低于 3.28。[基线记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/baseline_logs/statistics.md) · [候选记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/reproducibility_logs/statistics.md)

NanoChat 换了一个问题：在单 B200、**每次训练五分钟**的约束下，用每字节比特数（BPB，越低越好）比较模型质量。五分钟限制的是最终方案的训练时间，不包括寻找方案所花的时间。[NanoChat 记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanochat_autoresearch/README.md)

## 机制

### 历史记录帮助选择下一次试验

系统参考已有实验记录，同时探索多个方向，组合有前景的方案并验证结果。在人规定的任务、运行环境和预算内，AI 根据反馈决定下一步怎样调整训练方法或 kernel，这体现 [L2 的策略优化](/rsi-notes/levels/l2/)。[系统说明](https://recursive.com/updates/first-steps-toward-automated-ai-research)

在 SOL-ExecBench 中，系统还联合搜索 **235 个 kernel**，在相关任务之间复用发现。保留先前经验并用于后续研究选择，体现 [L3 的经验积累](/rsi-notes/levels/l3/)；我会进一步关注这些记录是否保留了结果成立的条件。[跨任务复用](https://recursive.com/updates/first-steps-toward-automated-ai-research)

[L5 的自主递归继承](/rsi-notes/levels/l5/) 还要看系统能否自主安排研究任务、改进研究方法，并让下一版系统继续使用。复用实验记录，还没有说明提出方案、验证效果或生成下一版系统的方法怎样被改进。

### 验收决定哪些路径能够继续

Recursive 披露过利用缓存、持久状态或计时细节获得虚假优势的候选；团队结合 AI 辅助与人工反馈，持续改进检测器。若这些候选被保留，后续预算就可能继续投入错误方向。与 [Naive 的局部／整体反例](/rsi-notes/posts/naive/) 放在一起看，验收既要排除虚假收益，也要避免因局部退化淘汰真正有效的组合。[评估与失败案例](https://recursive.com/updates/first-steps-toward-automated-ai-research)

## 理解与取舍

### 算法价值取决于什么资源最贵

NanoChat 在目标模型中使用低开销的哈希 n-gram 嵌入，利用局部上下文。每步效果稍强却耗时更长的方法，在固定训练时间下可能反而落后；工程实现由此参与了算法选择。**固定时间、固定 FLOPs 和固定质量门槛，回答的是不同问题。**[NanoChat 案例](https://recursive.com/updates/first-steps-toward-automated-ai-research)

我会先说明硬件、时间与质量目标，再判断方案好在哪里。五分钟训练下有效的设计，不必然适合长时间训练；最终程序更便宜，也不代表发现它更便宜。有限预算还要留给复验和交付：如果继续试验只是重复排除过的假设，就应停止或转向。我会保留少量有不同改进空间的分支，同时限制它们占用的预算。[继续、转向与交付](/rsi-notes/insights/#constraints)

### 任务适不适合自动研究，要看反馈结构

Recursive 偏好指标明确、反馈较快的任务。这使代理能够反复修改、执行、观察后果，再调整方向。结合 Apex 的模拟环境，我会优先看一个任务能否形成可靠的反馈循环，而不只看它属于哪个学科。[任务选择](https://recursive.com/updates/first-steps-toward-automated-ai-research)

因此，搭建执行环境本身就是研究投入。验证很慢、代价很高或目标模糊时，模型更强也未必能快速推进；还要检查模拟器的评分是否覆盖实际目标、模拟过程是否可信。

反馈规则还会更新，因此我会记录评估器的版本。换了判断标准，旧分数就未必能直接比较；我会让同一批方案接受新旧两套评估，再用独立评价检查谁判断得更准。[评估器更新后怎样比较](/rsi-notes/insights/#evaluator-versions)

### 先记清经验的条件，再考虑训练进模型

“某个 kernel 在某种张量形状（shape）下失败”适合记录具体条件，方便以后重新检查；“如何判断融合会不会增加同步开销”则可能帮助判断其他任务。结合 [Apex 的经验用于训练](/rsi-notes/posts/apex/)，我倾向于先单独记录容易随条件变化的结果，再把经过筛选的稳定规律用于训练。

这不要求每产生一条经验就更新模型，也不要求每次都重读全部历史。我要记清结果、成立条件和哪些判断可以再用，避免把环境故障或偶然成功当成规律。在决定是否采用一项改进时，还应算上失败试验、代理推理、重复验证和人工筛查的成本。

继续阅读：[预算与停止](/rsi-notes/insights/#constraints) · [失败归因与学习环境](/rsi-notes/insights/#environment) · [带条件的经验](/rsi-notes/insights/#memory)
