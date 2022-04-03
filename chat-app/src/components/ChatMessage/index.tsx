import React from 'react';
import { MessageUser } from 'redux/user/type';
import styled from 'styled-components';

interface ChatMessageProps {
  listMessage?: MessageUser[];
}

function ChatMessage({ listMessage }: ChatMessageProps) {
  return (
    <Container>
      {listMessage?.map((mes) => (
        <div key={mes.id}>
          <div className={`message ${mes.fromSelf ? 'sender' : 'receiver'}`}>
            <div className="message-content">
              <p>{mes.message}</p>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default ChatMessage;

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  .message {
    display: flex;
    align-items: center;
    .message-content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
  }

  .sender {
    justify-content: flex-end;
    .message-content {
      background-color: #4f04ff21;
    }
  }

  .receiver {
    justify-content: flex-start;
    .message-content {
      background-color: #9900ff20;
    }
  }
`;
