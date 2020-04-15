/*
 * @Description:
 * @Author: 周健平
 * @Date: 2020-03-04 21:23:00
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-07 09:35:08
 */
import { PAGE_SIZE } from './common';

// 获取部门详情
export interface DepartmentModel {
  // 部门编码
  departmentCode: string;
  // 部门名称
  departmentName: string;
  // 联系人
  contact: string;
  // 联系电话
  contactPhone: string;
  // 描述
  description: string;
  // 创建日期
  createdAt: string;
  // 修改日期
  updatedAt: string;
}

// 新增部门
export interface DepartmentEditModel {
  // 部门编码
  departmentCode?: string;
  // 部门名称
  departmentName?: string;
  // 联系人
  contact?: string;
  // 联系电话
  contactPhone?: string;
  // 描述
  description?: string;
}

// 部门查询
export interface DepartmentSearchProps {
  departmentName?: string;
  page?: number;
  pageSize?: number;
}

// 分页查询
export const defaultDepartmentSearchProps: DepartmentSearchProps = {
  departmentName: undefined,
  page: 1,
  pageSize: PAGE_SIZE,
};
