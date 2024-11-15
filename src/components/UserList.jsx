import UserCard from './UserCard';
import './UserList.css';

function UserList({ users, openEdit, confirmDelete }) {
	return (
		<div className="cards">
			{users?.map((user) => (
				<UserCard
					key={user?.id}
					user={user}
					openEdit={openEdit}
					confirmDelete={confirmDelete}
				/>
			))}
		</div>
	);
}

export default UserList;
