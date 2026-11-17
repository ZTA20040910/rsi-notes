---
title: "一次研究，怎样成为下一轮的优势？"
description: "沿着效率、数据、验收与积累，追问一轮研究怎样改变下一轮的起点。"
chapters:
  - id: "efficiency"
    number: "01"
    label: "效率"
    title: "把预算用在值得继续的方向"
    intro: "同样的预算，可以多试几次，也可以用于复验和交付。Flint 让我看到瓶颈会随系统改变；Naive 与 Apex 又让我追问，哪些方向该停，哪些任务还应继续。"
    insightIds: ["bottleneck", "constraints"]
  - id: "data"
    number: "02"
    label: "数据"
    title: "让选中的经验真正成为学习机会"
    intro: "省下时间以后，我会追踪它有没有变成学习机会。选中的任务还要经过执行、返回、验证和筛选，才可能进入训练；运行条件也会影响模型实际用上哪些经验。"
    insightIds: ["experience-speed", "environment"]
  - id: "evaluation"
    number: "03"
    label: "验收"
    title: "先明确允许改变什么，再判断进步"
    intro: "经验留下来了，还要判断它支持什么结论。加速程序、近似计算和压缩模型，允许的变化不同；负责评分与检查的评估器更新后，旧分数也未必能直接比较。"
    insightIds: ["verification"]
  - id: "inheritance"
    number: "04"
    label: "积累"
    title: "把结论连同条件交给下一轮"
    intro: "可信结果进入记忆，也不能变成永久结论。精度、硬件或执行方式改变后，过去失败的方案可能重新值得尝试。经验的适用条件，又把问题带回下一步该改哪里。"
    insightIds: ["memory"]
insights:
  - id: "bottleneck"
    number: "01"
    label: "瓶颈迁移"
    title: "一次优化，会改变下一步值得研究什么"
    thesis: "改进的价值还在于，它可能让原先不划算的方向变得值得尝试。"
    evidence: "Flint 降低每个 token 的激活参数后，读取输出层 lm_head 权重的开销占比变得突出。输出层量化、离线蒸馏与适配模型的 GPU 计算程序（kernel），随后共同改善了运行表现。"
    sources:
      - label: "Flint · 研发过程"
        url: "https://recursive.com/updates/introducing-recursive-flint"
    reasoning:
      - "主干开销下降后，各部分的相对成本变化，最初的瓶颈未必还是下一步的重点。"
      - "架构会改变量化是否划算，量化又影响 kernel 怎样实现；只调其中一环，可能漏掉组合起来才有的收益。"
      - "研究方向应随着系统状态重新选择；一次失败的价值，也要放回当时的条件判断。"
    choice: "我更关注优化后重新暴露了什么问题。架构、参数的表示方式和运行程序可以共同调整，再按完整任务的质量、时延与内存判断是否采用，不能把局部收益简单相加。"
    connections:
      - id: "constraints"
        text: "方向变了，也要重新分配预算，决定继续、转向还是交付。"
      - id: "memory"
        text: "新瓶颈可能让旧失败值得重试，记忆需要保留成立条件。"
    cases:
      - label: "Flint"
        id: "flint"
    elaboration:
      title: "当前最高分的版本，是否也最适合继续改进？"
      paragraphs:
        - "Recursive 的并行探索让我多想一步：当前质量接近的两个版本，后续可改进空间未必相同。一个暂时落后的分支，可能保留了更容易组合新方法的结构。仅凭当前分数，还无法判断这种潜力。"
        - "在预算允许时，我倾向于保留少量有明确差异的分支，而不是每轮只留下一个版本。保留它们也会消耗研究和复验资源；需要说清各自值得继续的理由，最终交付仍回到同一验收标准。"
      sources:
        - label: "Recursive · 并行研究与方案组合"
          url: "https://recursive.com/updates/first-steps-toward-automated-ai-research"
  - id: "constraints"
    number: "02"
    label: "预算与停止"
    title: "下一次尝试，也要给复验和交付留下预算"
    thesis: "研究能力包括决定何时继续、转向和停止；实验次数本身说明不了这些选择是否合理。"
    evidence: "Naive 的 MoE 融合多轮数值正确却拖慢完整模型，最后由研究者叫停；Apex 的 Base 对照代理则在 Sokoban 完成训练并提交结果前退出。"
    sources:
      - label: "Naive · MoE 融合"
        url: "https://naive.ai/en/research/"
      - label: "Apex · 训练交付记录"
        url: "https://www.apexin.com/apex-35b/#ai"
    reasoning:
      - "继续一次尝试，会占用探索其他方向、复验和完成交付的机会。"
      - "失败若排除了重要假设仍有价值；围绕同一个错误解释反复重试，则未必值得继续。"
      - "停止过晚浪费预算，停止过早又可能失去可交付结果，二者需要一起判断。"
    choice: "我会看下一次尝试预计还能解决什么疑问，并提前留出复验和交付预算。比较策略时也要计入失败任务，以及退回原方案后的表现，避免只看成功交付的那部分。"
    connections:
      - id: "bottleneck"
        text: "继续旧方向之前，要确认瓶颈是否已经转移。"
      - id: "experience-speed"
        text: "省下的执行时间，只有转成有用经验才可能帮助学习。"
    cases:
      - label: "Naive"
        id: "naive"
      - label: "Apex"
        id: "apex"
    elaboration:
      title: "预算为什么会改变算法的优劣？"
      paragraphs:
        - "Recursive 的 NanoChat 在五分钟训练预算下，采用低开销的哈希 n-gram 嵌入；Apex 的 DDPO 则减少去噪开销、调整停止方式，让可用时间更多地进入训练。执行成本由此参与了算法选择。"
        - "固定时间、固定计算量（FLOPs）与固定质量门槛是不同问题。每步效果较好却更慢的方法，可能在固定时间下落后；五分钟训练中有效的选择，也不必然适合长时间训练。"
        - "最终程序运行成本更低，不代表找到它的研究过程也更便宜。失败试验、代理推理和人工筛查都占成本；比较训练方法时，应把执行是否可靠与方法本身的效果分开。"
      sources:
        - label: "Recursive · NanoChat"
          url: "https://recursive.com/updates/first-steps-toward-automated-ai-research"
        - label: "Apex · DDPO"
          url: "https://www.apexin.com/apex-35b/#ai"
  - id: "experience-speed"
    number: "03"
    label: "实际入训经验"
    title: "选中的任务，最后真的学到了吗？"
    thesis: "系统原本想学什么，与最后能用上什么经验，可能并不一致；我想知道差距出在哪里。"
    evidence: "Naive 讨论了长轨迹生成期间策略已更新多轮、轨迹因过时被丢弃的问题；Apex Research 则调整长度分布、长短数据比例，并按 token 数组织训练批次，处理数据组成带来的影响。"
    sources:
      - label: "Naive · 长轨迹 RL"
        url: "https://naive.ai/en/research/"
      - label: "Apex · Automated Experimentation"
        url: "https://www.apexin.com/apex-35b/#ai"
    reasoning:
      - "系统选中了薄弱任务，还不代表执行能及时返回，并留下可用的轨迹与反馈。"
      - "如果薄弱任务在训练前大量丢失，训练中各类任务的占比就可能偏离原本的采样计划。"
      - "提速可能让更多轨迹及时返回，筛选决定留下什么；二者可能互补，但更多长轨迹不保证学得更好。"
    choice: "我会按任务类型和预先估计的难度追踪每一步留下了多少，把失败任务也算进最初的总数。轨迹长不一定代表任务难；未完成任务的完整长度应记为未知。先找经验在哪一步丢失，再判断该提速还是调整筛选。"
    connections:
      - id: "environment"
        text: "经验缺失可能出在工具或环境，未必都是模型的能力缺口。"
      - id: "verification"
        text: "验证与筛选影响哪些经验有机会入训，标准应对应学习目标。"
    cases:
      - label: "Naive"
        id: "naive"
      - label: "Apex"
        id: "apex"
    elaboration:
      title: "留下更多经验之后，还要判断什么？"
      paragraphs:
        - "Naive 的过时问题与 Apex 的数据配比问题，发生在经验进入学习的不同环节。把两者放在一起，是为了追踪实际入训分布；不能因此说 Apex 已经解决了 Naive 的轨迹丢弃问题。"
        - "各阶段并不独立：困难任务可能同时生成慢、验证失败多。完成率应按同一批计划任务逐步统计，不能把来自不同批次的比例相乘，也不能只统计成功完成的样本。"
        - "及时进入训练仍只是学习机会。长轨迹可能是无效绕路，筛选也可能丢掉有用的失败经验；最终需要看保留内容是否改善新任务上的能力，而不是只看入训数量。"
      sources:
        - label: "Naive · 单流速度与学习"
          url: "https://naive.ai/en/research/"
        - label: "Apex · 数据与训练配方"
          url: "https://www.apexin.com/apex-35b/#ai"
  - id: "environment"
    number: "04"
    label: "经验从哪里来"
    title: "补数据之前，先确认失败发生在哪里"
    thesis: "模型、上下文、工具和评估器都可能造成失败；找准原因，才能决定下一轮需要什么经验。"
    evidence: "Apex Research 针对弱项生成并验证数据；Apex 的 Real2Sim 与 Naive 的 AutoWM 又展示了构建模拟环境和世界模型的成果。除了学什么，经验从哪里来也值得研究。"
    sources:
      - label: "Apex · Self-Evolving Data / Real2Sim"
        url: "https://www.apexin.com/apex-35b/#ai"
      - label: "Naive · AutoWM"
        url: "https://naive.ai/en/research/"
    reasoning:
      - "失败信号可能来自能力不足，也可能来自缺失上下文、工具输出错误或评分偏差。"
      - "若原因在工具或环境，持续补训练数据可能增加成本，却没有修复真正的问题。"
      - "确认能力缺口以后，定向数据与针对弱项的场景才有明确用途；新场景本身也需要检验。"
    choice: "我更愿意先检查工具输出、可用信息和评分依据，再决定补数据还是修改运行条件。训练模型识别和恢复工具故障也有价值，但应说清它解决的问题；一次成绩提高，还不能说明已经找准失败原因。"
    connections:
      - id: "experience-speed"
        text: "先判断经验为什么缺失，再决定是否增加生成量。"
      - id: "verification"
        text: "环境提供的反馈，也要检查是否衡量了真正关心的目标。"
    cases:
      - label: "Apex"
        id: "apex"
      - label: "Naive"
        id: "naive"
    elaboration:
      title: "确认弱项以后，能否为它生成学习环境？"
      paragraphs:
        - "Survey 中 Humanlaya 的例子提醒我，解析失败可能被内容检查程序误判为内容质量差。保持任务与模型不变，检查工具输出和评分规则，能帮助区分模型能力不足与环境故障；有些失败也来自组件之间的配合问题。"
        - "从 AutoWM 与 Real2Sim 往前想一步，我希望系统能围绕已确认的弱项构建场景，并把执行后的经验用于后续任务。这是我想继续探索的方向，现有成果还不足以证明这个循环已经实现。"
        - "生成环境若偏向模型熟悉的策略，或者与模型共享错误假设，内部成绩可能越来越好却难以迁移。因此还应看独立任务、不同动力学条件下的表现，并计入环境构建与采样成本。"
        - "评估经验、积累经验并用于下一轮，涉及这里的 L3；若 AI 进一步在规定的权限与规则内，自主修改运行环境和系统状态，则涉及 L4。仅仅生成一个场景，还要继续看它怎样被使用。"
      sources:
        - label: "Survey · Humanlaya 与经验反馈"
          url: "https://arxiv.org/abs/2609.11873v3"
        - label: "Apex · Real2Sim"
          url: "https://www.apexin.com/apex-35b/#ai"
        - label: "Naive · AutoWM"
          url: "https://naive.ai/en/research/"
  - id: "verification"
    number: "05"
    label: "验收标准与版本"
    title: "先说清承诺保持什么，再判断改得好不好"
    thesis: "验收标准要跟着改动对象走；换了评估器，还要重新确认新旧分数能否比较。"
    evidence: "NaiveRT 逐位比较模型输出 logits 与 KV 缓存，检查运行结果是否保持一致；Flint 的模型量化允许一定的质量变化，再通过蒸馏恢复能力。相同的逐位一致标准，不能直接用于两类改动。"
    sources:
      - label: "Naive · Correctness gated everything"
        url: "https://naive.ai/en/research/"
      - label: "Flint · Quantization"
        url: "https://recursive.com/updates/introducing-recursive-flint"
    reasoning:
      - "加速程序时要维持原有行为，压缩模型时则可能允许质量变化，两者要检查的承诺不同。"
      - "局部数值、模块速度和任务质量各有作用；只看平均分，可能漏掉程序错误或个别任务的退步。"
      - "评估器也会影响哪些方向被保留。换版本后直接把分数连成一条曲线，容易把评分变化误当成系统进步。"
    choice: "验收前先约定哪些必须保持、哪些允许变化，再按完整任务作取舍。方案与评估器都记录版本；换版本时，用新旧规则评价同一批方案，并用另一套独立维护的评价检验结果。反复用于开发的小测试集，不能直接当成最终答案。"
    connections:
      - id: "constraints"
        text: "严格检查和跨版本复验都有成本，需要提前留出预算。"
      - id: "memory"
        text: "保存结果时，也要记下测试条件和评分规则。"
    cases:
      - label: "Naive"
        id: "naive"
      - label: "Flint"
        id: "flint"
    elaboration:
      title: "没有作弊以后，分数是否就足够说明进步？"
      paragraphs:
        - "Recursive 处理缓存、持久状态和计时漏洞，是在检查实现是否真正完成任务。重复运行还要检查结果是否稳定；AutoWM 的视觉指标与 Apex DDPO 的审美奖励，则进一步引出指标是否覆盖实际用途的问题。"
        - "遵守评测规则、重跑结果稳定、对实际用途有帮助，需要不同证据。视觉分数不能自动代表控制效果，符合固定审美奖励也未必覆盖人的全部要求；合法地优化指标或在推理时筛选结果，本身并不是作弊。"
        - "比较模型前，要确认任务、工具、预算与计分规则是否一致。Flint 报告的多次尝试平均 pass@1 仍在估计单次成功率，不是 pass@5；运行次数会影响估计有多可靠，不能仅据此宣布结果无效。"
      sources:
        - label: "Recursive · 评估漏洞"
          url: "https://recursive.com/updates/first-steps-toward-automated-ai-research"
        - label: "Naive · AutoWM"
          url: "https://naive.ai/en/research/"
        - label: "Apex · DDPO 审美奖励"
          url: "https://www.apexin.com/apex-35b/#ai"
  - id: "memory"
    number: "06"
    label: "带条件的经验"
    title: "旧结论值得留下，也要知道何时重新判断"
    thesis: "经验要同时记下结果、适用条件，以及哪些变化会让结论失效，下一轮才知道何时能用、何时该重新验证。"
    evidence: "Recursive 在相关 kernel 任务之间复用发现，Flint 则联合调整架构、量化和 kernel。把历史复用与系统变化放在一起看，我会继续追问旧结论在什么条件下仍然成立。"
    sources:
      - label: "Recursive · 历史与跨任务复用"
        url: "https://recursive.com/updates/first-steps-toward-automated-ai-research"
      - label: "Flint · 联合优化"
        url: "https://recursive.com/updates/introducing-recursive-flint"
    reasoning:
      - "只记住‘融合更慢’，会丢失当时的模型、精度、张量形状、硬件与并行方式。"
      - "相关条件改变以后，旧失败可能重新值得尝试；没有改变时，则可避免重复投入。"
      - "重新验证也有成本，应先查哪些结论依赖这次被修改的条件，而不必重跑全部历史。"
    choice: "具体且易变的结果适合先记在日志或笔记里，可靠、能用于其他任务的判断再考虑通过训练学进模型。我还会记下哪些变化需要触发重新检查；记忆既应减少重复失误，也要能在系统变化时及时修正。"
    connections:
      - id: "bottleneck"
        text: "条件变了，最值得研究的方向也可能改变；旧经验由此帮助选择下一步。"
      - id: "verification"
        text: "评估器或测试规则换版本，也要重新检查受影响的旧结论。"
    cases:
      - label: "Recursive"
        id: "recursive-first-steps"
      - label: "Flint"
        id: "flint"
    elaboration:
      title: "一条失败记录，怎样帮助下一次决策？"
      paragraphs:
        - "‘某融合让整模更慢’只描述结果；‘在某种精度与并行方式下，新增同步可能抵消了收益’则保留了条件与待验证解释。后者让下一轮知道，应该先检查原同步成本是否仍然存在。"
        - "模型精度、内存布局或并行策略发生相关变化时，可以重新检查受影响的记录。若变化与失败原因无关，原结论仍可继续参考；还要防止把环境故障、噪声或偶然成功误记成通用规律。"
        - "L3 的积累价值，在于经验参与下一轮判断。层级更高并不自动意味着更有效或更原创；我还会追踪获得可靠收益所花的总资源，以及收益来自适配、组合还是新的方法。"
      sources:
        - label: "Naive · 整模结果与回滚"
          url: "https://naive.ai/en/research/"
        - label: "Survey · 经验的条件与持续验证"
          url: "https://arxiv.org/abs/2609.11873v3"
---

这些问题里，我最想先追踪**计划选中的经验，最后有多少真正进入训练**。若薄弱任务在训练前大量丢失，继续改进任务生成也未必有用；先查清丢失在哪一步，才能判断提速、改筛选或修环境哪个更值得做。

经验留下以后，再判断验收是否可靠、旧结论是否仍适用。效率改变可做的研究，数据影响实际学到的内容，验收选择值得保留的变化；带着条件的积累，才可能让下一轮从更好的起点继续。
