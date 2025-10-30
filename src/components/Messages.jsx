import { useMemo, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function Messages({ users, conversations, activeUserId, setActiveUserId, onSend }) {
  const activeConversation = useMemo(() => {
    if (!activeUserId) return null;
    return conversations[activeUserId] || [];
  }, [activeUserId, conversations]);

  const activeUser = users.find((u) => u.id === activeUserId) || null;
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white/90 rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {users.map((u) => (
            <li key={u.id}>
              <button
                onClick={() => setActiveUserId(u.id)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                  activeUserId === u.id ? "bg-green-50" : ""
                }`}
              >
                <p className="font-medium text-gray-900">{u.name}</p>
                <p className="text-xs text-gray-600">{u.location}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2 bg-white/90 rounded-xl border border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          {activeUser ? (
            <div>
              <p className="font-medium">Chat with {activeUser.name}</p>
              <p className="text-xs text-gray-600">Arrange swap details here</p>
            </div>
          ) : (
            <p className="text-gray-600">Select a conversation to start chatting.</p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeConversation && activeConversation.length > 0 ? (
            activeConversation.map((m, idx) => (
              <div key={idx} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                    m.from === "me"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No messages yet.</p>
          )}
          <div ref={endRef} />
        </div>

        <MessageInput disabled={!activeUser} onSend={(text) => activeUser && onSend(activeUser.id, text)} />
      </div>
    </section>
  );
}

function MessageInput({ disabled, onSend }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const text = String(data.get("text") || "").trim();
    if (!text) return;
    onSend(text);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center gap-2">
      <input
        name="text"
        disabled={disabled}
        placeholder={disabled ? "Select a conversation" : "Type a message..."}
        className="flex-1 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
      >
        <Send className="h-4 w-4" /> Send
      </button>
    </form>
  );
}
