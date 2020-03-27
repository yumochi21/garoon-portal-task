import record from '../middleware/record';
import conf from '../constant/conf';

const listLogic = {

  setList(records) {
    window.gtpVm.list.jobs = records;
  },

  setMode(mode) {
    window.gtpVm.list.mode = mode;
  },

  setDefaultList() {
    const query = 'Status not in ("💭", "💤", "✔︎", "🚫") order by Today asc, Status asc';
    return record.getRecords(conf.JOBS.APP, query).then(resp => {
      listLogic.setList(resp.records);
      listLogic.setMode('');
      return resp;
    });
  },

  setWaitingList() {
    const query = 'Status in ("💭") order by Status asc';
    return record.getRecords(conf.JOBS.APP, query).then(resp => {
      listLogic.setList(resp.records);
      listLogic.setMode('waiting');
      return resp;
    });
  },

  setCompleteList() {
    const query = 'Status in ("✔︎") order by CompleteDate desc';
    return record.getRecords(conf.JOBS.APP, query).then(resp => {
      listLogic.setList(resp.records);
      listLogic.setMode('complete');
      return resp;
    });
  },

  setLowList() {
    const query = 'Status in ("💤") order by Status asc';
    return record.getRecords(conf.JOBS.APP, query).then(resp => {
      listLogic.setList(resp.records);
      listLogic.setMode('low');
      return resp;
    });
  },

  setReportList() {
    const query = 'Status in ("✔︎") and Reported not in ("Reported") order by CompleteDate desc';
    return record.getRecords(conf.JOBS.APP, query).then(resp => {
      listLogic.setList(resp.records);
      listLogic.setMode('report');
      return resp;
    });
  }
};

export default listLogic;