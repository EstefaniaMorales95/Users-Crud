import React from 'react';
import { ImGift } from 'react-icons/im';
import { TfiPencil } from 'react-icons/tfi';
import { FiTrash2 } from 'react-icons/fi';
import './UserCard.css';
function UserCard({ user, openEdit, confirmDelete }) {
	return (
		<div className="card">
			<h3 className="card__name">
				{user?.first_name} {user?.last_name}
			</h3>
			<div className="card__info">
				<div>
					<span className="card__label">Correo</span>
					{user?.email}
				</div>
				<div>
					<span className="card__label">Cumpleaños</span>
					<span className="card__data">
						<ImGift className="icon--gift" />
						{user?.birthday}
					</span>
				</div>
			</div>
			<div className="card__btns">
				<button
					className="btn btn--delete"
					onClick={() => {
						console.log(
							'Se está intentando eliminar el usuario con id:',
							user?.id,
						);
						confirmDelete(user?.id); // Llamar a confirmDelete
					}}
				>
					<FiTrash2 />
				</button>
				<button className="btn btn--edit" onClick={() => openEdit(user)}>
					<TfiPencil />
				</button>
			</div>
		</div>
	);
}

export default UserCard;
