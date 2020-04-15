/*
 * @Author: 周健平
 * @Date: 2020-03-04 21:23:00
 * @LastEditTime: 2020-04-07 15:39:30
 * @LastEditors: Do not Edit
 * @Description: In User Settings Edit
 * @FilePath: \labs-fronted\src\layouts\UserLayout\index.tsx
 */
import * as React from 'react';
import { Provider } from 'mobx-react';
import services from '@/services';
import { PageBasicPropsModel } from '@/interfaces/component';
import styles from './index.scss';

// 登录界面
function BasicLayout(props: PageBasicPropsModel) {
  return (
    <Provider {...services}>
      <div className={styles.login}>{props.children}</div>
    </Provider>
  );
}

export default BasicLayout;
