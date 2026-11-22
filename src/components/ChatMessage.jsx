import { useRef, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { visit } from 'unist-util-visit'
import ContextSingleton from "./Auth";


import { FaCheck, FaPenToSquare, FaReply, FaTrash } from 'react-icons/fa6';

function format(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default ({
  message,
  showSender,
  replyMessage,
  setSource,
  setVisible,
  editMessage,
  deleteMessage,
  inputRef,
}) => {

  const [editing, setEditing] = useState(false);
  const type = classifyMessage(message.content);
  const containerStyle = "shadow-xl rounded-xl left-[0px]";
  const ContentRef = useRef(null);

  var body;
  switch (type) {
    case "image":
      body = (
        <Container className={`h-fit w-fit`} message={message}>
          <img
            onClick={() => {setSource(message.content); setVisible(true)}}
            src={message.content}
            className="max-h-[700px] rounded-xl border-1 max-h-24"
            loading="lazy"
          />
        </Container>
      );
      break;
    case "audio":
      body = (
        <Container className="w-full" message={message}>
          <AudioPlayer clasName="rounded-xl border-1" message={message} />
        </Container>
      );
      break;
    case "video":
      body = (
        <Container className="w-full" message={message}>
          <video
            src={message.content}
            className={`${containerStyle}`}
            controls
          />
        </Container>
      );
      break;
    default:
      body = <TextMsg ref={ContentRef} message={message} editing={editing} setEditing={setEditing} editMessage={editMessage} />;
  }

  return (
    <div
      id={`message-${message.id}`}
      className={`color-1 transition-color ${showSender && "chat-message"}`}
      dir="ltr"
    >
      {showSender && <MsgHeader setContext={setSource} setVisible={setVisible} inputRef={inputRef} message={message} />}
      <div className="flex flex-row">
	  	{body}
        <ControlBar
          message={message}
          replyMessage={replyMessage}
          deleteMessage={deleteMessage}
          editMessage={editMessage}
          contentRef={ContentRef}
          isTextMessage={type == "text"}
	  	  editing={editing}
	  	  setEditing={setEditing}
        />
      </div>
    </div>
  );
};

const MsgHeader = ({ message, inputRef , setVisible, setContext}) => {
  return (
    <div className="flex flex-row">
      <div className="color-7 pb-2 pt-2">
        <div className="flex flex-row items-center p-4">
          <img
            className="rounded-[1000px] h-[50px] w-[50px] mr-2 object-cover"
            src={message.avatar}
	  		onClick={()=>{setVisible(true);setContext(message.avatar)}}
          />
          <button onClick={()=>{let v=inputRef.current.value;inputRef.current.value = `${v} @${message.sender} `}} className="border-transparent hover:border-transparent sans-serif bold p-0 m-0 self-center align-middle"> {message.sender}: </button>
        </div>
      </div>
    </div>
  );
};

const StringParser = (text) => {
  /*
  this takes in a string and parses urls and other stuff with regex
  */
  const URLREGEX = /^https?:\/\/.+$/i;
  let match = text?.match(URLREGEX)
  if (match) {
	return "url"
  }
  return "text"
}


const TextMsg = ({ message, ref, editing, setEditing, editMessage }) => {
	const username = ContextSingleton.getInstance(null).getUsername()

  let fixedMsg = message.content;
  fixedMsg = fixedMsg.split('\n');
  for(let i = 0; i<fixedMsg.length; i++) {
    if(fixedMsg[i].startsWith(">") && !(fixedMsg[i+1]?.startsWith(">")) ) {
        fixedMsg[i] += "\n\n";
        i++;
    }
  }
  fixedMsg = fixedMsg.join("\n");

  let color = ""
  if (username && message.content.includes(`@${username}`)) {
	color = "bg-8"
  }
  var shift = false;
  return (
    <div className="sans-serif flex flex-row item-center p-2 w-full">
      <div className="color-7 inline px-2 text-xs content-center">{message.time}</div>
      <div className={`p-1 word-wrap rounded-md w-full content-center chat-message-markdown ${color}`}>
	  {editing && <Textarea onKeyUp={k=>{if(k.key=='Shift')shift=false}} onKeyDown={(k=>{if(k.key == 'Shift')shift=true;if(k.key == 'Enter' && shift == false) {setEditing(false); editMessage(message.id, ref.current.value)} })} ref={ref} defaultValue={fixedMsg} /> || <Markdown remarkPlugins={[remarkGfm,remarkBreaks]} rehypePlugins={[replyParser]}>{fixedMsg}</Markdown>}
      </div>
    </div>
  );
};

const replyParser = () => {
	return (tree) => {
		visit(tree, 'element', (node) => {
            if (node.tagName == "blockquote" && node.position.start && node.position.start.offset == 0) {
                const pTag = node.children[1];
                const msgRef = parseInt(pTag?.children[0]?.value)
                if(msgRef){
                    pTag.tagName = "a";
                    pTag.properties['href'] = `#message-${msgRef}`;
					pTag.children[0].value = pTag.children[0].value.replace(/\d+\s/i,"")
					pTag.properties['onclick'] = () => {
                    let m = document.getElementById(`message-${msgRef}`);
                    m.classList.add("hilighted");
                    setTimeout(() => {
                      m.classList.remove("hilighted");
                    }, 700);
                  }
                }
            }
		})
	}
}

const Container = ({ message, children, className }) => {
  return (
    <>
      <div className="flex flex-row content-center items-center p-2 w-full">
        <div className="content-center color-7 inline pl-2 text-xs dejavu mr-2">
          {message.time}
        </div>
        <div className={`dejavu pt-2 ${className}`}>{children}</div>
      </div>
    </>
  );
};

const ControlBar = ({
  message,
  replyMessage,
  deleteMessage,
  editMessage,
  contentRef,
  isTextMessage,
  editing, 
  setEditing,
}) => {
  // reply / delete etc...
  return (
    <div className="mr-16 flex flex-row-reverse gap-x-[4px]">
      <button
        onClick={() => {
          replyMessage(message);
        }}
        className="cbb color-white p-[12px] h-fit self-center"
      >
        <FaReply className="cbbi"/>
      </button>
      {ContextSingleton.getInstance().getUsername() == message.sender && (
        <>
          <button
            className="cbb p-[12px] h-fit self-center"
            onClick={() => {
              deleteMessage(message.id);
            }}
          >
            <FaTrash className="cbbi fill-white m-auto" />
          </button>
          {isTextMessage &&
            ((!editing && (
              <button className="cbb p-[12px] h-fit self-center"
                onClick={() => {
                  setEditing(true);
				  setTimeout(()=>{contentRef.current.focus()},1);
                }}
              >
				 <FaPenToSquare className="cbbi white m-auto" color="#ffffff" />
              </button>
            )) || (
              <button
                onClick={() => {
				  editMessage(message.id, contentRef.current.value)
                  setEditing(false);
                }}
				className="cbb p-[12px] h-fit self-center"
              >
                <FaCheck className="cbbi" />
              </button>
            ))}
        </>
      )}
    </div>
  );
};

const AudioPlayer = ({ message }) => {
  const pauseSVG = () => {
    return (
      <div className="w-[30px] h-[30px] fill-white">
        <svg viewBox="0 0 24 24">
          <path d="M7 6.13402V17.866C7 18.7606 8.02908 19.3042 8.82159 18.8172L18.45 12.9512C19.1833 12.5096 19.1833 11.4904 18.45 11.0374L8.82159 5.18278C8.02908 4.69583 7 5.2394 7 6.13402Z"></path>
        </svg>
      </div>
    );
  };
  const playSVG = () => {
    return (
      <div className="w-[30px] h-[30px] fill-white">
        <svg viewBox="0 0 24 24">
          <path d="M7.5 4.51001H9.5C10.0523 4.51001 10.5 4.95772 10.5 5.51001V18.51C10.5 19.0623 10.0523 19.51 9.5 19.51H7.5C6.94772 19.51 6.5 19.0623 6.5 18.51V5.51001C6.5 4.95772 6.94772 4.51001 7.5 4.51001ZM14.5 4.51001H16.5C17.0523 4.51001 17.5 4.95772 17.5 5.51001V18.51C17.5 19.0623 17.0523 19.51 16.5 19.51H14.5C13.9477 19.51 13.5 19.0623 13.5 18.51V5.51001C13.5 4.95772 13.9477 4.51001 14.5 4.51001Z"></path>
        </svg>
      </div>
    );
  };

  let audioRef = useRef(null);
  let filledRef = useRef(null);
  let timeRef = useRef(null);
  let progressRef = useRef(null);

  let [playButtonClass, setPlayButtonClass] = useState("");

  return (
    <>
      <a href={message.content} className="bg-[#1e1e1e] p-1 w-fit roundedb-xl color-1">
        {message.content.split("/")[message.content.split("/").length - 1]}
      </a>
      <div className="player">
        <audio
          onTimeUpdate={() => {
            const percent =
              (audioRef.current.currentTime / audioRef.current.duration) * 100;
            filledRef.current.style.width = percent + "%";
            timeRef.current.textContent = `${format(audioRef.current.currentTime)} / ${format(audioRef.current.duration)}`;
          }}
          ref={audioRef}
          id="track"
          src={message.content}
        ></audio>
        <button
          onClick={() => {
            if (audioRef.current.paused) {
              audioRef.current.play();
              setPlayButtonClass("paused");
            } else {
              audioRef.current.pause();
              setPlayButtonClass("");
            }
          }}
          className={`play-pause ${playButtonClass} p-0`}
          aria-label="Play/Pause"
        >
          {" "}
          {(playButtonClass == "paused" && playSVG()) || pauseSVG()}
        </button>
        <div
          className="progress"
          ref={progressRef}
          onClick={(e) => {
            const rect = progressRef.current.getBoundingClientRect();
            const clickPos = e.clientX - rect.left;
            const newTime = (clickPos / rect.width) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
          }}
        >
          <div ref={filledRef} className="filled"></div>
        </div>
        <span ref={timeRef} className="time">
          0:00 / 0:00
        </span>
        <input
          type="range"
          className="volume"
          min="0"
          max="1"
          step="0.01"
          onInput={(e) => {
            audioRef.current.volume = e.target.value;
          }}
        />
      </div>
    </>
  );
};

const classifyMessage = (msg) => {
  const regex = /^https?:\/\/[^\/]+\/.+\.([0-9a-z]+)$/i;

  var ext = msg.match(regex);
  return ext ? knownExtensions[ext[1].toLowerCase()] : "text";
};

// using a class of what is basically hashmaps with extra bloat as the go-to data struct
// for almost everything and calling it "object" is certainly a design choise for javascript,
// which has encouraged javascript libraries to never use more performant/compact data structures
// in the name of "simplicity" leading to every "modern" page using any kind of framework to
// waste a lot memory and cpu cycles, and everyone is like "oh dang chrome eats ram haha funny",
// not that it matters as everyone can afford one of the cheapest parts of computer, RAM, right?
// *glances at OpenAI with suspeciously RAM shaped belly*
//
// tbf javascript engiens have done a good job by trying to make hidden classes of not-changing-often
// object types and typescript has made some concrete-ness to this approach by encouraging you to
// have structure. OH WAIT What's that? The DOM is an object that changes often and has no ineherit
// structure making it impossible to make hidden classes for? and most frameworks make a copy
// from it so they can modify it faster, while having this same issue??? and you're telling me
// adding so many lookups in the heap made things slow so we make more caches and that cancels out a
// lot of the memory saving tricks? that's crazy!
//
// well in any case we would need a hashmap here, and this is a low-sized one-time instantiated
// look-up table so we will use object because normal maps don't have a nice and readable constructor
// in javascript, and readability takes the priority here. also V8 optimization have gotten better so
// maybe its not that bad
//
// tl;dr i die everytime i think about the complexity of objects. rant over, thank you for reading :3
const knownExtensions = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  webp: "image",
  gif: "image",
  jfif: "image",

  mp4: "video",
  webm: "video",
  mov: "video",
  mkv: "video",

  ogg: "audio",
  mp3: "audio",
  flac: "audio",
  wav: "audio",
  m4a: "audio",
  opus: "audio",
};
