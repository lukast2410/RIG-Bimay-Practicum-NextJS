import { createContext, useState } from 'react';

export const ModalContext = createContext(null)

export const ModalProvider = ({children}) => {
    
    const [modal, setModal] = useState({
        show: false,
        message: "",
        error: false
    })

    return (
        <ModalContext.Provider value={[modal, setModal]}>
            {children}
        </ModalContext.Provider>
    )

}