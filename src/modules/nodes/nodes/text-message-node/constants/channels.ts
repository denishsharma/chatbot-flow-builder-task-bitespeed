export enum MessageChannel {
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  MESSENGER = 'messenger',
  TELEGRAM = 'telegram',
}

export type MessageChannelType = `${MessageChannel}`

export interface MessageChannelDetail {
  name: string;
  icon: string;
}

// @unocss-include
export const MessageChannelDetails: Record<MessageChannelType, MessageChannelDetail> = {
  [MessageChannel.SMS]: { name: 'SMS', icon: 'i-mynaui:chat-messages' },
  [MessageChannel.WHATSAPP]: { name: 'WhatsApp', icon: 'i-ic:round-whatsapp' },
  [MessageChannel.MESSENGER]: { name: 'Messenger', icon: 'i-mingcute:messenger-line' },
  [MessageChannel.TELEGRAM]: { name: 'Telegram', icon: 'i-ph:telegram-logo' },
}

export function getMessageChannelDetails(channel: MessageChannelType) {
  return MessageChannelDetails[channel]
}
