/*
 * @Description:比赛项目管理
 * @Author: 周健平
 * @Date: 2020-04-07 09:35:45
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-08 16:32:37
 */
import { PAGE_SIZE } from './common';

// 获取比赛项目详情
export interface CompetitionEventVO {
  // 比赛项目编码
  competitionEventCode: string;
  // 比赛项目名称
  competitionEventName: string;
  // 计划开始时间
  planStartAt: string;
  // 计划结束时间
  planEndAt: string;
  // 组别
  suiteType: number;
  // 组别名称
  suiteTypeDesc: string;
  // 状态
  status: number;
  // 状态描述
  statusDesc: string;
  // 创建时间
  createdAt: string;
  // 创建人
  createdBy: string;
  // 更新时间
  updatedAt: string;
  // 更新人
  updatedBy: string;
}

// 新建、修改 比赛项目
export interface CompetitionEventEdit {
  // 比赛项目编码
  competitionEventCode: string;
  // 比赛项目名称
  competitionEventName: string;
  // 计划开始时间
  planStartAt: string;
  // 计划结束时间
  planEndAt: string;
  // 组别
  suiteType: number;
  // 状态
  status: number;
  // 创建人
  createdBy: string;
  // 更新人
  updatedBy: string;
}

// // 修改更新比赛项目
// export interface UpdateCompetitionEvent {
//   // 比赛项目编码
//   competitionEventCode: string;
//   // 比赛项目名称
//   competitionEventName: string;
//   // 计划开始时间
//   planStartAt: string;
//   // 计划结束时间
//   planEndAt: string;
//   // 组别
//   suiteType: number;
//   // 状态
//   status: number;
// }

// // 删除比赛项目
// export interface DeleteCompetitionEvent {
//   // 比赛项目编码
//   competitionEventCode: string;
// }

// 比赛项目名称查询
export interface CompetitionEventNameSearchProps {
  // 比赛项目名称
  competitionEventName?: string;
  // 页码
  page?: number;
  // 每页记录数
  pageSize?: number;
}

// 获取比赛项目列表（分页查询）
export const defaultCompetitionEventSearchProps: CompetitionEventNameSearchProps = {
  // 比赛项目名称
  competitionEventName: undefined,
  // 页码
  page: 1,
  // 每页记录数
  pageSize: PAGE_SIZE,
};
