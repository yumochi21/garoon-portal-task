import headerHandler from '../handler/headerHandler';
import listHandler from '../handler/listHandler';
import detailHandler from '../handler/detailHandler';
import headerLogic from '../logic/headerLogic';
import listLogic from '../logic/listLogic';
import detailLogic from '../logic/detailLogic';

const vm = {

  /**
   * Vue vm を初期化
   */
  init() {
    window.gtpVm = new Vue({
      el: '#gtp',
      data: {
        list: {
          mode: '', // ''(default), waiting, complete, low, report
          jobs: [
            // {
            //   $id: 1,
            //   Status: { value: '❗️' },
            //   Title: { value: 'CYPNBI-110：PGR' },
            //   selected: true
            // },
            // {
            //   $id: 2,
            //   Status: { value: '🔰' },
            //   Title: { value: '【法務省】ファイル添付できないPatchの提供' },
            //   selected: false
            // }
          ]
        },
        detail: {
          mode: '', // '', new, edit, memo,
          job: null,
          // {
          //   Status: { value: '🔰' },
          //   Title: { value: '【法務省】ファイル添付できないPatchの提供' },
          //   Detail: { value: '■池田さん資料\r\nhttps://google.com/' },
          //   Memo: {
          //     value: [
          //       {
          //         value: {
          //           Date: { value: '2020-02-29' },
          //           Text: { value: '＜中澤さん＞\r\n・REST API でデータの利活用をしたい ・他システム連携をもっと簡単にできるようにしたい' }
          //         }
          //       }
          //     ]
          //   }
          // },
          jobForm: null,
          memoForm: {
            Text: { value: '' }
          }
        }
      },
      methods: {
        handleHeaderReportedItemClick: headerLogic.completeReport,
        handleHeaderJobAddItemClick: headerLogic.setNewMode,
        handleDefaultListItemClick: listLogic.setDefaultList,
        handleWaitingListItemClick: listLogic.setWaitingList,
        handleCompleteListItemClick: listLogic.setCompleteList,
        handleLowListItemClick: listLogic.setLowList,
        handleReportListItemClick: listLogic.setReportList,
        handleJobListItemClick: detailLogic.setJobDetail,
        handleJobDetailAddClick: detailLogic.addJob,
        handleJobDetailEditClick: detailLogic.setEditMode,
        handleJobDetailTodayClick: detailLogic.switchToday,
        handleJobDetailStatusClick: detailLogic.setStatus,
        handleJobDetailSaveClick: detailLogic.updateJobDetail,
        handleJobDetailCancelClick: detailLogic.setJobDetailByCurrentId,
        handleJobDetailCompleteClick: detailLogic.completeJob,
        handleJobDetailMemoClick: detailLogic.setMemoMode,
        handleJobDetailMemoAddClick: detailLogic.addMemo,
        handleJobDetailDetailClick: detailLogic.openKintoneRecord
      }
    });
  }
};

export default vm;