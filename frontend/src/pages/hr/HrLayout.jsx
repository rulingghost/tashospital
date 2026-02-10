import React, { useState } from 'react'
import TopMenu from '../../UI/TopMenu';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X } from 'lucide-react';

const HrLayout = () => {
    const { t } = useTranslation()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const tabs = [
        { label: t("HIERARCHY"), active: true, url: 'hierarchy' },
        { label: t("EMPLOYEE"), active: false, url: 'personnel',submenu: [
            { label: t("Leave Management"), active: true, url: 'leave-management' },
            { label: t("Working Hours"), active: false, url: 'working-hours' },
        ] },
        { label: t("RECRUITMENT"), active: false, url: 'recruitment' },   
        { label: 'KPI', active: false, url: 'KPI-quests',submenu: [
            { label: t("Employee"), active: true, url: 'KPI-quests' },
            { label: t("Management"), active: false, url: 'KPI-management' },
        ] },    
    ];

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: Date.now(),
                text: newMessage,
                isMe: true,
                time: new Date().toLocaleTimeString()
            }])
            setNewMessage('')
        }
    }

    return (
        <div className='flex flex-col w-full h-full items-center justify-evenly bg-slate-100 relative'>
            <div className='w-[95%] h-[14%] flex'>
                <TopMenu tabs={tabs} submenu={false} basePath={"/human-resources"} />
            </div>
            <div className='w-[95%] h-[82%]'>
                <Outlet />
            </div>

            {/* Chat Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-8 right-8 p-5 bg-cyan-600 text-white rounded-full shadow-xl hover:bg-cyan-700 z-50 flex items-center gap-2 transition-all duration-300 hover:scale-110"
            >
                <MessageCircle size={28} />
            </button>

            {/* Chat Window */}
            {isChatOpen && (
                <div className="fixed bottom-28 right-8 w-[400px] h-[600px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border-2 border-cyan-100">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <MessageCircle size={24} />
                            <h3 className="text-lg font-semibold">İK Ekip Sohbeti</h3>
                        </div>
                        <button 
                            onClick={() => setIsChatOpen(false)}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50">
                        {messages.map(message => (
                            <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl p-4 shadow-md ${message.isMe ? 'bg-cyan-600 text-white' : 'bg-white'}`}>
                                    <p className="text-[15px]">{message.text}</p>
                                    <span className={`text-xs ${message.isMe ? 'text-cyan-100' : 'text-gray-400'} block mt-2`}>
                                        {message.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Mesajınızı yazın..."
                                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                            <button 
                                type="submit"
                                className="p-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!newMessage.trim()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default HrLayout