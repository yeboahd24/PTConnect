import { useState } from 'react';
import { Send, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { mockQuery } from '@/data/mockData';
import { formatTimeAgo } from '@/utils/formatters';
import { toast } from 'react-hot-toast';

export function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    mockQuery.conversations[0]?.id || null
  );
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedConversation = mockQuery.conversations.find(
    (c) => c.id === selectedConversationId
  );

  const conversationMessages = mockQuery.messages.filter(
    (m) => m.conversationId === selectedConversationId
  );

  const filteredConversations = mockQuery.conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    toast.success('Message sent!');
    setMessageInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-1 mb-2">Messages</h1>
        <p className="body-normal text-muted-foreground">
          Communicate with teachers and parents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border ${
                  selectedConversationId === conversation.id ? 'bg-muted' : ''
                }`}
              >
                <img
                  src={conversation.participantAvatar}
                  alt={conversation.participantName}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="body-normal font-semibold truncate">
                      {conversation.participantName}
                    </h4>
                    {conversation.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="body-small text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  <p className="caption text-muted-foreground mt-1">
                    {formatTimeAgo(conversation.lastMessageTime)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <img
                  src={selectedConversation.participantAvatar}
                  alt={selectedConversation.participantName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="body-normal font-semibold">
                    {selectedConversation.participantName}
                  </h3>
                  <p className="caption text-muted-foreground">
                    {selectedConversation.participantRole}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversationMessages.map((message) => {
                  const isOwnMessage = message.senderId === 'user-1';
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          isOwnMessage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="body-normal">{message.content}</p>
                        <p
                          className={`caption mt-1 ${
                            isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}
                        >
                          {formatTimeAgo(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="body-normal text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}