// react imports
import PropTypes from 'prop-types';

// next
import Link from 'next/link';
import Image from 'next/image';

// data
import logoPrimary from '@/assets/websiteLogo/logo-primary.webp';
import logoWhite from '@/assets/websiteLogo/logo-white.webp';

const BrandLogo = ({ modifyClasses = '', theme = 'light' }) => {
  return (
    <Link className={`block w-max ${modifyClasses}`} href='/'>
      <Image
        width={300}
        height={100}
        style={{ width: 'auto', height: 'inherit' }}
        priority={true}
        src={theme === 'light' ? logoPrimary : logoWhite}
        alt='Company Logo'
        className='block'
        quality={100}
      />
    </Link>
  );
};

BrandLogo.propTypes = {
  modifyClasses: PropTypes.string,
  imageModifyClasses: PropTypes.string,
  theme: PropTypes.string,
};

export default BrandLogo;
