/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: Do not Edit
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2020-04-11 21:14:47
 */
import * as React from 'react';
import { compose, withState } from 'recompose';

export interface HomepageProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

class Upload extends React.Component<HomepageProps> {
  public render() {
    return <div>欢迎进入实验室预约管理系统</div>;
  }
}

export default compose(withState('visible', 'setVisible', false))(Upload);
