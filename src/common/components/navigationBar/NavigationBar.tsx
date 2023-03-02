import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../assets/images/favicon.ico';
import Button from '../button/Button';
import NavigationLink from '../navigationLink/NavigationLink';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={Logo}
            width={512}
            height={512}
            quality={100}
            alt="logo"
            style={{ maxWidth: '36px', height: 'auto' }}
          />
        </Link>
      </div>
      <div className={styles.links}>
        <NavigationLink href="/" text="Home" />
        <NavigationLink href="/example" text="Example" />
      </div>
      <div className={styles.buttons}>
        <Link href="/signup">
          <Button type="primary" text="Sign up" />
        </Link>
        <Link href="/login">
          <Button type="secondary" text="Log in" />
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
