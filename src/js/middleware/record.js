const record = {

  /**
   * レコード(1件)を取得する
   * @param {string} app アプリID
   * @param {string} id レコードID
   */
  getRecord(app, id) {
    return $.ajax({
      url: '/k/v1/record.json?app=' + app + '&id=' + id + '&__REQUEST_TOKEN__=' + window.kintoneToken
    });
  },

  /**
   * レコード(複数件)を取得する
   * @param {string} app アプリID
   * @param {string} query 検索クエリ
   */
  getRecords(app, query) {
    return $.ajax({
      url: '/k/v1/records.json?app=' + app + '&query=' + encodeURIComponent(query) + '&__REQUEST_TOKEN__=' + window.kintoneToken
    });
  },

  /**
   * レコードを登録する
   * @param {string} app アプリID
   * @param {object} record レコード情報
   */
  postRecord(app, record) {
    return $.ajax({
      url: '/k/v1/record.json',
      type: 'POST',
      data: JSON.stringify({
        app: app,
        record: record,
        __REQUEST_TOKEN__: window.kintoneToken
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json'
    })
  },

  /**
   * レコードを更新する
   * @param {string} app アプリID
   * @param {string} id レコードID
   * @param {object} record レコード情報
   */
  putRecord(app, id, record) {
    return $.ajax({
      url: '/k/v1/record.json',
      type: 'PUT',
      data: JSON.stringify({
        app: app,
        id: id,
        record: record,
        __REQUEST_TOKEN__: window.kintoneToken
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json'
    })
  },

  /**
   * レコードを一括更新する
   * @param {string} app アプリID
   * @param {object} records レコード情報
   */
  putRecords(app, records) {
    return $.ajax({
      url: '/k/v1/records.json',
      type: 'PUT',
      data: JSON.stringify({
        app: app,
        records: records,
        __REQUEST_TOKEN__: window.kintoneToken
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      dataType: 'json'
    })
  },
};

export default record;