import type { ArchitectureConfig } from "@/components/shared/interactive-architecture";

const nodes = [
  { id: "engine", type: "engine" as const, position: { x: 250, y: 0 }, data: { label: "LiveStrategyEngine", tags: ["BullMQ", "Node.js"] } },
  { id: "queue", type: "queue" as const, position: { x: 250, y: 100 }, data: { label: "BullMQ Strategy Queue", tags: ["BullMQ", "Redis"] } },
  { id: "worker", type: "worker" as const, position: { x: 250, y: 200 }, data: { label: "BullMQ Worker", tags: ["BullMQ", "Redis", "Node.js"] } },
  { id: "paper", type: "runner" as const, position: { x: 20, y: 320 }, data: { label: "PaperStrategyRunner", mode: "paper", tags: ["Node.js", "MetaAPI"] } },
  { id: "live", type: "runner" as const, position: { x: 480, y: 320 }, data: { label: "LiveStrategyRunner", mode: "live", tags: ["Node.js", "MetaAPI", "MongoDB"] } },
  { id: "risk", type: "service" as const, position: { x: 480, y: 440 }, data: { label: "RiskManager", service: "risk", subtitle: "Trade Validation", tags: ["Node.js"] } },
  { id: "executor", type: "service" as const, position: { x: 480, y: 550 }, data: { label: "OrderExecutor", service: "executor", subtitle: "Market Execution", tags: ["Node.js", "MetaAPI"] } },
  { id: "metaapi", type: "service" as const, position: { x: 380, y: 660 }, data: { label: "MetaAPI", service: "metaapi", subtitle: "MetaTrader Bridge", tags: ["MetaAPI"] } },
  { id: "logger", type: "service" as const, position: { x: 250, y: 770 }, data: { label: "TradeLogger", service: "logger", subtitle: "Audit Trail", tags: ["MongoDB", "Node.js"] } },
  { id: "mongodb", type: "database" as const, position: { x: 250, y: 880 }, data: { label: "MongoDB", tags: ["MongoDB"] } },
  { id: "control", type: "control" as const, position: { x: 750, y: 200 }, data: { label: "Redis Ctrl Channel", tags: ["Redis"] } },
];

const edges = [
  { id: "e-engine-queue", source: "engine", target: "queue" },
  { id: "e-queue-worker", source: "queue", target: "worker" },
  { id: "e-worker-paper", source: "worker", target: "paper" },
  { id: "e-worker-live", source: "worker", target: "live" },
  { id: "e-live-risk", source: "live", target: "risk" },
  { id: "e-risk-executor", source: "risk", target: "executor" },
  { id: "e-executor-metaapi", source: "executor", target: "metaapi" },
  { id: "e-metaapi-logger", source: "metaapi", target: "logger" },
  { id: "e-paper-logger", source: "paper", target: "logger" },
  { id: "e-logger-mongo", source: "logger", target: "mongodb" },
  { id: "e-control-worker", source: "control", target: "worker", style: { strokeDasharray: "6 3" } },
];

const componentDetails: Record<string, any> = {
  engine: {
    title: "LiveStrategyEngine",
    icon: null,
    description: "Static orchestrator that schedules strategy executions by pushing jobs into a BullMQ queue. Runs independently of the API request lifecycle.",
    responsibilities: ["Schedule strategy execution cycles", "Push jobs to BullMQ queue", "Handle strategy lifecycle (start, stop, pause)", "Maintain strategy registry"],
    tech: "Node.js, TypeScript, BullMQ",
  },
  queue: {
    title: "BullMQ Strategy Queue",
    icon: null,
    description: "Redis-backed job queue providing reliable delivery, automatic retries, concurrency control, and horizontal scalability.",
    responsibilities: ["Reliable job delivery with persistence", "Configurable retry policies", "Concurrency control per worker", "Job prioritization and delayed jobs"],
    tech: "BullMQ, Redis",
  },
  worker: {
    title: "BullMQ Worker",
    icon: null,
    description: "Consumes strategy execution jobs and creates isolated Runner instances. Subscribes to Redis control channel for live pause/resume/stop.",
    responsibilities: ["Consume jobs from BullMQ queue", "Create isolated Runner instances", "Subscribe to Redis control channel", "Report execution status and errors"],
    tech: "BullMQ, Redis pub/sub, Node.js",
  },
  paper: {
    title: "PaperStrategyRunner",
    icon: null,
    description: "Simulates strategy execution for testing and backtesting. Extends SynchronizationListener using historical market data from MetaAPI.",
    responsibilities: ["Simulated trade execution", "Historical data via MetaAPI", "Condition evaluation pipeline", "Trade logging via TradeLogger"],
    tech: "Node.js, MetaAPI SDK",
  },
  live: {
    title: "LiveStrategyRunner",
    icon: null,
    description: "Production execution runner extending PaperStrategyRunner. Adds OrderExecutor for broker interaction and RiskManager for trade validation.",
    responsibilities: ["Real-time strategy condition evaluation", "Order routing via OrderExecutor", "Risk validation via RiskManager", "Live trade logging via TradeLogger"],
    tech: "Node.js, MetaAPI SDK, MongoDB",
  },
  risk: {
    title: "RiskManager",
    icon: null,
    description: "Validates every trade before execution against configurable risk parameters — max position size, daily loss limit, drawdown threshold.",
    responsibilities: ["Pre-trade risk validation", "Position size limit enforcement", "Daily loss limit tracking", "Drawdown monitoring"],
    tech: "Node.js, in-memory state",
  },
  executor: {
    title: "OrderExecutor",
    icon: null,
    description: "Routes validated trade signals to broker integration layer. Handles market/limit orders and position closures with idempotency keys.",
    responsibilities: ["Market order execution", "Limit order placement", "Position closure management", "Idempotency key assignment"],
    tech: "Node.js, MetaAPI SDK",
  },
  metaapi: {
    title: "MetaAPI",
    icon: null,
    description: "4000+ line integration bridging the platform with MetaTrader broker servers. Exponential backoff reconnection and position reconciliation.",
    responsibilities: ["MetaTrader connection lifecycle", "Credential exchange via tokens", "Position sync on reconnection", "Trade execution with idempotency keys"],
    tech: "MetaAPI, Node.js, exponential backoff",
  },
  logger: {
    title: "TradeLogger",
    icon: null,
    description: "Dedicated service persisting every executed trade to MongoDB. Provides the audit trail for dashboards, historical reporting, and performance.",
    responsibilities: ["Immutable trade event logging", "Trade data normalization", "Performance metrics computation", "Audit trail for compliance"],
    tech: "MongoDB, Node.js",
  },
  mongodb: {
    title: "MongoDB",
    icon: null,
    description: "Primary data store with 17 schemas. Document model accommodates variable strategy configs, trade schemas per instrument, and backtest results.",
    responsibilities: ["Persistent storage of all trading data", "17 schemas across domains", "Schema flexibility via document model", "Application-level idempotency"],
    tech: "MongoDB, Mongoose",
  },
  control: {
    title: "Redis Control Channel",
    icon: null,
    description: "Redis pub/sub channel enabling live operational control of running workers. Broadcasts pause/resume/stop signals consumed instantly without polling.",
    responsibilities: ["Publish pause/resume/stop signals", "Subscribe workers to channel", "Zero-polling signal delivery", "No restart required for control"],
    tech: "Redis pub/sub",
  },
};

const simulationModes: ArchitectureConfig["simulationModes"] = [
  {
    label: "Paper Trade",
    steps: ["engine", "queue", "worker", "paper", "logger", "mongodb"],
    logs: {
      engine: "engine → LiveStrategyEngine pushing strategy job to BullMQ queue",
      queue: "queue → Job enqueued (retry: 3, priority: normal, ttl: 5min)",
      worker: "worker → BullMQ worker consuming job, creating PaperStrategyRunner...",
      paper: "paper → Evaluating entry conditions against historical candles... condition met → simulated BUY",
      logger: "logger → TradeLogger writing simulated trade document...",
      mongodb: "mongodb → Trade persisted (writeConcern: majority, journaled: true)",
    } as Record<string, string>,
    stats: [
      { label: "Queue Time", value: "23ms" },
      { label: "Execution Time", value: "187ms" },
      { label: "Evaluation", value: "42ms" },
      { label: "Broker", value: "simulated" },
      { label: "Trade Logged", value: "✓" },
    ],
  },
  {
    label: "Live Trade",
    steps: ["engine", "queue", "worker", "live", "risk", "executor", "metaapi", "logger", "mongodb"],
    logs: {
      engine: "engine → Scheduling strategy: strat-42, interval: 5s",
      queue: "queue → Job enqueued (id: job-abc-789, retry: 5)",
      worker: "worker → Consuming job, creating LiveStrategyRunner instance...",
      live: "live → Entry conditions met (RSI < 30, SMA crossover) → emitting BUY signal",
      risk: "risk → RiskManager: position size OK, daily loss limit OK, max drawdown OK",
      executor: "executor → OrderExecutor: placing market BUY (idempotency: tk-xyz-456)...",
      metaapi: "metaapi → MetaAPI: order filled @ $184.23, position opened (ticket: 987654)",
      logger: "logger → TradeLogger: BUY 100 AAPL @ $184.23 → MongoDB",
      mongodb: "mongodb → Trade persisted, account position updated",
    } as Record<string, string>,
    stats: [
      { label: "Queue Time", value: "18ms" },
      { label: "Worker Init", value: "234ms" },
      { label: "Risk Check", value: "3ms" },
      { label: "Broker Round Trip", value: "412ms" },
      { label: "Total Latency", value: "667ms" },
    ],
  },
  {
    label: "Pause Strategy",
    steps: ["control", "worker"],
    logs: {
      control: "control → Redis Ctrl Channel: broadcasting PAUSE on 'strategy:pause'",
      worker: "worker → Received PAUSE signal → suspending evaluation loop (state: PAUSED)",
    } as Record<string, string>,
    stats: [
      { label: "Signal Delivery", value: "<1ms" },
      { label: "Worker Ack", value: "2ms" },
      { label: "Strategies Affected", value: "1" },
    ],
  },
  {
    label: "Resume Strategy",
    steps: ["control", "worker"],
    logs: {
      control: "control → Redis Ctrl Channel: broadcasting RESUME on 'strategy:resume'",
      worker: "worker → Received RESUME → resuming strategy evaluation (state: RUNNING)",
    } as Record<string, string>,
    stats: [
      { label: "Signal Delivery", value: "<1ms" },
      { label: "Worker Ack", value: "2ms" },
      { label: "Strategies Resumed", value: "1" },
    ],
  },
];

export const aiAnalyzerConfig: ArchitectureConfig = {
  nodes,
  edges,
  componentDetails,
  defaultSimulationSteps: simulationModes[0].steps,
  simulationModes,
  technologyNodes: {
    BullMQ: ["engine", "queue", "worker"],
    Redis: ["queue", "worker", "control"],
    MongoDB: ["logger", "mongodb"],
    MetaAPI: ["paper", "live", "executor", "metaapi"],
    "Node.js": ["engine", "worker", "paper", "live", "risk", "executor", "logger"],
  },
};
