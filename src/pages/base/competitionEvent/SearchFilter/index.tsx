/*
 * @Description:查询窗口样式单
 * @Author: 周健平
 * @department: 山东大学
 * @Date: 2020-04-07 19:11:27
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-09 17:22:11
 */
import * as React from 'react';
import { Input, Button } from 'antd';
import styles from './index.scss';
import { CompetitionEventNameSearchProps } from '@/interfaces/competitionEvent';

interface SearchFilterProps {
  searchProps: CompetitionEventNameSearchProps;
  changeSearchProps: (searchProps: CompetitionEventNameSearchProps) => void;
  onSearch: () => void;
}

export default class SearchFilter extends React.PureComponent<SearchFilterProps> {
  render() {
    const { searchProps, onSearch, changeSearchProps } = this.props;
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <span className={styles.label}>比赛项目名称：</span>
          <Input
            allowClear={true}
            value={searchProps.competitionEventName}
            placeholder="请输入比赛项目名称"
            onChange={e => changeSearchProps({ competitionEventName: e.target.value })}
          />
        </div>

        <Button type="primary" onClick={onSearch}>
          查询
        </Button>
      </div>
    );
  }
}
