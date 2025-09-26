import React, { useState } from "react";
import { Mail, MailOpen, Reply, Trash2, Search, Filter } from "lucide-react";
import Button from "../components/Common/Button";
import Modal from "../components/Common/Modal";
import { mockMessages } from "../data/mockData";

export default function Messages() {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Read" && message.isRead) ||
      (statusFilter === "Unread" && !message.isRead);
    return matchesSearch && matchesStatus;
  });

  const handleMarkAsRead = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const handleMarkAsUnread = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, isRead: false } : msg
      )
    );
  };

  const handleDelete = (messageId) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setIsReplyModalOpen(true);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    // Handle reply logic here
    setIsReplyModalOpen(false);
    setSelectedMessage(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage contact form submissions and client communications
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Messages</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-medium text-white">
                Inbox ({filteredMessages.filter((m) => !m.isRead).length}{" "}
                unread)
              </h3>
            </div>
            <div className="max-h-96 lg:max-h-[500px] overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.isRead) {
                      handleMarkAsRead(message.id);
                    }
                  }}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                    selectedMessage?.id === message.id
                      ? "bg-gray-700 border-blue-500"
                      : ""
                  } ${!message.isRead ? "bg-gray-750" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      {message.isRead ? (
                        <MailOpen className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-500" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm truncate ${
                            !message.isRead
                              ? "font-semibold text-white"
                              : "font-medium text-gray-200"
                          }`}
                        >
                          {message.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {message.subject}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
              {filteredMessages.length === 0 && (
                <div className="p-8 text-center text-gray-400">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <p>No messages found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          {selectedMessage ? (
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700">
              {/* Message Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {selectedMessage.subject}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      From: {selectedMessage.name} &lt;{selectedMessage.email}
                      &gt;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        selectedMessage.isRead
                          ? handleMarkAsUnread(selectedMessage.id)
                          : handleMarkAsRead(selectedMessage.id)
                      }
                      className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-700"
                      title={
                        selectedMessage.isRead
                          ? "Mark as unread"
                          : "Mark as read"
                      }
                    >
                      {selectedMessage.isRead ? (
                        <Mail className="w-4 h-4" />
                      ) : (
                        <MailOpen className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-900/20"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Button */}
              <div className="p-6 border-t border-gray-700">
                <Button
                  onClick={() => handleReply(selectedMessage)}
                  icon={Reply}
                  variant="primary"
                >
                  Reply
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 h-96 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-lg font-medium text-gray-300">
                  Select a message
                </p>
                <p className="text-sm">
                  Choose a message from the inbox to view its contents
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      <Modal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        title={`Reply to ${selectedMessage?.name}`}
        size="lg"
      >
        <form onSubmit={handleSendReply} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              To
            </label>
            <input
              type="email"
              value={selectedMessage?.email || ""}
              readOnly
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              defaultValue={`Re: ${selectedMessage?.subject}`}
              required
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              rows={8}
              required
              placeholder="Type your reply here..."
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsReplyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" icon={Reply}>
              Send Reply
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
