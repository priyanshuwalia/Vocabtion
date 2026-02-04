import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { motion } from 'framer-motion';

const AddWordForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        word: '',
        type: 'noun', // default
        meaning: '',
        example: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/words', formData);
            navigate('/'); // Redirect to list
        } catch (error) {
            console.error("Error adding word:", error);
            alert("Failed to add word. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-xl"
        >
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                Add New Word
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-400 mb-1 text-sm">Word</label>
                    <input 
                        name="word"
                        value={formData.word} 
                        onChange={handleChange}
                        className="input-field" 
                        placeholder="e.g. Ephemeral"
                        required
                        autoFocus
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-1 text-sm">Type</label>
                    <select 
                        name="type"
                        value={formData.type} 
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="noun">Noun</option>
                        <option value="verb">Verb</option>
                        <option value="adjective">Adjective</option>
                        <option value="adverb">Adverb</option>
                        <option value="idiom">Idiom</option>
                        <option value="phrase">Phrase</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-400 mb-1 text-sm">Meaning</label>
                    <textarea 
                        name="meaning"
                        value={formData.meaning} 
                        onChange={handleChange}
                        className="input-field min-h-[100px]" 
                        placeholder="Describe the meaning..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-400 mb-1 text-sm">Sentence (Optional)</label>
                    <textarea 
                        name="example"
                        value={formData.example} 
                        onChange={handleChange}
                        className="input-field" 
                        placeholder="Use it in a sentence..."
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                    {loading ? 'Saving...' : 'Save Word'}
                </button>
            </form>
        </motion.div>
    );
};

export default AddWordForm;
