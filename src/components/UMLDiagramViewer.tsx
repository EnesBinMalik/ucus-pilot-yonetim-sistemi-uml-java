import React, { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Info,
  CheckCircle2,
  FileCode2,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  UML_CLASSES,
  UML_RELATIONSHIPS,
  UMLClassNode,
  UMLRelationship,
} from '../data/umlDiagramData';

interface Props {
  onSelectJavaFile?: (fileName: string) => void;
}

export const UMLDiagramViewer: React.FC<Props> = ({ onSelectJavaFile }) => {
  const [scale, setScale] = useState<number>(0.85);
  const [selectedClass, setSelectedClass] = useState<UMLClassNode | null>(UML_CLASSES[0]);
  const [hoveredClassId, setHoveredClassId] = useState<string | null>(null);
  const [hoveredRelId, setHoveredRelId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.15, 0.45));
  const handleResetZoom = () => setScale(0.85);

  // Helper to calculate connector points between 2 boxes
  const getConnectorPoints = (rel: UMLRelationship) => {
    const fromNode = UML_CLASSES.find(c => c.id === rel.from);
    const toNode = UML_CLASSES.find(c => c.id === rel.to);

    if (!fromNode || !toNode) return { path: '', midX: 0, midY: 0, startX: 0, startY: 0, endX: 0, endY: 0 };

    const fromCenterX = fromNode.x + fromNode.width / 2;
    const fromCenterY = fromNode.y + fromNode.height / 2;
    const toCenterX = toNode.x + toNode.width / 2;
    const toCenterY = toNode.y + toNode.height / 2;

    let startX = fromCenterX;
    let startY = fromCenterY;
    let endX = toCenterX;
    let endY = toCenterY;

    // Determine exit edge from 'fromNode' and entry edge to 'toNode'
    const dx = toCenterX - fromCenterX;
    const dy = toCenterY - fromCenterY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        startX = fromNode.x + fromNode.width;
        startY = fromCenterY;
        endX = toNode.x;
        endY = toCenterY;
      } else {
        startX = fromNode.x;
        startY = fromCenterY;
        endX = toNode.x + toNode.width;
        endY = toCenterY;
      }
    } else {
      if (dy > 0) {
        startX = fromCenterX;
        startY = fromNode.y + fromNode.height;
        endX = toCenterX;
        endY = toNode.y;
      } else {
        startX = fromCenterX;
        startY = fromNode.y;
        endX = toCenterX;
        endY = toNode.y + toNode.height;
      }
    }

    // Cubic bezier path
    const controlOffset = Math.min(Math.abs(dx) * 0.4, 80);
    const c1x = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? startX + controlOffset : startX - controlOffset) : startX;
    const c1y = Math.abs(dy) >= Math.abs(dx) ? (dy > 0 ? startY + controlOffset : startY - controlOffset) : startY;
    const c2x = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? endX - controlOffset : endX + controlOffset) : endX;
    const c2y = Math.abs(dy) >= Math.abs(dx) ? (dy > 0 ? endY - controlOffset : endY + controlOffset) : endY;

    const path = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    return { path, midX, midY, startX, startY, endX, endY };
  };

  const exportSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'UML_Sinif_Diyagrami_Enes_Ozturk.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportPng = () => {
    if (!svgRef.current) return;
    setIsExporting(true);
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 1600;
    canvas.height = 1350;

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'UML_Sinif_Diyagrami_Enes_Ozturk.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(url);
      setIsExporting(false);
    };
    img.src = url;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-[calc(100vh-140px)] min-h-[750px]">
      {/* Canvas Area */}
      <div className="flex-1 flex flex-col bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
        {/* Canvas Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/70 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              UML 2.5 Sınıf Diyagramı
            </span>
            <span className="text-slate-500 text-xs">·</span>
            <span className="text-xs text-slate-400 font-mono">Standart UML Notasyonu</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Uzaklaştır"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 min-w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Yakınlaştır"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Görünümü Sıfırla"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              onClick={exportSvg}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Vektör SVG formatında indir"
            >
              <Download className="w-3.5 h-3.5" />
              SVG İndir
            </button>

            <button
              onClick={exportPng}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-md transition-colors"
              title="Yüksek çözünürlüklü PNG indir"
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? 'Aktarılıyor...' : 'PNG İndir'}
            </button>
          </div>
        </div>

        {/* Scrollable / Scalable SVG Canvas */}
        <div className="flex-1 overflow-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] p-6 relative">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              transition: 'transform 0.15s ease-out',
              width: 1250,
              height: 1220,
            }}
            className="relative"
          >
            <svg
              ref={svgRef}
              width="1250"
              height="1220"
              viewBox="0 0 1250 1220"
              className="overflow-visible select-none"
            >
              <defs>
                {/* Arrow markers */}
                <marker
                  id="uml-arrow"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9" fill="none" stroke="#38bdf8" strokeWidth="1.6" />
                </marker>

                <marker
                  id="uml-arrow-default"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9" fill="none" stroke="#64748b" strokeWidth="1.6" />
                </marker>

                {/* Composition diamond (filled) */}
                <marker
                  id="uml-composition"
                  viewBox="0 0 16 16"
                  refX="0"
                  refY="8"
                  markerWidth="14"
                  markerHeight="14"
                  orient="auto"
                >
                  <polygon points="0,8 8,3 16,8 8,13" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
                </marker>

                {/* Aggregation diamond (hollow) */}
                <marker
                  id="uml-aggregation"
                  viewBox="0 0 16 16"
                  refX="0"
                  refY="8"
                  markerWidth="14"
                  markerHeight="14"
                  orient="auto"
                >
                  <polygon points="0,8 8,3 16,8 8,13" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
                </marker>

                {/* Subtle drop shadows */}
                <filter id="shadow" x="-5%" y="-5%" width="115%" height="115%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.45" />
                </filter>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.75" />
                </filter>
              </defs>

              {/* Watermark & Author Header inside SVG for clean export */}
              <g transform="translate(40, 20)">
                <text x="0" y="0" fill="#f8fafc" fontSize="18" fontWeight="bold" fontFamily="Plus Jakarta Sans">
                  Uçuş ve Pilot Yönetim Sistemi — UML Sınıf Diyagramı
                </text>
                <text x="0" y="20" fill="#38bdf8" fontSize="13" fontWeight="600" fontFamily="JetBrains Mono">
                  Yazılım & Sistem Mimarı: Enes Öztürk
                </text>
                <text x="460" y="20" fill="#64748b" fontSize="11" fontFamily="Plus Jakarta Sans">
                  UML 2.5 Specification · Java 17/21 Object-Oriented Domain Architecture
                </text>
              </g>

              {/* Relationship Lines */}
              <g className="relationships">
                {UML_RELATIONSHIPS.map(rel => {
                  const { path, midX, midY, startX, startY, endX, endY } = getConnectorPoints(rel);
                  const isHovered =
                    hoveredRelId === rel.id ||
                    hoveredClassId === rel.from ||
                    hoveredClassId === rel.to;
                  const isSelected =
                    selectedClass?.id === rel.from || selectedClass?.id === rel.to;

                  const strokeColor = isSelected
                    ? '#38bdf8'
                    : isHovered
                    ? '#0284c7'
                    : '#475569';
                  const strokeWidth = isSelected || isHovered ? 2.4 : 1.6;

                  // Marker configuration
                  let markerStart = '';
                  let markerEnd = 'url(#uml-arrow-default)';

                  if (rel.type === 'composition') {
                    markerStart = 'url(#uml-composition)';
                    markerEnd = '';
                  } else if (rel.type === 'aggregation') {
                    markerStart = 'url(#uml-aggregation)';
                    markerEnd = '';
                  } else if (rel.type === 'association') {
                    markerEnd = isSelected || isHovered ? 'url(#uml-arrow)' : 'url(#uml-arrow-default)';
                  }

                  return (
                    <g
                      key={rel.id}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredRelId(rel.id)}
                      onMouseLeave={() => setHoveredRelId(null)}
                    >
                      {/* Invisible wider stroke for easy hover */}
                      <path
                        d={path}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="16"
                      />

                      {/* Visible relation line */}
                      <path
                        d={path}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={rel.type === 'dependency' ? '5,5' : undefined}
                        markerStart={markerStart}
                        markerEnd={markerEnd}
                        filter={isSelected ? 'url(#glow)' : undefined}
                      />

                      {/* Relation Label & Multiplicities */}
                      {rel.label && (
                        <g transform={`translate(${midX}, ${midY - 8})`}>
                          <rect
                            x="-65"
                            y="-11"
                            width="130"
                            height="18"
                            rx="4"
                            fill="#090d16"
                            stroke={isSelected ? '#38bdf8' : '#334155'}
                            strokeWidth="1"
                            opacity="0.95"
                          />
                          <text
                            x="0"
                            y="2"
                            textAnchor="middle"
                            fill={isSelected ? '#7dd3fc' : '#cbd5e1'}
                            fontSize="10"
                            fontWeight="500"
                            fontFamily="JetBrains Mono"
                          >
                            {rel.label}
                          </text>
                        </g>
                      )}

                      {/* Multiplicity Labels */}
                      {rel.fromMultiplicity && (
                        <text
                          x={startX + (rel.from === 'Airline' ? 12 : -16)}
                          y={startY - 6}
                          fill="#94a3b8"
                          fontSize="10"
                          fontWeight="600"
                          fontFamily="JetBrains Mono"
                        >
                          {rel.fromMultiplicity}
                        </text>
                      )}
                      {rel.toMultiplicity && (
                        <text
                          x={endX + 8}
                          y={endY - 6}
                          fill="#94a3b8"
                          fontSize="10"
                          fontWeight="600"
                          fontFamily="JetBrains Mono"
                        >
                          {rel.toMultiplicity}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* UML Class Nodes */}
              {UML_CLASSES.map(node => {
                const isSelected = selectedClass?.id === node.id;
                const isHovered = hoveredClassId === node.id;

                const headerColor =
                  node.colorTheme === 'blue'
                    ? '#0284c7'
                    : node.colorTheme === 'cyan'
                    ? '#0891b2'
                    : node.colorTheme === 'purple'
                    ? '#7c3aed'
                    : node.colorTheme === 'emerald'
                    ? '#059669'
                    : node.colorTheme === 'amber'
                    ? '#d97706'
                    : '#e11d48';

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer transition-all duration-150"
                    onClick={() => setSelectedClass(node)}
                    onMouseEnter={() => setHoveredClassId(node.id)}
                    onMouseLeave={() => setHoveredClassId(null)}
                    filter={isSelected ? 'url(#glow)' : 'url(#shadow)'}
                  >
                    {/* Box Background */}
                    <rect
                      x="0"
                      y="0"
                      width={node.width}
                      height={node.height}
                      rx="8"
                      fill="#0b1120"
                      stroke={isSelected ? '#38bdf8' : isHovered ? '#0284c7' : '#1e293b'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />

                    {/* Class Header Compartment */}
                    <path
                      d={`M 0 8 Q 0 0 8 0 L ${node.width - 8} 0 Q ${node.width} 0 ${node.width} 8 L ${node.width} 46 L 0 46 Z`}
                      fill={headerColor}
                      fillOpacity={isSelected ? '0.28' : '0.18'}
                    />
                    <line
                      x1="0"
                      y1="46"
                      x2={node.width}
                      y2="46"
                      stroke={isSelected ? '#38bdf8' : '#334155'}
                      strokeWidth="1.5"
                    />

                    {/* Stereotype */}
                    {node.stereotype && (
                      <text
                        x={node.width / 2}
                        y="18"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="10"
                        fontStyle="italic"
                        fontFamily="JetBrains Mono"
                      >
                        «{node.stereotype}»
                      </text>
                    )}

                    {/* Class Name */}
                    <text
                      x={node.width / 2}
                      y={node.stereotype ? '36' : '28'}
                      textAnchor="middle"
                      fill="#f8fafc"
                      fontSize="14"
                      fontWeight="700"
                      fontFamily="Plus Jakarta Sans"
                    >
                      {node.name}
                    </text>

                    {/* Attributes Compartment */}
                    <g transform="translate(12, 60)">
                      {node.attributes.map((attr, idx) => (
                        <text
                          key={idx}
                          x="0"
                          y={idx * 18}
                          fill="#cbd5e1"
                          fontSize="11"
                          fontFamily="JetBrains Mono"
                        >
                          <tspan fill={attr.visibility === '+' ? '#34d399' : attr.visibility === '-' ? '#f87171' : '#fbbf24'}>
                            {attr.visibility}{' '}
                          </tspan>
                          <tspan fill="#f1f5f9">{attr.name}</tspan>
                          <tspan fill="#64748b">: </tspan>
                          <tspan fill="#38bdf8">{attr.type}</tspan>
                        </text>
                      ))}
                    </g>

                    {/* Divider between attributes & methods */}
                    {node.methods.length > 0 && (
                      <>
                        <line
                          x1="0"
                          y1={60 + node.attributes.length * 18 + 6}
                          x2={node.width}
                          y2={60 + node.attributes.length * 18 + 6}
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                        {/* Methods Compartment */}
                        <g transform={`translate(12, ${60 + node.attributes.length * 18 + 24})`}>
                          {node.methods.map((method, idx) => (
                            <text
                              key={idx}
                              x="0"
                              y={idx * 18}
                              fill="#cbd5e1"
                              fontSize="11"
                              fontFamily="JetBrains Mono"
                            >
                              <tspan fill={method.visibility === '+' ? '#34d399' : '#f87171'}>
                                {method.visibility}{' '}
                              </tspan>
                              <tspan fill="#e2e8f0">{method.name}</tspan>
                              <tspan fill="#94a3b8">({method.parameters})</tspan>
                              <tspan fill="#64748b">: </tspan>
                              <tspan fill="#a78bfa">{method.returnType}</tspan>
                            </text>
                          ))}
                        </g>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Watermark Signature Box bottom right */}
              <g transform="translate(860, 1020)">
                <rect
                  x="0"
                  y="0"
                  width="350"
                  height="140"
                  rx="10"
                  fill="#0b1120"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  opacity="0.95"
                />
                <text x="20" y="32" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="Plus Jakarta Sans">
                  ONAYLANMIŞ SİSTEM MİMARİSİ
                </text>
                <text x="20" y="56" fill="#f8fafc" fontSize="15" fontWeight="bold" fontFamily="Plus Jakarta Sans">
                  Enes Öztürk
                </text>
                <text x="20" y="78" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono">
                  Uçuş & Pilot Yönetim Sistemi v1.0
                </text>
                <text x="20" y="98" fill="#64748b" fontSize="10" fontFamily="Plus Jakarta Sans">
                  OOP İlkeleri: Encapsulation, Composition & Invariant Check
                </text>
                <text x="20" y="118" fill="#10b981" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono">
                  ✓ Tüm Gereksinimler Karşılandı
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Inspector / Details Panel */}
      <div className="w-full lg:w-96 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Sınıf Detay Denetleyicisi</h3>
          </div>
          {selectedClass && (
            <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              {selectedClass.name}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedClass ? (
            <>
              {/* Class Title & Summary */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-base font-bold text-white">{selectedClass.name}</h4>
                  <span className="text-xs font-mono text-slate-400">
                    {selectedClass.stereotype ? `«${selectedClass.stereotype}»` : 'class'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedClass.descriptionTr}
                </p>
              </div>

              {/* Prompt Requirements Satisfied */}
              {selectedClass.rulesHighlightTr && selectedClass.rulesHighlightTr.length > 0 && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <div className="text-xs font-semibold text-sky-300 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    Kullanıcı İsteri Karşılığı
                  </div>
                  <ul className="space-y-1.5">
                    {selectedClass.rulesHighlightTr.map((rule, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Attributes List */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                  Öznitelikler (Attributes)
                </div>
                <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 font-mono text-xs">
                  {selectedClass.attributes.map((attr, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5">
                      <span className="text-slate-200">
                        <span className={attr.visibility === '+' ? 'text-emerald-400' : attr.visibility === '-' ? 'text-rose-400' : 'text-amber-400'}>
                          {attr.visibility}
                        </span>{' '}
                        {attr.name}
                      </span>
                      <span className="text-sky-400 text-[11px]">{attr.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Methods List */}
              {selectedClass.methods.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Metotlar (Methods)
                  </div>
                  <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 font-mono text-xs">
                    {selectedClass.methods.map((method, idx) => (
                      <div key={idx} className="py-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-200 font-medium">
                            <span className="text-emerald-400">{method.visibility}</span> {method.name}
                          </span>
                          <span className="text-purple-400 text-[11px]">{method.returnType}</span>
                        </div>
                        {method.parameters && (
                          <div className="text-[10px] text-slate-500 pl-3">
                            ({method.parameters})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Connected Relationships */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                  İlişkiler (Relationships)
                </div>
                <div className="space-y-1.5">
                  {UML_RELATIONSHIPS.filter(
                    r => r.from === selectedClass.id || r.to === selectedClass.id
                  ).map(rel => (
                    <div
                      key={rel.id}
                      className="p-2 bg-slate-950 border border-slate-800 rounded text-xs space-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sky-300">
                          {rel.from} → {rel.to}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          {rel.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{rel.descriptionTr}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Jump to Java Code */}
              <button
                onClick={() => onSelectJavaFile && onSelectJavaFile(selectedClass.javaFileName)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition-colors mt-2"
              >
                <FileCode2 className="w-4 h-4" />
                Java Kaynak Kodunu İncele ({selectedClass.javaFileName})
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Detayları ve Java kodunu görüntülemek için diyagramdan bir sınıfa tıklayın.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
