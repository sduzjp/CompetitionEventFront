/*
 * @Description:比赛项目管理首页
 * @Author: 周健平
 * @department: 山东大学
 * @Date: 2020-04-07 15:50:07
 * @LastEditors: Do not Edit
 * @LastEditTime: 2020-04-11 21:13:02
 */

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  CompetitionEventVO,
  CompetitionEventEdit,
  CompetitionEventNameSearchProps,
  defaultCompetitionEventSearchProps,
} from '@/interfaces/competitionEvent';
import CustomTable from '@/components/CustomTable';
import { compose, withState } from 'recompose';
import { CompetitionEventService } from '@/services/competitionEvent.service';
import SearchFilter from './SearchFilter';
import Loading from '@/components/Loading';
import { Divider, Modal } from 'antd';
const CommonModal = React.lazy(() => import('@/components/CommonModal'));
import CompetitionEventForm from './CompetitionEventForm';
import { ButtonItem } from '@/interfaces/component';

export interface CompetitionEventPageProps {
  competitionEventService: CompetitionEventService;
  selectedRowKeys: string[];
  selectRow: (selectedRowKeys: string[]) => void;

  searchProps: CompetitionEventNameSearchProps;
  setSearchProps: (searchProps: CompetitionEventNameSearchProps) => void;

  competitionEventEdit?: CompetitionEventEdit;
  setCompetitionEventEdit: (competitionEventEdit?: CompetitionEventEdit) => void;

  visible: boolean;
  setVisible: (visible: boolean) => void;
}

// 注入competitionEventService
@inject('competitionEventService')
@observer
class CompetitionEventPage extends React.Component<CompetitionEventPageProps> {
  private columns = [
    { title: '比赛项目编码', dataIndex: 'competitionEventCode' },
    { title: '比赛项目名称', dataIndex: 'competitionEventName' },
    { title: '组别名称', dataIndex: 'suiteTypeDesc' },
    { title: '计划开始时间', dataIndex: 'planStartAt' },
    { title: '计划结束时间', dataIndex: 'planEndAt' },
    { title: '状态描述', dataIndex: 'statusDesc' },
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '创建人', dataIndex: 'createdBy' },
    { title: '更新时间', dataIndex: 'updatedAt' },
    { title: '更新人', dataIndex: 'updatedBy' },
    {
      title: '操作',
      render: (_: any, record: CompetitionEventVO) => (
        <>
          <a
            onClick={() => {
              this.props.setCompetitionEventEdit({
                ...record,
              });
              this.props.setVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              this.handleDelete([record.competitionEventCode]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  public componentDidMount() {
    this.props.competitionEventService.fetchPageData(this.props.searchProps);
  }

  public render() {
    const { selectRow, selectedRowKeys, competitionEventService } = this.props;
    const {
      pageData: { list, page, total },
      loading,
    } = competitionEventService.store;

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: 'icon-xinzeng',
        type: 'default',
        onClick: () => {
          this.props.setCompetitionEventEdit(undefined);
          this.props.setVisible(true);
        },
      },
      {
        text: '删除',
        icon: 'icon-xinzeng',
        disabled: this.props.selectedRowKeys.length === 0,
        type: 'primary',
        onClick: () => this.handleDelete(this.props.selectedRowKeys),
      },
    ];

    return (
      <>
        <CustomTable
          loading={loading}
          columns={this.columns}
          buttons={buttons}
          dataSource={list}
          current={page}
          total={total}
          genRowKey={(record: CompetitionEventVO) => `${record.competitionEventCode}`}
          onPagination={(current: number) => {
            const searchProps = {
              ...this.props.searchProps,
              page: current,
            };
            competitionEventService.fetchPageData(searchProps);
          }}
          onRow={(record: CompetitionEventVO) => ({
            onClick: () => selectRow([`${record.competitionEventCode}`]),
          })}
          rowSelection={{
            columnTitle: '选择',
            selectedRowKeys,
            onChange: (keys: string[]) => selectRow(keys),
          }}
        >
          <SearchFilter
            searchProps={this.props.searchProps}
            changeSearchProps={props => {
              this.props.setSearchProps({
                ...this.props.setSearchProps,
                ...props,
              });
            }}
            onSearch={() => {
              competitionEventService.fetchPageData(this.props.searchProps);
            }}
          />
        </CustomTable>

        <React.Suspense fallback={<Loading />}>
          <CommonModal
            title={!!this.props.competitionEventEdit ? '修改比赛项目' : '新增比赛项目'}
            visible={this.props.visible}
            setVisible={this.props.setVisible}
          >
            <CompetitionEventForm
              saving={loading}
              detailData={this.props.competitionEventEdit}
              onClose={() => this.props.setVisible(false)}
              onSubmit={this.handleSave}
            />
          </CommonModal>
        </React.Suspense>
      </>
    );
  }

  private handleDelete = (codeList: string[]) => {
    if (!codeList || codeList.length === 0) {
      return;
    }

    const modal = Modal.confirm({
      centered: true,
      title: `您确定要删除选定的${codeList.length}个比赛项目吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await this.props.competitionEventService.delete(codeList);
        if (result) {
          this.props.competitionEventService.fetchPageData({
            ...this.props.searchProps,
            page: 1,
          });
          this.props.selectRow([]);
        }
      },
    });
  };

  private handleSave = (data: CompetitionEventEdit) => {
    let result: Promise<boolean>;
    if (this.props.competitionEventEdit) {
      result = this.props.competitionEventService.update({
        ...data,
        competitionEventCode: this.props.competitionEventEdit.competitionEventCode,
      });
    } else {
      result = this.props.competitionEventService.add(data);
    }

    result.then(() => {
      this.props.competitionEventService.fetchPageData(this.props.searchProps);
      this.props.setVisible(false);
    });
  };
}

export default compose(
  withState('selectedRowKeys', 'selectRow', []),
  withState('searchProps', 'setSearchProps', defaultCompetitionEventSearchProps),
  withState('competitionEventEdit', 'setCompetitionEventEdit', undefined),
  withState('visible', 'setVisible', false),
)(CompetitionEventPage);
