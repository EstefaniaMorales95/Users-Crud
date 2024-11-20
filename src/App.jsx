import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Layout from './layouts/Layout';
import AddEdit from './components/AddEdit';
import UserList from './components/UserList';
import Modal from './components/Modal';
import './components/header.css';

const baseUrl = 'https://users-crud-api-81io.onrender.com/api/v1';

function App() {
	const [users, setUsers, loading] = useFetch();
	const [isOpen, setIsOpen] = useState(false);
	const [currentChild, setCurrentChild] = useState(null);
	const [isConfirming, setIsConfirming] = useState(false);
	const [userToDelete, setUserToDelete] = useState(null);
	const [modalMessage, setModalMessage] = useState('');

	useEffect(() => {
		readUsers();
	}, []);
	//Create users

	const showMessageModal = () => {
		setIsOpen(true);
		setTimeout(() => {
			setIsOpen(false);
			setModalMessage('');
		}, 3000);
	};

	const createUser = async (dataForm) => {
		try {
			await setUsers({
				url: `${baseUrl}/users`,
				method: 'POST',
				body: dataForm,
			});
			setModalMessage('Usuario creado exitosamente.');
			readUsers(); // Actualiza la lista de usuarios después de crear.
		} catch (error) {
			setModalMessage('Error al crear el usuario.');
			console.error(error);
		} finally {
			showMessageModal();
		}
	};
	//read
	const readUsers = () => {
		setUsers({ url: `${baseUrl}/users` });
	};

	//Updaate users
	const updateUser = (dataForm, userId) => {
		setUsers({
			url: `${baseUrl}/users/${userId}`,
			method: 'PATCH',
			body: dataForm,
		});
		setIsOpen(false);
		setModalMessage('Usuario creado exitosamente.');
		showMessageModal();
	};

	//Delete
	const confirmDelete = (userId) => {
		console.log('Confirmando eliminación del usuario con id:', userId);
		setUserToDelete(userId);
		setIsConfirming(true);
		setIsOpen(true);
	};
	const deleteUser = () => {
		if (userToDelete) {
			setUsers({
				url: `${baseUrl}/users/${userToDelete}`,
				method: 'DELETE',
			});
			setModalMessage('Usuario eliminado exitosamente.');
			showMessageModal();
		}
		setIsConfirming(false);
		setUserToDelete(null);
	};
	const cancelDelete = () => {
		setIsConfirming(false);
		setUserToDelete(null);
		setIsOpen(false);
	};

	//handleOpem
	const openAdd = () => {
		setIsOpen(true);
		setCurrentChild(<AddEdit onSave={createUser} />);
	};

	const openEdit = (user) => {
		setIsOpen(true);
		setCurrentChild(<AddEdit user={user} onSave={updateUser} />);
	};

	return (
		<Layout>
			<header className="header">
				<div className="header__container">
					<h1 className="header__title">Usuarios</h1>

					<button className="header__button" type="button" onClick={openAdd}>
						Agregar Usuario
					</button>
				</div>
			</header>
			{/*}	<AddEdit
					user={{
						first_name: 'Laura',
						last_name: 'Restrepo',
						email: 'laura@example.com',
						password: '1234567',
						birthday: '15-05-1995',
					}}
				/> */}

			<main className="container">
				{loading ? (
					<h2>Cargando...</h2>
				) : (
					<UserList
						users={users || []} // Asegúrate de que siempre reciba un array.
						openEdit={openEdit}
						confirmDelete={confirmDelete}
					/>
				)}
			</main>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				{isConfirming ? (
					<div>
						<p>¿Estás seguro de que deseas eliminar este usuario?</p>
						<div>
							<button onClick={deleteUser}>Confirmar</button>
							<button onClick={cancelDelete}>Cancelar</button>
						</div>
					</div>
				) : modalMessage ? (
					<p>{modalMessage}</p>
				) : (
					currentChild
				)}
			</Modal>
		</Layout>
	);
}

export default App;
