import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <Link className={styles.logo} to='/'>Prime Flix</Link>
      <Link className={styles.favorites} to='/favoritos'>Meus Filmes</Link>
    </header>
  )
}

export default Header
