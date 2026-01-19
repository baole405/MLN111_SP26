"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Trophy, RotateCcw, Timer, CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
}

const questions: Question[] = [
    {
        id: 1,
        question:
            'Theo quy luật "Lượng - Chất", điều gì sẽ xảy ra khi sự tích lũy về lượng đạt đến "điểm nút"?',
        options: [
            "Sự vật dừng lại, không thay đổi",
            "Xảy ra bước nhảy, thay đổi về chất",
            "Sự vật quay về trạng thái ban đầu",
            "Lượng tiếp tục tích lũy vô hạn",
        ],
        correctAnswer: 1,
        explanation:
            "Khi lượng tích lũy đến điểm nút (giới hạn), sẽ xảy ra bước nhảy làm thay đổi về chất. Ví dụ: nước đun đến 100°C sẽ chuyển thành hơi.",
    },
    {
        id: 2,
        question:
            'Nguyên lý "Mối liên hệ phổ biến" khẳng định điều gì về các sự vật, hiện tượng?',
        options: [
            "Mọi sự vật đều tồn tại độc lập, không liên quan đến nhau",
            "Chỉ những sự vật gần nhau mới có liên hệ",
            "Mọi sự vật đều tồn tại trong mối liên hệ, tác động qua lại lẫn nhau",
            "Liên hệ chỉ tồn tại trong tư duy con người",
        ],
        correctAnswer: 2,
        explanation:
            "Nguyên lý này khẳng định không có sự vật nào tồn tại biệt lập. Mọi thứ đều có mối liên hệ, ảnh hưởng lẫn nhau như một hệ sinh thái.",
    },
    {
        id: 3,
        question:
            "Trong cặp phạm trù 'Bản chất - Hiện tượng', đâu là nhận định đúng?",
        options: [
            "Bản chất và hiện tượng luôn thống nhất, không mâu thuẫn",
            "Hiện tượng có thể che giấu hoặc bóp méo bản chất",
            "Bản chất thay đổi nhanh hơn hiện tượng",
            "Chỉ cần quan sát hiện tượng là hiểu được bản chất",
        ],
        correctAnswer: 1,
        explanation:
            "Hiện tượng là biểu hiện bên ngoài của bản chất, nhưng có thể không phản ánh đúng hoàn toàn. Cần phân tích sâu để thấy bản chất thực sự.",
    },
    {
        id: 4,
        question:
            'Quy luật "Phủ định của phủ định" mô tả sự phát triển theo hình thức nào?',
        options: [
            "Đường thẳng đi lên",
            "Vòng tròn lặp lại",
            "Đường xoáy ốc (spiral) đi lên",
            "Đường zigzag ngẫu nhiên",
        ],
        correctAnswer: 2,
        explanation:
            "Sự phát triển diễn ra theo đường xoáy ốc: cái mới phủ định cái cũ, rồi bị phủ định tiếp, nhưng mỗi vòng xoắn đều ở mức cao hơn, kế thừa tinh hoa của vòng trước.",
    },
]

type GameState = "start" | "playing" | "result"

function ConfettiEffect() {
    useEffect(() => {
        const duration = 2000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ["#b8860b", "#1a4d2e", "#fdfbf7"],
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ["#b8860b", "#1a4d2e", "#fdfbf7"],
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    return null
}

export function ArenaSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const [gameState, setGameState] = useState<GameState>("start")
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(15)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)

    const handleAnswer = useCallback(
        (answerIndex: number) => {
            if (selectedAnswer !== null) return

            setSelectedAnswer(answerIndex)
            const isCorrect = answerIndex === questions[currentQuestion].correctAnswer

            if (isCorrect) {
                setScore((prev) => prev + 1)
                setShowConfetti(true)
                setTimeout(() => setShowConfetti(false), 2000)
            } else {
                setShowExplanation(true)
            }
        },
        [currentQuestion, selectedAnswer]
    )

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setTimeLeft(15)
        } else {
            setGameState("result")
        }
    }

    // Timer effect
    useEffect(() => {
        if (gameState !== "playing" || selectedAnswer !== null) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleAnswer(-1) // Time's up, wrong answer
                    return 15
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [gameState, selectedAnswer, handleAnswer]) // Keep timer running until an answer is selected

    const startGame = () => {
        setGameState("playing")
        setCurrentQuestion(0)
        setScore(0)
        setTimeLeft(15)
        setSelectedAnswer(null)
        setShowExplanation(false)
    }

    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <section
            id="arena"
            className="py-24 md:py-32 bg-primary"
            ref={sectionRef}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-accent font-medium tracking-wider uppercase text-sm">
                        Kiểm Tra Kiến Thức
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 text-balance">
                        Thử Thách Triết Gia Tập Sự
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary-foreground/10"
                >
                    <AnimatePresence mode="wait">
                        {/* Start Screen */}
                        {gameState === "start" && (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12"
                            >
                                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trophy className="w-10 h-10 text-accent" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-primary-foreground mb-4">
                                    Sẵn sàng thử thách?
                                </h3>
                                <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
                                    4 câu hỏi về Phép Biện Chứng Duy Vật. Mỗi câu có 15 giây để trả
                                    lời. Bạn có thể đạt điểm tuyệt đối không?
                                </p>
                                <Button
                                    onClick={startGame}
                                    size="lg"
                                    className="bg-accent hover:bg-accent/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full"
                                >
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Bắt Đầu
                                </Button>
                            </motion.div>
                        )}

                        {/* Playing Screen */}
                        {gameState === "playing" && (
                            <motion.div
                                key="playing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {showConfetti && <ConfettiEffect />}

                                {/* Progress bar */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between text-primary-foreground/70 text-sm mb-2">
                                        <span>
                                            Câu {currentQuestion + 1}/{questions.length}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Timer className="w-4 h-4" />
                                            {timeLeft}s
                                        </span>
                                    </div>
                                    <div className="h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-accent"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>

                                {/* Timer bar */}
                                <div className="h-1 bg-primary-foreground/10 rounded-full overflow-hidden mb-8">
                                    <motion.div
                                        className={`h-full ${timeLeft <= 5 ? "bg-destructive" : "bg-primary-foreground/30"
                                            }`}
                                        initial={{ width: "100%" }}
                                        animate={{ width: `${(timeLeft / 15) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>

                                {/* Question */}
                                <h3 className="text-xl md:text-2xl font-semibold text-primary-foreground mb-8 leading-relaxed">
                                    {question.question}
                                </h3>

                                {/* Options */}
                                <div className="grid gap-4">
                                    {question.options.map((option, index) => {
                                        const isSelected = selectedAnswer === index
                                        const isCorrect = index === question.correctAnswer
                                        const showResult = selectedAnswer !== null

                                        let buttonClass =
                                            "w-full p-5 text-left rounded-xl border-2 transition-all font-medium "

                                        if (showResult) {
                                            if (isCorrect) {
                                                buttonClass +=
                                                    "bg-green-500/20 border-green-500 text-primary-foreground"
                                            } else if (isSelected && !isCorrect) {
                                                buttonClass += "bg-destructive/20 border-destructive text-primary-foreground"
                                            } else {
                                                buttonClass +=
                                                    "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground/50"
                                            }
                                        } else {
                                            buttonClass +=
                                                "bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:border-accent cursor-pointer"
                                        }

                                        return (
                                            <motion.button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                disabled={selectedAnswer !== null}
                                                className={buttonClass}
                                                whileHover={selectedAnswer === null ? { scale: 1.01 } : {}}
                                                whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                                                animate={
                                                    isSelected && !isCorrect
                                                        ? { x: [0, -10, 10, -10, 10, 0] }
                                                        : {}
                                                }
                                                transition={{ duration: 0.4 }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {showResult && isCorrect && (
                                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                    )}
                                                    {showResult && isSelected && !isCorrect && (
                                                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                                    )}
                                                    <span>{option}</span>
                                                </div>
                                            </motion.button>
                                        )
                                    })}
                                </div>

                                {/* Explanation */}
                                <AnimatePresence>
                                    {showExplanation && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-6 p-5 bg-destructive/20 border border-destructive/30 rounded-xl"
                                        >
                                            <p className="text-primary-foreground/90 text-sm leading-relaxed">
                                                <strong className="text-destructive">Giải thích:</strong>{" "}
                                                {question.explanation}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Next Button */}
                                {selectedAnswer !== null && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-8 flex justify-end"
                                    >
                                        <Button
                                            onClick={handleNextQuestion}
                                            size="lg"
                                            className="bg-accent hover:bg-accent/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl"
                                        >
                                            {currentQuestion < questions.length - 1 ? "Câu Tiếp Theo" : "Xem Kết Quả"}
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* Result Screen */}
                        {gameState === "result" && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-12"
                            >
                                {score === questions.length && <ConfettiEffect />}

                                <div
                                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${score >= 3
                                        ? "bg-accent/20"
                                        : score >= 2
                                            ? "bg-destructive/20"
                                            : "bg-primary-foreground/10"
                                        }`}
                                >
                                    <Trophy
                                        className={`w-12 h-12 ${score >= 3
                                            ? "text-accent"
                                            : score >= 2
                                                ? "text-destructive"
                                                : "text-primary-foreground/50"
                                            }`}
                                    />
                                </div>

                                <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-2">
                                    {score === questions.length
                                        ? "Xuất Sắc!"
                                        : score >= 3
                                            ? "Tuyệt Vời!"
                                            : score >= 2
                                                ? "Khá Tốt!"
                                                : "Cần Cố Gắng Hơn!"}
                                </h3>

                                <p className="text-5xl font-bold text-accent mb-4">
                                    {score}/{questions.length}
                                </p>

                                <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
                                    {score === questions.length
                                        ? "Bạn đã nắm vững kiến thức về Phép Biện Chứng Duy Vật!"
                                        : score >= 2
                                            ? "Bạn đã hiểu cơ bản. Hãy ôn lại các phần còn thiếu nhé!"
                                            : "Đừng nản, hãy đọc lại nội dung và thử lại!"}
                                </p>

                                <Button
                                    onClick={startGame}
                                    size="lg"
                                    className="bg-accent hover:bg-accent/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full"
                                >
                                    <RotateCcw className="w-5 h-5 mr-2" />
                                    Chơi Lại
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
