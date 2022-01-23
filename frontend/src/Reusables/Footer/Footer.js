import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.socialIcons}>
        <div className={styles.iconsWrapper}>
          <FaFacebookF size={21} />
        </div>
        <div className={styles.iconsWrapper}>
          <FaGithub size={21} />
        </div>
        <div className={styles.iconsWrapper}>
          <FaInstagram size={21} />
        </div>
        <div className={styles.iconsWrapper}>
          <FaTwitter size={21} />
        </div>
      </div>
      <div className={styles.links}>
        <h4>Home</h4>
        <h4>Products</h4>
        <h4>About Us</h4>
        <h4>Contacts</h4>
      </div>
      <div className={styles.separator}></div>
      <p>Shop On The Go &copy;	2021</p>
    </div>
  )
}

export default Footer;
