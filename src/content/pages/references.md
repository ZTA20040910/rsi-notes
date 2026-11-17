---
title: "参考资料"
description: "RSI 分层、研究案例，以及相关模型、代码与公开记录。"
---

## 自主权分层

这套阅读框架围绕“人规定什么，AI 自主决定什么”展开。

| 层级 | 核心定义 |
|---|---|
| B0 · 任务内改进 | 反馈只改进当前产物，作为非 RSI 参照 |
| L1 · 自主执行 | 人指定任务、运行环境与优化策略，AI 自主执行 |
| L2 · 优化策略 | 人指定任务与运行环境，AI 发现问题并自主优化策略 |
| L3 · 获取并积累经验 | 系统评估执行行为、积累经验，用于优化下一轮任务 |
| L4 · 优化运行环境 | 人设基础规则与环境边界，AI 自主修改运行环境和系统状态 |
| L5 · 自主递归继承 | 系统自主管理任务、改进器、验证器、研究策略与后代生成程序，让有效机制变化被后继复用 |

<span id="survey"></span>

## RSI 与递归继承

[The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement](https://arxiv.org/abs/2609.11873v3) 提供了理解持久改进、自主权范围与机制继承的基础。

| 主题 | 延伸阅读 | 关键问题 |
|---|---|---|
| 持久改进与系统状态 | §2.2，pp.9–11 | 改进怎样被保留，并进入下一轮 |
| 自主权与改进对象 | §3，pp.12–35 | AI 能决定哪些变化，人还控制什么 |
| 机制的递归继承 | §3.6，pp.31–35 | 后继是否实际复用修改后的改进机制 |
| 结构与效果 | §3.6–3.7，pp.31–35 | 形成递归结构，是否也带来了改进收益 |

## 四份核心材料

| 材料 | 重点内容 | 案例解读 |
|---|---|---|
| [NaiveAI Research](https://naive.ai/en/research/) | NaiveRT 的采纳与回滚、局部/整模反例、长轨迹 RL、AutoWM | [Naive 案例](/rsi-notes/posts/naive/) |
| [First Steps Toward Automated AI Research](https://recursive.com/updates/first-steps-toward-automated-ai-research) | Eureka 组织方式、训练方案、kernel 优化与验收 | [Recursive 案例](/rsi-notes/posts/recursive-first-steps/) |
| [Introducing Recursive Flint](https://recursive.com/updates/introducing-recursive-flint) | How we built Flint：架构、量化、精度恢复和运行程序 | [Flint 案例](/rsi-notes/posts/flint/) |
| [Apex-35B](https://www.apexin.com/apex-35b/#ai) | AI For AI 的训练交付、科研环境与定向数据回流 | [Apex 案例](/rsi-notes/posts/apex/) |

## 补充案例：Hermes

Hermes 将任务中的有效流程与纠错经验整理为技能和持久记忆，在后续任务中复用、修订，对应 [L3 的经验积累](/rsi-notes/levels/l3/)。机制说明见 [Skills](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills) 与 [Memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)。

## 模型、代码与公开记录

### Naive

- [Naive-N0.5-Flash 模型卡](https://huggingface.co/NaiveAI/Naive-N0.5-Flash)：架构和训练说明。
- [NaiveRT 仓库](https://github.com/NaiveAI-Labs/NaiveRT)：生成速率、硬件与请求条件。

### Recursive 与 Flint

- [First Steps 产物仓库](https://github.com/recursive-org/first-steps-toward-automated-ai-research)：最终训练程序、kernel 示例与运行说明。
- [NanoGPT 基线重复运行记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/baseline_logs/statistics.md)、[候选重复运行记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/reproducibility_logs/statistics.md)：两组平均时间为 80.6114 秒与 77.3376 秒，减少约 **4.06%**。
- [NanoChat 说明](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanochat_autoresearch/README.md)：五分钟训练预算下的方案与多种子结果。
- [Flint 模型卡](https://huggingface.co/RecursiveSI/flint)、[模型配置](https://huggingface.co/RecursiveSI/flint/blob/main/config.json)、[rec 引擎](https://github.com/recursive-oss/rec)：模型结构、上下文配置与推理实现。

### Apex

- [Apex-35B 模型卡](https://huggingface.co/Apexintelligence-AI/Apex-35B-V1.0)：基础模型、研究轨迹与训练说明。
- [Apex-Tune 结果仓库](https://github.com/apexin-ai/Apex-Tune-results)：NanoChat、fused attention、SimpleTES 与 TriMul 的脚本和结果。

[阅读六条个人判断 →](/rsi-notes/insights/) · [回到首页 →](/rsi-notes/)
