import React, { useState, useEffect } from 'react';
import { feedbackService } from '../services/feedbackService';
import { toast } from 'react-hot-toast';
import { Trash2, MessageSquare, Calendar, User, Reply, X } from 'lucide-react';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [replyLoading, setReplyLoading] = useState(false);

    const fetchFeedback = async () => {
        try {
            const response = await feedbackService.getAll();
            setFeedbacks(response.data);
        } catch (error) {
            console.error("Error fetching feedback:", error);
            toast.error("Failed to load feedback");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;

        try {
            await feedbackService.delete(id);
            toast.success("Feedback deleted successfully");
            setFeedbacks(feedbacks.filter(f => f._id !== id));
        } catch (error) {
            console.error("Error deleting feedback:", error);
            toast.error("Failed to delete feedback");
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setReplyLoading(true);
        try {
            const response = await feedbackService.reply(replyingTo, replyText);
            toast.success("Reply sent successfully");
            setFeedbacks(feedbacks.map(f => 
                f._id === replyingTo ? response.data : f
            ));
            setReplyingTo(null);
            setReplyText("");
        } catch (error) {
            console.error("Error sending reply:", error);
            toast.error("Failed to send reply");
        } finally {
            setReplyLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">User Feedback</h1>
                <p className="text-gray-500 mt-1">View and manage user feedback and suggestions</p>
            </div>

            {feedbacks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No feedback yet</h3>
                    <p className="text-gray-500">When users submit feedback, it will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {feedbacks.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-rose-50 rounded-lg">
                                        <MessageSquare size={20} className="text-rose-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-900">{item.user?.name || "Unknown User"}</h4>
                                        <p className="text-xs text-gray-500">{item.user?.email}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Delete feedback"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            
                            <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed flex-grow">
                                {item.feedback}
                            </p>
                            
                            {item.response && (
                                <div className="mt-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1">
                                        <Reply size={12} /> Admin Response
                                    </p>
                                    <p className="text-sm text-gray-700">{item.response}</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                                <div className="flex items-center">
                                    <Calendar size={14} className="mr-1.5" />
                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                                {!item.response && (
                                    <button 
                                        onClick={() => setReplyingTo(item._id)}
                                        className="text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1"
                                    >
                                        <Reply size={14} /> Reply
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Reply Modal */}
            {replyingTo && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Reply to Feedback</h3>
                            <button 
                                onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleReply}>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your response here..."
                                className="w-full h-32 p-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none resize-none"
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReplyingTo(null);
                                        setReplyText("");
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={replyLoading}
                                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium disabled:opacity-50"
                                >
                                    {replyLoading ? "Sending..." : "Send Reply"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feedback;
