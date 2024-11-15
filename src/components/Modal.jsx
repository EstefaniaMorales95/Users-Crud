import { useEffect, useRef } from 'react';
import './Modal.css';
function Modal({ isOpen, setIsOpen, children, message }) {
	const modalRef = useRef();
	useEffect(() => {
		const modal = modalRef.current;
		const modalClose = (e) => {
			if (modal && !modal.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', modalClose);
		return () => {
			document.removeEventListener('mousedown', modalClose);
		};
	}, []);

	return (
		<div className={`modal${isOpen ? ' modal--open' : ''}`}>
			<div className="modal--overlay"></div>
			<div ref={modalRef} className="modal__container">
				{children}
			</div>
		</div>
	);
}

export default Modal;
