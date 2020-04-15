/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 服务总封装
 * @LastEditors: Do not Edit
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2020-04-08 14:24:54
 */

import { PublicService } from './public.service';
import { DepartmentService } from './department.service';
import { LabService } from './lab.service';
import { CompetitionEventService } from './competitionEvent.service';

export default {
  publicService: new PublicService(),
  departmentService: new DepartmentService(),
  labService: new LabService(),
  competitionEventService: new CompetitionEventService(),
};
