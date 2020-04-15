/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors: Please set LastEditors
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2020-04-04 15:13:41
 */
import { observable } from 'mobx';
import { CourseModel } from '@/interfaces/course';

import { Pagination, initalPaginationValue } from '@/interfaces/common';

export class CourseStore {
  // 正在获取数据状态
  @observable
  // loading是获取状态，一直转圈
  public loading: boolean;

  // 部门分页列表数据，onservable是注解，page可以引用store
  @observable
  public pageData: Pagination<CourseModel> = initalPaginationValue;
}
