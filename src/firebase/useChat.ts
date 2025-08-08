import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import useAuth from "./useAuth";

export interface Message {
  id: string;
  userName?: string;
  text?: string;
  userId?: string;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  const handleSendMessage = async (message: string) => {
    if (message.trim() === "") return;
    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        userId: user?.uid,
        userName: user?.email || `Anonymous-${user?.uid.slice(0, 2)}`,
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  useEffect(() => {
    //listens to changes on firebase on mount
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });
    return unsubscribe;
  }, []);

  return { messages, handleSendMessage };
};

export default useChat;
