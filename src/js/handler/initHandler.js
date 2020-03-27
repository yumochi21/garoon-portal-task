import initLogic from '../logic/initLogic';
import listLogic from '../logic/listLogic';
import vm from '../vm/vm';

/**
 * 初期化ハンドラ
 */
const initHandler = {

  /**
   * 画面表示時のイベントハンドラ
   */
  handleDisplayShow() {
    // HTMLテンプレートを設定
    initLogic.setTemplate();

    // Vue vm を初期化
    vm.init();

    // kintoneトークンを取得
    initLogic.getKintoneToken().then(token => {
      listLogic.setDefaultList();
    });
  }
};

export default initHandler;