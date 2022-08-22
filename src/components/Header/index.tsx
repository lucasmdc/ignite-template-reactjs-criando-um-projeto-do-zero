import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <img src="/images/Logo.svg" alt="logo" />
      </div>
    </header>
  );
}
