export const currentMessages = (state) => {
  if (state.chats[state.currentChat]) { return state.chats[state.currentChat].messages; }

  return [];
};

export const lastMessage = state => (chatId) => {
  const { messages } = state.chats[chatId];
  return messages[messages.length - 1];
};
