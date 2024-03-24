function MessageInput({ onSend }: { onSend: Function }): JSX.Element {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSend(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="box">
      <div className="control">
        <input className="input" type="text" placeholder="Say something..." onKeyDown={handleKeyDown} />
      </div>
    </div>
  );
}

export default MessageInput;
