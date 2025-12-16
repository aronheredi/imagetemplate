import type { Canvas } from 'fabric';
import FabricCanvas from './FabricCanvas';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CanvasWorkspace {
    setCanvas: (canvas: Canvas | null) => void;
    canvas: Canvas | null;
}

type Point = { x: number; y: number; }
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function CanvasWorkspace({ setCanvas, canvas }: CanvasWorkspace) {
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // State
    const [isPanning, setIsPanning] = useState(false);
    const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isSpacePressed, setIsSpacePressed] = useState(false);

    // Refs for values that don't need to trigger re-renders
    const spaceDownRef = useRef(false);
    const panStartRef = useRef<{ startX: number; startY: number; pan0: Point } | null>(null);
    const panRef = useRef(pan); // Keep current pan in ref for synchronous access
    const zoomRef = useRef(zoom); // Keep current zoom in ref

    // Sync refs with state
    useEffect(() => {
        panRef.current = pan;
    }, [pan]);

    useEffect(() => {
        zoomRef.current = zoom;
    }, [zoom]);

    const minZoom = 0.2;
    const maxZoom = 3;


    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (e.code === 'Space' || e.key === ' ') {
                spaceDownRef.current = true;
                setIsSpacePressed(true);
                if (canvas) canvas.selection = false;
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.key === ' ') {
                spaceDownRef.current = false;
                setIsSpacePressed(false);
                if (canvas) canvas.selection = true;
            }
        };
        const onBlur = () => {
            spaceDownRef.current = false;
            setIsSpacePressed(false);
            if (canvas) canvas.selection = true;
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('blur', onBlur);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('blur', onBlur);
        };
    }, [canvas]);


    useEffect(() => {
        if (!isPanning) return;

        const handlePointerMove = (e: PointerEvent) => {
            const s = panStartRef.current;
            if (!s) return;

            e.preventDefault();

            const dx = e.clientX - s.startX;
            const dy = e.clientY - s.startY;

            const newPan = { x: s.pan0.x + dx, y: s.pan0.y + dy };
            panRef.current = newPan;
            setPan(newPan);

            if (viewportRef.current) {
                viewportRef.current.style.transform = `translate(${newPan.x}px, ${newPan.y}px) scale(${zoomRef.current})`;
            }
        };

        const handlePointerUp = (e: PointerEvent) => {
            setIsPanning(false);
            panStartRef.current = null;
        };

        // Attach to window to handle drag even if mouse leaves the div
        window.addEventListener('pointermove', handlePointerMove, { passive: false });
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [isPanning]);

    // 3. panning, with middle mouse button, space + left mouse, or just simply click if outside canvas
    const beginPan = useCallback((e: React.PointerEvent<HTMLDivElement>) => {

        const isMiddleMouse = e.button === 1;
        const isSpaceLeft = e.button === 0 && spaceDownRef.current;


        const target = e.target as HTMLElement;
        const isCanvas = target.tagName === 'CANVAS';
        const isBackgroundPan = e.button === 0 && !isCanvas;

        if (!isMiddleMouse && !isSpaceLeft && !isBackgroundPan) return;

        e.preventDefault();
        e.stopPropagation();

        // Save starting values
        panStartRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            pan0: { ...panRef.current }
        };

        setIsPanning(true);
    }, []);

    // zoom with scroll wheel
    const onWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();



        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const wx = (mx - panRef.current.x) / zoomRef.current;
        const wy = (my - panRef.current.y) / zoomRef.current;

        const nextZoom = clamp(zoomRef.current * Math.exp(-e.deltaY * 0.0015), minZoom, maxZoom);
        const nextPanX = mx - wx * nextZoom;
        const nextPanY = my - wy * nextZoom;

        setZoom(nextZoom);
        setPan({ x: nextPanX, y: nextPanY });

        zoomRef.current = nextZoom;
        panRef.current = { x: nextPanX, y: nextPanY };

        if (viewportRef.current) {
            viewportRef.current.style.transform = `translate(${nextPanX}px, ${nextPanY}px) scale(${nextZoom})`;
        }
    }, []);

    const viewPortStyle = useMemo(() => ({
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transformOrigin: '0 0',
        willChange: 'transform',
        pointerEvents: 'auto' as const,
    }), [pan.x, pan.y, zoom]);

    return (
        <div className="relative flex flex-1 overflow-hidden p-6 bg-gray-50 h-screen w-screen">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.1]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />

            <div
                ref={containerRef}
                className="relative h-full w-full overflow-hidden outline-none"
                onPointerDownCapture={beginPan}
                onWheel={onWheel}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                    cursor: isPanning ? 'grabbing' : isSpacePressed ? 'grab' : 'default',
                    touchAction: 'none',
                    userSelect: 'none',
                }}
            >
                <div
                    ref={viewportRef}
                    className="absolute left-0 top-0 w-full h-full"
                    style={viewPortStyle}
                >
                    <FabricCanvas
                        setCanvas={setCanvas}
                        isSpacePressed={isSpacePressed}
                        isPanning={isPanning}
                    />
                </div>
            </div>
        </div>
    );
}