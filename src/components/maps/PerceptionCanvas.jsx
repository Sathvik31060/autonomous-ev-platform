import React, { useEffect, useRef } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Eye, ShieldCheck, Compass, Zap, Navigation } from 'lucide-react';

export const PerceptionCanvas = () => {
  const { vehicle, obstacles, isLiveSimulation } = useSimulation();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;

    const render = () => {
      if (isLiveSimulation) {
        offset = (offset + (vehicle.speed / 15)) % 60;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Background Dark Road Canvas
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, w, h);

      // Radar Concentric Distance Rings
      const centerX = w / 2;
      const centerY = h - 70; // vehicle origin point

      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      [80, 160, 240, 320].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, Math.PI, 2 * Math.PI);
        ctx.stroke();

        // Distance text
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.font = '10px monospace';
        ctx.fillText(`${(idx + 1) * 15}m`, centerX + r - 25, centerY - 8);
      });
      ctx.restore();

      // Road Boundaries (Perspective lines)
      const roadTopWidth = 140;
      const roadBottomWidth = 340;
      const roadTopY = 40;
      const roadBottomY = h - 20;

      // Road Surface
      ctx.beginPath();
      ctx.moveTo(centerX - roadTopWidth / 2, roadTopY);
      ctx.lineTo(centerX + roadTopWidth / 2, roadTopY);
      ctx.lineTo(centerX + roadBottomWidth / 2, roadBottomY);
      ctx.lineTo(centerX - roadBottomWidth / 2, roadBottomY);
      ctx.closePath();
      ctx.fillStyle = '#0a101d';
      ctx.fill();

      // Lane boundaries (Solid Cyan glowing lines)
      ctx.strokeStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3;

      // Left boundary
      ctx.beginPath();
      ctx.moveTo(centerX - roadTopWidth / 2, roadTopY);
      ctx.lineTo(centerX - roadBottomWidth / 2, roadBottomY);
      ctx.stroke();

      // Right boundary
      ctx.beginPath();
      ctx.moveTo(centerX + roadTopWidth / 2, roadTopY);
      ctx.lineTo(centerX + roadBottomWidth / 2, roadBottomY);
      ctx.stroke();

      // Center Dashed Lane Marker
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([20, 25]);
      ctx.lineDashOffset = -offset;
      ctx.beginPath();
      ctx.moveTo(centerX, roadTopY);
      ctx.lineTo(centerX, roadBottomY);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Autonomous Predictive Trajectory Ribbon (Soft Cyan Fill)
      const gradient = ctx.createLinearGradient(centerX, roadBottomY, centerX, roadTopY + 30);
      gradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 242, 254, 0.02)');

      const curveX = Math.sin(Date.now() / 2500) * 8; // subtle dynamic steering preview
      ctx.beginPath();
      ctx.moveTo(centerX - 18, roadBottomY - 50);
      ctx.lineTo(centerX + 18, roadBottomY - 50);
      ctx.quadraticCurveTo(centerX + 10 + curveX, roadTopY + 120, centerX + 12 + curveX, roadTopY + 50);
      ctx.lineTo(centerX - 12 + curveX, roadTopY + 50);
      ctx.quadraticCurveTo(centerX - 10 + curveX, roadTopY + 120, centerX - 18, roadBottomY - 50);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Obstacle 1: Vehicle Ahead (at ~18m)
      const leadCarY = roadTopY + 120 + Math.sin(Date.now() / 2000) * 6;
      const leadCarX = centerX + curveX * 0.4;

      // Bounding Box
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(leadCarX - 22, leadCarY - 14, 44, 28);
      // Lead Vehicle Body
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(leadCarX - 18, leadCarY - 10, 36, 20);
      // Lead Vehicle Tail Lights (Glowing Red)
      ctx.fillStyle = '#ff2222';
      ctx.shadowColor = '#ff2222';
      ctx.shadowBlur = 8;
      ctx.fillRect(leadCarX - 16, leadCarY + 6, 8, 3);
      ctx.fillRect(leadCarX + 8, leadCarY + 6, 8, 3);
      ctx.shadowBlur = 0;

      // Tag for Lead Vehicle
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`VEHICLE | ${obstacles[0]?.distance || 18.2}m`, leadCarX - 35, leadCarY - 20);

      // Obstacle 2: Pedestrian (Right lane at ~32m)
      const pedX = centerX + 65;
      const pedY = roadTopY + 80;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(pedX - 8, pedY - 16, 16, 24);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '9px monospace';
      ctx.fillText(`PEDESTRIAN | ${obstacles[1]?.distance || 32.5}m`, pedX - 20, pedY - 20);

      // Obstacle 3: Road Barrier (Left Shoulder at ~45m)
      const barX = centerX - 85;
      const barY = roadTopY + 50;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(barX - 14, barY - 10, 28, 16);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '9px monospace';
      ctx.fillText(`BARRIER | 45.0m`, barX - 18, barY - 14);

      // Ego Vehicle (Our Autonomous EV Top-down footprint)
      const egoX = centerX;
      const egoY = centerY + 10;
      const egoW = 38;
      const egoH = 56;

      // Chassis shadow
      ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.filter = 'blur(6px)';
      ctx.fillRect(egoX - egoW / 2 - 2, egoY - egoH / 2 - 2, egoW + 4, egoH + 4);
      ctx.filter = 'none';

      // Chassis Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = vehicle.drivingMode === 'AUTONOMOUS' ? '#00f2fe' : '#3b82f6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(egoX - egoW / 2, egoY - egoH / 2, egoW, egoH, 8);
      ctx.fill();
      ctx.stroke();

      // Windshield & Roof Glass
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(egoX - 14, egoY - 16, 28, 22, 4);
      ctx.fill();

      // Headlight Beam Projections
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      ctx.moveTo(egoX - 12, egoY - egoH / 2);
      ctx.lineTo(egoX - 45, egoY - egoH / 2 - 70);
      ctx.lineTo(egoX + 45, egoY - egoH / 2 - 70);
      ctx.lineTo(egoX + 12, egoY - egoH / 2);
      ctx.closePath();
      ctx.fill();

      // Top LiDAR Scanner Module on roof (Pulsing Cyan Dot)
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(egoX, egoY - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ego Vehicle Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('EGO-VEHICLE', egoX, egoY + egoH / 2 + 15);
      ctx.textAlign = 'left';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [vehicle.speed, vehicle.drivingMode, obstacles, isLiveSimulation]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#060a12] p-2">
      {/* Top Overlay Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-cyan-500/30 flex items-center gap-1.5 text-xs font-mono text-cyan-400">
            <Eye className="w-3.5 h-3.5 animate-pulse" />
            <span>LiDAR + CAM 3D VOXEL FUSION</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-emerald-500/30 text-xs font-mono text-emerald-400">
            CONFIDENCE: 99.4%
          </div>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-slate-700 text-xs font-mono text-slate-300">
          FOV: 360° | DEPTH: 250m
        </div>
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        width={680}
        height={420}
        className="w-full h-[380px] md:h-[420px] rounded-xl object-contain block"
      />

      {/* Bottom Telemetry Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none text-[11px] font-mono text-slate-400 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400">YAW RATE: 0.01 rad/s</span>
          <span>LATERAL ERROR: 0.04 m</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400">LANE LOCK: DUAL BOUNDARY</span>
          <span className="text-white font-bold">{vehicle.speed} km/h</span>
        </div>
      </div>
    </div>
  );
};
export default PerceptionCanvas;
