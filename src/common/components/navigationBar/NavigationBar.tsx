import { isLoggedIn, logout } from '@/features/auth/services/auth.service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Logo from '../../../assets/images/logo.png';
import Button from '../button/Button';
import NavigationLink from '../navigationLink/NavigationLink';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const router = useRouter();

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
            style={{ maxWidth: '84px', height: 'auto' }}
          />
        </Link>
      </div>
      <div className={styles.links}>
        <NavigationLink href="/" text="Home" />
        <NavigationLink href="/example" text="Example" />
        <NavigationLink href="/userTickets" text="Tickets" />
      </div>
      <div className={styles.buttons}>
        {isLoggedIn() ? (
          <>
            <Button type="secondary" text="Log out" action={() => logout()} />
          </>
        ) : (
          <>
            <Link href="/signup">
              <Button type="primary" text="Sign up" />
            </Link>
            <Link href="/login">
              <Button type="secondary" text="Log in" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
