"use client";

import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BaseEdge,
  getSmoothStepPath,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Square, Info, Cpu, Database, Terminal, GitBranch, Shield, Activity, Monitor, Clock, Zap, ChevronDown, Filter } from "lucide-react";

export interface ComponentInfo {
  title: string;
  icon: React.ReactNode;
  description: string;
  responsibilities: string[];
  tech: string;
}

export interface SimulationMode {
  label: string;
  steps: string[];
  logs: Record<string, string>;
  stats?: { label: string; value: string }[];
  liveMetrics?: Record<string, string>;
}

export interface ArchitectureConfig {
  nodes: Node[];
  edges: Edge[];
  componentDetails: Record<string, ComponentInfo>;
  defaultSimulationSteps: string[];
  simulationModes?: SimulationMode[];
  nodeTags?: Record<string, string[]>;
  technologyNodes?: Record<string, string[]>;
}

type ArchNodeData = {
  label: string;
  mode?: string;
  service?: string;
  subtitle?: string;
  tags?: string[];
};

function FlowingParticleEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  animated,
  style,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
    borderRadius: 8,
  });

  return (
    <>
      <path
        id={id}
        d={edgePath}
        className="react-flow__edge-path"
        style={{
          ...style,
          stroke: selected ? "#818cf8" : style?.stroke || "#27272a",
          strokeWidth: selected ? 3 : style?.strokeWidth || 2,
          transition: "stroke 0.3s, stroke-width 0.3s",
        }}
      />
      {animated && (
        <g>
          <path
            d={edgePath}
            fill="none"
            stroke="#818cf8"
            strokeWidth={2}
            strokeDasharray="4 8"
            className="animate-flow-dash"
            opacity={0.7}
          />
          <circle r={3} fill="#a5b4fc" className="animate-flow-particle">
            <animateMotion dur="1.2s" repeatCount="indefinite">
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
          <circle r={2} fill="#c7d2fe" className="animate-flow-particle" opacity={0.6}>
            <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.4s">
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
          <circle r={1.5} fill="#e0e7ff" className="animate-flow-particle" opacity={0.4}>
            <animateMotion dur="1.2s" repeatCount="indefinite" begin="0.8s">
              <mpath href={`#${id}`} />
            </animateMotion>
          </circle>
        </g>
      )}
    </>
  );
}

function EngineNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  return (
    <div className={`relative rounded-xl border-2 px-5 py-3 transition-all duration-500 ${
      selected
        ? "border-accent bg-accent/10 shadow-[0_0_25px_rgba(99,102,241,0.35)]"
        : "border-accent/40 bg-accent/5 hover:border-accent/70 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
    }`}>
      <Handle type="source" position={Position.Bottom} className="!border-accent !bg-accent" />
      <div className="flex items-center gap-2">
        <Cpu size={14} className="text-accent" />
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">Orchestrator</span>
      {selected && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent animate-pulse" />}
    </div>
  );
}

function QueueNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  return (
    <div className={`relative rounded-xl border-2 px-5 py-3 transition-all duration-500 ${
      selected
        ? "border-amber-500 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.35)]"
        : "border-amber-500/40 bg-amber-500/5 hover:border-amber-500/70 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
    }`}>
      <Handle type="target" position={Position.Top} className="!border-amber-500 !bg-amber-500" />
      <Handle type="source" position={Position.Bottom} className="!border-amber-500 !bg-amber-500" />
      <div className="flex items-center gap-2">
        <GitBranch size={14} className="text-amber-400" />
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">BullMQ Queue</span>
      {selected && <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
    </div>
  );
}

function WorkerNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  return (
    <div className={`relative rounded-xl border-2 px-5 py-3 transition-all duration-500 ${
      selected
        ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
        : "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/70 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
    }`}>
      <Handle type="target" position={Position.Top} className="!border-emerald-500 !bg-emerald-500" />
      <Handle type="source" position={Position.Bottom} className="!border-emerald-500 !bg-emerald-500" />
      <div className="flex items-center gap-2">
        <Terminal size={14} className="text-emerald-400" />
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">BullMQ Worker</span>
    </div>
  );
}

function RunnerNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  const isLive = d.mode === "live";
  const borderColor = isLive ? "#0ea5e9" : "#8b5cf6";
  const bgColor = isLive ? "rgba(14,165,233,0.1)" : "rgba(139,92,246,0.1)";
  const borderDim = isLive ? "rgba(14,165,233,0.25)" : "rgba(139,92,246,0.25)";
  const bgDim = isLive ? "rgba(14,165,233,0.04)" : "rgba(139,92,246,0.04)";
  return (
    <div
      className="relative rounded-xl border-2 px-5 py-3 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
      style={{
        borderColor: selected ? borderColor : borderDim,
        backgroundColor: selected ? bgColor : bgDim,
        boxShadow: selected ? `0 0 25px ${borderColor}4d` : "none",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        <Activity size={14} style={{ color: isLive ? "#0ea5e9" : "#8b5cf6" }} />
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">
        {isLive ? "extends PaperStrategyRunner" : "extends SynchronizationListener"}
      </span>
    </div>
  );
}

function ServiceNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  return (
    <div
      className="relative rounded-xl border-2 px-5 py-3 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]"
      style={{
        borderColor: selected ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
        backgroundColor: selected ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
        boxShadow: selected ? "0 0 25px rgba(255,255,255,0.1)" : "none",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="flex items-center gap-2">
        {d.service === "risk" && <Shield size={14} className="text-red-400" />}
        {d.service === "executor" && <ArrowRightIcon size={14} className="text-cyan-400" />}
        {d.service === "metaapi" && <Terminal size={14} className="text-orange-400" />}
        {d.service === "logger" && <Database size={14} className="text-emerald-400" />}
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">{d.subtitle || "Service"}</span>
    </div>
  );
}

function ArrowRightIcon(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 14} height={props.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function DatabaseNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  return (
    <div className={`relative rounded-xl border-2 px-5 py-3 transition-all duration-500 ${
      selected
        ? "border-green-500 bg-green-500/10 shadow-[0_0_25px_rgba(34,197,94,0.35)]"
        : "border-green-500/40 bg-green-500/5 hover:border-green-500/70 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]"
    }`}>
      <Handle type="target" position={Position.Top} className="!border-green-500 !bg-green-500" />
      <div className="flex items-center gap-2">
        <Database size={14} className="text-green-400" />
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">Data Store</span>
    </div>
  );
}

function ControlNode({ data, selected }: NodeProps) {
  const d = data as ArchNodeData;
  return (
    <div className={`relative rounded-xl border-2 border-dashed px-5 py-3 transition-all duration-500 ${
      selected
        ? "border-purple-500 bg-purple-500/10 shadow-[0_0_25px_rgba(168,85,247,0.35)]"
        : "border-purple-500/40 bg-purple-500/5 hover:border-purple-500/70 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
    }`}>
      <Handle type="source" position={Position.Right} className="!border-purple-500 !bg-purple-500" />
      <div className="flex items-center gap-2">
        <GitBranch size={14} className="text-purple-400" />
        <span className="text-xs font-semibold text-foreground">{d.label}</span>
      </div>
      <span className="mt-0.5 block text-[10px] text-muted-foreground">Redis Pub/Sub</span>
    </div>
  );
}

const edgeTypes = {
  default: FlowingParticleEdge,
};

export function InteractiveArchitecture({
  config,
  className,
  highlightFilter,
  onNodeSelect,
}: {
  config: ArchitectureConfig;
  className?: string;
  highlightFilter?: string[] | null;
  onNodeSelect?: (nodeId: string | null) => void;
}) {
  const initialNodes = useMemo(() => config.nodes, [config.nodes]);
  const initialEdges = useMemo(() => config.edges, [config.edges]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeMode, setActiveMode] = useState(0);
  const [simStats, setSimStats] = useState<{ label: string; value: string }[]>([]);
  const [simMetrics, setSimMetrics] = useState<Record<string, string>>({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const simRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const modes = config.simulationModes || [
    { label: "Run Trade", steps: config.defaultSimulationSteps, logs: {} as Record<string, string>, stats: [] },
  ];

  useEffect(() => {
    return () => {
      if (simRef.current) clearInterval(simRef.current);
    };
  }, []);

  const applyHighlight = useCallback((filters: string[] | null) => {
    const isNodeIdFilter = filters && filters.length > 0 && config.nodes.some((n) => filters!.includes(n.id));
    setNodes((nds) =>
      nds.map((n) => {
        const nodeTags = (n.data as ArchNodeData).tags || [];
        let matches = !filters || filters.length === 0;
        if (filters && filters.length > 0) {
          if (isNodeIdFilter) {
            matches = filters.includes(n.id);
          } else {
            matches = filters.some((f) => nodeTags.includes(f));
          }
        }
        return {
          ...n,
          style: {
            ...n.style,
            opacity: matches ? 1 : 0.25,
            transition: "opacity 0.4s",
          },
          data: { ...n.data },
        };
      })
    );
    setEdges((eds) =>
      eds.map((e) => {
        let matches = !filters || filters.length === 0;
        if (filters && filters.length > 0) {
          if (isNodeIdFilter) {
            matches = filters.includes(e.source) || filters.includes(e.target);
          } else {
            const sourceTags = ((config.nodes.find((n) => n.id === e.source)?.data as ArchNodeData)?.tags) || [];
            const targetTags = ((config.nodes.find((n) => n.id === e.target)?.data as ArchNodeData)?.tags) || [];
            matches = filters.some((f) => [...sourceTags, ...targetTags].includes(f));
          }
        }
        return {
          ...e,
          style: {
            ...e.style,
            opacity: matches ? 1 : 0.1,
            transition: "opacity 0.4s",
          },
          animated: false,
        };
      })
    );
  }, [setNodes, setEdges, config.nodes]);

  useEffect(() => {
    applyHighlight(highlightFilter ?? null);
  }, [highlightFilter, applyHighlight]);

  const onNodeClick = useCallback((_event: any, node: Node) => {
    setSelectedNode(node.id);
    onNodeSelect?.(node.id);
  }, [onNodeSelect]);

  const startSimulation = useCallback((modeIndex: number) => {
    if (simulating) return;
    setActiveMode(modeIndex);
    const mode = modes[modeIndex];
    setSimulating(true);
    setSimStep(0);
    setLogs([]);
    setSimStats([]);
    setSimMetrics({});

    let step = 0;
    simRef.current = setInterval(() => {
      if (step >= mode.steps.length) {
        if (simRef.current) clearInterval(simRef.current);
        setSimulating(false);
        setSimStep(-1);
        const finalStats = mode.stats || [];
        setSimStats(finalStats);
        setSimMetrics(mode.liveMetrics || {});
        setNodes((nds) =>
          nds.map((n) => ({ ...n, selected: false, data: { ...n.data } }))
        );
        setEdges((eds) =>
          eds.map((e) => ({ ...e, animated: false, style: { ...e.style, strokeWidth: 2, opacity: 1 } }))
        );
        return;
      }

      const stepId = mode.steps[step];
      const prevStepId = step > 0 ? mode.steps[step - 1] : null;
      setSimStep(step);

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          selected: n.id === stepId,
          data: { ...n.data },
        }))
      );

      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          animated: e.source === prevStepId && e.target === stepId,
          style: {
            ...e.style,
            strokeWidth: (e.source === prevStepId && e.target === stepId) ? 3 : 2,
            opacity: 1,
          },
        }))
      );

      const logMsg = mode.logs[stepId];
      if (logMsg) {
        setLogs((prev) => [...prev, logMsg]);
      }

      step++;
    }, 800);
  }, [simulating, setNodes, setEdges, modes]);

  const stopSimulation = useCallback(() => {
    if (simRef.current) clearInterval(simRef.current);
    setSimulating(false);
    setSimStep(-1);
    setLogs([]);
    setSimStats([]);
    setSimMetrics({});
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false, data: { ...n.data } })));
    setEdges((eds) => eds.map((e) => ({ ...e, animated: false, style: { ...e.style, strokeWidth: 2, opacity: 1 } })));
  }, [setNodes, setEdges]);

  const details = selectedNode ? config.componentDetails[selectedNode] : null;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    config.nodes.forEach((n) => {
      const nodeTags = (n.data as ArchNodeData).tags;
      nodeTags?.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }, [config.nodes]);

  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Live Trading Engine</h3>
          <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[10px] text-muted-foreground">
            Interactive
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:border-accent/50 hover:text-accent"
            >
              <Filter size={10} /> Filter
            </button>
            <AnimatePresence>
              {showFilterPanel && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-border bg-card p-2 shadow-xl"
                >
                  <div className="space-y-0.5">
                    <button
                      onClick={() => { setActiveTagFilter(null); applyHighlight(null); setShowFilterPanel(false); }}
                      className={`w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors ${!activeTagFilter ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Show All
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => { setActiveTagFilter(tag); applyHighlight([tag]); setShowFilterPanel(false); }}
                        className={`w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors ${activeTagFilter === tag ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {modes.map((mode, i) => (
            <button
              key={mode.label}
              onClick={() => startSimulation(i)}
              disabled={simulating}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-all hover:border-accent/50 hover:text-accent disabled:opacity-40"
            >
              {simulating && activeMode === i ? <Square size={10} /> : <Play size={10} />}
              {mode.label}
            </button>
          ))}
          {simulating && (
            <button
              onClick={stopSimulation}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-400 transition-all hover:bg-red-500/20"
            >
              <Square size={10} /> Stop
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="h-[560px] rounded-xl border border-border bg-card overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={{
                engine: EngineNode,
                queue: QueueNode,
                worker: WorkerNode,
                runner: RunnerNode,
                service: ServiceNode,
                database: DatabaseNode,
                control: ControlNode,
              }}
              edgeTypes={edgeTypes}
              fitView
              minZoom={0.5}
              maxZoom={2.5}
              panOnDrag={false}
              zoomOnScroll={true}
              selectionOnDrag={false}
              nodesDraggable={true}
              proOptions={{ hideAttribution: true }}
              defaultEdgeOptions={{ style: { stroke: "#27272a", strokeWidth: 2 } }}
            >
              <Background color="#27272a" gap={20} size={1} />
              <Controls className="!bg-card !border-border !text-muted-foreground [&_button]:!border-border [&_button]:!text-muted-foreground [&_button]:hover:!bg-surface-hover" />
              <MiniMap className="!border-border !bg-card" nodeColor="#27272a" maskColor="rgba(0,0,0,0.6)" />
            </ReactFlow>
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {simulating && (
              <motion.div
                key="live-metrics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-border bg-card p-4 mb-4"
              >
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Activity size={14} className="text-accent animate-pulse" /> Live Metrics
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <MetricBadge label="Queue" value={`${Math.floor(Math.random() * 5)} jobs`} />
                  <MetricBadge label="Worker State" value="processing" />
                  <MetricBadge label="Step" value={`${simStep + 1} / ${modes[activeMode].steps.length}`} />
                  <MetricBadge label="Active" value={modes[activeMode].steps[simStep] || ""} />
                </div>
              </motion.div>
            )}
            {details ? (
              <motion.div
                key={selectedNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-[420px] overflow-y-auto rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">{details.icon}</span>
                    <h4 className="text-sm font-semibold">{details.title}</h4>
                  </div>
                  <button onClick={() => setSelectedNode(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={14} />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{details.description}</p>
                <div className="mb-3">
                  <span className="text-[10px] font-medium text-accent uppercase tracking-wider">Responsibilities</span>
                  <ul className="mt-2 space-y-1.5">
                    {details.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-background p-2.5">
                  <span className="text-[10px] font-medium text-muted-foreground">Technology</span>
                  <p className="text-xs text-foreground mt-0.5">{details.tech}</p>
                </div>
              </motion.div>
            ) : simStats.length > 0 ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Zap size={14} className="text-accent" /> Execution Metrics
                </h4>
                <div className="space-y-2">
                  {simStats.map((s, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-background p-2.5">
                      <span className="text-[11px] text-muted-foreground">{s.label}</span>
                      <span className="text-xs font-semibold text-accent">{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-[420px] items-center justify-center rounded-xl border border-border bg-card p-4"
              >
                <div className="text-center">
                  <Info size={20} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">Click any node to inspect</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">or run a simulation above</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={12} className="text-accent" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Execution Log</span>
            </div>
            <div className="space-y-1 font-mono max-h-32 overflow-y-auto">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-2 text-[11px]"
                >
                  <span className="text-accent/70 shrink-0">{">"}</span>
                  <span className="text-muted-foreground">{log}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {simStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-border bg-card p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock size={12} className="text-accent-cyan" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Performance</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {simStats.map((s, i) => (
                <div key={i} className="rounded-lg border border-border bg-background p-2">
                  <span className="block text-[10px] text-muted-foreground">{s.label}</span>
                  <span className="text-sm font-bold text-accent">{s.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background px-2.5 py-1.5">
      <span className="block text-[10px] text-muted-foreground">{label}</span>
      <span className="block text-xs font-medium text-foreground">{value}</span>
    </div>
  );
}
