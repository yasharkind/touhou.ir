"use client";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "@/components/ChatMessage.jsx";
import ContextSingleton from "@/components/Auth.jsx";
import items from "@/items.json";
import unmutedSvg from "@/assets/unmuted.svg";
import mutedSvg from "@/assets/muted.svg";
import { FaArrowLeft, FaArrowRight, FaShip } from "react-icons/fa6";

const BACKENDDOMAIN = "chat.touhou.ir:3000";
// const BACKENDDOMAIN = "localhost:3000";

const backendws = `wss://${BACKENDDOMAIN}/ws`;
const backendupload = `https://${BACKENDDOMAIN}/upload`;
const backendauth = `https://${BACKENDDOMAIN}/auth`;
const backendlogin = `https://${BACKENDDOMAIN}/login`;
// const backenduser = `https://${BACKENDDOMAIN}/user`;
const backenddeletemessage = `https://${BACKENDDOMAIN}/deletemessage`;
const backendeditmessage = `https://${BACKENDDOMAIN}/editmessage`;
const BACKENDMOREMESSAGES = `https://${BACKENDDOMAIN}/message`;

// TODO: move svgs into svg files

class OpCodes {
  static Auth = 0;
  static SendMessage = 1;
  static DeleteMessage = 2;
  static EditMessage = 3;
}

const wsSvg = (className) => {
  return (
    <div className={className}>
      <svg viewBox="0 0 24 25" width="1em" height="1em" focusable="false">
        <path d="M5.63 7.63c.82 0 1.5-.68 1.5-1.5 0-.83-.68-1.5-1.5-1.5-.83 0-1.5.67-1.5 1.5 0 .82.67 1.5 1.5 1.5"></path>
        <path d="M12 7.63c.83 0 1.5-.68 1.5-1.5C13.5 5.3 12.83 4.63 12 4.63s-1.5.67-1.5 1.5c0 .82.67 1.5 1.5 1.5"></path>
        <path d="M18.38 7.63c.82 0 1.5-.68 1.5-1.5 0-.83-.68-1.5-1.5-1.5-.83 0-1.5.67-1.5 1.5 0 .82.67 1.5 1.5 1.5"></path>
        <path d="M5.63 14c.82 0 1.5-.67 1.5-1.5S6.45 11 5.63 11c-.83 0-1.5.67-1.5 1.5S4.8 14 5.63 14"></path>
        <path d="M12 14c.83 0 1.5-.67 1.5-1.5S12.83 11 12 11s-1.5.67-1.5 1.5S11.17 14 12 14"></path>
        <path d="M18.38 14c.82 0 1.5-. 1.5-1.5S19.2 11 18.38 11c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5"></path>
        <path d="M5.63 20.38c.82 0 1.5-.68 1.5-1.5 0-.83-.68-1.5-1.5-1.5-.83 0-1.5.67-1.5 1.5 0 .82.67 1.5 1.5 1.5"></path>
        <path d="M12 20.38c.83 0 1.5-.68 1.5-1.5 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .82.67 1.5 1.5 1.5"></path>
        <path d="M18.38 20.38c.82 0 1.5-.68 1.5-1.5 0-.83-.68-1.5-1.5-1.5-.83 0-1.5.67-1.5 1.5 0 .82.67 1.5 1.5 1.5"></path>
      </svg>
    </div>
  );
};

const CheckIsLoggedIn = () => {
  let token = localStorage.getItem("token");
  return token != "" && token != null;
};

const LoginLogout = (props) => {
  const [_, setIsMuted] = useState("false");

  let className = `color-1 bg-2 h-full text-[10px] p-4`;
  const WsStatus = () => {
    switch (props.ws.current?.readyState) {
      case WebSocket.CONNECTING:
        return "fill-yellow bg-yellow";
      case WebSocket.OPEN:
        return "fill-green bg-green";
      default:
        return "fill-red bg-red";
    }
  };
  if (props.isLoggedIn) {
    return (
      <div className={props.className}>
        <button
          className={className}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          logout
        </button>
        {wsSvg(WsStatus() + " shadow-full rounded-full")}
        <button
          className="p-2 pt-0 pb-0"
          onClick={() => {
            if (localStorage.getItem("muted" || null) != "false") {
              setIsMuted("false");
              localStorage.setItem("muted", "false");
            } else {
              setIsMuted("true");
              localStorage.setItem("muted", "true");
            }
          }}
        >
          {localStorage.getItem("muted" || null) != "false" ? (
            <img src={mutedSvg} />
          ) : (
            <img src={unmutedSvg} />
          )}
        </button>
      </div>
    );
  } else {
    return (
      <div className={props.className}>
        <button
          className={className}
          onClick={() => {
            props.setInvisible("");
          }}
        >
          login
        </button>
      </div>
    );
  }
};

const hexstr2bytes = (str) => {
  let bytes = new Uint8Array(str.length / 2);
  for (let i = 0; i < str.length; i += 2) {
    const b = str.substring(i, i + 2);
    bytes[i / 2] = parseInt(b, 16);
  }
  return bytes;
};
const bytes2hexstr = (bytes) => {
  let str = "";
  for (let b of bytes) {
    str += b.toString(16).padStart(2, "0");
  }
  return str;
};
const encrypt = (salt, text) => {
  console.log("before encrypoting: " + text);
  if (text == null) {
    return "";
  }
  let cipher = new TextEncoder().encode(text);
  const salt_bytes = hexstr2bytes(salt.replaceAll("-", ""));
  for (let i = 0; i < cipher.length; i++) {
    cipher[i] ^= salt_bytes[i % salt_bytes.length];
  }
  console.log("after encrypting: " + bytes2hexstr(cipher));
  return bytes2hexstr(cipher);
};
const decrypt = (salt, cipher) => {
  console.log("before decrypting: " + cipher);
  console.log("before decrypting key: " + salt);
  if (cipher == null) {
    return "";
  }
  const salt_bytes = hexstr2bytes(salt.replaceAll("-", ""));
  let msg = hexstr2bytes(cipher);
  for (let i = 0; i < msg.length; i++) {
    msg[i] ^= salt_bytes[i % salt_bytes.length];
  }
  msg = new TextDecoder().decode(msg);

  console.log("after decrypting: " + msg);
  return msg;
};

const ImageContext = ({ source }) => {
  return (
    <>
      <img
        className="rounded-xl border-2 shadow-full w-full h-full z-50"
        src={source}
      />
    </>
  );
};

const LoginPage = (props) => {
  let usernameRef = useRef();
  let passwordRef = useRef();

  let [info, setInfo] = useState("");

  const login = (username, password) => {
    fetch(backendlogin, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
    }).then((res) => {
      res.text().then((token) => {
        if (!token || token == "") {
          setInfo("failed");
          return;
        }
        localStorage.setItem("token", token);
        setInfo("success");
        props.setInvisible("invisible");
        window.location.reload();
      });
    });
  };

  return (
    <div
      className={`scheme-chatpage ${props.invisible} h-full w-full z-10 fixed flex`}
    >
      <div
        className={`bg-4 opacity-10 fixed align-center content-center w-full h-full`}
      />
      <div
        className="w-3/4 h-3/4 bg-6 plr-6 m-auto rounded-xl z-11 shadow-xl flex flex-col space-y-6"
        style={{ padding: 32 }}
      >
        <div className="h-1/10 flex">
          <button
            onClick={() => {
              props.setInvisible("invisible");
            }}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="color-red-400">{info}</h1>
          <input
            ref={usernameRef}
            type="text"
            className="color-3 bg-1"
            placeholder="username"
          />
          <input
            ref={passwordRef}
            type="password"
            className="color-3 bg-1"
            placeholder="password"
          />
          <button
            className="w-1/2 shadow-xl border-1 m-4"
            onClick={() => {
              login(usernameRef.current.value, passwordRef.current.value);
            }}
          >
            Login
          </button>
          <button className="w-1/2 m-auto shadow-xl border-1 mtb-4">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

const filter = (str, lst) => {
  for (let i = 0; i < lst.length; i++) if (str?.startsWith(lst[i])) return true;
  return false;
};

const MentionElement = ({ user, content, id }) => {
  const readMessage = localStorage.getItem("read-message" || 0);
  return (
    <a
      onClick={() => {
        let m = document.getElementById(`message-${id}`);
        m.classList.add("hilighted");
        setTimeout(() => {
          m.classList.remove("hilighted");
        }, 700);
      }}
      href={`#message-${id}`}
      className={` ${readMessage < id ? "bg-2" : "bg-3"} rounded-md flex flex-col gap-px`}
    >
      <p className="">{user}:</p>
      <p className="color-1 text-left">{content}</p>
    </a>
  );
};

const parseEmojis = (txt) => {
  const emojiDict = {
    "<3": "❤️",
    ":heart:": "❤️",
    "</3": "💔",
    ":sob:": "😭",
    ":nerd:": "🤓",
    ":hearts:": "🥰",
    ":thumbsup:": "👍",
    ":kiss:": "😘",
    ":strong:": "💪",
    ":muscle:": "💪",
    ":evil:": "😈",
    ":>:):": "😈",
    ":>:(:": "👿",
    ":cum:": "💦",
    ":vomit:": "🤮",
    india: "🤮",
    ":puke:": "🤮",
    ":love:": "😍",
    "::):": "🙂",
    ":joy:": "😂",
    ":sunglasses:": "😎",
    ":cool:": "😎",
    ":sus:": "🤨",
    ":unamused:": "😒",
    ":wave:": "👏",
    ":cry:": "😢",
    ":whink:": "😉",
    ":think:": "🤔",
    ":laugh:": "😆",
    ":yum:": "😋",
    ":blush:": "😊",
    ":hug:": "🤗",
    ":smirk": "😏",
    "::|:": "😐",
    ":sleep:": "😴",
    ":scared:": "😨",
    ":scary:": "😨",
    ":explodinghead:": "🤯",
    ":exploding_head:": "🤯",
    ":screaming:": "😱",
    ":angry:": "😡",
    ":anger:": "😡",
    ":shh:": "🤫",
    ":hush:": "🤫",
    ":skull:": "💀",
    ":pray:": "🙏",
    ":pleading:": "🥺",
    ":face_holding_back_tears:": "🥹",
    ":sparkly_heart:": "💖",
    ":fire:": "🔥",
  };
  for (let i in emojiDict) {
    txt = txt.replaceAll(i, emojiDict[i]);
  }
  return txt;
};

export default function ChatPage() {
  const ws = useRef(null);
  const audioRef = useRef(null);
  const mentionAudioRef = useRef(null);
  const mentionAudioLoudRef = useRef(null);
  const veryLoudRef = useRef(null);
  const messageRef = useRef(null);
  const fileRef = useRef(null);
  const keyInput = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invisible, setInvisible] = useState("invisible");
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState(0);
  const [_messages, setMessages] = useState([]);
  const [messageHist, setMessageHist] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [progressBars, setProgressBars] = useState([]);
  const [visible, setVisible] = useState(false);
  const [source, setSource] = useState("");

  const [messagesOffset, setMessagesOffset] = useState(1);
  // const _readMessage = localStorage.getItem("read-message" || 0);

  let inputCounter = 0;

  let themes = [
    "chatpage",
    "characters",
    "puredark",
    ...items.charitems
      .map((o) => o.items)
      .map((o) => {
        return o?.map((oo) => {
          return oo?.name?.toLowerCase();
        });
      })
      .flat()
      .slice(1, -1),
  ];
  const nextTheme = () => {
    setTheme((t) => (t < themes.length - 1 ? t + 1 : (t = 0)));
  };
  const prevTheme = () => {
    setTheme((t) => (t > 0 ? t - 1 : (t = themes.length)));
  };

  useEffect(() => {
    keyInput.current.value = localStorage.getItem("key" || "");

    setTheme(Number(localStorage.getItem("theme" || "0")));

    setIsLoggedIn(CheckIsLoggedIn());

    // set overflow to body
    document.body.classList.add("overflow-y-hidden");

    // generate the key storage value
    if (localStorage.getItem("key" || null) == null) {
      localStorage.setItem("key", "");
    }

    // connect to websocket
    ConnectToWs();
    const interval = setInterval(
      () => {
        if (!(
          ws.current?.readyState == WebSocket.OPEN ||
          ws.current?.readyState == WebSocket.CONNECTING
        ))
          ConnectToWs();
      },
      5000,
      0,
    );

    return () => {
      ws.current?.close();
      clearInterval(interval);
    };
  }, []);

  // fetch message history with token
  const messageHistory = () => {
    const storageToken = localStorage.getItem("token") || "";

    fetch(backendauth, {
      method: "GET",
      headers: {
        Authorization: storageToken,
      },
    }).then((res) => {
      res.json().then((json) => {
        const username = ContextSingleton.getInstance().getUsername();

        const messages = (json?.messages ?? []).map((msg) => ({
          ...msg,
          content: !filter(msg.content, ["http", ">profile"])
            ? decrypt(localStorage.getItem("key") || "", msg.content)
            : msg.content,
        }));

        setMessages((prev) => [...prev, ...messages]);

        const mentions = messages.filter((msg) =>
          msg.content?.includes(`@${username}`),
        );

        setMessageHist((prev) => [...prev, ...mentions]);
      });
    });
  };

  const ConnectToWs = () => {
    let token = localStorage.getItem("token" || null);
    if (token != null && token != "") {
      ContextSingleton.getInstance(token);
    }
    ws.current = new WebSocket(backendws);
    ws.current.onopen = () => {
      console.log("connection established");
      setMessages((_) => []);
      setMessageHist((_) => []);
      messageHistory();
      AuthWs();
    };

    ws.current.onmessage = (event) => {
      let audioType = audioRef;
      const obj = JSON.parse(event.data);
      if (!obj.op_code) {
        console.error("op_code missing from backend websocket");
        return;
      }

      switch (obj.op_code) {
        case OpCodes.SendMessage:
          if (!filter(obj.content, ["http", ">profile"]))
            obj.content = decrypt(
              localStorage.getItem("key" || ""),
              obj.content,
            );

          if (
            obj.content.includes(
              `@${ContextSingleton.getInstance().getUsername()}`,
            )
          ) {
            audioType = mentionAudioRef;
            if (obj.content.startsWith("#")) audioType = mentionAudioLoudRef;

            setMessageHist((l) => [obj, ...l]);
          }
          if (obj.content.includes("wobab")) {
            audioType = mentionAudioRef;
            if (obj.content.startsWith("#")) audioType = mentionAudioLoudRef;
          }
          if (obj.content.startsWith("#")) {
            mentionAudioLoudRef.current.volume = 1;
            if (obj.content.startsWith("##")) {
              mentionAudioLoudRef.current.volume = 0.15;
              if (obj.content.startsWith("###"))
                mentionAudioLoudRef.current.volume = 0.1;
            }
            if (obj.content.includes("# **WOBAB**")) audioType = veryLoudRef;
          }

          setMessages((l) => [obj, ...l]);
          if (obj.sender == ContextSingleton.getInstance().getUsername())
            localStorage.setItem("read-message", obj.id);
          break;
        case OpCodes.DeleteMessage:
          setMessages((p) => p.filter((o) => o.id != obj.id));
          break;
        case OpCodes.EditMessage:
          setMessages((p) =>
            p.map((o) => {
              if (o.id != obj.id) {
                return o;
              } else {
                o.content = decrypt(
                  localStorage.getItem("key" || ""),
                  obj.new_content.trim(),
                );

                return o;
              }
            }),
          );
          break;
      }
      if (
        localStorage.getItem("muted" || null) != "true" ||
        audioType != audioRef
      )
        audioType.current.play();
    };
  };
  const AuthWs = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      if (localStorage.getItem("token")) {
        ws.current.send(
          JSON.stringify({
            op_code: OpCodes.Auth,
            token: localStorage.getItem("token" || ""),
            content: "",
          }),
        );
      }
    } else {
      console.warn("WebSocket not connected");
    }
  };
  const SendToWs = () => {
    if (fileToUpload) {
      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("token", localStorage.getItem("token" || ""));
      //fetch(backendupload, { method: "POST", body: formData });
      const xhr = new XMLHttpRequest();
      const id = Math.floor(Math.random() * 100000);
      setProgressBars((p) => [id, ...p]);
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          let bar = document.getElementById(`progressbar-${id}`);
          const percentComplete = Math.round(
            (event.loaded * 100) / event.total,
          );
          bar.style.width = percentComplete + "%";
        }
      });
      xhr.open("POST", backendupload);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setProgressBars((p) => {
            return p.filter((o) => o != id);
          });
        } else {
          let bar = document.getElementById(`progressbar-${id}`);
          bar.style.backgroundColor = "red";
          bar.style.width = "100%";
          setTimeout(() => {
            setProgressBars((p) => p.filter((o) => o != id));
          }, 3000);
        }
      };
      xhr.onerror = () => {
        let bar = document.getElementById(`progressbar-${id}`);
        bar.style.backgroundColor = "red";
        bar.style.width = "100%";
        setTimeout(() => {
          setProgressBars((p) => p.filter((o) => o != id));
        }, 3000);
      };
      xhr.send(formData);
      fileRef.current.value = "";
      setSelectedFile((_) => "");
      setFileToUpload(null);
    }

    if (ws.current?.readyState === WebSocket.OPEN) {
      if (localStorage.getItem("token") && messageRef.current.value.trim()) {
        let wsJson = {
          op_code: OpCodes.SendMessage,
          token: localStorage.getItem("token"),
          content: !filter(messageRef.current?.value?.trim(), [
            "http",
            ">profile",
          ])
            ? encrypt(
                localStorage.getItem("key" || ""),
                parseEmojis(messageRef.current?.value?.trim()),
              )
            : messageRef.current?.value?.trim(),
        };
        ws.current.send(JSON.stringify(wsJson));

        setTimeout(() => {
          messageRef.current.value = "";
          autoHeight();
        }, 1);
      }
    } else {
      console.warn("WebSocket not connected");
    }
  };

  const handlePaste = (event) => {
    const files = event.clipboardData.files;
    if (files.length > 0) {
      setSelectedFile("bg-4");
      setFileToUpload(files[0]);
    }
  };

  const replyMessage = (message) => {
    if (message == null) return;
    let msg = messageRef.current.value;
    messageRef.current.value =
      message.content
        .split("\n")
        .map((m) => {
          return `>${message.id} ` + m;
        })
        .join("\n") +
      "\n\n" +
      msg;
    autoHeight();
    messageRef.current.focus();
  };

  const deleteMessage = (id) => {
    if (id == null) return;

    let storageToken = localStorage.getItem("token" || "");
    fetch(backenddeletemessage, {
      method: "POST",
      headers: { Authorization: storageToken },
      body: JSON.stringify({ message_id: id }),
    }).then((r) => {
      if (r.status == 200) {
        return;
      }
      alert("delete error " + r.status);
    });
  };

  const editMessage = (id, new_content) => {
    if (id == null) return;
    if (new_content.trim() == "") return deleteMessage(id);
    let storageToken = localStorage.getItem("token" || "");
    new_content = encrypt(localStorage.getItem("key" || ""), new_content);
    fetch(backendeditmessage, {
      method: "POST",
      headers: { Authorization: storageToken },
      body: JSON.stringify({ message_id: id, new_content: new_content }),
    }).then((r) => {
      if (r.status == 200) {
        return;
      }
      alert("edit error " + r.status);
    });
  };

  const ProgressBar = ({ id }) => {
    return (
      <div className="mb-0 w-50 h-2.5 bg-gray rounded-full shadow-full">
        <div
          id={`progressbar-${id}`}
          className="h-full color-red-700 bg-1 rounded-full"
        />
      </div>
    );
  };

  const ProgressBarContainer = () => {
    return (
      <div className="absolute h-2.5 mb-0 space-x-6 w-full flex flex-row">
        {progressBars?.map((bar) => {
          return <ProgressBar key={`progressbar-${bar}`} id={bar} />;
        })}
      </div>
    );
  };

  const autoHeight = () => {
    messageRef.current.style.height = "auto";
    messageRef.current.style.height = messageRef.current.scrollHeight + "px";
  };

  var shift = false;
  return (
    <>
      <div className="overflow-y-hidden">
        <audio ref={audioRef} src="/chatpage/send2.m4a" preload="auto" />
        <audio ref={mentionAudioRef} src="/chatpage/wobab.ogg" preload="auto" />
        <audio
          ref={mentionAudioLoudRef}
          src="/chatpage/mention.ogg"
          preload="auto"
        />
        <audio
          ref={veryLoudRef}
          src="/chatpage/wobab_very.ogg"
          preload="auto"
        />

        <LoginPage invisible={invisible} setInvisible={setInvisible} />
        {visible && (
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="fixed bg-[#11111188] flex w-full h-full content-center items-center justify-center"
          >
            <div className="self-center align-middle align-center content-center">
              <ImageContext source={source} />
            </div>
          </div>
        )}
        <div
          onPaste={handlePaste}
          className={`flex overflow-y-hidden overflow-x-hidden flex-col h-dvh scheme-${themes[theme]} scheme-chatpage`}
          onKeyUp={(k) => {
            if (k.key == "Shift") {
              shift = false;
            }
          }}
          onKeyDown={(k) => {
            if (k.key == "Shift") {
              shift = true;
            }
          }}
        >
          <div className="w-full h-1/24 bg-6 p-2 flex flex-row space-around space-x-1 min-h-10">
            <LoginLogout
              ws={ws}
              className="w-full flex flex-row space-x-4 items-center"
              setInvisible={setInvisible}
              isLoggedIn={isLoggedIn}
            />
            <button
              className="min-w-fit p-1.5 text-[10px]"
              onClick={() => {
                prevTheme();
                localStorage.setItem("theme", theme - 1);
              }}
            >
              <FaArrowLeft className="cbbi" />
            </button>
            <button
              className="min-w-fit p-1.5 text-[10px]"
              onClick={() => {
                nextTheme();
                localStorage.setItem("theme", theme + 1);
              }}
            >
              <FaArrowRight className="cbbi" />
            </button>
            <input
              type="text"
              placeholder="key"
              ref={keyInput}
              onChange={(v) => localStorage.setItem("key", v.target.value)}
              className="w-1/3 color-4 bg-3 rounded-xl self-start h-full"
            />
            <div className="">
              {isLoggedIn && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="color-2 p-2 self-center"
                >
                  <FaShip />
                </button>
              )}
              {showHistory && (
                <div className="text-wrap wrap-break-words max-h-[90%] scroll-auto overflow-auto absolute flex flex-col gap-px rounded-md right-px w-1/3 bg-1">
                  {messageHist.map((v, k) => {
                    return (
                      <MentionElement
                        key={k}
                        id={v.id}
                        user={v.sender}
                        content={v.content}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => setShowHistory(false)}
            className="w-full h-full max-h-22/24 overflow-auto overflow-x-hidden flex flex-col-reverse bg-5"
          >
            {_messages.map((message, index) => {
              const showSender =
                _messages.at(index + 1)?.sender !== message.sender; // scuffed
              return (
                <ChatMessage
                  message={message}
                  showSender={showSender}
                  replyMessage={replyMessage}
                  deleteMessage={deleteMessage}
                  editMessage={editMessage}
                  setSource={setSource}
                  setVisible={setVisible}
                  key={`${message.id}}`}
                  inputRef={messageRef}
                />
              );
            })}
            <button
              onClick={() => {
                let storageToken = localStorage.getItem("token" || "");

                fetch(`${BACKENDMOREMESSAGES}/${messagesOffset}`, {
                  headers: { Authorization: storageToken },
                    method: "GET",
                }).then((p) => {
                  p.json().then((o) => {
                    o.map((msg) => {
                      msg.content = !filter(msg.content, ["http", ">profile"])
                        ? decrypt(
                            localStorage.getItem("key" || ""),
                            msg.content,
                          )
                        : msg.content;
                      return msg;
                    });
                    setMessages((i) => i.concat(o));
                    setMessagesOffset((i) => i + 1);
                  });
                });
              }}
            >
              load more
            </button>
            <ProgressBarContainer />
          </div>
          <div className="w-full h-fit p-6 min-h-15  bg-6 content-center">
            <div className="flex flex-row h-full">
              <div className="w-full flex flex-row items-center space-x-4">
                <div className="w-full flex flex-row">
                  <textarea
                    rows={1}
                    ref={messageRef}
                    placeholder="message"
                    type="text"
                    className="w-full color-3 bg-1 dejavu rounded-xl"
                    onKeyDown={(k) => {
                      if (k.key == "Enter" && !shift) SendToWs();
                      else {
                        inputCounter++;
                        if (
                          inputCounter % 10 == 0 ||
                          messageRef.current.value == ""
                        )
                          autoHeight();
                      }
                    }}
                  />
                  <div className="m-auto h-12.5 w-12.5 ml-4">
                    <button
                      className={`bg-6 ${selectedFile} w-full h-full shadow-xl p-2.5 rounded-full`}
                    >
                      <label
                        htmlFor="fileinput"
                        className="align-center content-center items-center text-center p-0"
                      >
                        <svg className="color-3 h-full w-full self-center fill-white">
                          <path d="M13.2 12.03q0 .37-.2.66t-.54.45q-.34.13-.7.06t-.6-.32Q10.87 12.6 10.81 12.26t.07-.7q.15-.33.44-.53T12 10.83q.5 0 .85.35t.35.85M12 6.43q.37 0 .67-.2T13.1 5.69t.07-.7Q13.1 4.64 12.85 4.38T12.23 4.05t-.69.07T11 4.56t-.2.67q.01.5.35.85Q11.51 6.42 12 6.43m0 11.2q-.37 0-.67.2t-.44.54-.07.7.33.6q.26.26.62.33.35.07.69-.06Q12.79 19.79 13 19.49q.2-.3.2-.66-.01-.5-.35-.85Q12.49 17.63 12 17.63"></path>
                        </svg>
                      </label>
                    </button>
                  </div>
                </div>
                <button
                  className="self-center bg-2 h-12.5 w-12.5 p-2.5 rounded-full shadow-xl"
                  onClick={(_) => {
                    SendToWs();
                  }}
                >
                  <img src="/chatpage/send.png" className="scale-[1]" />
                </button>
                <input
                  id="fileinput"
                  className="fileinput hidden"
                  ref={fileRef}
                  type="file"
                  onChange={(a) => {
                    setSelectedFile((_) => "bg-4");
                    setFileToUpload(a.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
