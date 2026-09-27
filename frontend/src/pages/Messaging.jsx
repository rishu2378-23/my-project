import { useState, useEffect } from "react";
import API from "../api";

function Messaging() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await API.get("/instructor/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInstructors(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [token]);

  useEffect(() => {
    if (selectedInstructor && user.id) {
      const fetchMessages = async () => {
        try {
          const response = await API.get(`/messages/${user.id}/${selectedInstructor.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedInstructor, user.id, token]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await API.post("/messages", {
        receiver_id: selectedInstructor.id,
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewMessage("");
      const response = await API.get(`/messages/${user.id}/${selectedInstructor.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '1200px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Messaging & Consultations</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Instructors</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {instructors.map(instructor => (
              <button 
                key={instructor.id} 
                onClick={() => setSelectedInstructor(instructor)}
                style={{
                  backgroundColor: selectedInstructor?.id === instructor.id ? 'var(--sage-green)' : '#fff',
                  color: selectedInstructor?.id === instructor.id ? '#fff' : 'var(--dark-green)',
                  border: '1px solid var(--warm-beige)',
                  padding: '1rem',
                  borderRadius: 'var(--radius)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ fontWeight: 600 }}>{instructor.name}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.25rem' }}>{instructor.specialization}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
          {selectedInstructor ? (
            <>
              <h2 style={{ marginBottom: '1.25rem', fontSize: '1.25rem', borderBottom: '1px solid var(--warm-beige)', paddingBottom: '0.75rem' }}>
                Chat with {selectedInstructor.name}
              </h2>
              
              <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem', maxHeight: '300px', paddingRight: '0.5rem' }}>
                {messages.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--muted-text)', margin: 'auto' }}>No messages yet. Start the conversation!</p>
                ) : (
                  messages.map(msg => {
                    const isMe = msg.sender_id === user.id;
                    return (
                      <div 
                        key={msg.id} 
                        style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          backgroundColor: isMe ? 'var(--sage-green)' : '#fff',
                          color: isMe ? '#fff' : 'var(--dark-green)',
                          padding: '0.75rem 1rem',
                          borderRadius: 'var(--radius)',
                          maxWidth: '75%',
                          border: isMe ? 'none' : '1px solid var(--warm-beige)',
                          boxShadow: 'var(--shadow-subtle)'
                        }}
                      >
                        <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                          {isMe ? "Me" : selectedInstructor.name}
                        </div>
                        <div>{msg.message}</div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <input 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  placeholder="Type a message..."
                  style={{ flexGrow: 1 }}
                />
                <button type="submit" className="btn" style={{ backgroundColor: 'var(--sage-green)', color: '#fff', padding: '0.75rem 1.5rem' }}>Send</button>
              </form>
            </>
          ) : (
            <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--muted-text)' }}>
              <h3>Select an instructor to start chatting</h3>
              <p>Choose from the list on the left to connect for guidance.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messaging;
