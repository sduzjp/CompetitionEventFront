/*
 * @Description:比赛项目管理信息存储
 * @Author: 周健平
 * @department: 山东大学
 * @Date: 2020-04-07 17:04:21
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-07 17:08:59
 */
import { observable } from 'mobx';
import { CompetitionEventVO } from '@/interfaces/competitionEvent';

import { Pagination, initalPaginationValue } from '@/interfaces/common';

export class CompetitionEventStore {
  // 正在获取数据状态
  @observable
  public loading: boolean;

  // 比赛项目详情分页列表数据
  @observable
  public pageData: Pagination<CompetitionEventVO> = initalPaginationValue;
}
