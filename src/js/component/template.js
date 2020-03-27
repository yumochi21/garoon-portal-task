const template = `
  <link href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" rel="stylesheet">
  <div class="gtp-header">
    <div class="gtp-logo">Jobs</div>
    <div @click="handleHeaderJobAddItemClick" class="gtp-header-control">タスク追加</div>
    <div v-if="list.mode === 'report'" @click="handleHeaderReportedItemClick" class="gtp-header-control">報告完了</div>
  </div>
  <div class="gtp-body">
    <div class="gtp-body-list">
      <div class="gtp-list-control">
        <div @click="handleDefaultListItemClick" class="gtp-list-control-item">デフォルト</div>
        <div @click="handleWaitingListItemClick" class="gtp-list-control-item">作業待ち</div>
        <div @click="handleCompleteListItemClick" class="gtp-list-control-item">完了一覧</div>
        <div @click="handleLowListItemClick" class="gtp-list-control-item">優先度低</div>
        <div @click="handleReportListItemClick" class="gtp-list-control-item">報告用</div>
      </div>
      <div v-if="list.jobs.length !== 0" class="gtp-body-list-jobs">
        <div v-for="job in list.jobs" @click="() => {handleJobListItemClick(job.$id.value)}" :class="{'gtp-body-list-job-item-selected': job.selected}" class="gtp-body-list-job-item">
          <span v-if="job.Today.value === 'Yes'" class="gtp-body-list-job-item-today">Today</span><span>{{job.Status.value}}</span>
          {{job.Title.value}}
        </div>
      </div>
      <div v-if="list.jobs.length === 0" class="gtp-body-list-empty">
        <img src="http://tech-pic.com/resources/materials/6/9/desktop1.png" />
        <div class="gtp-body-detail-empty-message">今日も一日お疲れ様です</div>
      </div>
    </div>
    <div v-if="detail.job != null || detail.jobForm != null" class="gtp-body-detail">
      <div class="gtp-detail-control">
        <div v-if="detail.mode === ''" @click="handleJobDetailEditClick" class="gtp-detail-control-item">編集</div>
        <div v-if="detail.mode === 'edit'" @click="handleJobDetailSaveClick" class="gtp-detail-control-item">保存</div>
        <div v-if="detail.mode === 'new'" @click="handleJobDetailAddClick" class="gtp-detail-control-item">追加</div>
        <div v-if="detail.mode === 'edit' || detail.mode === 'new'" @click="handleJobDetailCancelClick" class="gtp-detail-control-item gtp-detail-control-item-text">破棄</div>
        <div v-if="detail.mode === ''" @click="handleJobDetailMemoClick" class="gtp-detail-control-item gtp-detail-control-item-text">コメント</div>
        <div v-if="detail.mode === ''" @click="handleJobDetailDetailClick" class="gtp-detail-control-item gtp-detail-control-item-text">詳細</div>
        <div v-if="detail.mode === ''" @click="handleJobDetailCompleteClick" class="gtp-detail-control-item gtp-detail-control-item-text gtp-detail-control-item-right"><i class="fa fa-check"></i> 完了</div>
        <div v-if="detail.mode === ''" @click="handleJobDetailTodayClick" :class="{'gtp-detail-control-item-today-selected': (detail.job.Today.value === 'Yes')}" class="gtp-detail-control-item gtp-detail-control-item-text gtp-detail-control-item-right-2"><i class="fa fa-calendar"></i> Today</div>
      </div>
      <div class="gtp-detail-content">
        <div v-if="detail.mode === '' || detail.mode === 'memo'" class="gtp-detail-content-job-title">
          <span v-if="detail.job.Today.value === 'Yes'" class="gtp-detail-content-job-title-today">Today</span><span>{{detail.job.Status.value}}</span>
          {{detail.job.Title.value}}
        </div>
        <div v-if="detail.job.Detail.value !== '' && (detail.mode === '' || detail.mode === 'memo')" v-html="detail.job.Detail.value" class="gtp-detail-content-job-detail"></div>
        <div v-if="detail.mode === 'edit' || detail.mode === 'new'" class="gtp-detail-content-job-status">
          <div @click="() => {handleJobDetailStatusClick('❗️')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '❗️')}" class="gtp-detail-content-job-status-item">❗️</div>
          <div @click="() => {handleJobDetailStatusClick('🔰')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '🔰')}" class="gtp-detail-content-job-status-item">🔰</div>
          <div @click="() => {handleJobDetailStatusClick('🌙')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '🌙')}" class="gtp-detail-content-job-status-item">🌙</div>
          <div @click="() => {handleJobDetailStatusClick('💭')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '💭')}" class="gtp-detail-content-job-status-item">💭</div>
          <div @click="() => {handleJobDetailStatusClick('💤')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '💤')}" class="gtp-detail-content-job-status-item">💤</div>
          <div @click="() => {handleJobDetailStatusClick('✔︎')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '✔︎')}" class="gtp-detail-content-job-status-item">✔︎</div>
          <div @click="() => {handleJobDetailStatusClick('🚫')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '🚫')}" class="gtp-detail-content-job-status-item">🚫</div>
          <div @click="() => {handleJobDetailStatusClick('📌')}" :class="{'gtp-detail-content-job-status-item-selected': (detail.jobForm.Status.value === '📌')}" class="gtp-detail-content-job-status-item">📌</div>
        </div>
        <div v-if="detail.mode === 'edit' || detail.mode === 'new'" class="gtp-detail-content-job-title gtp-detail-content-job-title-editable">
          <input v-model="detail.jobForm.Title.value" type="text" placeholder="Job title" class="gtp-detail-content-job-title-text">
        </div>
        <div v-if="detail.mode === 'edit' || detail.mode === 'new'" class="gtp-detail-content-job-detail gtp-detail-content-job-detail-editable">
          <textarea v-model="detail.jobForm.Detail.value" placeholder="Job detail" class="gtp-detail-content-job-detail-text"></textarea>
        </div>
        <div v-if="detail.mode !== 'new'" v-for="memo in detail.job.Memo.value" class="gtp-detail-content-job-memo">
          <div class="gtp-detail-content-job-memo-date">
            {{memo.value.Date.value}}
          </div>
          <div v-html="memo.value.Text.value" class="gtp-detail-content-job-memo-text"></div>
        </div>
        <div v-if="detail.mode === 'memo'" class="gtp-detail-content-job-memo gtp-detail-content-job-memo-text-content">
          <div class="gtp-detail-content-job-memo-text">
            <textarea v-model="detail.memoForm.Text.value" placeholder="Memo" class="gtp-detail-content-job-memo-text-text"></textarea>
          </div>
        </div>
        <div v-if="detail.mode === 'memo'" class="gtp-detail-content-job-memo-control">
          <div @click="handleJobDetailMemoAddClick" class="gtp-detail-content-job-memo-control-item">追加</div>
          <div @click="handleJobDetailCancelClick" class="gtp-detail-content-job-memo-control-item gtp-detail-content-job-memo-control-item-text">破棄</div>
        </div>
      </div>
    </div>
    <div v-if="detail.job == null && detail.mode === ''" class="gtp-body-detail">
      <div class="gtp-body-detail-empty">
        <img src="http://tech-pic.com/resources/materials/4/8/04_02_011.png" />
        <div class="gtp-body-detail-empty-message">タスクを選択してください</div>
      </div>
    </div>
  </div>
`;

export default template;