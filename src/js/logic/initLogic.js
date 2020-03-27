import $ from 'jquery';
import template from '../component/template';

/**
 * 初期化ロジック
 */
const initLogic = {

  /**
   * kintoneの認証トークンを取得する
   * @returns kintoneトークン
   */
  getKintoneToken() {
    return garoon.connect.kintone.getRequestToken().then(token => {
      window.kintoneToken = token;
      return token;
    });
  },

  /**
   * テンプレートをポートレットに設定する
   */
  setTemplate() {
    $('#gtp').html(template);
  }
};

export default initLogic;