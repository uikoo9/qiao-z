// commonjs
const QiaoLLM = require('qiao-llm');
const LLM = QiaoLLM({
});

/**
 * res streaming
 */
module.exports = function (app) {
  app.get('/res/streaming-html', function (req, res) {
    console.log('/res/streaming-html');
    res.render('./views/res-streaming.html');
  });

  app.get('/res/streaming', async function (req, res) {
    console.log('/res/streaming');

    // chat options
    const chatOptions = {
      model: 'ep-20250728120834-z2msz',
      messages: [
        { role: 'system', content: '你是人工智能助手' },
        { role: 'user', content: '常见的十字花科植物有哪些？' },
      ],
      thinking: {
        type: 'enabled',
      },
    };

    // callback options
    const callbackOptions = {
      beginCallback: () => {
        console.log(0);
        res.streamingStart();
      },
      endCallback: () => {
        console.log(1);
        res.streamingEnd();
      },
      errorCallback: (error) => {
        console.log(2, error);
        res.streamingEnd();
      },
      firstThinkingCallback: () => {
        console.log(3);
        res.streaming('thinking');
      },
      thinkingCallback: (msg) => {
        console.log(4);
        res.streaming(msg);
      },
      firstContentCallback: () => {
        console.log(5);
        res.streaming('content');
      },
      contentCallback: (msg) => {
        console.log(6);
        res.streaming(msg);
      },
    };

    // go
    await LLM.chatWithStreaming(chatOptions, callbackOptions)
  });
};
