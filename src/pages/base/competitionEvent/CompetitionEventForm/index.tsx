/*
 * @Description:新建、修改 比赛项目窗口
 * @Author: 周健平
 * @department: 山东大学
 * @Date: 2020-04-07 19:11:08
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-05-13 20:52:25
 */
import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input, Select } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { CompetitionEventEdit } from '@/interfaces/competitionEvent';
import ModalButtons from '@/components/ModalButtons';

const { Option } = Select;
export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: CompetitionEventEdit;
  onClose: () => void;
  onSubmit: (data: CompetitionEventEdit) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {
  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields(
      { force: true },
      (error: Error, values: CompetitionEventEdit) => {
        if (error) {
          return;
        }
        this.props.onSubmit(values);
      },
    );
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" className={styles.form}>
        <Form.Item label="比赛项目名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('competitionEventName', {
            rules: [
              {
                required: true,
                message: '请输入比赛项目名称',
              },
            ],
          })(<Input placeholder="请输入比赛项目名称" />)}
        </Form.Item>

        <Form.Item label="计划开始时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planStartAt', {
            rules: [
              {
                required: false,
                message: '请输入计划开始时间',
              },
            ],
          })(<Input placeholder="输入格式:YYYY-MM-DD" />)}
        </Form.Item>

        <Form.Item label="计划结束时间" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('planEndAt', {
            rules: [
              {
                required: false,
                message: '请输入计划结束时间',
              },
            ],
          })(<Input placeholder="输入格式:YYYY-MM-DD" />)}
        </Form.Item>

        <Form.Item label="组别" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('suiteType', {
            rules: [
              {
                required: false,
                message: '请输入比赛项目组别',
              },
            ],
          })(
            <Select placeholder="请输入比赛项目组别">
              <Option value={1}>1:成年组</Option>
              <Option value={2}>2:青少年组</Option>
              <Option value={3}>3:老年组</Option>
            </Select>,
          )}
          {/* (<Input placeholder="1:成年组,2:青少年组,3:老年组" />)} */}
        </Form.Item>

        <Form.Item label="状态" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('status', {
            rules: [
              {
                required: false,
                message: '请输入比赛项目状态',
              },
            ],
          })(
            <Select placeholder="请输入比赛项目状态">
              <Option value={1}>1:未开始</Option>
              <Option value={2}>2:进行中</Option>
              <Option value={3}>3:已结束</Option>
            </Select>,
          )}
          {/* (<Input placeholder="1:未开始,2:进行中,3:已结束" />)} */}
        </Form.Item>

        <Form.Item label="创建人" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('createdBy', {
            rules: [
              {
                required: false,
                message: '请输入创建人姓名',
              },
            ],
          })(<Input placeholder="请输入创建人姓名" />)}
        </Form.Item>

        <Form.Item label="更新人" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('updatedBy', {
            rules: [
              {
                required: false,
                message: '请输入更新人姓名',
              },
            ],
          })(<Input placeholder="请输入更新人姓名" />)}
        </Form.Item>

        <ModalButtons
          onCancel={this.props.onClose}
          onOk={this.handleSubmit}
          loading={this.props.saving}
        />
      </Form>
    );
  }
}

export default compose<
  {},
  {
    saving: boolean;
    detailData?: CompetitionEventEdit;
    onClose: () => void;
    onSubmit: (data: CompetitionEventEdit) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));
