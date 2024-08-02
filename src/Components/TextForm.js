import React, { useState, useRef } from 'react'

export default function TextForm(props) {

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  }

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  }

  const handleClearClick = () => {
    let newText = '';
    setText(newText);
  }

  const removeWhiteSpace = () => {
    let newText = text.replace(/\s+/g, ' ').trim();
    setText(newText);
  }

  const handleCapitalText = () => {
    let newText = text.split(" ").map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(" ");
    setText(newText);
  }

  const listenText = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;

    window.speechSynthesis.speak(msg);
  }

  const handleFindAndReplace = () => {
    const findStr = prompt("Enter the text to find:");
    const replaceStr = prompt("Enter the text to replace with:");
    if (findStr !== null && replaceStr !== null) {
      let newText = text.replace(new RegExp(findStr, 'g'), replaceStr);
      setText(newText);
    }
  }

  const handleEmailExtract = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    const extractedEmails = text.match(emailRegex);
    setEmails(extractedEmails || []);
  }

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((err) => console.error("failed to copy the text: " + err));
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
    if (copied) {
      setCopied(false);
    }
  }

  const [text, setText] = useState('');
  const [emails, setEmails] = useState([]);
  const [copied, setCopied] = useState(false);


  return (
    <>
      <div className="container">
        <h1 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Edit and Analyze Text</h1>
        <button className="btn btn-primary mx-1 my-2" onClick={handleCopyClick}>
          {copied ? "Copied" : "Copy to Clipboard"}
        </button>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{ backgroundColor: props.mode === 'dark' ? '#6a7387' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }}
            id="myBox"
            rows="12"
          ></textarea>
        </div>

        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Uppercase</button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Lowercase</button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleCapitalText}>Capitalise</button>
        
        <button className="btn btn-primary mx-1 my-1" onClick={removeWhiteSpace}>Remove whitespace</button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleFindAndReplace}>Find & Replace</button>

        <button className="btn btn-primary mx-1 my-1" onClick={handleEmailExtract}>Extract emails</button>

        <button type="submit" onClick={listenText} className="btn btn-success mx-1 my-1">Voice</button>


        <button className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Editor</button>

      </div>

      <div className="container my-3">
        <h2 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Text Summary</h2>
        <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}> {text === "" ? 0 : text.trim().split(" ").length} Words, {text.length} Characters</p>
        <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Reading Time: {0.008 * text.split(" ").length} Minutes</p>
        <h3 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Preview Text</h3>
        <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>{text.length > 0 ? text : "Write something to Preview"}</p>
        {emails.length > 0 && (
          <>
            <h3 style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Extracted Emails</h3>
            <ul style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
              {emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}




