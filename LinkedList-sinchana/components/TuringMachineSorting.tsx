"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * TuringMachineSorting.tsx
 *
 * A self-contained React component that visualizes a Turing Machine sorting a tape
 * consisting only of 0, 1, and 2. It shows the tape (cells), the TM head (index + state),
 * and a separate array visualization that updates simultaneously.
 *
 * Controls: Play (continuous), Stop (pause), Step (advance one TM action), Reset (reset tape)
 *
 * How it works (implementation detail you don't need to change):
 * - We generate a list of low-level TM actions that represent reads/writes/moves and state
 *   changes using a Turing-style simulator of a sorting strategy (conceptually similar to
 *   Dutch National Flag but expressed as TM actions).
 * - The UI steps through that action list and applies writes/moves to the tape and updates
 *   the visual array so users see both the TM head and the array change in lockstep.
 *
 * Usage: import and render <TuringMachineSorting /> anywhere in your app. You can pass
 * an initialTape prop to set custom input; otherwise a random tape is used.
 */

type Symbol = 0 | 1 | 2;

type TMAction =
  | { kind: "read"; head: number; symbol: Symbol; state: string; note?: string }
  | { kind: "write"; head: number; symbol: Symbol; state: string; note?: string }
  | { kind: "move"; headFrom: number; headTo: number; dir: "L" | "R"; state: string; note?: string }
  | { kind: "state"; state: string; note?: string };

interface Props {
  initialTape?: Symbol[];
  cellCount?: number; // default 12
  speedMs?: number; // autoplay interval
}

export default function TuringMachineSorting({ initialTape, cellCount = 12, speedMs = 450 }: Props) {
  // If no initialTape provided, create a random tape of 0/1/2
  const makeRandom = (n: number) =>
    Array.from({ length: n }, () => (Math.floor(Math.random() * 3) as Symbol));

  const [tape, setTape] = useState<Symbol[]>(() => initialTape ?? makeRandom(cellCount));
  const [head, setHead] = useState<number>(0);
  const [state, setState] = useState<string>("q_start");
  const [actions, setActions] = useState<TMAction[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  // Prepare a stable initialTape ref to reset
  const initialRef = useRef<Symbol[]>(tape.slice());

  // Generate TM actions for sorting 0/1/2. We produce a sequence of low-level steps
  // that include reads, writes, moves and state changes. The algorithm is a
  // conceptual TM version of two-pass approach: first move all 0s to left, then 1s, etc.
  // Implementation approach: simulate a finite-state head that scans and swaps as needed.

  const buildActions = (input: Symbol[]): TMAction[] => {
    const a: TMAction[] = [];
    const rTape = input.slice();
    const n = rTape.length;

    // We'll implement a multi-pass TM simulator:
    // Pass 1: move from left to right, collecting 0s: when we see a 0 where expected later, we
    // mark it and shift elements. For clarity in visualization, instead of actual complex head
    // swaps, we'll simulate the effect with write/move steps so the user sees head moving and
    // writes occur. (This is still expressed as TM-level read/write/move events.)

    // For teaching clarity, we will produce actions that show the head scanning, reading,
    // optionally writing a blank marker 'B' internally (we won't show B in the tape visualization),
    // and eventually writing values back. But because the tape alphabet requested is only 0/1/2,
    // we will instead implement a simpler TM-like algorithm:
    // - We will run a three-pointer logical algorithm (low, mid, high) but produce TM-like events:
    //   move head to index, read symbol, possibly write swapped symbols, move head, update state.

    // We'll compute the sequence using the standard Dutch National Flag algorithm (low/mid/high), but
    // every read/write/move will be converted into TMAction items.

    let low = 0;
    let mid = 0;
    let high = n - 1;
    let curState = "q_scan";

    const pushState = (s: string, note?: string) => a.push({ kind: "state", state: s, note });
    const pushRead = (idx: number, note?: string) => a.push({ kind: "read", head: idx, symbol: rTape[idx], state: curState, note });
    const pushWrite = (idx: number, sym: Symbol, note?: string) => {
      a.push({ kind: "write", head: idx, symbol: sym, state: curState, note });
      rTape[idx] = sym;
    };
    const pushMove = (from: number, to: number, dir: "L" | "R", note?: string) => a.push({ kind: "move", headFrom: from, headTo: to, dir, state: curState, note });

    pushState("q_start", "Begin Dutch National Flag style TM simulation");

    while (mid <= high) {
      // move head to mid
      pushState("q_move_mid", `Move head to mid=${mid}`);
      let cur = low; // We'll step head from wherever to mid — but to keep action list simpler
      // assume head teleports with move actions from previous position (more TM-like is to move one cell at a time,
      // but that makes a lot of steps — to balance clarity and brevity we'll move cell-by-cell.)

      // For pedagogical clarity, move head one step at a time from current known position (if actions empty, head at 0)
      // We'll maintain a variable for where the head is (simulate) — not necessary here because UI will step through actions.

      // Add explicit moves from the last known position if there was at least one move already
      // But because we don't keep last head position here, we will insert a move from 'unknown' by adding a move from 0
      // and UI will animate from wherever head currently is to mid. That's fine for visualization.
      // Instead, for correctness, we'll simulate moving from index 0 for each movement — UI will interpret.

      pushMove(0, mid, mid >= 0 ? "R" : "L", `Move head to index ${mid}`);
      pushRead(mid, `Reading tape[${mid}]`);
      const val = rTape[mid];
      if (val === 0) {
        pushState("q_write_low", `Found 0 at mid; swap with low=${low}`);
        // swap rTape[low] and rTape[mid]
        if (low !== mid) {
          // write low position with 0, write mid with old low
          pushWrite(low, 0, `Write 0 to index ${low}`);
          pushWrite(mid, rTape[low], `Write ${rTape[low]} to index ${mid}`);
        }
        // after swap increase low and mid
        pushState("q_inc_low_mid", `Increment low and mid (${low}->${low + 1}, ${mid}->${mid + 1})`);
        low++;
        mid++;
      } else if (val === 1) {
        pushState("q_keep_mid", `1 at mid; move mid++`);
        mid++;
      } else {
        // val == 2
        pushState("q_swap_high", `Found 2 at mid; swap with high=${high}`);
        if (mid !== high) {
          pushWrite(mid, rTape[high], `Write ${rTape[high]} to index ${mid}`);
          pushWrite(high, 2, `Write 2 to index ${high}`);
        }
        pushState("q_dec_high", `Decrement high (${high}->${high - 1})`);
        high--;
        // note: do not increment mid here
      }
    }

    pushState("q_halt", "Finished sorting — tape is now sorted");

    // For better visualization, insert explicit final reads for each index
    for (let i = 0; i < n; i++) {
      pushMove(0, i, "R", `Final read move to ${i}`);
      pushRead(i, `Final read value ${rTape[i]}`);
    }

    return a;
  };

  // Rebuild actions whenever the tape (initialRef) changes
  useEffect(() => {
    const built = buildActions(initialRef.current);
    setActions(built);
    setStepIndex(0);
    setHead(0);
    setState("q_start");
    // setTape(initialRef.current.slice()); // tape already set on creation
  }, []);

  // Apply a single action to the UI
  const applyAction = (action: TMAction) => {
    if (!action) return;
    switch (action.kind) {
      case "state":
        setState(action.state);
        break;
      case "read":
        setHead(action.head);
        setState(action.state);
        break;
      case "write":
        setHead(action.head);
        setState(action.state);
        setTape((t) => {
          const copy = t.slice();
          copy[action.head] = action.symbol;
          return copy;
        });
        break;
      case "move":
        setHead(action.headTo);
        setState(action.state);
        break;
      default:
        break;
    }
  };

  // Step forward one action
  const stepForward = () => {
    if (stepIndex >= actions.length) {
      setPlaying(false);
      return;
    }
    const act = actions[stepIndex];
    applyAction(act);
    setStepIndex((s) => s + 1);
  };

  // Play / autoplay
  useEffect(() => {
    if (playing) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setStepIndex((cur) => {
          if (cur >= actions.length) {
            setPlaying(false);
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            return cur;
          }
          const act = actions[cur];
          applyAction(act);
          return cur + 1;
        });
      }, speedMs);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    // clear on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, actions]);

  const handlePlay = () => {
    if (stepIndex >= actions.length) {
      // reset to start if already finished
      handleReset();
    }
    setPlaying(true);
  };

  const handleStop = () => setPlaying(false);

  const handleReset = () => {
    setPlaying(false);
    setTape(initialRef.current.slice());
    setHead(0);
    setState("q_start");
    const rebuilt = buildActions(initialRef.current.slice());
    setActions(rebuilt);
    setStepIndex(0);
  };

  // Small helper to pretty-print action at current step
  const currentAction = actions[stepIndex] ?? null;

  // Visual components
  const TapeCell: React.FC<{ value: Symbol; index: number; isHead?: boolean }> = ({ value, index, isHead }) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-md border ${isHead ? "border-black shadow-md" : "border-gray-200"} text-lg font-semibold`}
      >
        {value}
      </div>
      <div className="text-xs mt-1">{index}</div>
    </div>
  );

  const ArrayCell: React.FC<{ value: Symbol; index: number }> = ({ value, index }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-8 flex items-center justify-center rounded-md border border-gray-200 text-sm font-medium">
        {value}
      </div>
      <div className="text-xs mt-1">{index}</div>
    </div>
  );

  return (
    <div className="p-6 min-h-[600px]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Turing Machine — Sort 0 / 1 / 2</h2>
            <p className="text-sm text-gray-600 mt-1">Visual TM + Array: watch the head, state and array change together.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlay}
              className="px-3 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700"
            >
              Play
            </button>
            <button
              onClick={handleStop}
              className="px-3 py-2 rounded-md bg-yellow-400 text-black font-medium hover:bg-yellow-500"
            >
              Stop
            </button>
            <button
              onClick={() => {
                stepForward();
              }}
              className="px-3 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
            >
              Step
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Main visualization area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Turing Machine tape */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-medium">Turing Machine Tape</h3>
            <p className="text-xs text-gray-500 mb-4">Head index: <strong>{head}</strong> — State: <strong>{state}</strong></p>

            <div className="flex items-end gap-2 overflow-auto py-2">
              {tape.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-16 h-20 flex items-center justify-center rounded-md border ${i === head ? "border-black shadow-lg scale-105" : "border-gray-200"} transition-all`}
                  >
                    <div className="text-2xl font-bold">{v}</div>
                  </div>
                  <div className="text-xs mt-2">{i}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <div><strong>Current action:</strong> {currentAction ? `${currentAction.kind} ${'state' in currentAction ? `(${currentAction.state})` : ''}` : '—'}</div>
              <div className="mt-1 text-xs text-gray-500">{currentAction?.note ?? ''}</div>
            </div>
          </div>

          {/* Array visualization */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="font-medium">Array View (simultaneous)</h3>
            <p className="text-xs text-gray-500 mb-4">The array reflects writes performed by the TM.</p>

            <div className="flex gap-3 items-center flex-wrap">
              {tape.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-sm text-sm font-medium ${v === 0 ? 'bg-slate-100' : v === 1 ? 'bg-slate-200' : 'bg-slate-300'}`}>
                    {v}
                  </div>
                  <div className="text-xs text-gray-500">{i}</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium">Step progress</h4>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(stepIndex / Math.max(1, actions.length)) * 100}%`, background: 'linear-gradient(90deg,#4f46e5,#ec4899)' }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">Action {stepIndex} / {actions.length}</div>
            </div>
          </div>
        </div>

        {/* Legend / Notes */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium">Legend & Notes</h4>
          <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
            <li>Head movements, reads and writes are represented as low-level TM actions.</li>
            <li>The array view updates immediately when the TM writes a symbol — this lets you
            see tape & array side-by-side.</li>
            <li>Use <strong>Step</strong> to walk actions one by one. <strong>Play</strong> runs continuously.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
