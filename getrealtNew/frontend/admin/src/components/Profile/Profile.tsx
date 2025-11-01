import Api from '@/app/api';
import ProfileForm from '../ProfileForm';

const Profile = async () => {
  try {
    const response = await Api.fetchProfileUser();

    const user = response.data.user;

    if (user) {
      return (
        <>
          <h1 className="title-1">Профиль: {user.username}</h1>
          <div className="flex flex-col gap-3">
            <ProfileForm user={user} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="title-1">Профиль</h1>
          <p>Не удалось загрузить профиль</p>
        </>
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default Profile;
