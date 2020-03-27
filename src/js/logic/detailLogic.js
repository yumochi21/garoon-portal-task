import listLogic from '../logic/listLogic';
import record from '../middleware/record';
import textUtil from '../util/textUtil';
import conf from '../constant/conf';
import moment from 'moment';

const detailLogic = {

  setDetail(record) {
    const originalRecord = Object.assign({}, JSON.parse(JSON.stringify(record)));
    window.gtpVm.detail.jobForm = originalRecord;

    record.Detail.value = textUtil.encodeHtml(record.Detail.value);
    record.Memo.value.forEach(memo => {
      memo.value.Text.value = textUtil.encodeHtml(memo.value.Text.value);
    });

    window.gtpVm.detail.job = record;
  },

  getCurrentJobId() {
    if (!window.gtpVm.detail.job.$id) {
      return null;
    }
    const id = window.gtpVm.detail.job.$id.value;
    return id;
  },

  getCurrentJobParam(fieldCode) {
    if (!window.gtpVm.detail.job[fieldCode]) {
      return null;
    }
    const value = window.gtpVm.detail.job[fieldCode].value;
    return value;
  },

  setMode(mode) {
    window.gtpVm.detail.mode = mode;
  },

  setJobDetail(id) {
    return record.getRecord(conf.JOBS.APP, id).then(resp => {
      detailLogic.setDetail(resp.record);
      detailLogic.setMode('');
      return resp;
    });
  },

  setJobDetailByCurrentId() {
    const id = detailLogic.getCurrentJobId();
    if (!id) {
      window.gtpVm.detail.job = null;
      window.gtpVm.detail.jobForm = null;
      detailLogic.setMode('');
      return new Promise((resolve, reject) => { resolve(); });
    }
    return detailLogic.setJobDetail(id);
  },

  setEditMode() {
    detailLogic.setMode('edit');
  },

  setMemoMode() {
    window.gtpVm.detail.memoForm.Text.value = '';
    detailLogic.setMode('memo');
  },

  setStatus(status) {
    window.gtpVm.detail.jobForm.Status.value = status;
  },

  addJob() {
    const jobRecord = {
      Status: { value: window.gtpVm.detail.jobForm.Status.value },
      Title: { value: window.gtpVm.detail.jobForm.Title.value },
      Detail: { value: window.gtpVm.detail.jobForm.Detail.value }
    };
    return record.postRecord(conf.JOBS.APP, jobRecord).then(resp => {
      return detailLogic.setJobDetail(resp.id).then(result => {
        return listLogic.setDefaultList();
      });
    });
  },

  updateJobDetail() {
    const id = detailLogic.getCurrentJobId();
    const jobRecord = {
      Status: { value: window.gtpVm.detail.jobForm.Status.value },
      Title: { value: window.gtpVm.detail.jobForm.Title.value },
      Detail: { value: window.gtpVm.detail.jobForm.Detail.value }
    };
    return record.putRecord(conf.JOBS.APP, id, jobRecord).then(resp => {
      return detailLogic.setJobDetail(id).then(result => {
        return listLogic.setDefaultList();
      });
    });
  },

  addMemo() {
    const id = detailLogic.getCurrentJobId();
    const memo = window.gtpVm.detail.jobForm.Memo.value;
    memo.push({
      value: {
        Date: { value: moment().format('YYYY-MM-DD') },
        Text: { value: window.gtpVm.detail.memoForm.Text.value }
      }
    });
    const jobRecord = {
      Memo: { value: memo }
    };
    return record.putRecord(conf.JOBS.APP, id, jobRecord).then(resp => {
      return detailLogic.setJobDetail(id);
    });
  },

  completeJob() {
    const id = detailLogic.getCurrentJobId();
    const jobRecord = {
      Status: { value: '✔︎' },
      Today: { value: 'No' },
      CompleteDate: { value: moment().format('YYYY-MM-DD') }
    };
    return record.putRecord(conf.JOBS.APP, id, jobRecord).then(resp => {
      return detailLogic.setJobDetail(id).then(result => {
        return listLogic.setDefaultList();
      });
    });
  },

  switchToday() {
    const today = detailLogic.getCurrentJobParam('Today');
    if (today === 'Yes') {
      detailLogic.unsetToday();
    } else {
      detailLogic.setToday();
    }
  },

  setToday() {
    const id = detailLogic.getCurrentJobId();
    const jobRecord = {
      Today: { value: 'Yes' }
    };
    return record.putRecord(conf.JOBS.APP, id, jobRecord).then(resp => {
      return detailLogic.setJobDetail(id).then(result => {
        return listLogic.setDefaultList();
      });
    });
  },

  unsetToday() {
    const id = detailLogic.getCurrentJobId();
    const jobRecord = {
      Today: { value: 'No' }
    };
    return record.putRecord(conf.JOBS.APP, id, jobRecord).then(resp => {
      return detailLogic.setJobDetail(id).then(result => {
        return listLogic.setDefaultList();
      });
    });
  },

  openKintoneRecord() {
    const id = detailLogic.getCurrentJobId();
    window.open('/k/' + conf.JOBS.APP + '/show#record=' + id).focus;
  }
};

export default detailLogic;