---
title: "Flint：一次优化之后，下一步改哪里"
description: "架构变稀疏，输出层变突出。沿着量化、蒸馏与 kernel 的配合，看研究优先级如何改变。"
order: 3
level: "L2"
label: "Recursive · Flint"
source: "https://recursive.com/updates/introducing-recursive-flint"
readingTime: "4 分钟"
insight: "模型变稀疏以后，最值得优化的部分，可能恰好是没有变稀疏的部分。"
metrics:
  - value: "≈40B"
    label: "总参数"
    context: "本地编码 MoE；模型卡约 39.8B"
  - value: "2.5B"
    label: "每 token 激活参数"
    context: "降低逐 token 推理的运行开销"
  - value: "256k"
    label: "配置上下文长度"
    context: "模型配置为 262,144 tokens"
takeaways:
  - title: "改进会改变研究优先级"
    text: "主干开销下降后，输出层成为更值得优化的对象。下一步方向应随系统状态重新选择。"
  - title: "组合收益需要整体判断"
    text: "架构、量化与 kernel 相互影响；我会看任务质量、时延和内存，避免简单相加局部收益。"
---

## 成果

Flint 将自动研究推进到可交付的本地编码模型：约 **40B 总参数、2.5B 激活参数**的 MoE，配套 `rec` 推理引擎。专家配置、输出层量化、蒸馏和 kernel 设计共同服务于本地能力与运行成本。[发布说明](https://recursive.com/updates/introducing-recursive-flint)

模型配置提供 **262,144 tokens** 的上下文长度。`rec` 的速度测试依赖具体硬件、量化和输入长度，排除 prefill，并有单 session 限制。这里最值得关注的成果，是模型与运行程序一起交付，而非一个脱离负载的速度数字。[模型卡](https://huggingface.co/RecursiveSI/flint) · [配置](https://huggingface.co/RecursiveSI/flint/blob/main/config.json) · [rec 引擎](https://github.com/recursive-oss/rec)

## 机制

### 架构先改变开销分布

搜索更适合本地吞吐的专家配置，减少每个 token 的激活参数。主干开销下降后，没有同比缩小的输出层 `lm_head`，在权重读取中的占比变得突出。

### 量化与蒸馏形成配合

输出层采用低比特表示，可以降低读取开销，但同时引入精度损失。蒸馏负责恢复能力，使压缩方案能够满足质量要求。量化是否值得做，取决于它与模型结构、精度恢复的共同效果。

### kernel 把选择落实到硬件

适配模型形状和硬件的 kernel，让前面的架构与数值表示选择转为实际执行收益。这条研发链说明：**模型形状改变了量化收益，量化又改变了 kernel 的实现空间。**[研发过程](https://recursive.com/updates/introducing-recursive-flint)

在既定研发任务和运行环境中，AI 根据反馈选择“下一步改哪里”，有效方案进入目标模型与引擎，对应 [L2 的优化策略](/rsi-notes/levels/l2/)。[L5 的自主递归继承](/rsi-notes/levels/l5/) 则进一步关注研究任务、改进器、验证器、搜索策略与后代生成程序的自主管理，以及机制变更如何被后继复用；交付更快的模型本身尚未建立这条链。

## 理解与取舍

**我更看重研究方向能否随系统变化。** 如果一直盯着最初的瓶颈，主干提速之后仍可能在旧方向上投入过多预算。一次优化除了直接收益，还可能使原先不划算的改动变得值得做。

**找到互相配合的组合，也有研究价值。** 固定架构后只调 kernel，或固定运行程序后只换模型，都可能错过联合调整的空间。我会允许这些部分一起变化，再按任务质量、时延和内存判断是否采用，而不只统计“发明了多少新算法”。

这种取舍需要回到实际负载。逐 token 解码、大 batch 与 prefill 的瓶颈不同；本地生成更快，也未必让包含工具调用和测试的完整编码任务等比例提速。各模块收益不能简单相加，更不能把全部加速归因于输出层量化。

[继续理解瓶颈迁移 →](/rsi-notes/insights/#bottleneck)
