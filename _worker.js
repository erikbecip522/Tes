import { connect } from "cloudflare:sockets";
let userID = "f5d09650-b154-4192-97c5-633ea77173644";
const proxyIPs = ["104.248.145.216"];
let proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];
let proxyPort = proxyIP.includes(":") ? proxyIP.split(":")[0x1] : "443";
let socks5Address = '';
let socks5Relay = false;
if (!isValidUUID(userID)) {
  throw new Error("uuid is not valid");
}
let parsedSocks5Address = {};
let enableSocks = false;
export default {
  async "fetch"(_0x218eec, _0x2318f4, _0x1d9458) {
    try {
      const {
        UUID: _0x4f0220,
        PROXYIP: _0x339f84,
        SOCKS5: _0xda890b,
        SOCKS5_RELAY: _0x8b0577
      } = _0x2318f4;
      userID = _0x4f0220 || userID;
      socks5Address = _0xda890b || socks5Address;
      socks5Relay = _0x8b0577 || socks5Relay;
      const _0x497272 = handleProxyConfig(_0x339f84);
      proxyIP = _0x497272.ip;
      proxyPort = _0x497272.port;
      if (socks5Address) {
        try {
          const _0x4f20ed = selectRandomAddress(socks5Address);
          parsedSocks5Address = socks5AddressParser(_0x4f20ed);
          enableSocks = true;
        } catch (_0x5bd9d5) {
          console.log(_0x5bd9d5.toString());
          enableSocks = false;
        }
      }
      const _0x94c33f = userID.includes(",") ? userID.split(",").map(_0x5bee1d => _0x5bee1d.trim()) : [userID];
      const _0x3af9fc = new URL(_0x218eec.url);
      const _0x4fb922 = _0x218eec.headers.get("Host");
      const _0x4180ee = _0x3af9fc.pathname.substring(0x1);
      const _0xc1abb1 = _0x94c33f.length === 0x1 ? _0x4180ee === _0x94c33f[0x0] || _0x4180ee === "sub/" + _0x94c33f[0x0] || _0x4180ee === "bestip/" + _0x94c33f[0x0] ? _0x94c33f[0x0] : null : _0x94c33f.find(_0x31114d => {
        const _0xf5fa4f = [_0x31114d, "sub/" + _0x31114d, "bestip/" + _0x31114d];
        return _0xf5fa4f.some(_0x7772d1 => _0x4180ee.startsWith(_0x7772d1));
      });
      if (_0x218eec.headers.get("Upgrade") !== "websocket") {
        if (_0x3af9fc.pathname === "/cf") {
          const _0x37a769 = {
            "Content-Type": "application/json;charset=utf-8"
          };
          const _0x2698e8 = {
            status: 0xc8,
            headers: _0x37a769
          };
          return new Response(JSON.stringify(_0x218eec.cf, null, 0x4), _0x2698e8);
        }
        if (_0xc1abb1) {
          if (_0x3af9fc.pathname === "/" + _0xc1abb1 || _0x3af9fc.pathname === "/sub/" + _0xc1abb1) {
            const _0xb7a220 = _0x3af9fc.pathname.startsWith("/sub/");
            const _0x45a5bf = _0x339f84 ? _0x339f84.split(",").map(_0xe2e11b => _0xe2e11b.trim()) : proxyIP;
            const _0x33d211 = _0xb7a220 ? GenSub(_0xc1abb1, _0x4fb922, _0x45a5bf) : getConfig(_0xc1abb1, _0x4fb922, _0x45a5bf);
            const _0x23457c = {
              "Content-Type": _0xb7a220 ? "text/plain;charset=utf-8" : "text/html; charset=utf-8"
            };
            const _0x137c71 = {
              status: 0xc8,
              headers: _0x23457c
            };
            return new Response(_0x33d211, _0x137c71);
          } else {
            if (_0x3af9fc.pathname === "/bestip/" + _0xc1abb1) {
              const _0x1df0c7 = {
                headers: _0x218eec.headers
              };
              return fetch("https://sub.xf.free.hr/auto?host=" + _0x4fb922 + "&uuid=" + _0xc1abb1 + "&path=/", _0x1df0c7);
            }
          }
        }
        return handleDefaultPath(_0x3af9fc, _0x218eec);
      } else {
        return await ProtocolOverWSHandler(_0x218eec);
      }
    } catch (_0x1de122) {
      return new Response(_0x1de122.toString());
    }
  }
};
async function handleDefaultPath(_0x23a90d, _0x5bd85d) {
  const _0x5819e3 = _0x5bd85d.headers.get("Host");
  const _0x7d4f8e = "\n\t  <!DOCTYPE html>\n\t  <html lang=\"en\">\n\t  <head>\n\t\t  <meta charset=\"UTF-8\">\n\t\t  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t\t  <title>" + _0x5819e3 + " - Cloud Drive</title>\n\t\t  <style>\n\t\t\t  body {\n\t\t\t\t  font-family: Arial, sans-serif;\n\t\t\t\t  line-height: 1.6;\n\t\t\t\t  margin: 0;\n\t\t\t\t  padding: 20px;\n\t\t\t\t  background-color: #f4f4f4;\n\t\t\t  }\n\t\t\t  .container {\n\t\t\t\t  max-width: 800px;\n\t\t\t\t  margin: auto;\n\t\t\t\t  background: white;\n\t\t\t\t  padding: 20px;\n\t\t\t\t  border-radius: 5px;\n\t\t\t\t  box-shadow: 0 0 10px rgba(0,0,0,0.1);\n\t\t\t  }\n\t\t\t  h1 {\n\t\t\t\t  color: #333;\n\t\t\t  }\n\t\t\t  .file-list {\n\t\t\t\t  list-style-type: none;\n\t\t\t\t  padding: 0;\n\t\t\t  }\n\t\t\t  .file-list li {\n\t\t\t\t  background: #f9f9f9;\n\t\t\t\t  margin-bottom: 10px;\n\t\t\t\t  padding: 10px;\n\t\t\t\t  border-radius: 3px;\n\t\t\t\t  display: flex;\n\t\t\t\t  align-items: center;\n\t\t\t  }\n\t\t\t  .file-list li:hover {\n\t\t\t\t  background: #f0f0f0;\n\t\t\t  }\n\t\t\t  .file-icon {\n\t\t\t\t  margin-right: 10px;\n\t\t\t\t  font-size: 1.2em;\n\t\t\t  }\n\t\t\t  .file-link {\n\t\t\t\t  text-decoration: none;\n\t\t\t\t  color: #0066cc;\n\t\t\t\t  flex-grow: 1;\n\t\t\t  }\n\t\t\t  .file-link:hover {\n\t\t\t\t  text-decoration: underline;\n\t\t\t  }\n\t\t\t  .upload-area {\n\t\t\t\t  margin-top: 20px;\n\t\t\t\t  padding: 40px;\n\t\t\t\t  background: #e9e9e9;\n\t\t\t\t  border: 2px dashed #aaa;\n\t\t\t\t  border-radius: 5px;\n\t\t\t\t  text-align: center;\n\t\t\t\t  cursor: pointer;\n\t\t\t\t  transition: all 0.3s ease;\n\t\t\t  }\n\t\t\t  .upload-area:hover, .upload-area.drag-over {\n\t\t\t\t  background: #d9d9d9;\n\t\t\t\t  border-color: #666;\n\t\t\t  }\n\t\t\t  .upload-area h2 {\n\t\t\t\t  margin-top: 0;\n\t\t\t\t  color: #333;\n\t\t\t  }\n\t\t\t  #fileInput {\n\t\t\t\t  display: none;\n\t\t\t  }\n\t\t\t  .upload-icon {\n\t\t\t\t  font-size: 48px;\n\t\t\t\t  color: #666;\n\t\t\t\t  margin-bottom: 10px;\n\t\t\t  }\n\t\t\t  .upload-text {\n\t\t\t\t  font-size: 18px;\n\t\t\t\t  color: #666;\n\t\t\t  }\n\t\t\t  .upload-status {\n\t\t\t\t  margin-top: 20px;\n\t\t\t\t  font-style: italic;\n\t\t\t\t  color: #666;\n\t\t\t  }\n\t\t\t  .file-actions {\n\t\t\t\t  display: flex;\n\t\t\t\t  gap: 10px;\n\t\t\t  }\n\t\t\t  .delete-btn {\n\t\t\t\t  color: #ff4444;\n\t\t\t\t  cursor: pointer;\n\t\t\t\t  background: none;\n\t\t\t\t  border: none;\n\t\t\t\t  padding: 5px;\n\t\t\t  }\n\t\t\t  .delete-btn:hover {\n\t\t\t\t  color: #ff0000;\n\t\t\t  }\n\t\t\t  .clear-all-btn {\n\t\t\t\t  background-color: #ff4444;\n\t\t\t\t  color: white;\n\t\t\t\t  border: none;\n\t\t\t\t  padding: 10px 15px;\n\t\t\t\t  border-radius: 4px;\n\t\t\t\t  cursor: pointer;\n\t\t\t\t  margin-bottom: 20px;\n\t\t\t  }\n\t\t\t  .clear-all-btn:hover {\n\t\t\t\t  background-color: #ff0000;\n\t\t\t  }\n\t\t  </style>\n\t  </head>\n\t  <body>\n\t\t  <div class=\"container\">\n\t\t\t  <h1>Cloud Drive</h1>\n\t\t\t  <p>Welcome to your personal cloud storage. Here are your uploaded files:</p>\n\t\t\t  <button id=\"clearAllBtn\" class=\"clear-all-btn\">Clear All Files</button>\n\t\t\t  <ul id=\"fileList\" class=\"file-list\">\n\t\t\t  </ul>\n\t\t\t  <div id=\"uploadArea\" class=\"upload-area\">\n\t\t\t\t  <div class=\"upload-icon\">📁</div>\n\t\t\t\t  <h2>Upload a File</h2>\n\t\t\t\t  <p class=\"upload-text\">Drag and drop a file here or click to select</p>\n\t\t\t\t  <input type=\"file\" id=\"fileInput\" hidden>\n\t\t\t  </div>\n\t\t\t  <div id=\"uploadStatus\" class=\"upload-status\"></div>\n\t\t  </div>\n\t\t  <script>\n\t\t\t  function loadFileList() {\n\t\t\t\t  const fileList = document.getElementById('fileList');\n\t\t\t\t  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];\n\t\t\t\t  fileList.innerHTML = '';\n\t\t\t\t  savedFiles.forEach((file, index) => {\n\t\t\t\t\t  const li = document.createElement('li');\n\t\t\t\t\t  li.innerHTML = `\n\t\t\t\t\t\t  <span class=\"file-icon\">📄</span>\n\t\t\t\t\t\t  <a href=\"https://ipfs.io/ipfs/${file.Url.split('/').pop()}\" class=\"file-link\" target=\"_blank\">${file.Name}</a>\n\t\t\t\t\t\t  <div class=\"file-actions\">\n\t\t\t\t\t\t\t  <button class=\"delete-btn\" onclick=\"deleteFile(${index})\">\n\t\t\t\t\t\t\t\t  <span class=\"file-icon\">❌</span>\n\t\t\t\t\t\t\t  </button>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t  `;\n\t\t\t\t\t  fileList.appendChild(li);\n\t\t\t\t  });\n\t\t\t  }\n\n\t\t\t  function deleteFile(index) {\n\t\t\t\t  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];\n\t\t\t\t  savedFiles.splice(index, 1);\n\t\t\t\t  localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));\n\t\t\t\t  loadFileList();\n\t\t\t  }\n\n\t\t\t  document.getElementById('clearAllBtn').addEventListener('click', () => {\n\t\t\t\t  if (confirm('Are you sure you want to clear all files?')) {\n\t\t\t\t\t  localStorage.removeItem('uploadedFiles');\n\t\t\t\t\t  loadFileList();\n\t\t\t\t  }\n\t\t\t  });\n\n\t\t\t  loadFileList();\n\n\t\t\t  const uploadArea = document.getElementById('uploadArea');\n\t\t\t  const fileInput = document.getElementById('fileInput');\n\t\t\t  const uploadStatus = document.getElementById('uploadStatus');\n\n\t\t\t  uploadArea.addEventListener('dragover', (e) => {\n\t\t\t\t  e.preventDefault();\n\t\t\t\t  uploadArea.classList.add('drag-over');\n\t\t\t  });\n\n\t\t\t  uploadArea.addEventListener('dragleave', () => {\n\t\t\t\t  uploadArea.classList.remove('drag-over');\n\t\t\t  });\n\n\t\t\t  uploadArea.addEventListener('drop', (e) => {\n\t\t\t\t  e.preventDefault();\n\t\t\t\t  uploadArea.classList.remove('drag-over');\n\t\t\t\t  const files = e.dataTransfer.files;\n\t\t\t\t  if (files.length) {\n\t\t\t\t\t  handleFileUpload(files[0]);\n\t\t\t\t  }\n\t\t\t  });\n\n\t\t\t  uploadArea.addEventListener('click', () => {\n\t\t\t\t  fileInput.click();\n\t\t\t  });\n\n\t\t\t  fileInput.addEventListener('change', (e) => {\n\t\t\t\t  const file = e.target.files[0];\n\t\t\t\t  if (file) {\n\t\t\t\t\t  handleFileUpload(file);\n\t\t\t\t  }\n\t\t\t  });\n\n\t\t\t  async function handleFileUpload(file) {\n\t\t\t\t  uploadStatus.textContent = `Uploading: ${file.name}...`;\n\t\t\t\t  \n\t\t\t\t  const formData = new FormData();\n\t\t\t\t  formData.append('file', file);\n\n\t\t\t\t  try {\n\t\t\t\t\t  const response = await fetch('https://app.img2ipfs.org/api/v0/add', {\n\t\t\t\t\t\t  method: 'POST',\n\t\t\t\t\t\t  body: formData,\n\t\t\t\t\t\t  headers: {\n\t\t\t\t\t\t\t  'Accept': 'application/json',\n\t\t\t\t\t\t  },\n\t\t\t\t\t  });\n\n\t\t\t\t\t  if (!response.ok) {\n\t\t\t\t\t\t  throw new Error('Upload failed');\n\t\t\t\t\t  }\n\n\t\t\t\t\t  const result = await response.json();\n\t\t\t\t\t  uploadStatus.textContent = `File uploaded successfully! IPFS Hash: ${result.Hash}`;\n\t\t\t\t\t  \n\t\t\t\t\t  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];\n\t\t\t\t\t  savedFiles.push(result);\n\t\t\t\t\t  localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));\n\t\t\t\t\t  \n\t\t\t\t\t  loadFileList();\n\t\t\t\t\t  \n\t\t\t\t  } catch (error) {\n\t\t\t\t\t  console.error('Error:', error);\n\t\t\t\t\t  uploadStatus.textContent = 'Upload failed. Please try again.';\n\t\t\t\t  }\n\t\t\t  }\n\t\t  </script>\n\t  </body>\n\t  </html>\n\t";
  const _0x1cba45 = {
    "content-type": "text/html;charset=UTF-8"
  };
  const _0x2ac673 = {
    headers: _0x1cba45
  };
  return new Response(_0x7d4f8e, _0x2ac673);
}
async function ProtocolOverWSHandler(_0x357c7a) {
  const _0x57ec3a = new WebSocketPair();
  const [_0x2c740a, _0x180bdc] = Object.values(_0x57ec3a);
  _0x180bdc.accept();
  let _0x37f1dc = '';
  let _0x36e22b = '';
  const _0x1890b4 = (_0x2964ec, _0x3a78aa) => {
    console.log("[" + _0x37f1dc + ":" + _0x36e22b + "] " + _0x2964ec, _0x3a78aa || '');
  };
  const _0x2ad6f1 = _0x357c7a.headers.get("sec-websocket-protocol") || '';
  const _0x52b82c = MakeReadableWebSocketStream(_0x180bdc, _0x2ad6f1, _0x1890b4);
  const _0x50bc68 = {
    value: null
  };
  let _0x3a8142 = false;
  _0x52b82c.pipeTo(new WritableStream({
    async "write"(_0x3990be, _0x365963) {
      if (_0x3a8142) {
        return await handleDNSQuery(_0x3990be, _0x180bdc, null, _0x1890b4);
      }
      const _0x53566f = null.writable.getWriter();
      await _0x53566f.write(_0x3990be);
      _0x53566f.releaseLock();
      return;
      const {
        hasError: _0x2977ce,
        message: _0x31997f,
        addressType: _0xead138,
        portRemote = 0x1bb,
        addressRemote = '',
        rawDataIndex: _0x2fe44a,
        ProtocolVersion = new Uint8Array([0x0, 0x0]),
        isUDP: _0x2f99af
      } = ProcessProtocolHeader(_0x3990be, userID);
      _0x37f1dc = addressRemote;
      _0x36e22b = portRemote + "--" + Math.random() + " " + (_0x2f99af ? "udp " : "tcp ") + " ";
      if (_0x2977ce) {
        throw new Error(_0x31997f);
      }
      if (_0x2f99af) {
        if (portRemote === 0x35) {
          _0x3a8142 = true;
        } else {
          throw new Error("UDP proxy is only enabled for DNS (port 53)");
        }
        return;
      }
      const _0x41beb6 = new Uint8Array([ProtocolVersion[0x0], 0x0]);
      const _0x560305 = _0x3990be.slice(_0x2fe44a);
      if (_0x3a8142) {
        return handleDNSQuery(_0x560305, _0x180bdc, _0x41beb6, _0x1890b4);
      }
      HandleTCPOutBound(_0x50bc68, _0xead138, addressRemote, portRemote, _0x560305, _0x180bdc, _0x41beb6, _0x1890b4);
    },
    "close"() {
      _0x1890b4("readableWebSocketStream is close");
    },
    "abort"(_0x1d2c4f) {
      _0x1890b4("readableWebSocketStream is abort", JSON.stringify(_0x1d2c4f));
    }
  }))["catch"](_0x19095a => {
    _0x1890b4("readableWebSocketStream pipeTo error", _0x19095a);
  });
  const _0x4ce7cd = {
    status: 0x65,
    webSocket: _0x2c740a
  };
  return new Response(null, _0x4ce7cd);
}
async function HandleTCPOutBound(_0xd0b4fb, _0x3a52df, _0x5f35d3, _0x3ba390, _0x259dcf, _0x3ebd8c, _0x445a39, _0x28377a) {
  async function _0x663c6b(_0x354e85, _0x5e823b, _0x37fdbf = false) {
    let _0x3830c7;
    if (socks5Relay) {
      _0x3830c7 = await socks5Connect(_0x3a52df, _0x354e85, _0x5e823b, _0x28377a);
    } else {
      _0x3830c7 = _0x37fdbf ? await socks5Connect(_0x3a52df, _0x354e85, _0x5e823b, _0x28377a) : connect({
        "hostname": _0x354e85,
        "port": _0x5e823b
      });
    }
    _0xd0b4fb.value = _0x3830c7;
    _0x28377a("connected to " + _0x354e85 + ":" + _0x5e823b);
    const _0x5a4851 = _0x3830c7.writable.getWriter();
    await _0x5a4851.write(_0x259dcf);
    _0x5a4851.releaseLock();
    return _0x3830c7;
  }
  async function _0x20738e() {
    if (enableSocks) {
      _0x274764 = await _0x663c6b(_0x5f35d3, _0x3ba390, true);
    } else {
      _0x274764 = await _0x663c6b(proxyIP || _0x5f35d3, proxyPort || _0x3ba390, false);
    }
    _0x274764.closed["catch"](_0x34be73 => {
      console.log("retry tcpSocket closed error", _0x34be73);
    })["finally"](() => {
      safeCloseWebSocket(_0x3ebd8c);
    });
    RemoteSocketToWS(_0x274764, _0x3ebd8c, _0x445a39, null, _0x28377a);
  }
  let _0x274764 = await _0x663c6b(_0x5f35d3, _0x3ba390);
  RemoteSocketToWS(_0x274764, _0x3ebd8c, _0x445a39, _0x20738e, _0x28377a);
}
function MakeReadableWebSocketStream(_0x100a08, _0x3284a3, _0xb5863c) {
  let _0x3cc322 = false;
  const _0x13fb04 = new ReadableStream({
    "start"(_0x62964) {
      _0x100a08.addEventListener("message", _0x4d17dd => {
        const _0x3525bd = _0x4d17dd.data;
        _0x62964.enqueue(_0x3525bd);
      });
      _0x100a08.addEventListener("close", () => {
        safeCloseWebSocket(_0x100a08);
        _0x62964.close();
      });
      _0x100a08.addEventListener("error", _0x5dd28a => {
        _0xb5863c("webSocketServer has error");
        _0x62964.error(_0x5dd28a);
      });
      const {
        earlyData: _0x25399f,
        error: _0x20f946
      } = base64ToArrayBuffer(_0x3284a3);
      if (_0x20f946) {
        _0x62964.error(_0x20f946);
      } else if (_0x25399f) {
        _0x62964.enqueue(_0x25399f);
      }
    },
    "pull"(_0x2452e4) {},
    "cancel"(_0x5329c7) {
      _0xb5863c("ReadableStream was canceled, due to " + _0x5329c7);
      _0x3cc322 = true;
      safeCloseWebSocket(_0x100a08);
    }
  });
  return _0x13fb04;
}
function ProcessProtocolHeader(_0x59eb8b, _0x244399) {
  if (_0x59eb8b.byteLength < 0x18) {
    const _0x1c43cb = {
      hasError: true,
      message: "invalid data"
    };
    return _0x1c43cb;
  }
  const _0x4be042 = new DataView(_0x59eb8b);
  const _0x441942 = _0x4be042.getUint8(0x0);
  const _0x153ff4 = stringify(new Uint8Array(_0x59eb8b.slice(0x1, 0x11)));
  const _0x11defb = _0x244399.includes(",") ? _0x244399.split(",") : [_0x244399];
  const _0xe0a2f0 = _0x11defb.some(_0x4b7612 => _0x153ff4 === _0x4b7612.trim()) || _0x11defb.length === 0x1 && _0x153ff4 === _0x11defb[0x0].trim();
  console.log("userID: " + _0x153ff4);
  if (!_0xe0a2f0) {
    const _0x3fa8c0 = {
      hasError: true,
      message: "invalid user"
    };
    return _0x3fa8c0;
  }
  const _0x3cfc92 = _0x4be042.getUint8(0x11);
  const _0x4fbd20 = _0x4be042.getUint8(0x12 + _0x3cfc92);
  if (_0x4fbd20 !== 0x1 && _0x4fbd20 !== 0x2) {
    const _0x55385e = {
      hasError: true,
      message: "command " + _0x4fbd20 + " is not supported, command 01-tcp,02-udp,03-mux"
    };
    return _0x55385e;
  }
  const _0x5caf1a = 0x12 + _0x3cfc92 + 0x1;
  const _0x86249c = _0x4be042.getUint16(_0x5caf1a);
  const _0x35d0fd = _0x4be042.getUint8(_0x5caf1a + 0x2);
  let _0x583dfc;
  let _0x457b7;
  let _0x2151ff;
  switch (_0x35d0fd) {
    case 0x1:
      _0x457b7 = 0x4;
      _0x2151ff = _0x5caf1a + 0x3;
      _0x583dfc = new Uint8Array(_0x59eb8b.slice(_0x2151ff, _0x2151ff + _0x457b7)).join(".");
      break;
    case 0x2:
      _0x457b7 = _0x4be042.getUint8(_0x5caf1a + 0x3);
      _0x2151ff = _0x5caf1a + 0x4;
      _0x583dfc = new TextDecoder().decode(_0x59eb8b.slice(_0x2151ff, _0x2151ff + _0x457b7));
      break;
    case 0x3:
      _0x457b7 = 0x10;
      _0x2151ff = _0x5caf1a + 0x3;
      const _0x377baf = {
        length: 0x8
      };
      _0x583dfc = Array.from(_0x377baf, (_0x4861a6, _0x324199) => _0x4be042.getUint16(_0x2151ff + _0x324199 * 0x2).toString(0x10)).join(":");
      break;
    default:
      const _0x3514a8 = {
        hasError: true,
        message: "invalid addressType: " + _0x35d0fd
      };
      return _0x3514a8;
  }
  if (!_0x583dfc) {
    const _0x1159e8 = {
      hasError: true,
      message: "addressValue is empty, addressType is " + _0x35d0fd
    };
    return _0x1159e8;
  }
  return {
    "hasError": false,
    "addressRemote": _0x583dfc,
    "addressType": _0x35d0fd,
    "portRemote": _0x86249c,
    "rawDataIndex": _0x2151ff + _0x457b7,
    "protocolVersion": new Uint8Array([_0x441942]),
    "isUDP": _0x4fbd20 === 0x2
  };
}
async function RemoteSocketToWS(_0x4e0fbf, _0x5df401, _0x34e431, _0x149a56, _0x27c3d7) {
  let _0x5948b0 = false;
  try {
    await _0x4e0fbf.readable.pipeTo(new WritableStream({
      async "write"(_0x37c780) {
        if (_0x5df401.readyState !== 0x1) {
          throw new Error("WebSocket is not open");
        }
        _0x5948b0 = true;
        if (_0x34e431) {
          _0x5df401.send(await new Blob([_0x34e431, _0x37c780]).arrayBuffer());
          _0x34e431 = null;
        } else {
          _0x5df401.send(_0x37c780);
        }
      },
      "close"() {
        _0x27c3d7("Remote connection readable closed. Had incoming data: " + _0x5948b0);
      },
      "abort"(_0x121912) {
        console.error("Remote connection readable aborted:", _0x121912);
      }
    }));
  } catch (_0x1116ee) {
    console.error("RemoteSocketToWS error:", _0x1116ee.stack || _0x1116ee);
    safeCloseWebSocket(_0x5df401);
  }
  if (!_0x5948b0 && _0x149a56) {
    _0x27c3d7("No incoming data, retrying");
    await _0x149a56();
  }
}
function base64ToArrayBuffer(_0x1e7535) {
  if (!_0x1e7535) {
    const _0x13c500 = {
      earlyData: null,
      error: null
    };
    return _0x13c500;
  }
  try {
    _0x1e7535 = _0x1e7535.replace(/-/g, "+").replace(/_/g, "/");
    const _0x31a657 = atob(_0x1e7535);
    const _0x5ad9f3 = new ArrayBuffer(_0x31a657.length);
    const _0x46ff65 = new Uint8Array(_0x5ad9f3);
    for (let _0x1b5ef1 = 0x0; _0x1b5ef1 < _0x31a657.length; _0x1b5ef1++) {
      _0x46ff65[_0x1b5ef1] = _0x31a657.charCodeAt(_0x1b5ef1);
    }
    const _0x4b7980 = {
      earlyData: _0x5ad9f3,
      error: null
    };
    return _0x4b7980;
  } catch (_0x525e47) {
    const _0x34e24a = {
      earlyData: null,
      error: _0x525e47
    };
    return _0x34e24a;
  }
}
function isValidUUID(_0x923346) {
  const _0xfb4273 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return _0xfb4273.test(_0x923346);
}
function safeCloseWebSocket(_0x25044c) {
  try {
    if (_0x25044c.readyState === 0x1 || _0x25044c.readyState === 0x2) {
      _0x25044c.close();
    }
  } catch (_0x5a0385) {
    console.error("safeCloseWebSocket error:", _0x5a0385);
  }
}
const a0_0x382576 = {
  length: 0x100
};
const byteToHex = Array.from(a0_0x382576, (_0x9975e1, _0x48a7fd) => (_0x48a7fd + 0x100).toString(0x10).slice(0x1));
function unsafeStringify(_0x52f7ef, _0x40f9d9 = 0x0) {
  return [byteToHex[_0x52f7ef[_0x40f9d9]], byteToHex[_0x52f7ef[_0x40f9d9 + 0x1]], byteToHex[_0x52f7ef[_0x40f9d9 + 0x2]], byteToHex[_0x52f7ef[_0x40f9d9 + 0x3]], "-", byteToHex[_0x52f7ef[_0x40f9d9 + 0x4]], byteToHex[_0x52f7ef[_0x40f9d9 + 0x5]], "-", byteToHex[_0x52f7ef[_0x40f9d9 + 0x6]], byteToHex[_0x52f7ef[_0x40f9d9 + 0x7]], "-", byteToHex[_0x52f7ef[_0x40f9d9 + 0x8]], byteToHex[_0x52f7ef[_0x40f9d9 + 0x9]], "-", byteToHex[_0x52f7ef[_0x40f9d9 + 0xa]], byteToHex[_0x52f7ef[_0x40f9d9 + 0xb]], byteToHex[_0x52f7ef[_0x40f9d9 + 0xc]], byteToHex[_0x52f7ef[_0x40f9d9 + 0xd]], byteToHex[_0x52f7ef[_0x40f9d9 + 0xe]], byteToHex[_0x52f7ef[_0x40f9d9 + 0xf]]].join('').toLowerCase();
}
function stringify(_0x270841, _0x17aac8 = 0x0) {
  const _0x170112 = unsafeStringify(_0x270841, _0x17aac8);
  if (!isValidUUID(_0x170112)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return _0x170112;
}
async function handleDNSQuery(_0x3093f0, _0x5868b3, _0x1e75d1, _0x5d7efe) {
  try {
    let _0x2e2c14 = _0x1e75d1;
    const _0x5c59e2 = {
      hostname: "8.8.4.4",
      port: 0x35
    };
    const _0x3a2224 = connect(_0x5c59e2);
    _0x5d7efe("connected to 8.8.4.4:53");
    const _0x444d07 = _0x3a2224.writable.getWriter();
    await _0x444d07.write(_0x3093f0);
    _0x444d07.releaseLock();
    await _0x3a2224.readable.pipeTo(new WritableStream({
      async "write"(_0x3b373c) {
        if (_0x5868b3.readyState === 0x1) {
          if (_0x2e2c14) {
            _0x5868b3.send(await new Blob([_0x2e2c14, _0x3b373c]).arrayBuffer());
            _0x2e2c14 = null;
          } else {
            _0x5868b3.send(_0x3b373c);
          }
        }
      },
      "close"() {
        _0x5d7efe("dns server(8.8.4.4) tcp is close");
      },
      "abort"(_0x6b17a9) {
        console.error("dns server(8.8.4.4) tcp is abort", _0x6b17a9);
      }
    }));
  } catch (_0xa2025c) {
    console.error("handleDNSQuery have exception, error: " + _0xa2025c.message);
  }
}
async function socks5Connect(_0x21fd46, _0x45bb4f, _0x101663, _0x436121) {
  const {
    username: _0x4e53d7,
    password: _0x2c4770,
    hostname: _0x1226ea,
    port: _0x1cddc0
  } = parsedSocks5Address;
  const _0x5c53e3 = {
    hostname: _0x1226ea,
    port: _0x1cddc0
  };
  const _0x2d30fc = connect(_0x5c53e3);
  const _0x18a1c6 = new Uint8Array([0x5, 0x2, 0x0, 0x2]);
  const _0x485832 = _0x2d30fc.writable.getWriter();
  await _0x485832.write(_0x18a1c6);
  _0x436121("sent socks greeting");
  const _0x267206 = _0x2d30fc.readable.getReader();
  const _0x6ef6c1 = new TextEncoder();
  let _0x2e373c = (await _0x267206.read()).value;
  if (_0x2e373c[0x0] !== 0x5) {
    _0x436121("socks server version error: " + _0x2e373c[0x0] + " expected: 5");
    return;
  }
  if (_0x2e373c[0x1] === 0xff) {
    _0x436121("no acceptable methods");
    return;
  }
  if (_0x2e373c[0x1] === 0x2) {
    _0x436121("socks server needs auth");
    if (!_0x4e53d7 || !_0x2c4770) {
      _0x436121("please provide username/password");
      return;
    }
    const _0x4736cb = new Uint8Array([0x1, _0x4e53d7.length, ..._0x6ef6c1.encode(_0x4e53d7), _0x2c4770.length, ..._0x6ef6c1.encode(_0x2c4770)]);
    await _0x485832.write(_0x4736cb);
    _0x2e373c = (await _0x267206.read()).value;
    if (_0x2e373c[0x0] !== 0x1 || _0x2e373c[0x1] !== 0x0) {
      _0x436121("fail to auth socks server");
      return;
    }
  }
  let _0x367e7e;
  switch (_0x21fd46) {
    case 0x1:
      _0x367e7e = new Uint8Array([0x1, ..._0x45bb4f.split(".").map(Number)]);
      break;
    case 0x2:
      _0x367e7e = new Uint8Array([0x3, _0x45bb4f.length, ..._0x6ef6c1.encode(_0x45bb4f)]);
      break;
    case 0x3:
      _0x367e7e = new Uint8Array([0x4, ..._0x45bb4f.split(":").flatMap(_0x4dd81 => [parseInt(_0x4dd81.slice(0x0, 0x2), 0x10), parseInt(_0x4dd81.slice(0x2), 0x10)])]);
      break;
    default:
      _0x436121("invild  addressType is " + _0x21fd46);
      return;
  }
  const _0x3750db = new Uint8Array([0x5, 0x1, 0x0, ..._0x367e7e, _0x101663 >> 0x8, _0x101663 & 0xff]);
  await _0x485832.write(_0x3750db);
  _0x436121("sent socks request");
  _0x2e373c = (await _0x267206.read()).value;
  if (_0x2e373c[0x1] === 0x0) {
    _0x436121("socks connection opened");
  } else {
    _0x436121("fail to open socks connection");
    return;
  }
  _0x485832.releaseLock();
  _0x267206.releaseLock();
  return _0x2d30fc;
}
function socks5AddressParser(_0x19f9d1) {
  let [_0x5b96ee, _0x1a574a] = _0x19f9d1.split("@").reverse();
  let _0x48226a;
  let _0x52c191;
  let _0x49572d;
  let _0x2304a4;
  if (_0x1a574a) {
    const _0x4ec9e0 = _0x1a574a.split(":");
    if (_0x4ec9e0.length !== 0x2) {
      throw new Error("Invalid SOCKS address format");
    }
    [_0x48226a, _0x52c191] = _0x4ec9e0;
  }
  const _0x2fcadc = _0x5b96ee.split(":");
  _0x2304a4 = Number(_0x2fcadc.pop());
  if (isNaN(_0x2304a4)) {
    throw new Error("Invalid SOCKS address format");
  }
  _0x49572d = _0x2fcadc.join(":");
  const _0x158fe3 = /^\[.*\]$/;
  if (_0x49572d.includes(":") && !_0x158fe3.test(_0x49572d)) {
    throw new Error("Invalid SOCKS address format");
  }
  const _0x40058a = {
    username: _0x48226a,
    password: _0x52c191,
    hostname: _0x49572d,
    port: _0x2304a4
  };
  return _0x40058a;
}
function getConfig(_0x4268b6, _0x4add21, _0x5ef46d) {
  const _0x5ae3dc = "?encryption=none&security=tls&sni=" + _0x4add21 + "&fp=randomized&type=ws&host=" + _0x4add21 + "&path=%2F%3Fed%3D2048#" + _0x4add21;
  const _0x195eff = _0x4268b6.split(",");
  const _0x476d65 = "https://" + _0x4add21 + "/bestip/" + _0x195eff[0x0];
  const _0x1c0bd3 = "https://url.v1.mk/sub?target=clash&url=" + encodeURIComponent("https://" + _0x4add21 + "/sub/" + _0x195eff[0x0] + "?format=clash") + "&insert=false&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true";
  const _0x1fed53 = "\n  <head>\n    <title>EDtunnel: Configuration</title>\n    <meta name='viewport' content='width=device-width, initial-scale=1'>\n    <meta property='og:site_name' content='EDtunnel: Protocol Configuration' />\n    <meta property='og:type' content='website' />\n    <meta property='og:title' content='EDtunnel - Protocol Configuration and Subscribe Output' />\n    <meta property='og:description' content='Use Cloudflare Pages and Worker serverless to implement protocol' />\n    <meta property='og:url' content='https://" + _0x4add21 + "/' />\n    <meta property='og:image' content='https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png' />\n    <meta name='twitter:card' content='summary_large_image' />\n    <meta name='twitter:title' content='EDtunnel - Protocol Configuration and Subscribe Output' />\n    <meta name='twitter:description' content='Use Cloudflare Pages and Worker serverless to implement protocol' />\n    <meta name='twitter:url' content='https://" + _0x4add21 + "/' />\n    <meta name='twitter:image' content='https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png' />\n    <meta property='og:image:width' content='1500' />\n    <meta property='og:image:height' content='1500' />\n\n    <style>\n      body {\n        font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n        background-color: #000000;\n        color: #ffffff;\n        line-height: 1.6;\n        padding: 20px;\n        max-width: 1200px;\n        margin: 0 auto;\n      }\n      .container {\n        background-color: #111111;\n        border-radius: 8px;\n        box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);\n        padding: 20px;\n        margin-bottom: 20px;\n      }\n      h1, h2 {\n        color: #ffffff;\n      }\n      .config-item {\n        background-color: #222222;\n        border: 1px solid #333333;\n        border-radius: 4px;\n        padding: 15px;\n        margin-bottom: 15px;\n      }\n      .config-item h3 {\n        margin-top: 0;\n        color: #ffffff;\n      }\n      .btn {\n        background-color: #ffffff;\n        color: #000000;\n        border: none;\n        padding: 10px 15px;\n        border-radius: 4px;\n        cursor: pointer;\n        transition: background-color 0.3s, color 0.3s;\n      }\n      .btn:hover {\n        background-color: #cccccc;\n      }\n      .btn-group {\n        margin-top: 10px;\n      }\n      .btn-group .btn {\n        margin-right: 10px;\n      }\n      pre {\n        background-color: #333333;\n        border: 1px solid #444444;\n        border-radius: 4px;\n        padding: 10px;\n        white-space: pre-wrap;\n        word-wrap: break-word;\n        color: #00ff00;\n      }\n      .logo {\n        float: left;\n        margin-right: 20px;\n        margin-bottom: 20px;\n\t\tmax-width: 30%;\n      }\n      @media (max-width: 768px) {\n        .logo {\n          float: none;\n          display: block;\n          margin: 0 auto 20px;\n          max-width: 90%; /* Adjust the max-width to fit within the container */\n        }\n        .btn-group {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n        }\n        .btn-group .btn {\n          margin-bottom: 10px;\n          width: 100%;\n          text-align: center;\n        }\n      }\n      .code-container {\n        position: relative;\n        margin-bottom: 15px;\n      }\n      .code-container pre {\n        margin: 0;\n        padding-right: 100px; /* Make space for the button */\n      }\n      .copy-btn {\n        position: absolute;\n        top: 5px;\n        right: 5px;\n        padding: 5px 10px;\n        font-size: 0.8em;\n      }\n      .subscription-info {\n        margin-top: 20px;\n        background-color: #222222;\n        border-radius: 4px;\n        padding: 15px;\n      }\n      .subscription-info h3 {\n        color: #ffffff;\n        margin-top: 0;\n      }\n      .subscription-info ul {\n        padding-left: 20px;\n      }\n      .subscription-info li {\n        margin-bottom: 10px;\n      }\n    </style>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\">\n  </head>\n  ";
  const _0x2b7293 = "\n    <div class=\"container\">\n      <h1>EDtunnel: Protocol Configuration</h1>\n      <img src=\"https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png\" alt=\"EDtunnel Logo\" class=\"logo\">\n      <p>Welcome! This function generates configuration for the vless protocol. If you found this useful, please check our GitHub project:</p>\n      <p><a href=\"https://github.com/6Kmfi6HP/EDtunnel\" target=\"_blank\" style=\"color: #00ff00;\">EDtunnel - https://github.com/6Kmfi6HP/EDtunnel</a></p>\n      <div style=\"clear: both;\"></div>\n      <div class=\"btn-group\">\n        <a href=\"//" + _0x4add21 + "/sub/" + _0x195eff[0x0] + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-link\"></i> VLESS Subscription</a>\n        <a href=\"clash://install-config?url=" + encodeURIComponent("https://" + _0x4add21 + "/sub/" + _0x195eff[0x0] + "?format=clash") + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-bolt\"></i> Clash Subscription</a>\n        <a href=\"" + _0x1c0bd3 + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-bolt\"></i> Clash Link</a>\n        <a href=\"" + _0x476d65 + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-star\"></i> Best IP Subscription</a>\n      </div>\n      <div class=\"subscription-info\">\n        <h3>Options Explained:</h3>\n        <ul>\n          <li><strong>VLESS Subscription:</strong> Direct link for VLESS protocol configuration. Suitable for clients supporting VLESS.</li>\n          <li><strong>Clash Subscription:</strong> Opens the Clash client with pre-configured settings. Best for Clash users on mobile devices.</li>\n          <li><strong>Clash Link:</strong> A web link to convert the VLESS config to Clash format. Useful for manual import or troubleshooting.</li>\n          <li><strong>Best IP Subscription:</strong> Provides a curated list of optimal server IPs for many <b>different countries</b>.</li>\n        </ul>\n        <p>Choose the option that best fits your client and needs. For most users, the VLESS or Clash Subscription will be the easiest to use.</p>\n      </div>\n    </div>\n  ";
  const _0x17c619 = _0x195eff.map(_0x264506 => {
    const _0x2cbe8e = atob("dmxlc3M=") + "://" + _0x264506 + atob("QA==") + _0x4add21 + ":443" + _0x5ae3dc;
    const _0x335407 = atob("dmxlc3M=") + "://" + _0x264506 + atob("QA==") + _0x5ef46d[0x0].split(":")[0x0] + ":" + proxyPort + _0x5ae3dc;
    return "\n      <div class=\"container config-item\">\n        <h2>UUID: " + _0x264506 + "</h2>\n        <h3>Default IP Configuration</h3>\n        <div class=\"code-container\">\n          <pre><code>" + _0x2cbe8e + "</code></pre>\n          <button class=\"btn copy-btn\" onclick='copyToClipboard(\"" + _0x2cbe8e + "\")'><i class=\"fas fa-copy\"></i> Copy</button>\n        </div>\n        \n        <h3>Best IP Configuration</h3>\n        <div class=\"input-group mb-3\">\n          <select class=\"form-select\" id=\"proxySelect\" onchange=\"updateProxyConfig()\">\n            " + (typeof _0x5ef46d === "string" ? "<option value=\"" + _0x5ef46d + "\">" + _0x5ef46d + "</option>" : Array.from(_0x5ef46d).map(_0x180171 => "<option value=\"" + _0x180171 + "\">" + _0x180171 + "</option>").join('')) + "\n          </select>\n        </div>\n\t\t<br>\n        <div class=\"code-container\">\n          <pre><code id=\"proxyConfig\">" + _0x335407 + "</code></pre>\n          <button class=\"btn copy-btn\" onclick='copyToClipboard(document.getElementById(\"proxyConfig\").textContent)'><i class=\"fas fa-copy\"></i> Copy</button>\n        </div>\n      </div>\n    ";
  }).join('');
  return "\n  <html>\n  " + _0x1fed53 + "\n  <body>\n    " + _0x2b7293 + "\n    " + _0x17c619 + "\n    <script>\n      const userIDArray = " + JSON.stringify(_0x195eff) + ";\n      const pt = \"" + "dmxlc3M=" + "\";\n      const at = \"" + "QA==" + "\";\n      const commonUrlPart = \"?encryption=none&security=tls&sni=" + _0x4add21 + "&fp=randomized&type=ws&host=" + _0x4add21 + "&path=%2F%3Fed%3D2048#" + _0x4add21 + "\";\n\n      function copyToClipboard(text) {\n        navigator.clipboard.writeText(text)\n          .then(() => {\n            alert(\"Copied to clipboard\");\n          })\n          .catch((err) => {\n            console.error(\"Failed to copy to clipboard:\", err);\n          });\n      }\n\n      function updateProxyConfig() {\n        const select = document.getElementById('proxySelect');\n        const proxyValue = select.value;\n        const [host, port] = proxyValue.split(':');\n        const protocolSec = atob(pt) + '://' + userIDArray[0] + atob(at) + host + \":\" + port + commonUrlPart;\n        document.getElementById(\"proxyConfig\").textContent = protocolSec;\n      }\n    </script>\n  </body>\n  </html>";
}
const HttpPort = new Set([0x50, 0x1f90, 0x22b0, 0x804, 0x826, 0x82f, 0x822]);
const HttpsPort = new Set([0x1bb, 0x20fb, 0x805, 0x830, 0x827, 0x823]);
function GenSub(_0x82d67a, _0x5a7357, _0x2b3f44) {
  const _0xf974e3 = new Set([_0x5a7357, "icook.hk", "japan.com", "malaysia.com", "russia.com", "singapore.com", "www.visa.com", "www.csgo.com", "www.shopify.com", "www.whatismyip.com", "www.ipget.net", "speed.marisalnc.com", "freeyx.cloudflare88.eu.org", "cloudflare.182682.xyz", "cfip.cfcdn.vip", proxyIPs, "cf.0sm.com", "cloudflare-ip.mofashi.ltd", "cf.090227.xyz", "cname.xirancdn.us", "cf.zhetengsha.eu.org", "cloudflare.9jy.cc", "cf.zerone-cdn.pp.ua", "cfip.1323123.xyz", "cdn.tzpro.xyz", "cf.877771.xyz", "cnamefuckxxs.yuchen.icu", "cfip.xxxxxxxx.tk"]);
  const _0x1a0985 = _0x82d67a.includes(",") ? _0x82d67a.split(",") : [_0x82d67a];
  const _0x2fe6ee = Array.isArray(_0x2b3f44) ? _0x2b3f44 : _0x2b3f44 ? _0x2b3f44.includes(",") ? _0x2b3f44.split(",") : [_0x2b3f44] : proxyIPs;
  const _0x1108b6 = "?encryption=none&security=none&fp=random&type=ws&host=" + _0x5a7357 + "&path=" + encodeURIComponent("/" + Math.random().toString(0x24).substring(0x2, 0xf) + "?ed=2048") + "#";
  const _0x58d1b1 = "?encryption=none&security=tls&sni=" + _0x5a7357 + "&fp=random&type=ws&host=" + _0x5a7357 + "&path=%2F%3Fed%3D2048#";
  const _0x51b103 = _0x1a0985.flatMap(_0x1c7070 => {
    let _0x155ea7 = [];
    if (!_0x5a7357.includes("pages.dev")) {
      _0xf974e3.forEach(_0x573c8f => {
        Array.from(HttpPort).forEach(_0x280649 => {
          const _0x25c592 = _0x5a7357.split(".")[0x0] + "-" + _0x573c8f + "-HTTP-" + _0x280649;
          const _0x482a04 = atob("dmxlc3M=") + "://" + _0x1c7070 + atob("QA==") + _0x573c8f + ":" + _0x280649 + _0x1108b6 + _0x25c592;
          _0x155ea7.push(_0x482a04);
        });
      });
    }
    _0xf974e3.forEach(_0x349d6d => {
      Array.from(HttpsPort).forEach(_0x72e507 => {
        const _0x39fbc9 = _0x5a7357.split(".")[0x0] + "-" + _0x349d6d + "-HTTPS-" + _0x72e507;
        const _0x1e7c53 = atob("dmxlc3M=") + "://" + _0x1c7070 + atob("QA==") + _0x349d6d + ":" + _0x72e507 + _0x58d1b1 + _0x39fbc9;
        _0x155ea7.push(_0x1e7c53);
      });
    });
    _0x2fe6ee.forEach(_0x22d8af => {
      const [_0x3be252, _0x339ead = "443"] = _0x22d8af.split(":");
      const _0x430722 = _0x5a7357.split(".")[0x0] + "-" + _0x3be252 + "-HTTPS-" + _0x339ead;
      const _0x54f9da = atob("dmxlc3M=") + "://" + _0x1c7070 + atob("QA==") + _0x3be252 + ":" + _0x339ead + _0x58d1b1 + _0x430722 + "-" + atob("RUR0dW5uZWw=");
      _0x155ea7.push(_0x54f9da);
    });
    return _0x155ea7;
  });
  return btoa(_0x51b103.join("\n"));
}
function handleProxyConfig(_0x47568a) {
  if (_0x47568a) {
    const _0x4835bd = _0x47568a.split(",").map(_0x4c1efd => _0x4c1efd.trim());
    const _0x41854d = selectRandomAddress(_0x4835bd);
    const [_0x3ffba2, _0x535b29 = "443"] = _0x41854d.split(":");
    const _0x2eb2c6 = {
      ip: _0x3ffba2,
      port: _0x535b29
    };
    return _0x2eb2c6;
  } else {
    const _0x47759c = proxyIP.includes(":") ? proxyIP.split(":")[0x1] : "443";
    const _0x7e5b17 = proxyIP.split(":")[0x0];
    const _0x179763 = {
      ip: _0x7e5b17,
      port: _0x47759c
    };
    return _0x179763;
  }
}
function selectRandomAddress(_0x3af342) {
  const _0x10c269 = typeof _0x3af342 === "string" ? _0x3af342.split(",").map(_0x31e0f8 => _0x31e0f8.trim()) : _0x3af342;
  return _0x10c269[Math.floor(Math.random() * _0x10c269.length)];
}
