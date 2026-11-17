---
title: "参考资料"
description: "RSI 分层、研究案例，以及相关模型、代码与公开记录。"
---

<span id="survey"></span>

## 定义与分层

[The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement](https://arxiv.org/abs/2609.11873v3)，arXiv:2609.11873v3。

| 主题 | 原文位置 | 关键问题 |
|---|---|---|
| RSI 定义与闭环术语 | §2.2，pp.9–11 | 改进怎样被保留，并进入下一轮系统状态 |
| B0 / L1 | §3.1–3.2，pp.12–18 | 区分当前产物修订与可被后续继承的系统变化 |
| L2 | §3.3，pp.18–21 | 判断 AI 是否自主选择下一项改进策略 |
| L3 | §3.4，pp.22–26 | 判断学习者状态与后续经验获取是否形成反馈 |
| L4 | §3.5，pp.26–31 | 判断运行反馈是否改变后续任务使用的持久状态 |
| L5 | §3.6，pp.31–35 | 区分机制修改、后续复用，以及结构性与有效性证据 |
| 跨层比较 | §3.7，p.35 | 自主权范围与改进质量、效率分别讨论 |

## 四份核心材料

| 材料 | 重点内容 | 案例解读 |
|---|---|---|
| [NaiveAI Research](https://naive.ai/en/research/) | NaiveRT 的采纳与回滚、局部/整模反例、长轨迹 RL、AutoWM | [Naive 案例](/rsi-notes/posts/naive/) |
| [First Steps Toward Automated AI Research](https://recursive.com/updates/first-steps-toward-automated-ai-research) | Eureka 组织方式、训练方案、kernel 优化与验收 | [Recursive 案例](/rsi-notes/posts/recursive-first-steps/) |
| [Introducing Recursive Flint](https://recursive.com/updates/introducing-recursive-flint) | How we built Flint：架构、量化、精度恢复和运行程序 | [Flint 案例](/rsi-notes/posts/flint/) |
| [Apex-35B](https://www.apexin.com/apex-35b/#ai) | AI For AI 的训练交付、科研环境与定向数据回流 | [Apex 案例](/rsi-notes/posts/apex/) |

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
- [Apex-Tune 结果仓库](https://github.com/apexin-ai/Apex-Tune-results)：训练脚本和多种子结果。

[阅读六条个人判断 →](/rsi-notes/insights/) · [回到首页 →](/rsi-notes/)
