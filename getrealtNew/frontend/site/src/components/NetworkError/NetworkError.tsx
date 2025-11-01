'use client';

import Button from '../ui/Button';

type TProps = {
  action?: () => void;
};

const NetworkError: React.FC<TProps> = ({ action }) => {
  return (
    <section className="error-section">
      <div className="error-section__container container">
        <h2 className="error-section__title h-2">Произошла ошибка</h2>
        <p className="error-section__text text">Что-то пошло не так. Проверьте сетевое соединение и обновите страницу</p>
        {action && <Button onClick={action}>Обновить</Button>}
      </div>
    </section>
  );
};

export default NetworkError;
