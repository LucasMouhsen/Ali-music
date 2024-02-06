import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    function toogleModal() {
        setIsOpen(!isOpen);
    }

    const modalValues = {
        isOpen,
        toogleModal
    }

    return (
        <ModalContext.Provider value={ modalValues }>
            {children}
        </ModalContext.Provider>
    )

}

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired
}