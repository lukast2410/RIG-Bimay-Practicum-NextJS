import { createContext, useState } from 'react';

export const SocketContext = createContext(null)

export const SocketProvider = ({ socket, children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}