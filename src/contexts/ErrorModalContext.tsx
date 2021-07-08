import { createContext, useState } from 'react';

export const ErrorModalContext = createContext(null)

export const ErrorModalProvider = ({children}) => {
    const [errorModal, setErrorModal] = useState({
        show: false,
        message: ""
    })

    return (
        <ErrorModalContext.Provider value={[errorModal, setErrorModal]}>
            {children}
        </ErrorModalContext.Provider>
    )
}