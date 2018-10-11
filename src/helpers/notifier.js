import awsIot from 'aws-iot-device-sdk';

function Notifier (data) {
  const { topic, iotEndpoint, region, accessKey, secretKey, sessionToken } = data;

  let client;
  console.log(data);
  const connect = () => {
    console.log(region);
    console.log(accessKey);
    console.log(secretKey);
    console.log(sessionToken);
    console.log(iotEndpoint);
    console.log(topic);
    client = awsIot.device({
      region: region,
      protocol: 'wss',
      accessKeyId: accessKey,
      secretKey: secretKey,
      sessionToken: sessionToken,
      port: 443,
      host: iotEndpoint
    });

    console.log(client);
    client.on('connect', onConnect);
    client.on('message', onMessage);
    client.on('close', onClose);
    client.on('error', onClose2);
  };

  const send = (message) => {
    client.publish(topic, message);
  };

  const onConnect = () => {
    client.subscribe(topic);
    console.log('Connected');
  };

  const onMessage = (topic, message) => {
    console.log(message);
    const string = new TextDecoder("utf-8").decode(message);
    console.log(string);
    const parsed = JSON.parse(string);
    console.log(parsed);
  };

  const onClose = (e) => {
    console.log(e);
    console.log('Connection failed');
  };

  const onClose2 = (e) => {
    console.log(e);
    console.log('Connection failed');
  };

  return {
    connect,
    send,
  }
}

export default Notifier;


