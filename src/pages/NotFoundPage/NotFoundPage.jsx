import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={`container ${styles.wrap}`}>
      <Link to="/" className={styles.homeLink}>
        Go back
      </Link>
      <div className={styles.centered}>
        <h1 className={styles.title}>404 - Page Not Found</h1>
      </div>
    </div>
  );
};

export default NotFoundPage;
