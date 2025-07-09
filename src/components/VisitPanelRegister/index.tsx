import React from 'react';
import styles from './styles.module.scss';
import {
  VISIT_TITLE,
  VISIT_TITLE2,
  VISIT_TEXT,
  VISIT_TEXT2,
} from '@/constants/auth';
import waves from '@/assets/images/visit-bg.jpg';
import frame1 from '@/assets/images/Frame1.png';

const VisitPanel: React.FC = () => (
  <aside className={styles.panel}>
    <div className={styles.overlay} />

    <img src={waves} className={styles.bg} alt="" />
    
    <div className={styles.content}>
      <h1 className={styles.title}>{VISIT_TITLE}</h1>
      <p className={styles.text}>{VISIT_TITLE2}</p>

      <img src={frame1} alt="" className={styles.frame} />

      <p className={styles.title}>{VISIT_TEXT}</p>
      <p className={styles.text}>{VISIT_TEXT2}</p>
    </div>
  </aside>
);

export default VisitPanel;
