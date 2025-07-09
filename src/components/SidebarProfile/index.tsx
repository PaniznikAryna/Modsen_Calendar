import React from 'react'
import styles from './styles.module.scss'

import UserImg from '@/assets/images/User.png'
import Icon from '@/assets/icons/Icon.png'
import GroupImg from '@/assets/images/Group.png'

import Social1 from '@/assets/icons/1.png'
import Social2 from '@/assets/icons/2 (1).png'
import Social3 from '@/assets/icons/3.png'
import Social4 from '@/assets/icons/4.png'

const SidebarProfile: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <img src={UserImg} alt="User" className={styles.avatar} />
        <h2 className={styles.name}>Hello Rosalie</h2>
        <p className={styles.email}>rosalie@example.com</p>
      </div>

      <div className={styles.card}>
  <span className={styles.cardDot} />
  <img src={Icon} alt="Icon" className={styles.cardIcon} />
  <p className={styles.cardText}>Calendars</p>
</div>


      <div className={styles.promo}>
        <img src={GroupImg} alt="Group" className={styles.promoImg} />
        <p className={styles.promoText}>
          We have clothes that suits your style and which you’re proud to wear. From women to men.
        </p>
      </div>

      <div className={styles.socials}>
        <img src={Social1} alt="social1" className={styles.socialIcon} />
        <img src={Social2} alt="social2" className={styles.socialIcon} />
        <img src={Social3} alt="social3" className={styles.socialIcon} />
        <img src={Social4} alt="social4" className={styles.socialIcon} />
      </div>
    </aside>
  )
}

export default SidebarProfile
