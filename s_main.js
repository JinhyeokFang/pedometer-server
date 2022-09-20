
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'jinhyeokfang',
  applicationName: 'pedometer',
  appUid: 'QQkqDydh9QTmhxt3WF',
  orgUid: 'fcfdafe3-1e7a-4b75-aea1-ae9ecce2a28a',
  deploymentUid: 'f71912f6-a6a9-4daf-80cd-c12171df6547',
  serviceName: 'pedometer-serverless',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '6.2.2',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'pedometer-serverless-dev-main', timeout: 6 };

try {
  const userHandler = require('./dist/main.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}