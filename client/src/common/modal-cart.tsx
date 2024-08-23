import { Modal } from "antd";
import { ReactNode } from "react";

interface CartModalProps {
    children: ReactNode,
    open: boolean,
    handleOK: () => void,
    handleClose: () => void

}

export function CartModal({ children, open, handleOK, handleClose }: CartModalProps) {
    return (
        <Modal open={open} onOk={handleOK} onCancel={handleClose}>
            {children}
        </Modal>
    )
}