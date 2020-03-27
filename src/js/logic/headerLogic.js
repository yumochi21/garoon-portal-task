import record from "../middleware/record";
import listLogic from "./listLogic";
import conf from '../constant/conf';

const headerLogic = {

  setDetailMode(mode) {
    window.gtpVm.detail.mode = mode;
  },

  setNewMode() {
    const jobRecord = {
      Status: { value: '🔰' },
      Title: { value: '' },
      Detail: { value: '' },
      Memo: { value: [] }
    };
    
    window.gtpVm.detail.jobForm = jobRecord;
    if (window.gtpVm.detail.job == null) {
      window.gtpVm.detail.job = jobRecord;
    }

    headerLogic.setDetailMode('new');
  },

  completeReport() {
    const completeList = window.gtpVm.list.jobs;
    const completeRecords = completeList.map(completeJob => {
      return {
        id: completeJob.$id.value,
        record: {
          Reported: { value: ['Reported'] }
        }
      };
    });
    return record.putRecords(conf.JOBS.APP, completeRecords).then(resp => {
      return listLogic.setReportList();
    });
  }
};

export default headerLogic;