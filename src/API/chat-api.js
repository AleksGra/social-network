let subscribers ={
  'messages-received':[],
  'status-changed':[]
};
let ws = null;
const closeHandler = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000);
};
const messageHandler = e => {
  const newMessages = JSON.parse(e.data);
  subscribers['messages-received'].forEach(s => s(newMessages));
};
const openHandler = () => {
  notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
  notifySubscribersAboutStatus('error')
  console.error('REFRESH PAGE')
}
const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatus = (status) => {
  subscribers['status-changed'].forEach(s => s(status))
}
const createChannel=()=> {
  cleanUp()
  ws?.close();
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatApi = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
  },
  subscribe(eventName,callback) {
    subscribers[eventName].push(callback);
    return () => {
      subscribers = subscribers.filter(s => s !== callback);
    };
  },
  unSubscribe(eventName,callback) {
    subscribers[eventName] = subscribers.filter(s => s !== callback);
  },
  sendMessage(message) {
    ws.send(message);
  },
};
