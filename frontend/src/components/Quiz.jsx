import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Check, X, Eye } from 'lucide-react';
import api from '../utils/api';

const Quiz = () => {
    const [words, setWords] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const res = await api.get('/words');
            // Simple shuffle
            const shuffled = res.data.sort(() => 0.5 - Math.random());
            setWords(shuffled);
            if (shuffled.length > 0) setCurrentCard(shuffled[0]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        // Just pick next random or rotate
        const nextIndex = (words.indexOf(currentCard) + 1) % words.length;
        setCurrentCard(words[nextIndex]);
        setShowAnswer(false);
    };

    if (loading) return <div className="text-center mt-20 text-gray-400">Loading quiz...</div>;
    if (words.length === 0) return <div className="text-center mt-20 text-gray-500">No words to quiz. Add some first!</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-200 mb-8">Flashcard Quiz</h2>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentCard._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-[300px] bg-gray-900 border border-gray-700 rounded-2xl flex flex-col items-center justify-center p-8 relative shadow-2xl"
                >
                     <span className="absolute top-4 right-4 text-xs font-mono text-gray-600 uppercase border border-gray-800 px-2 py-1 rounded">
                        {currentCard.type}
                    </span>

                    <h1 className="text-4xl font-bold text-white mb-6">
                        {currentCard.word}
                    </h1>

                    {!showAnswer ? (
                        <button 
                            onClick={() => setShowAnswer(true)}
                            className="bg-gray-800 hover:bg-gray-700 text-blue-400 px-6 py-2 rounded-full flex items-center gap-2 transition-all mt-4"
                        >
                            <Eye size={18} /> Show Meaning
                        </button>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full"
                        >
                            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 mb-6">
                                <p className="text-xl text-gray-200 font-medium mb-3">{currentCard.meaning}</p>
                                {currentCard.example && (
                                    <p className="text-gray-500 italic">"{currentCard.example}"</p>
                                )}
                            </div>
                            
                            <div className="flex gap-4 justify-center">
                                <button 
                                    onClick={handleNext} 
                                    className="bg-red-900/30 hover:bg-red-900/50 text-red-300 px-6 py-3 rounded-xl flex flex-col items-center min-w-[100px] border border-red-900/50 transition-all"
                                >
                                    <X size={24} className="mb-1" />
                                    <span className="text-sm font-bold">Again</span>
                                </button>
                                <button 
                                    onClick={handleNext} 
                                    className="bg-green-900/30 hover:bg-green-900/50 text-green-300 px-6 py-3 rounded-xl flex flex-col items-center min-w-[100px] border border-green-900/50 transition-all"
                                >
                                    <Check size={24} className="mb-1" />
                                    <span className="text-sm font-bold">Easy</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 text-gray-600 text-sm">
                Card {words.indexOf(currentCard) + 1} of {words.length}
            </div>
        </div>
    );
};

export default Quiz;
