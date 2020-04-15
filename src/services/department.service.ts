/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 部门管理服务
 * @LastEditors: Do not Edit
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2020-04-07 17:15:46
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import {
  DepartmentModel,
  DepartmentSearchProps,
  DepartmentEditModel,
} from '@/interfaces/department';

import { DepartmentStore } from '@/stores/department.store';

export class DepartmentService {
  public store: DepartmentStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new DepartmentStore();
  }

  // 异步函数，获取分页数据
  @action
  public async fetchPageData(searchProps: DepartmentSearchProps): Promise<boolean> {
    this.store.loading = true;
    this.store.pageData = initalPaginationValue;
    try {
      // await会一直等这条语句执行完返回后再执行下一条语句，否则会瞬间执行完
      const result = await this.http.postJSON<Pagination<DepartmentModel>>(
        // 后端接口地址
        `${BACKEND_URL}/department/list`,
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

  @action
  public async update(data: DepartmentEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      // tslint:disable-next-line:ban-types
      const result = await this.http.postJSON<String>(`${BACKEND_URL}/department/update`, data);
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

  @action
  public async add(data: DepartmentEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      // tslint:disable-next-line:ban-types
      const result = await this.http.postJSON<String>(`${BACKEND_URL}/department/add`, data);
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

  @action
  public async delete(codeList: string[]): Promise<boolean> {
    this.store.loading = true;
    try {
      // tslint:disable-next-line:ban-types
      const result = await this.http.postJSON<String>(`${BACKEND_URL}/department/delete`, codeList);
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
