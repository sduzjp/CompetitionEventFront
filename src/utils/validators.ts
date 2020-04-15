/*
 * @Description:
 * @Author: 周健平
 * @department: 山东大学
 * @Date: 2020-03-04 21:23:00
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-07 22:21:46
 */
/*import { WrappedFormUtils } from 'antd/lib/form/Form';*/
import reg from './regex-utils';

/**
 * 手机号码校验
 * @param _rule
 * @param value
 * @param callback
 */
export function phoneValidator(_: any, value: string, callback: any) {
  if (value && !reg.isPhone(value)) {
    callback('请输入有效的电话号码');
  } else {
    callback();
  }
}

/**
 * 邮箱校验
 * @param _rule
 * @param value
 * @param callback
 */
export function emailValidator(_: any, value: string, callback: any) {
  if (value && !reg.isEmail(value)) {
    callback('请输入有效的邮箱地址');
  } else {
    callback();
  }
}
