import EmojiPicker, { IEmojiData } from 'emoji-picker-react';
import { trim } from 'lodash';
import React, { useState } from 'react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import styled from 'styled-components';

interface ChatInputProps {
  onSendMessage: (mes: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [msg, setMsg] = useState<string>('');
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const toggleShowEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  const handlePickerEmoji = (event: React.MouseEvent<Element, MouseEvent>, data: IEmojiData) => {
    let message = msg;
    message += data.emoji;

    setMsg(message);
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const mesContent = trim(msg);
    if (mesContent.length <= 0) return;

    onSendMessage(mesContent);
  };

  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill
            color="#ffff00c8"
            className="text-[1.6rem] cursor-pointer"
            onClick={toggleShowEmoji}
          />
          {showEmoji && <EmojiPicker onEmojiClick={handlePickerEmoji} />}
        </div>
      </div>
      <form onSubmit={handleSendMessage} className="input-container">
        <input
          type="text"
          placeholder="Enter message here"
          value={msg}
          onChange={handleChangeMessage}
          onFocus={() => {
            showEmoji && toggleShowEmoji();
          }}
        />
        <button type="submit" className="submit">
          <IoMdSend color="#fff" className="text-[2rem]" />
        </button>
      </form>
    </Container>
  );
}

export default ChatInput;

const Container = styled.div`
  display: flex;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding-bottom: 0.3rem;
  margin: 0 2rem;
  .btn-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      margin-right: 1.5rem;
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
        }
        .emoji-scroll-wrapper::-webkit-scrollbar-thumb {
          background-color: #9186f3;
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9186f3;
        }
        .emoji-group::before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
    }
  }
`;
