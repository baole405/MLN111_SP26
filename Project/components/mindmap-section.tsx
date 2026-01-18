"use client"

import React from "react"

import { useCallback, useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    type Node,
    type Edge,
    Handle,
    Position,
    BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Node data for the mindmap
const nodeData: Record<
    string,
    { keyword: string; lifeExample: string; itExample: string }
> = {
    root: {
        keyword: "Phương pháp luận khoa học",
        lifeExample:
            "Cách tiếp cận toàn diện để hiểu và giải quyết mọi vấn đề trong cuộc sống.",
        itExample:
            "System thinking - nhìn nhận phần mềm như một hệ thống phức tạp với các thành phần tương tác.",
    },
    principles: {
        keyword: "Nền tảng tư duy",
        lifeExample: "Các quy tắc cơ bản để nhìn nhận thế giới một cách đúng đắn.",
        itExample: "Core principles trong software architecture: modularity, abstraction, encapsulation.",
    },
    connection: {
        keyword: "Mọi thứ liên kết",
        lifeExample: "Bạn không thể sống biệt lập - gia đình, bạn bè, xã hội đều ảnh hưởng đến bạn.",
        itExample: "Microservices: mỗi service độc lập nhưng phải giao tiếp với nhau qua API.",
    },
    development: {
        keyword: "Thay đổi là hằng số",
        lifeExample: "Bạn của 10 năm trước không còn giống bạn bây giờ - và điều đó là tốt.",
        itExample: "Continuous improvement: từ MVP đến product hoàn chỉnh qua nhiều iterations.",
    },
    laws: {
        keyword: "Động lực phát triển",
        lifeExample: "Ba quy luật giải thích tại sao và như thế nào mọi thứ thay đổi.",
        itExample: "Understanding why systems evolve: scaling needs, tech debt, market changes.",
    },
    quantQual: {
        keyword: "Tích lũy → Đột phá",
        lifeExample: "Học 100 giờ có thể không thấy tiến bộ, giờ thứ 101 bỗng bạn 'ngộ' ra.",
        itExample: "Refactoring dần dần đến khi cần redesign toàn bộ system.",
    },
    contradiction: {
        keyword: "Xung đột tạo tiến bộ",
        lifeExample: "Tranh luận với người khác quan điểm giúp bạn hiểu sâu hơn.",
        itExample: "Code review: ý kiến trái chiều dẫn đến solution tốt hơn.",
    },
    negation: {
        keyword: "Xoắn ốc đi lên",
        lifeExample: "Thất bại → Học hỏi → Thử lại tốt hơn → Thất bại ở level cao hơn → Lặp lại.",
        itExample: "Agile sprints: mỗi sprint phủ định sprint trước bằng improvements.",
    },
    categories: {
        keyword: "Công cụ phân tích",
        lifeExample: "6 cách nhìn một vấn đề từ các góc độ khác nhau.",
        itExample: "Different perspectives on code: performance, maintainability, security, UX...",
    },
    generalParticular: {
        keyword: "Abstract vs Concrete",
        lifeExample: "Quy tắc chung áp dụng vào hoàn cảnh cụ thể của bạn.",
        itExample: "Interface (general) → Implementation (particular).",
    },
    causeEffect: {
        keyword: "Input → Output",
        lifeExample: "Mọi kết quả đều có nguyên nhân - tìm root cause, không blame symptoms.",
        itExample: "Debugging: trace từ error back to root cause.",
    },
    necessaryAccidental: {
        keyword: "Chắc chắn vs May rủi",
        lifeExample: "Chuẩn bị cho cái tất nhiên, linh hoạt với cái ngẫu nhiên.",
        itExample: "Design for failure: system sẽ fail, chỉ là khi nào.",
    },
    contentForm: {
        keyword: "What vs How",
        lifeExample: "Thông điệp quan trọng, nhưng cách truyền đạt cũng quan trọng không kém.",
        itExample: "Business logic vs API design / UI presentation.",
    },
    essencePhenomenon: {
        keyword: "Gốc rễ vs Bề mặt",
        lifeExample: "Đừng judge book by its cover - nhưng cover vẫn quan trọng.",
        itExample: "Performance issue bề mặt có thể do architecture flaw ở gốc.",
    },
    possibilityReality: {
        keyword: "Could be vs Is",
        lifeExample: "Có tiềm năng chưa đủ - cần hành động để biến thành hiện thực.",
        itExample: "Feature idea (khả năng) → Shipped feature (hiện thực).",
    },
}

// Custom node component
function CustomNode({ data }: { data: { label: string; type: string; id: string } }) {
    const colorMap: Record<string, string> = {
        root: "bg-primary text-primary-foreground border-primary shadow-lg ring-4 ring-primary/10",
        principle: "bg-accent text-accent-foreground border-accent shadow-md",
        law: "bg-destructive text-destructive-foreground border-destructive shadow-sm",
        category: "bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-md transition-all",
    }

    const colors = colorMap[data.type] || colorMap.category

    return (
        <>
            <Handle type="target" position={Position.Top} className="!bg-primary !w-3 !h-3 !border-2 !border-background" />
            <div
                className={`px-4 py-3 rounded-xl border-2 shadow-md min-w-[120px] text-center font-medium text-sm ${colors}`}
            >
                {data.label}
            </div>
            <Handle type="source" position={Position.Bottom} className="!bg-primary !w-3 !h-3 !border-2 !border-background" />
        </>
    )
}

const nodeTypes = {
    custom: CustomNode,
}

// Initial nodes
const initialNodes: Node[] = [
    {
        id: "root",
        type: "custom",
        position: { x: 1000, y: 0 },
        data: { label: "Phép Biện Chứng Duy Vật", type: "root", id: "root" },
    },
    {
        id: "principles",
        type: "custom",
        position: { x: 300, y: 200 },
        data: { label: "2 Nguyên Lý", type: "principle", id: "principles" },
    },
    {
        id: "laws",
        type: "custom",
        position: { x: 1000, y: 200 },
        data: { label: "3 Quy Luật", type: "principle", id: "laws" },
    },
    {
        id: "categories",
        type: "custom",
        position: { x: 1700, y: 200 },
        data: { label: "6 Phạm Trù", type: "principle", id: "categories" },
    },
    // Principles children
    {
        id: "connection",
        type: "custom",
        position: { x: 100, y: 400 },
        data: { label: "Liên Hệ Phổ Biến", type: "law", id: "connection" },
    },
    {
        id: "development",
        type: "custom",
        position: { x: 500, y: 400 },
        data: { label: "Sự Phát Triển", type: "law", id: "development" },
    },
    // Laws children
    {
        id: "quantQual",
        type: "custom",
        position: { x: 800, y: 400 },
        data: { label: "Lượng - Chất", type: "law", id: "quantQual" },
    },
    {
        id: "contradiction",
        type: "custom",
        position: { x: 1000, y: 400 },
        data: { label: "Mâu Thuẫn", type: "law", id: "contradiction" },
    },
    {
        id: "negation",
        type: "custom",
        position: { x: 1200, y: 400 },
        data: { label: "Phủ Định", type: "law", id: "negation" },
    },
    // Categories children
    {
        id: "generalParticular",
        type: "custom",
        position: { x: 1500, y: 400 },
        data: { label: "Chung - Riêng", type: "category", id: "generalParticular" },
    },
    {
        id: "causeEffect",
        type: "custom",
        position: { x: 1700, y: 400 },
        data: { label: "Nhân - Quả", type: "category", id: "causeEffect" },
    },
    {
        id: "necessaryAccidental",
        type: "custom",
        position: { x: 1900, y: 400 },
        data: { label: "Tất Nhiên - Ngẫu Nhiên", type: "category", id: "necessaryAccidental" },
    },
    {
        id: "contentForm",
        type: "custom",
        position: { x: 1500, y: 550 },
        data: { label: "Nội Dung - Hình Thức", type: "category", id: "contentForm" },
    },
    {
        id: "essencePhenomenon",
        type: "custom",
        position: { x: 1700, y: 550 },
        data: { label: "Bản Chất - Hiện Tượng", type: "category", id: "essencePhenomenon" },
    },
    {
        id: "possibilityReality",
        type: "custom",
        position: { x: 1900, y: 550 },
        data: { label: "Khả Năng - Hiện Thực", type: "category", id: "possibilityReality" },
    },
]

// Initial edges
const initialEdges: Edge[] = [
    { id: "e-root-principles", source: "root", target: "principles", animated: true },
    { id: "e-root-laws", source: "root", target: "laws", animated: true },
    { id: "e-root-categories", source: "root", target: "categories", animated: true },
    { id: "e-principles-connection", source: "principles", target: "connection" },
    { id: "e-principles-development", source: "principles", target: "development" },
    { id: "e-laws-quantQual", source: "laws", target: "quantQual" },
    { id: "e-laws-contradiction", source: "laws", target: "contradiction" },
    { id: "e-laws-negation", source: "laws", target: "negation" },
    { id: "e-categories-generalParticular", source: "categories", target: "generalParticular" },
    { id: "e-categories-causeEffect", source: "categories", target: "causeEffect" },
    { id: "e-categories-necessaryAccidental", source: "categories", target: "necessaryAccidental" },
    { id: "e-categories-contentForm", source: "categories", target: "contentForm" },
    { id: "e-categories-essencePhenomenon", source: "categories", target: "essencePhenomenon" },
    { id: "e-categories-possibilityReality", source: "categories", target: "possibilityReality" },
]

export function MindMapSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    const [nodes] = useNodesState(initialNodes)
    const [edges] = useEdgesState(initialEdges)
    const [selectedNode, setSelectedNode] = useState<string | null>(null)

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node.id)
    }, [])

    const selectedData = selectedNode ? nodeData[selectedNode] : null
    const selectedLabel = selectedNode
        ? initialNodes.find((n) => n.id === selectedNode)?.data.label
        : null

    const defaultEdgeOptions = useMemo(
        () => ({
            style: { stroke: "#1a4d2e", strokeWidth: 2 },
            type: "smoothstep",
        }),
        []
    )

    return (
        <section id="mind-map" className="py-24 md:py-32 bg-background border-t border-border" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-accent font-medium tracking-wider uppercase text-sm">
                        Tổng Kết
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 text-balance">
                        Bản Đồ Tư Duy
                    </h2>
                    <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
                        Click vào các node để xem chi tiết. Kéo thả để khám phá. Zoom để xem toàn cảnh.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group"
                >
                    <div className="h-[500px] md:h-[600px] bg-muted/30 rounded-3xl border border-border overflow-hidden shadow-2xl">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodeClick={onNodeClick}
                            nodeTypes={nodeTypes}
                            defaultEdgeOptions={defaultEdgeOptions}
                            fitView
                            fitViewOptions={{ padding: 0.2 }}
                            minZoom={0.3}
                            maxZoom={1.5}
                            attributionPosition="bottom-left"
                        >
                            <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#1a4d2e20" />
                            <Controls className="!bg-card !border-border !shadow-sm !rounded-lg !m-4" />
                        </ReactFlow>
                    </div>

                    {/* Side Sheet / Modal */}
                    {selectedNode && selectedData && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute top-4 right-4 w-80 bg-card/95 backdrop-blur-md rounded-2xl shadow-xl border border-border/50 p-6 z-10"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="font-serif text-lg font-bold text-primary pr-4">
                                    {selectedLabel}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="shrink-0 -mt-1 -mr-2 text-muted-foreground hover:text-foreground"
                                    onClick={() => setSelectedNode(null)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="text-accent text-xs font-semibold uppercase tracking-wider">
                                        Keyword
                                    </span>
                                    <p className="text-foreground font-medium mt-1">{selectedData.keyword}</p>
                                </div>

                                <div>
                                    <span className="text-destructive text-xs font-semibold uppercase tracking-wider">
                                        Ví dụ đời sống
                                    </span>
                                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                                        {selectedData.lifeExample}
                                    </p>
                                </div>

                                <div>
                                    <span className="text-primary/60 text-xs font-semibold uppercase tracking-wider">
                                        IT Example
                                    </span>
                                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                                        {selectedData.itExample}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
