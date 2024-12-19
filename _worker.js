import { connect } from "cloudflare:sockets";
let userID = "f5d09650-b154-4192-97c5-633ea7717364";
const proxyIPs = [""];
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
  async "fetch"(_0x5f534e, _0x5c49d6, _0x3be102) {
    try {
      const {
        UUID: _0x4074ea,
        PROXYIP: _0x214226,
        SOCKS5: _0x4ddb4,
        SOCKS5_RELAY: _0x426b9c
      } = _0x5c49d6;
      userID = _0x4074ea || userID;
      socks5Address = _0x4ddb4 || socks5Address;
      socks5Relay = _0x426b9c || socks5Relay;
      const _0x2d094e = handleProxyConfig(_0x214226);
      proxyIP = _0x2d094e.ip;
      proxyPort = _0x2d094e.port;
      if (socks5Address) {
        try {
          const _0x45bb91 = selectRandomAddress(socks5Address);
          parsedSocks5Address = socks5AddressParser(_0x45bb91);
          enableSocks = true;
        } catch (_0x56656d) {
          console.log(_0x56656d.toString());
          enableSocks = false;
        }
      }
      const _0x198b45 = userID.includes(",") ? userID.split(",").map(_0x14d98f => _0x14d98f.trim()) : [userID];
      const _0x1e124a = new URL(_0x5f534e.url);
      const _0x5341b4 = _0x5f534e.headers.get("Host");
      const _0xb97211 = _0x1e124a.pathname.substring(0x1);
      const _0x7d155a = _0x198b45.length === 0x1 ? _0xb97211 === _0x198b45[0x0] || _0xb97211 === "sub/" + _0x198b45[0x0] || _0xb97211 === "bestip/" + _0x198b45[0x0] ? _0x198b45[0x0] : null : _0x198b45.find(_0xac23b0 => {
        const _0x3d2771 = [_0xac23b0, "sub/" + _0xac23b0, "bestip/" + _0xac23b0];
        return _0x3d2771.some(_0x17a951 => _0xb97211.startsWith(_0x17a951));
      });
      if (_0x5f534e.headers.get("Upgrade") !== "websocket") {
        if (_0x1e124a.pathname === "/cf") {
          const _0x189124 = {
            "Content-Type": "application/json;charset=utf-8"
          };
          const _0x2a40e7 = {
            status: 0xc8,
            headers: _0x189124
          };
          return new Response(JSON.stringify(_0x5f534e.cf, null, 0x4), _0x2a40e7);
        }
        if (_0x7d155a) {
          if (_0x1e124a.pathname === "/" + _0x7d155a || _0x1e124a.pathname === "/sub/" + _0x7d155a) {
            const _0x526c6f = _0x1e124a.pathname.startsWith("/sub/");
            const _0x2ca745 = _0x214226 ? _0x214226.split(",").map(_0x314691 => _0x314691.trim()) : proxyIP;
            const _0xd86d1 = _0x526c6f ? GenSub(_0x7d155a, _0x5341b4, _0x2ca745) : getConfig(_0x7d155a, _0x5341b4, _0x2ca745);
            const _0x263582 = {
              "Content-Type": _0x526c6f ? "text/plain;charset=utf-8" : "text/html; charset=utf-8"
            };
            const _0x2dcc2e = {
              status: 0xc8,
              headers: _0x263582
            };
            return new Response(_0xd86d1, _0x2dcc2e);
          } else {
            if (_0x1e124a.pathname === "/bestip/" + _0x7d155a) {
              const _0x556bed = {
                headers: _0x5f534e.headers
              };
              return fetch("https://sub.xf.free.hr/auto?host=" + _0x5341b4 + "&uuid=" + _0x7d155a + "&path=/", _0x556bed);
            }
          }
        }
        return handleDefaultPath(_0x1e124a, _0x5f534e);
      } else {
        return await ProtocolOverWSHandler(_0x5f534e);
      }
    } catch (_0x3f0c5c) {
      return new Response(_0x3f0c5c.toString());
    }
  }
};
async function handleDefaultPath(_0x3a2b57, _0x1567c2) {
  const _0x180111 = _0x1567c2.headers.get("Host");
  const _0x456210 = "\n\t  <!DOCTYPE html>\n\t  <html lang=\"en\">\n\t  <head>\n\t\t  <meta charset=\"UTF-8\">\n\t\t  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n\t\t  <title>" + _0x180111 + " - Cloud Drive</title>\n\t\t  <style>\n\t\t\t  body {\n\t\t\t\t  font-family: Arial, sans-serif;\n\t\t\t\t  line-height: 1.6;\n\t\t\t\t  margin: 0;\n\t\t\t\t  padding: 20px;\n\t\t\t\t  background-color: #f4f4f4;\n\t\t\t  }\n\t\t\t  .container {\n\t\t\t\t  max-width: 800px;\n\t\t\t\t  margin: auto;\n\t\t\t\t  background: white;\n\t\t\t\t  padding: 20px;\n\t\t\t\t  border-radius: 5px;\n\t\t\t\t  box-shadow: 0 0 10px rgba(0,0,0,0.1);\n\t\t\t  }\n\t\t\t  h1 {\n\t\t\t\t  color: #333;\n\t\t\t  }\n\t\t\t  .file-list {\n\t\t\t\t  list-style-type: none;\n\t\t\t\t  padding: 0;\n\t\t\t  }\n\t\t\t  .file-list li {\n\t\t\t\t  background: #f9f9f9;\n\t\t\t\t  margin-bottom: 10px;\n\t\t\t\t  padding: 10px;\n\t\t\t\t  border-radius: 3px;\n\t\t\t\t  display: flex;\n\t\t\t\t  align-items: center;\n\t\t\t  }\n\t\t\t  .file-list li:hover {\n\t\t\t\t  background: #f0f0f0;\n\t\t\t  }\n\t\t\t  .file-icon {\n\t\t\t\t  margin-right: 10px;\n\t\t\t\t  font-size: 1.2em;\n\t\t\t  }\n\t\t\t  .file-link {\n\t\t\t\t  text-decoration: none;\n\t\t\t\t  color: #0066cc;\n\t\t\t\t  flex-grow: 1;\n\t\t\t  }\n\t\t\t  .file-link:hover {\n\t\t\t\t  text-decoration: underline;\n\t\t\t  }\n\t\t\t  .upload-area {\n\t\t\t\t  margin-top: 20px;\n\t\t\t\t  padding: 40px;\n\t\t\t\t  background: #e9e9e9;\n\t\t\t\t  border: 2px dashed #aaa;\n\t\t\t\t  border-radius: 5px;\n\t\t\t\t  text-align: center;\n\t\t\t\t  cursor: pointer;\n\t\t\t\t  transition: all 0.3s ease;\n\t\t\t  }\n\t\t\t  .upload-area:hover, .upload-area.drag-over {\n\t\t\t\t  background: #d9d9d9;\n\t\t\t\t  border-color: #666;\n\t\t\t  }\n\t\t\t  .upload-area h2 {\n\t\t\t\t  margin-top: 0;\n\t\t\t\t  color: #333;\n\t\t\t  }\n\t\t\t  #fileInput {\n\t\t\t\t  display: none;\n\t\t\t  }\n\t\t\t  .upload-icon {\n\t\t\t\t  font-size: 48px;\n\t\t\t\t  color: #666;\n\t\t\t\t  margin-bottom: 10px;\n\t\t\t  }\n\t\t\t  .upload-text {\n\t\t\t\t  font-size: 18px;\n\t\t\t\t  color: #666;\n\t\t\t  }\n\t\t\t  .upload-status {\n\t\t\t\t  margin-top: 20px;\n\t\t\t\t  font-style: italic;\n\t\t\t\t  color: #666;\n\t\t\t  }\n\t\t\t  .file-actions {\n\t\t\t\t  display: flex;\n\t\t\t\t  gap: 10px;\n\t\t\t  }\n\t\t\t  .delete-btn {\n\t\t\t\t  color: #ff4444;\n\t\t\t\t  cursor: pointer;\n\t\t\t\t  background: none;\n\t\t\t\t  border: none;\n\t\t\t\t  padding: 5px;\n\t\t\t  }\n\t\t\t  .delete-btn:hover {\n\t\t\t\t  color: #ff0000;\n\t\t\t  }\n\t\t\t  .clear-all-btn {\n\t\t\t\t  background-color: #ff4444;\n\t\t\t\t  color: white;\n\t\t\t\t  border: none;\n\t\t\t\t  padding: 10px 15px;\n\t\t\t\t  border-radius: 4px;\n\t\t\t\t  cursor: pointer;\n\t\t\t\t  margin-bottom: 20px;\n\t\t\t  }\n\t\t\t  .clear-all-btn:hover {\n\t\t\t\t  background-color: #ff0000;\n\t\t\t  }\n\t\t  </style>\n\t  </head>\n\t  <body>\n\t\t  <div class=\"container\">\n\t\t\t  <h1>Cloud Drive</h1>\n\t\t\t  <p>Welcome to your personal cloud storage. Here are your uploaded files:</p>\n\t\t\t  <button id=\"clearAllBtn\" class=\"clear-all-btn\">Clear All Files</button>\n\t\t\t  <ul id=\"fileList\" class=\"file-list\">\n\t\t\t  </ul>\n\t\t\t  <div id=\"uploadArea\" class=\"upload-area\">\n\t\t\t\t  <div class=\"upload-icon\">📁</div>\n\t\t\t\t  <h2>Upload a File</h2>\n\t\t\t\t  <p class=\"upload-text\">Drag and drop a file here or click to select</p>\n\t\t\t\t  <input type=\"file\" id=\"fileInput\" hidden>\n\t\t\t  </div>\n\t\t\t  <div id=\"uploadStatus\" class=\"upload-status\"></div>\n\t\t  </div>\n\t\t  <script>\n\t\t\t  function loadFileList() {\n\t\t\t\t  const fileList = document.getElementById('fileList');\n\t\t\t\t  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];\n\t\t\t\t  fileList.innerHTML = '';\n\t\t\t\t  savedFiles.forEach((file, index) => {\n\t\t\t\t\t  const li = document.createElement('li');\n\t\t\t\t\t  li.innerHTML = `\n\t\t\t\t\t\t  <span class=\"file-icon\">📄</span>\n\t\t\t\t\t\t  <a href=\"https://ipfs.io/ipfs/${file.Url.split('/').pop()}\" class=\"file-link\" target=\"_blank\">${file.Name}</a>\n\t\t\t\t\t\t  <div class=\"file-actions\">\n\t\t\t\t\t\t\t  <button class=\"delete-btn\" onclick=\"deleteFile(${index})\">\n\t\t\t\t\t\t\t\t  <span class=\"file-icon\">❌</span>\n\t\t\t\t\t\t\t  </button>\n\t\t\t\t\t\t  </div>\n\t\t\t\t\t  `;\n\t\t\t\t\t  fileList.appendChild(li);\n\t\t\t\t  });\n\t\t\t  }\n\n\t\t\t  function deleteFile(index) {\n\t\t\t\t  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];\n\t\t\t\t  savedFiles.splice(index, 1);\n\t\t\t\t  localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));\n\t\t\t\t  loadFileList();\n\t\t\t  }\n\n\t\t\t  document.getElementById('clearAllBtn').addEventListener('click', () => {\n\t\t\t\t  if (confirm('Are you sure you want to clear all files?')) {\n\t\t\t\t\t  localStorage.removeItem('uploadedFiles');\n\t\t\t\t\t  loadFileList();\n\t\t\t\t  }\n\t\t\t  });\n\n\t\t\t  loadFileList();\n\n\t\t\t  const uploadArea = document.getElementById('uploadArea');\n\t\t\t  const fileInput = document.getElementById('fileInput');\n\t\t\t  const uploadStatus = document.getElementById('uploadStatus');\n\n\t\t\t  uploadArea.addEventListener('dragover', (e) => {\n\t\t\t\t  e.preventDefault();\n\t\t\t\t  uploadArea.classList.add('drag-over');\n\t\t\t  });\n\n\t\t\t  uploadArea.addEventListener('dragleave', () => {\n\t\t\t\t  uploadArea.classList.remove('drag-over');\n\t\t\t  });\n\n\t\t\t  uploadArea.addEventListener('drop', (e) => {\n\t\t\t\t  e.preventDefault();\n\t\t\t\t  uploadArea.classList.remove('drag-over');\n\t\t\t\t  const files = e.dataTransfer.files;\n\t\t\t\t  if (files.length) {\n\t\t\t\t\t  handleFileUpload(files[0]);\n\t\t\t\t  }\n\t\t\t  });\n\n\t\t\t  uploadArea.addEventListener('click', () => {\n\t\t\t\t  fileInput.click();\n\t\t\t  });\n\n\t\t\t  fileInput.addEventListener('change', (e) => {\n\t\t\t\t  const file = e.target.files[0];\n\t\t\t\t  if (file) {\n\t\t\t\t\t  handleFileUpload(file);\n\t\t\t\t  }\n\t\t\t  });\n\n\t\t\t  async function handleFileUpload(file) {\n\t\t\t\t  uploadStatus.textContent = `Uploading: ${file.name}...`;\n\t\t\t\t  \n\t\t\t\t  const formData = new FormData();\n\t\t\t\t  formData.append('file', file);\n\n\t\t\t\t  try {\n\t\t\t\t\t  const response = await fetch('https://app.img2ipfs.org/api/v0/add', {\n\t\t\t\t\t\t  method: 'POST',\n\t\t\t\t\t\t  body: formData,\n\t\t\t\t\t\t  headers: {\n\t\t\t\t\t\t\t  'Accept': 'application/json',\n\t\t\t\t\t\t  },\n\t\t\t\t\t  });\n\n\t\t\t\t\t  if (!response.ok) {\n\t\t\t\t\t\t  throw new Error('Upload failed');\n\t\t\t\t\t  }\n\n\t\t\t\t\t  const result = await response.json();\n\t\t\t\t\t  uploadStatus.textContent = `File uploaded successfully! IPFS Hash: ${result.Hash}`;\n\t\t\t\t\t  \n\t\t\t\t\t  const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];\n\t\t\t\t\t  savedFiles.push(result);\n\t\t\t\t\t  localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));\n\t\t\t\t\t  \n\t\t\t\t\t  loadFileList();\n\t\t\t\t\t  \n\t\t\t\t  } catch (error) {\n\t\t\t\t\t  console.error('Error:', error);\n\t\t\t\t\t  uploadStatus.textContent = 'Upload failed. Please try again.';\n\t\t\t\t  }\n\t\t\t  }\n\t\t  </script>\n\t  </body>\n\t  </html>\n\t";
  const _0x5a4b4f = {
    "content-type": "text/html;charset=UTF-8"
  };
  const _0x36747a = {
    headers: _0x5a4b4f
  };
  return new Response(_0x456210, _0x36747a);
}
async function ProtocolOverWSHandler(_0x26bf47) {
  const _0x378236 = new WebSocketPair();
  const [_0x5e4977, _0x2287b1] = Object.values(_0x378236);
  _0x2287b1.accept();
  let _0x278bb4 = '';
  let _0x388a61 = '';
  const _0x5b7fdd = (_0x1965c8, _0xf974eb) => {
    console.log("[" + _0x278bb4 + ":" + _0x388a61 + "] " + _0x1965c8, _0xf974eb || '');
  };
  const _0x517eb2 = _0x26bf47.headers.get("sec-websocket-protocol") || '';
  const _0x469e60 = MakeReadableWebSocketStream(_0x2287b1, _0x517eb2, _0x5b7fdd);
  const _0xfcb6e8 = {
    value: null
  };
  let _0x1f1ede = false;
  _0x469e60.pipeTo(new WritableStream({
    async "write"(_0x5449d1, _0x30f6be) {
      if (_0x1f1ede) {
        return await handleDNSQuery(_0x5449d1, _0x2287b1, null, _0x5b7fdd);
      }
      const _0x35ea67 = null.writable.getWriter();
      await _0x35ea67.write(_0x5449d1);
      _0x35ea67.releaseLock();
      return;
      const {
        hasError: _0x40ba81,
        message: _0x4d30a6,
        addressType: _0x28aad3,
        portRemote = 0x1bb,
        addressRemote = '',
        rawDataIndex: _0x263048,
        ProtocolVersion = new Uint8Array([0x0, 0x0]),
        isUDP: _0x168c13
      } = ProcessProtocolHeader(_0x5449d1, userID);
      _0x278bb4 = addressRemote;
      _0x388a61 = portRemote + "--" + Math.random() + " " + (_0x168c13 ? "udp " : "tcp ") + " ";
      if (_0x40ba81) {
        throw new Error(_0x4d30a6);
      }
      if (_0x168c13) {
        if (portRemote === 0x35) {
          _0x1f1ede = true;
        } else {
          throw new Error("UDP proxy is only enabled for DNS (port 53)");
        }
        return;
      }
      const _0x316e06 = new Uint8Array([ProtocolVersion[0x0], 0x0]);
      const _0x5a6c97 = _0x5449d1.slice(_0x263048);
      if (_0x1f1ede) {
        return handleDNSQuery(_0x5a6c97, _0x2287b1, _0x316e06, _0x5b7fdd);
      }
      HandleTCPOutBound(_0xfcb6e8, _0x28aad3, addressRemote, portRemote, _0x5a6c97, _0x2287b1, _0x316e06, _0x5b7fdd);
    },
    "close"() {
      _0x5b7fdd("readableWebSocketStream is close");
    },
    "abort"(_0x5a2503) {
      _0x5b7fdd("readableWebSocketStream is abort", JSON.stringify(_0x5a2503));
    }
  }))["catch"](_0x3b8a3d => {
    _0x5b7fdd("readableWebSocketStream pipeTo error", _0x3b8a3d);
  });
  const _0x50ee5e = {
    status: 0x65,
    webSocket: _0x5e4977
  };
  return new Response(null, _0x50ee5e);
}
async function HandleTCPOutBound(_0x3c03a0, _0x3cf8e2, _0x1c640f, _0x554842, _0xe8b912, _0x145252, _0x319a60, _0x4fb00f) {
  async function _0x5c4d87(_0x2f0261, _0x14b3e6, _0x21ea0f = false) {
    let _0x3d6506;
    if (socks5Relay) {
      _0x3d6506 = await socks5Connect(_0x3cf8e2, _0x2f0261, _0x14b3e6, _0x4fb00f);
    } else {
      _0x3d6506 = _0x21ea0f ? await socks5Connect(_0x3cf8e2, _0x2f0261, _0x14b3e6, _0x4fb00f) : connect({
        "hostname": _0x2f0261,
        "port": _0x14b3e6
      });
    }
    _0x3c03a0.value = _0x3d6506;
    _0x4fb00f("connected to " + _0x2f0261 + ":" + _0x14b3e6);
    const _0x9cedd4 = _0x3d6506.writable.getWriter();
    await _0x9cedd4.write(_0xe8b912);
    _0x9cedd4.releaseLock();
    return _0x3d6506;
  }
  async function _0x33433() {
    if (enableSocks) {
      _0x206b51 = await _0x5c4d87(_0x1c640f, _0x554842, true);
    } else {
      _0x206b51 = await _0x5c4d87(proxyIP || _0x1c640f, proxyPort || _0x554842, false);
    }
    _0x206b51.closed["catch"](_0x25fba6 => {
      console.log("retry tcpSocket closed error", _0x25fba6);
    })["finally"](() => {
      safeCloseWebSocket(_0x145252);
    });
    RemoteSocketToWS(_0x206b51, _0x145252, _0x319a60, null, _0x4fb00f);
  }
  let _0x206b51 = await _0x5c4d87(_0x1c640f, _0x554842);
  RemoteSocketToWS(_0x206b51, _0x145252, _0x319a60, _0x33433, _0x4fb00f);
}
function MakeReadableWebSocketStream(_0xad172d, _0x1d89f6, _0x4e3fbc) {
  let _0x38860f = false;
  const _0x146edb = new ReadableStream({
    "start"(_0x24fe23) {
      _0xad172d.addEventListener("message", _0x10e384 => {
        const _0x1603e6 = _0x10e384.data;
        _0x24fe23.enqueue(_0x1603e6);
      });
      _0xad172d.addEventListener("close", () => {
        safeCloseWebSocket(_0xad172d);
        _0x24fe23.close();
      });
      _0xad172d.addEventListener("error", _0x5b2845 => {
        _0x4e3fbc("webSocketServer has error");
        _0x24fe23.error(_0x5b2845);
      });
      const {
        earlyData: _0x1d386d,
        error: _0xf9393c
      } = base64ToArrayBuffer(_0x1d89f6);
      if (_0xf9393c) {
        _0x24fe23.error(_0xf9393c);
      } else if (_0x1d386d) {
        _0x24fe23.enqueue(_0x1d386d);
      }
    },
    "pull"(_0x3e6eef) {},
    "cancel"(_0x13f49f) {
      _0x4e3fbc("ReadableStream was canceled, due to " + _0x13f49f);
      _0x38860f = true;
      safeCloseWebSocket(_0xad172d);
    }
  });
  return _0x146edb;
}
function ProcessProtocolHeader(_0x20de43, _0xd68b90) {
  if (_0x20de43.byteLength < 0x18) {
    const _0x1a459b = {
      hasError: true,
      message: "invalid data"
    };
    return _0x1a459b;
  }
  const _0x4703da = new DataView(_0x20de43);
  const _0x4d0866 = _0x4703da.getUint8(0x0);
  const _0x22ffdc = stringify(new Uint8Array(_0x20de43.slice(0x1, 0x11)));
  const _0xe8f7a8 = _0xd68b90.includes(",") ? _0xd68b90.split(",") : [_0xd68b90];
  const _0x3e0e02 = _0xe8f7a8.some(_0x544825 => _0x22ffdc === _0x544825.trim()) || _0xe8f7a8.length === 0x1 && _0x22ffdc === _0xe8f7a8[0x0].trim();
  console.log("userID: " + _0x22ffdc);
  if (!_0x3e0e02) {
    const _0x42f2d8 = {
      hasError: true,
      message: "invalid user"
    };
    return _0x42f2d8;
  }
  const _0x436bec = _0x4703da.getUint8(0x11);
  const _0x1d997e = _0x4703da.getUint8(0x12 + _0x436bec);
  if (_0x1d997e !== 0x1 && _0x1d997e !== 0x2) {
    const _0x529a91 = {
      hasError: true,
      message: "command " + _0x1d997e + " is not supported, command 01-tcp,02-udp,03-mux"
    };
    return _0x529a91;
  }
  const _0x513a70 = 0x12 + _0x436bec + 0x1;
  const _0xc9230b = _0x4703da.getUint16(_0x513a70);
  const _0x27bb3c = _0x4703da.getUint8(_0x513a70 + 0x2);
  let _0x248365;
  let _0x4ffebf;
  let _0x239e48;
  switch (_0x27bb3c) {
    case 0x1:
      _0x4ffebf = 0x4;
      _0x239e48 = _0x513a70 + 0x3;
      _0x248365 = new Uint8Array(_0x20de43.slice(_0x239e48, _0x239e48 + _0x4ffebf)).join(".");
      break;
    case 0x2:
      _0x4ffebf = _0x4703da.getUint8(_0x513a70 + 0x3);
      _0x239e48 = _0x513a70 + 0x4;
      _0x248365 = new TextDecoder().decode(_0x20de43.slice(_0x239e48, _0x239e48 + _0x4ffebf));
      break;
    case 0x3:
      _0x4ffebf = 0x10;
      _0x239e48 = _0x513a70 + 0x3;
      const _0x1ad577 = {
        length: 0x8
      };
      _0x248365 = Array.from(_0x1ad577, (_0x4d5452, _0x4481cd) => _0x4703da.getUint16(_0x239e48 + _0x4481cd * 0x2).toString(0x10)).join(":");
      break;
    default:
      const _0x8c77d = {
        hasError: true,
        message: "invalid addressType: " + _0x27bb3c
      };
      return _0x8c77d;
  }
  if (!_0x248365) {
    const _0x53aabc = {
      hasError: true,
      message: "addressValue is empty, addressType is " + _0x27bb3c
    };
    return _0x53aabc;
  }
  return {
    "hasError": false,
    "addressRemote": _0x248365,
    "addressType": _0x27bb3c,
    "portRemote": _0xc9230b,
    "rawDataIndex": _0x239e48 + _0x4ffebf,
    "protocolVersion": new Uint8Array([_0x4d0866]),
    "isUDP": _0x1d997e === 0x2
  };
}
async function RemoteSocketToWS(_0x529df5, _0x43f3dc, _0x5eb0d3, _0x41e611, _0x5a6d8d) {
  let _0x1c0fba = false;
  try {
    await _0x529df5.readable.pipeTo(new WritableStream({
      async "write"(_0x10a27f) {
        if (_0x43f3dc.readyState !== 0x1) {
          throw new Error("WebSocket is not open");
        }
        _0x1c0fba = true;
        if (_0x5eb0d3) {
          _0x43f3dc.send(await new Blob([_0x5eb0d3, _0x10a27f]).arrayBuffer());
          _0x5eb0d3 = null;
        } else {
          _0x43f3dc.send(_0x10a27f);
        }
      },
      "close"() {
        _0x5a6d8d("Remote connection readable closed. Had incoming data: " + _0x1c0fba);
      },
      "abort"(_0x5bad37) {
        console.error("Remote connection readable aborted:", _0x5bad37);
      }
    }));
  } catch (_0x2929c1) {
    console.error("RemoteSocketToWS error:", _0x2929c1.stack || _0x2929c1);
    safeCloseWebSocket(_0x43f3dc);
  }
  if (!_0x1c0fba && _0x41e611) {
    _0x5a6d8d("No incoming data, retrying");
    await _0x41e611();
  }
}
function base64ToArrayBuffer(_0x4a412a) {
  if (!_0x4a412a) {
    const _0xbe5e33 = {
      earlyData: null,
      error: null
    };
    return _0xbe5e33;
  }
  try {
    _0x4a412a = _0x4a412a.replace(/-/g, "+").replace(/_/g, "/");
    const _0x440d14 = atob(_0x4a412a);
    const _0x480ca8 = new ArrayBuffer(_0x440d14.length);
    const _0xae37c8 = new Uint8Array(_0x480ca8);
    for (let _0x20681e = 0x0; _0x20681e < _0x440d14.length; _0x20681e++) {
      _0xae37c8[_0x20681e] = _0x440d14.charCodeAt(_0x20681e);
    }
    const _0x4e9e3f = {
      earlyData: _0x480ca8,
      error: null
    };
    return _0x4e9e3f;
  } catch (_0x466ce0) {
    const _0x2c99fc = {
      earlyData: null,
      error: _0x466ce0
    };
    return _0x2c99fc;
  }
}
function isValidUUID(_0x37f11d) {
  const _0x52824e = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return _0x52824e.test(_0x37f11d);
}
function safeCloseWebSocket(_0x4e462a) {
  try {
    if (_0x4e462a.readyState === 0x1 || _0x4e462a.readyState === 0x2) {
      _0x4e462a.close();
    }
  } catch (_0x5b4ea6) {
    console.error("safeCloseWebSocket error:", _0x5b4ea6);
  }
}
const a0_0x309d8b = {
  length: 0x100
};
const byteToHex = Array.from(a0_0x309d8b, (_0x4563a5, _0x62ccc2) => (_0x62ccc2 + 0x100).toString(0x10).slice(0x1));
function unsafeStringify(_0x2ff379, _0x38799f = 0x0) {
  return [byteToHex[_0x2ff379[_0x38799f]], byteToHex[_0x2ff379[_0x38799f + 0x1]], byteToHex[_0x2ff379[_0x38799f + 0x2]], byteToHex[_0x2ff379[_0x38799f + 0x3]], "-", byteToHex[_0x2ff379[_0x38799f + 0x4]], byteToHex[_0x2ff379[_0x38799f + 0x5]], "-", byteToHex[_0x2ff379[_0x38799f + 0x6]], byteToHex[_0x2ff379[_0x38799f + 0x7]], "-", byteToHex[_0x2ff379[_0x38799f + 0x8]], byteToHex[_0x2ff379[_0x38799f + 0x9]], "-", byteToHex[_0x2ff379[_0x38799f + 0xa]], byteToHex[_0x2ff379[_0x38799f + 0xb]], byteToHex[_0x2ff379[_0x38799f + 0xc]], byteToHex[_0x2ff379[_0x38799f + 0xd]], byteToHex[_0x2ff379[_0x38799f + 0xe]], byteToHex[_0x2ff379[_0x38799f + 0xf]]].join('').toLowerCase();
}
function stringify(_0x13f0b8, _0x21b905 = 0x0) {
  const _0x484849 = unsafeStringify(_0x13f0b8, _0x21b905);
  if (!isValidUUID(_0x484849)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return _0x484849;
}
async function handleDNSQuery(_0x2d0dad, _0x45854b, _0x183962, _0x370b07) {
  try {
    let _0xfc4283 = _0x183962;
    const _0x8c6bf5 = {
      hostname: "8.8.4.4",
      port: 0x35
    };
    const _0x35c9a0 = connect(_0x8c6bf5);
    _0x370b07("connected to 8.8.4.4:53");
    const _0x3ab76d = _0x35c9a0.writable.getWriter();
    await _0x3ab76d.write(_0x2d0dad);
    _0x3ab76d.releaseLock();
    await _0x35c9a0.readable.pipeTo(new WritableStream({
      async "write"(_0x4ac785) {
        if (_0x45854b.readyState === 0x1) {
          if (_0xfc4283) {
            _0x45854b.send(await new Blob([_0xfc4283, _0x4ac785]).arrayBuffer());
            _0xfc4283 = null;
          } else {
            _0x45854b.send(_0x4ac785);
          }
        }
      },
      "close"() {
        _0x370b07("dns server(8.8.4.4) tcp is close");
      },
      "abort"(_0x25b825) {
        console.error("dns server(8.8.4.4) tcp is abort", _0x25b825);
      }
    }));
  } catch (_0x572be8) {
    console.error("handleDNSQuery have exception, error: " + _0x572be8.message);
  }
}
async function socks5Connect(_0x4d3b63, _0x2cedde, _0xb782b4, _0x28d254) {
  const {
    username: _0x570ae0,
    password: _0x147688,
    hostname: _0x58f458,
    port: _0x1254db
  } = parsedSocks5Address;
  const _0x2e373e = {
    hostname: _0x58f458,
    port: _0x1254db
  };
  const _0x1cd63f = connect(_0x2e373e);
  const _0x1f8ca2 = new Uint8Array([0x5, 0x2, 0x0, 0x2]);
  const _0x2f8633 = _0x1cd63f.writable.getWriter();
  await _0x2f8633.write(_0x1f8ca2);
  _0x28d254("sent socks greeting");
  const _0x14b574 = _0x1cd63f.readable.getReader();
  const _0x7178bc = new TextEncoder();
  let _0x39bf1e = (await _0x14b574.read()).value;
  if (_0x39bf1e[0x0] !== 0x5) {
    _0x28d254("socks server version error: " + _0x39bf1e[0x0] + " expected: 5");
    return;
  }
  if (_0x39bf1e[0x1] === 0xff) {
    _0x28d254("no acceptable methods");
    return;
  }
  if (_0x39bf1e[0x1] === 0x2) {
    _0x28d254("socks server needs auth");
    if (!_0x570ae0 || !_0x147688) {
      _0x28d254("please provide username/password");
      return;
    }
    const _0x2d1f0c = new Uint8Array([0x1, _0x570ae0.length, ..._0x7178bc.encode(_0x570ae0), _0x147688.length, ..._0x7178bc.encode(_0x147688)]);
    await _0x2f8633.write(_0x2d1f0c);
    _0x39bf1e = (await _0x14b574.read()).value;
    if (_0x39bf1e[0x0] !== 0x1 || _0x39bf1e[0x1] !== 0x0) {
      _0x28d254("fail to auth socks server");
      return;
    }
  }
  let _0x2f7935;
  switch (_0x4d3b63) {
    case 0x1:
      _0x2f7935 = new Uint8Array([0x1, ..._0x2cedde.split(".").map(Number)]);
      break;
    case 0x2:
      _0x2f7935 = new Uint8Array([0x3, _0x2cedde.length, ..._0x7178bc.encode(_0x2cedde)]);
      break;
    case 0x3:
      _0x2f7935 = new Uint8Array([0x4, ..._0x2cedde.split(":").flatMap(_0x5b08f7 => [parseInt(_0x5b08f7.slice(0x0, 0x2), 0x10), parseInt(_0x5b08f7.slice(0x2), 0x10)])]);
      break;
    default:
      _0x28d254("invild  addressType is " + _0x4d3b63);
      return;
  }
  const _0x2a922f = new Uint8Array([0x5, 0x1, 0x0, ..._0x2f7935, _0xb782b4 >> 0x8, _0xb782b4 & 0xff]);
  await _0x2f8633.write(_0x2a922f);
  _0x28d254("sent socks request");
  _0x39bf1e = (await _0x14b574.read()).value;
  if (_0x39bf1e[0x1] === 0x0) {
    _0x28d254("socks connection opened");
  } else {
    _0x28d254("fail to open socks connection");
    return;
  }
  _0x2f8633.releaseLock();
  _0x14b574.releaseLock();
  return _0x1cd63f;
}
function socks5AddressParser(_0x5d3681) {
  let [_0x1d5922, _0x32625a] = _0x5d3681.split("@").reverse();
  let _0x245988;
  let _0x534764;
  let _0x4af31e;
  let _0x4489b0;
  if (_0x32625a) {
    const _0xfecfee = _0x32625a.split(":");
    if (_0xfecfee.length !== 0x2) {
      throw new Error("Invalid SOCKS address format");
    }
    [_0x245988, _0x534764] = _0xfecfee;
  }
  const _0x4e0b28 = _0x1d5922.split(":");
  _0x4489b0 = Number(_0x4e0b28.pop());
  if (isNaN(_0x4489b0)) {
    throw new Error("Invalid SOCKS address format");
  }
  _0x4af31e = _0x4e0b28.join(":");
  const _0x8b07c6 = /^\[.*\]$/;
  if (_0x4af31e.includes(":") && !_0x8b07c6.test(_0x4af31e)) {
    throw new Error("Invalid SOCKS address format");
  }
  const _0x16cfcb = {
    username: _0x245988,
    password: _0x534764,
    hostname: _0x4af31e,
    port: _0x4489b0
  };
  return _0x16cfcb;
}
function getConfig(_0x3d7e52, _0x89f133, _0x373685) {
  const _0x3e0f57 = "?encryption=none&security=tls&sni=" + _0x89f133 + "&fp=randomized&type=ws&host=" + _0x89f133 + "&path=%2F%3Fed%3D2048#" + _0x89f133;
  const _0x21e60f = _0x3d7e52.split(",");
  const _0x4ac10d = "https://" + _0x89f133 + "/bestip/" + _0x21e60f[0x0];
  const _0x5148cd = "https://url.v1.mk/sub?target=clash&url=" + encodeURIComponent("https://" + _0x89f133 + "/sub/" + _0x21e60f[0x0] + "?format=clash") + "&insert=false&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true";
  const _0x2d06ad = "\n  <head>\n    <title>EDtunnel: Configuration</title>\n    <meta name='viewport' content='width=device-width, initial-scale=1'>\n    <meta property='og:site_name' content='EDtunnel: Protocol Configuration' />\n    <meta property='og:type' content='website' />\n    <meta property='og:title' content='EDtunnel - Protocol Configuration and Subscribe Output' />\n    <meta property='og:description' content='Use Cloudflare Pages and Worker serverless to implement protocol' />\n    <meta property='og:url' content='https://" + _0x89f133 + "/' />\n    <meta property='og:image' content='https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png' />\n    <meta name='twitter:card' content='summary_large_image' />\n    <meta name='twitter:title' content='EDtunnel - Protocol Configuration and Subscribe Output' />\n    <meta name='twitter:description' content='Use Cloudflare Pages and Worker serverless to implement protocol' />\n    <meta name='twitter:url' content='https://" + _0x89f133 + "/' />\n    <meta name='twitter:image' content='https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png' />\n    <meta property='og:image:width' content='1500' />\n    <meta property='og:image:height' content='1500' />\n\n    <style>\n      body {\n        font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n        background-color: #000000;\n        color: #ffffff;\n        line-height: 1.6;\n        padding: 20px;\n        max-width: 1200px;\n        margin: 0 auto;\n      }\n      .container {\n        background-color: #111111;\n        border-radius: 8px;\n        box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);\n        padding: 20px;\n        margin-bottom: 20px;\n      }\n      h1, h2 {\n        color: #ffffff;\n      }\n      .config-item {\n        background-color: #222222;\n        border: 1px solid #333333;\n        border-radius: 4px;\n        padding: 15px;\n        margin-bottom: 15px;\n      }\n      .config-item h3 {\n        margin-top: 0;\n        color: #ffffff;\n      }\n      .btn {\n        background-color: #ffffff;\n        color: #000000;\n        border: none;\n        padding: 10px 15px;\n        border-radius: 4px;\n        cursor: pointer;\n        transition: background-color 0.3s, color 0.3s;\n      }\n      .btn:hover {\n        background-color: #cccccc;\n      }\n      .btn-group {\n        margin-top: 10px;\n      }\n      .btn-group .btn {\n        margin-right: 10px;\n      }\n      pre {\n        background-color: #333333;\n        border: 1px solid #444444;\n        border-radius: 4px;\n        padding: 10px;\n        white-space: pre-wrap;\n        word-wrap: break-word;\n        color: #00ff00;\n      }\n      .logo {\n        float: left;\n        margin-right: 20px;\n        margin-bottom: 20px;\n\t\tmax-width: 30%;\n      }\n      @media (max-width: 768px) {\n        .logo {\n          float: none;\n          display: block;\n          margin: 0 auto 20px;\n          max-width: 90%; /* Adjust the max-width to fit within the container */\n        }\n        .btn-group {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n        }\n        .btn-group .btn {\n          margin-bottom: 10px;\n          width: 100%;\n          text-align: center;\n        }\n      }\n      .code-container {\n        position: relative;\n        margin-bottom: 15px;\n      }\n      .code-container pre {\n        margin: 0;\n        padding-right: 100px; /* Make space for the button */\n      }\n      .copy-btn {\n        position: absolute;\n        top: 5px;\n        right: 5px;\n        padding: 5px 10px;\n        font-size: 0.8em;\n      }\n      .subscription-info {\n        margin-top: 20px;\n        background-color: #222222;\n        border-radius: 4px;\n        padding: 15px;\n      }\n      .subscription-info h3 {\n        color: #ffffff;\n        margin-top: 0;\n      }\n      .subscription-info ul {\n        padding-left: 20px;\n      }\n      .subscription-info li {\n        margin-bottom: 10px;\n      }\n    </style>\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\">\n  </head>\n  ";
  const _0x589933 = "\n    <div class=\"container\">\n      <h1>EDtunnel: Protocol Configuration</h1>\n      <img src=\"https://cdn.jsdelivr.net/gh/6Kmfi6HP/EDtunnel@refs/heads/main/image/logo.png\" alt=\"EDtunnel Logo\" class=\"logo\">\n      <p>Welcome! This function generates configuration for the vless protocol. If you found this useful, please check our GitHub project:</p>\n      <p><a href=\"https://github.com/6Kmfi6HP/EDtunnel\" target=\"_blank\" style=\"color: #00ff00;\">EDtunnel - https://github.com/6Kmfi6HP/EDtunnel</a></p>\n      <div style=\"clear: both;\"></div>\n      <div class=\"btn-group\">\n        <a href=\"//" + _0x89f133 + "/sub/" + _0x21e60f[0x0] + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-link\"></i> VLESS Subscription</a>\n        <a href=\"clash://install-config?url=" + encodeURIComponent("https://" + _0x89f133 + "/sub/" + _0x21e60f[0x0] + "?format=clash") + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-bolt\"></i> Clash Subscription</a>\n        <a href=\"" + _0x5148cd + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-bolt\"></i> Clash Link</a>\n        <a href=\"" + _0x4ac10d + "\" class=\"btn\" target=\"_blank\"><i class=\"fas fa-star\"></i> Best IP Subscription</a>\n      </div>\n      <div class=\"subscription-info\">\n        <h3>Options Explained:</h3>\n        <ul>\n          <li><strong>VLESS Subscription:</strong> Direct link for VLESS protocol configuration. Suitable for clients supporting VLESS.</li>\n          <li><strong>Clash Subscription:</strong> Opens the Clash client with pre-configured settings. Best for Clash users on mobile devices.</li>\n          <li><strong>Clash Link:</strong> A web link to convert the VLESS config to Clash format. Useful for manual import or troubleshooting.</li>\n          <li><strong>Best IP Subscription:</strong> Provides a curated list of optimal server IPs for many <b>different countries</b>.</li>\n        </ul>\n        <p>Choose the option that best fits your client and needs. For most users, the VLESS or Clash Subscription will be the easiest to use.</p>\n      </div>\n    </div>\n  ";
  const _0x3d679f = _0x21e60f.map(_0x1882fb => {
    const _0x23369b = atob("dmxlc3M=") + "://" + _0x1882fb + atob("QA==") + _0x89f133 + ":443" + _0x3e0f57;
    const _0x1fdb8c = atob("dmxlc3M=") + "://" + _0x1882fb + atob("QA==") + _0x373685[0x0].split(":")[0x0] + ":" + proxyPort + _0x3e0f57;
    return "\n      <div class=\"container config-item\">\n        <h2>UUID: " + _0x1882fb + "</h2>\n        <h3>Default IP Configuration</h3>\n        <div class=\"code-container\">\n          <pre><code>" + _0x23369b + "</code></pre>\n          <button class=\"btn copy-btn\" onclick='copyToClipboard(\"" + _0x23369b + "\")'><i class=\"fas fa-copy\"></i> Copy</button>\n        </div>\n        \n        <h3>Best IP Configuration</h3>\n        <div class=\"input-group mb-3\">\n          <select class=\"form-select\" id=\"proxySelect\" onchange=\"updateProxyConfig()\">\n            " + (typeof _0x373685 === "string" ? "<option value=\"" + _0x373685 + "\">" + _0x373685 + "</option>" : Array.from(_0x373685).map(_0x9f2b9e => "<option value=\"" + _0x9f2b9e + "\">" + _0x9f2b9e + "</option>").join('')) + "\n          </select>\n        </div>\n\t\t<br>\n        <div class=\"code-container\">\n          <pre><code id=\"proxyConfig\">" + _0x1fdb8c + "</code></pre>\n          <button class=\"btn copy-btn\" onclick='copyToClipboard(document.getElementById(\"proxyConfig\").textContent)'><i class=\"fas fa-copy\"></i> Copy</button>\n        </div>\n      </div>\n    ";
  }).join('');
  return "\n  <html>\n  " + _0x2d06ad + "\n  <body>\n    " + _0x589933 + "\n    " + _0x3d679f + "\n    <script>\n      const userIDArray = " + JSON.stringify(_0x21e60f) + ";\n      const pt = \"" + "dmxlc3M=" + "\";\n      const at = \"" + "QA==" + "\";\n      const commonUrlPart = \"?encryption=none&security=tls&sni=" + _0x89f133 + "&fp=randomized&type=ws&host=" + _0x89f133 + "&path=%2F%3Fed%3D2048#" + _0x89f133 + "\";\n\n      function copyToClipboard(text) {\n        navigator.clipboard.writeText(text)\n          .then(() => {\n            alert(\"Copied to clipboard\");\n          })\n          .catch((err) => {\n            console.error(\"Failed to copy to clipboard:\", err);\n          });\n      }\n\n      function updateProxyConfig() {\n        const select = document.getElementById('proxySelect');\n        const proxyValue = select.value;\n        const [host, port] = proxyValue.split(':');\n        const protocolSec = atob(pt) + '://' + userIDArray[0] + atob(at) + host + \":\" + port + commonUrlPart;\n        document.getElementById(\"proxyConfig\").textContent = protocolSec;\n      }\n    </script>\n  </body>\n  </html>";
}
const HttpPort = new Set([0x50, 0x1f90, 0x22b0, 0x804, 0x826, 0x82f, 0x822]);
const HttpsPort = new Set([0x1bb, 0x20fb, 0x805, 0x830, 0x827, 0x823]);
function GenSub(_0x3a72dd, _0x44437e, _0x32186f) {
  const _0x107a47 = new Set([_0x44437e, "icook.hk", "japan.com", "malaysia.com", "russia.com", "singapore.com", "www.visa.com", "www.csgo.com", "www.shopify.com", "www.whatismyip.com", "www.ipget.net", "speed.marisalnc.com", "freeyx.cloudflare88.eu.org", "cloudflare.182682.xyz", "cfip.cfcdn.vip", proxyIPs, "cf.0sm.com", "cloudflare-ip.mofashi.ltd", "cf.090227.xyz", "cname.xirancdn.us", "cf.zhetengsha.eu.org", "cloudflare.9jy.cc", "cf.zerone-cdn.pp.ua", "cfip.1323123.xyz", "cdn.tzpro.xyz", "cf.877771.xyz", "cnamefuckxxs.yuchen.icu", "cfip.xxxxxxxx.tk"]);
  const _0x512b2e = _0x3a72dd.includes(",") ? _0x3a72dd.split(",") : [_0x3a72dd];
  const _0x13940b = Array.isArray(_0x32186f) ? _0x32186f : _0x32186f ? _0x32186f.includes(",") ? _0x32186f.split(",") : [_0x32186f] : proxyIPs;
  const _0x506d8c = "?encryption=none&security=none&fp=random&type=ws&host=" + _0x44437e + "&path=" + encodeURIComponent("/" + Math.random().toString(0x24).substring(0x2, 0xf) + "?ed=2048") + "#";
  const _0xb66cbc = "?encryption=none&security=tls&sni=" + _0x44437e + "&fp=random&type=ws&host=" + _0x44437e + "&path=%2F%3Fed%3D2048#";
  const _0x52b3d2 = _0x512b2e.flatMap(_0x102f53 => {
    let _0x3bb460 = [];
    if (!_0x44437e.includes("pages.dev")) {
      _0x107a47.forEach(_0xae4ddc => {
        Array.from(HttpPort).forEach(_0xb274ee => {
          const _0xb7c78c = _0x44437e.split(".")[0x0] + "-" + _0xae4ddc + "-HTTP-" + _0xb274ee;
          const _0xf4f3f6 = atob("dmxlc3M=") + "://" + _0x102f53 + atob("QA==") + _0xae4ddc + ":" + _0xb274ee + _0x506d8c + _0xb7c78c;
          _0x3bb460.push(_0xf4f3f6);
        });
      });
    }
    _0x107a47.forEach(_0x4ce66d => {
      Array.from(HttpsPort).forEach(_0x18b3df => {
        const _0x5d517f = _0x44437e.split(".")[0x0] + "-" + _0x4ce66d + "-HTTPS-" + _0x18b3df;
        const _0x513e96 = atob("dmxlc3M=") + "://" + _0x102f53 + atob("QA==") + _0x4ce66d + ":" + _0x18b3df + _0xb66cbc + _0x5d517f;
        _0x3bb460.push(_0x513e96);
      });
    });
    _0x13940b.forEach(_0x187a37 => {
      const [_0x59cea1, _0x3bba4a = "443"] = _0x187a37.split(":");
      const _0x10f68a = _0x44437e.split(".")[0x0] + "-" + _0x59cea1 + "-HTTPS-" + _0x3bba4a;
      const _0xbcc241 = atob("dmxlc3M=") + "://" + _0x102f53 + atob("QA==") + _0x59cea1 + ":" + _0x3bba4a + _0xb66cbc + _0x10f68a + "-" + atob("RUR0dW5uZWw=");
      _0x3bb460.push(_0xbcc241);
    });
    return _0x3bb460;
  });
  return btoa(_0x52b3d2.join("\n"));
}
function handleProxyConfig(_0x5565a2) {
  if (_0x5565a2) {
    const _0x1b44ab = _0x5565a2.split(",").map(_0x252339 => _0x252339.trim());
    const _0x6d1584 = selectRandomAddress(_0x1b44ab);
    const [_0x150358, _0x3dc7bf = "443"] = _0x6d1584.split(":");
    const _0xe284ef = {
      ip: _0x150358,
      port: _0x3dc7bf
    };
    return _0xe284ef;
  } else {
    const _0x2dbe95 = proxyIP.includes(":") ? proxyIP.split(":")[0x1] : "443";
    const _0x285f29 = proxyIP.split(":")[0x0];
    const _0x5962e9 = {
      ip: _0x285f29,
      port: _0x2dbe95
    };
    return _0x5962e9;
  }
}
function selectRandomAddress(_0x39424a) {
  const _0x249113 = typeof _0x39424a === "string" ? _0x39424a.split(",").map(_0x46367e => _0x46367e.trim()) : _0x39424a;
  return _0x249113[Math.floor(Math.random() * _0x249113.length)];
}
