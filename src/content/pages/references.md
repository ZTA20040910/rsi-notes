---
title: "来源与证据边界"
description: "四份核心材料、survey 定义、公开代码与日志，以及本站如何区分作者报告、复核和个人判断。"
---

本站整理的是对公开材料的理解。**资料核验截至 2026 年 11 月 17 日**；survey 的定义固定使用下述 v3 版本。正文就近链接支持相应判断的来源，这一页提供统一回读入口。

<span id="survey"></span>

## 定义与分层

[The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement](https://arxiv.org/abs/2609.11873v3)，**arXiv:2609.11873v3，2026-09-22**。

| 使用位置 | 原文位置 | 本站如何使用 |
|---|---|---|
| RSI 定义与闭环术语 | §2.2，pp.9–11 | 首页公式是依据文字定义制作的符号化摘要，不是论文原式 |
| B0 / L1 | §3.1–3.2，pp.12–18 | 区分当前产物修订与可被后续继承的系统变化 |
| L2 | §3.3，pp.18–21 | 判断 AI 是否自主选择下一项改进策略 |
| L3 | §3.4，pp.22–26 | 判断学习者状态与后续经验获取是否形成反馈 |
| L4 | §3.5，pp.26–31 | 判断运行反馈是否改变后续任务使用的持久状态 |
| L5 | §3.6，pp.31–35 | 区分机制修改、后续复用，以及结构性与有效性证据 |
| 跨层比较 | §3.7，p.35 | 自主权范围与改进质量、效率分别讨论 |
| 行业映射 | Appendix B，pp.66–71 | 保留 survey 原有映射与本站分析的区别 |

页码对应所读 PDF 的页脚。Appendix B 是 **2026 年 9 月的公开来源快照**：p.68 将 Recursive Automated AI Research 映射为 L2；p.70 的 Naive.ai 条目仅为未核验的 RSI 声称。Flint、Apexin / Apex-35B 没有对应条目；p.28 的 APEX 是另一篇学术工作，不能当作 Apexin 的分层依据。

因此，除注明 survey 原有判断的条目外，本站案例标签均是依据定义和指定材料作出的**本文映射**，不是公司等级认证。[回到六层入口](/rsi-notes/#levels)

## 四份核心材料

| 材料 | 推荐回读内容 | 本站解读 |
|---|---|---|
| [NaiveAI Research](https://naive.ai/en/research/) | NaiveRT 的采纳与回滚、局部/整模反例、长轨迹 RL、AutoWM | [Naive 案例](/rsi-notes/posts/naive/) |
| [First Steps Toward Automated AI Research](https://recursive.com/updates/first-steps-toward-automated-ai-research) | Eureka 组织方式、三个优化任务、评估漏洞与脚注 | [Recursive 案例](/rsi-notes/posts/recursive-first-steps/) |
| [Introducing Recursive Flint](https://recursive.com/updates/introducing-recursive-flint) | How we built Flint：架构、量化、精度恢复和运行程序 | [Flint 案例](/rsi-notes/posts/flint/) |
| [Apex-35B](https://www.apexin.com/apex-35b/#ai) | AI For AI、Action Records、Building Through RSI、评测脚注 | [Apex 案例](/rsi-notes/posts/apex/) |

## 模型、代码与公开记录

### Naive

- [Naive-N0.5-Flash 模型卡](https://huggingface.co/NaiveAI/Naive-N0.5-Flash)：架构和训练说明。
- [NaiveRT 仓库](https://github.com/NaiveAI-Labs/NaiveRT)：速度统计、硬件与请求条件。最佳一秒峰值不等于跨请求生成速率，两者都不能直接换算成完整研究任务加速。

### Recursive 与 Flint

- [First Steps 产物仓库](https://github.com/recursive-org/first-steps-toward-automated-ai-research)：最终训练程序、kernel 示例与运行说明。
- [NanoGPT 基线重复运行记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/baseline_logs/statistics.md)、[候选重复运行记录](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanoGPT_speedrun/from_best/reproducibility_logs/statistics.md)：本站约 **4.06%** 的时间减少来自这两组公开数据的统计复核，并非重新训练。博客中的概括数字采用另一呈现口径，未混用。
- [NanoChat 说明](https://github.com/recursive-org/first-steps-toward-automated-ai-research/blob/main/nanochat_autoresearch/README.md)：五分钟约束最终训练执行，不代表整个研究搜索只花五分钟。
- [Flint 模型卡](https://huggingface.co/RecursiveSI/flint)、[模型配置](https://huggingface.co/RecursiveSI/flint/blob/main/config.json)、[rec 引擎](https://github.com/recursive-oss/rec)：上下文、量化、硬件和使用限制需结合具体版本理解。

### Apex

- [Apex-35B 模型卡](https://huggingface.co/Apexintelligence-AI/Apex-35B-V1.0)：基础模型、研究轨迹与训练说明。
- [Apex-Tune 结果仓库](https://github.com/apexin-ai/Apex-Tune-results)：训练脚本和多种子结果。
- Sokoban 对照解释来自核心原文的 Action Records：Base 研究代理未完成有效训练或提交，11.7% 是未训练目标模型结果。不能把与 24.4% 的差距直接分解为训练算法质量差异。

## 怎么读本站的结论

| 表述类型 | 含义 | 不代表什么 |
|---|---|---|
| 作者报告 | 公司或论文公开描述的过程与结果 | 本站独立复现或审计了全部过程 |
| 公开数字复核 | 基于公开日志检查统计和百分比 | 重新运行实验，或证明日志本身真实 |
| 我的理解 / 本文映射 | 依据材料作出的机制解释、分层和取舍 | 来源作者采用了同样的判断 |
| 条件推测 / 机制示意 | 解释一条可能的因果路径 | 已测量的能力提升或实际实验曲线 |

本次没有执行模型训练、推理性能复测或数据泄漏审计，也未获得内部研究系统、全量研究轨迹与总成本。模型权重开放、最终产物开放和完整研究系统开放是不同层次。

GitHub 默认分支、模型卡和公司网页会更新。Naive 页面日期与后续内容存在更新关系，Recursive 页面不同位置的日期也不完全一致，因此本站不依靠这些日期推断严格首发顺序。分层讨论固定参考 survey v3，案例分析则以本次核验所见材料为准。

[阅读六条个人判断 →](/rsi-notes/insights/) · [回到首页 →](/rsi-notes/)
