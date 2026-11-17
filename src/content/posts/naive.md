---
title: "NaiveAI：推理速度怎样影响下一轮学习"
description: "从 NaiveRT 的采纳与回滚，理解局部优化、完整任务验收，以及推理速度与学习机会的联系。"
order: 1
level: "L2"
label: "NaiveAI"
source: "https://naive.ai/en/research/"
readingTime: "5 分钟"
insight: "推理速度可能影响哪些经验进入训练，但更快不必然学得更好。"
---

Naive 的材料把模型架构、推理引擎与长轨迹学习放在同一条研发链上。其中反馈驱动的研发过程体现了 [L2：改进策略自主权](/rsi-notes/levels/l2/)：选择干预、验收结果，再保留有效方案。

## 成果

Naive-N0.5-Flash 是基于 MiMo-V2.5 的 309B MoE，单 token 激活约 15.5B 参数，采用滑动窗口与稀疏注意力。NaiveRT 的公开记录披露了 **151 次试验：63 次采纳、71 次失败或回滚、17 次探索其他分支**。[模型卡](https://huggingface.co/NaiveAI/Naive-N0.5-Flash)、[研究页](https://naive.ai/en/research/)

速度需要连同口径理解。关闭 thinking 时，公开记录的跨请求生成速率为 **1,719 tokens/s**，最佳一秒峰值为 **2,122 tokens/s**。条件是八张 Blackwell、单活跃序列、HTML/SVG 生成任务；排除 prefill 和 finalization，并剔除重复循环请求。这不能直接换算成多用户吞吐或完整研究任务的加速。[NaiveRT Performance](https://github.com/NaiveAI-Labs/NaiveRT)

## 机制

这里考察的是参与模型与运行系统研发的流程：AI 根据反馈选择下一项架构或 kernel 干预，有效修订进入后续版本。选择“接下来怎么改”对应 L2。人类仍负责方向、标准和关键选择；MoE 融合连续七轮数值正确却使整模变慢，最终由研究者停止。[Naive 研究页](https://naive.ai/en/research/)

一个更有解释力的对照是：**TMA 预取在微基准里略慢，却缩短了完整模型每步耗时；MoE 融合数值正确，却使完整模型更慢。** 同步、数据搬运与既有重叠机制，会让局部观察和整体收益不一致。因此，验收既要拒绝假改进，也要避免淘汰真改进。

Naive 对长轨迹 RL 还给出了一条具体联系：同步训练要等待慢轨迹；异步训练中，轨迹若跨越过多策略版本，可能因过时而被整条丢弃。单条生成速度由此可能影响经验能否进入训练。[Why single-stream speed matters for RL](https://naive.ai/en/research/)

AutoWM 中的数据重做、筛选与后处理同样可以体现 L2 策略选择。但“操作了数据”不足以证明 [L3](/rsi-notes/levels/l3/)：还需要变化中的 learner 状态持续影响后续经验获取，并在学习后再次反馈。

## 理解与取舍

我关心推理提速作用于哪一段学习过程。如果有价值的困难轨迹更容易超时，提高单条速度可能减少这部分经验的损失。推理引擎的价值便可能超出节约时间，进一步影响训练数据的组成。

**这仍是有条件的推导。** 长轨迹可能包含无效绕路，长度不等于学习价值；原文说明了丢弃机制，没有直接证明提速提高了困难任务能力。对于训练、排队或工具执行占主要时间的任务，tokens/s 的改善也可能只有有限影响。

我的取舍是把速度放回学习流程，把局部优化放回完整任务。评价自动研究时，除了看产生了多少候选，还应看它能否辨认局部与整体的差别，并知道何时停止无效方向。

继续阅读：[速度与学习机会](/rsi-notes/insights/#experience-speed) · [验收如何影响研究方向](/rsi-notes/insights/#verification)
