/*
 * @Description:比赛项目管理服务
 * @Author: 周健平
 * @department: 山东大学
 * @Date: 2020-04-07 16:57:31
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-08 22:51:57
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import {
  CompetitionEventVO,
  CompetitionEventEdit,
  CompetitionEventNameSearchProps,
} from '@/interfaces/competitionEvent';

import { CompetitionEventStore } from '@/stores/competitionEvent.store';

export class CompetitionEventService {
  public store: CompetitionEventStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new CompetitionEventStore();
  }

  // 异步函数，获取分页数据
  @action
  public async fetchPageData(searchProps: CompetitionEventNameSearchProps): Promise<boolean> {
    this.store.loading = true;
    this.store.pageData = initalPaginationValue;
    try {
      // await会一直等这条语句执行完返回后再执行下一条语句，否则会瞬间执行完
      const result = await this.http.postJSON<Pagination<CompetitionEventVO>>(
        // 后端接口地址
        `${BACKEND_URL}/competitionEvent/listByPage`,
        searchProps,
      );
      this.store.loading = false;
      if (result.success) {
        this.store.pageData = result.data;
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      this.store.loading = false;
      messageFail();
      return false;
    }
  }

  // 更新比赛项目信息
  @action
  public async update(data: CompetitionEventEdit): Promise<boolean> {
    this.store.loading = true;
    try {
      // tslint:disable-next-line:ban-types
      const result = await this.http.postJSON<String>(
        `${BACKEND_URL}/competitionEvent/updateCompetitionEvent`,
        data,
      );
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }

  // 新建比赛项目信息
  @action
  public async add(data: CompetitionEventEdit): Promise<boolean> {
    this.store.loading = true;
    try {
      // tslint:disable-next-line:ban-types
      const result = await this.http.postJSON<String>(
        `${BACKEND_URL}/competitionEvent/addCompetitionEvent`,
        data,
      );
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }

  // 删除比赛项目
  @action
  public async delete(codeList: string[]): Promise<boolean> {
    this.store.loading = true;
    try {
      // tslint:disable-next-line:ban-types
      const result = await this.http.postJSON<String>(
        `${BACKEND_URL}/competitionEvent/deleteCompetitionEvent`,
        codeList,
      );
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }
}
