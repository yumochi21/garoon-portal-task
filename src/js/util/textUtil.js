const textUtil = {
  /**
   * HTMLエンコードを行う
   * @param {string} text テキスト
   * @returns {string} HTMLエンコード済みテキスト
   */
  encodeHtml(text) {
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(/\r?\n/g, '<br>').replace(exp, '<a href="$1" target="_blank">$1</a>');
  }
};

export default textUtil;