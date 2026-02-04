import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2, Search } from 'lucide-react';
import api from '../utils/api';

const WordList = () => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchWords();
    }, []);

    const fetchWords = async () => {
        try {
            const res = await api.get('/words');
            setWords(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteWord = async (id) => {
        if (!confirm('Delete this word?')) return;
        try {
            await api.delete(`/words/${id}`);
            setWords(words.filter(w => w._id !== id));
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const filteredWords = words.filter(w => 
        w.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
        w.meaning.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Your Vocabulary</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    <input 
                        className="bg-gray-800 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                        placeholder="Search words..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-400 mt-20">Loading words...</div>
            ) : filteredWords.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">No words found. Add some!</div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredWords.map(word => (
                        <WordCard key={word._id} word={word} onDelete={deleteWord} />
                    ))}
                </div>
            )}
        </div>
    );
};

const WordCard = ({ word, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            layout
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors"
        >
            <div 
                className="p-4 cursor-pointer flex justify-between items-start"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <h3 className="text-xl font-bold text-white">{word.word}</h3>
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">{word.type}</span>
                </div>
                <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-gray-500"
                >
                    <ChevronDown size={20} />
                </motion.div>
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-800/50 px-4 pb-4 border-t border-gray-800"
                    >
                        <div className="pt-3">
                            <p className="text-gray-300 font-medium">{word.meaning}</p>
                            {word.example && (
                                <p className="text-gray-500 italic mt-2 text-sm">"{word.example}"</p>
                            )}
                            <div className="mt-4 flex justify-end">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDelete(word._id); }} 
                                    className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default WordList;
