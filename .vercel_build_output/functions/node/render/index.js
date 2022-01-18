var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    import_node_fs = __toModule(require("fs"));
    import_node_path = __toModule(require("path"));
    import_node_worker_threads = __toModule(require("worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("http"));
    import_node_https = __toModule(require("https"));
    import_node_zlib = __toModule(require("zlib"));
    import_node_stream = __toModule(require("stream"));
    import_node_util = __toModule(require("util"));
    import_node_url = __toModule(require("url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers2(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request2(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers2(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch2(new Request2(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
function __fetch_polyfill() {
  Object.defineProperties(globalThis, {
    fetch: {
      enumerable: true,
      value: fetch2
    },
    Response: {
      enumerable: true,
      value: Response2
    },
    Request: {
      enumerable: true,
      value: Request2
    },
    Headers: {
      enumerable: true,
      value: Headers2
    }
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _parts, _type, _size, _a, _Blob, Blob, Blob$1, _lastModified, _name, _a2, _File, File, t, i, h, r, m, f2, e, x, _d, _a3, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers2, redirectStatus, isRedirect, INTERNALS$1, Response2, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request2, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    import_node_http2 = __toModule(require("http"));
    import_node_https2 = __toModule(require("https"));
    import_node_zlib2 = __toModule(require("zlib"));
    import_node_stream2 = __toModule(require("stream"));
    import_node_util2 = __toModule(require("util"));
    import_node_url2 = __toModule(require("url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a4) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry14 = this._queue.shift();
              this._queueTotalSize -= entry14.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry14.buffer, entry14.byteOffset, entry14.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init, context) {
          assertDictionary(init, context);
          const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
          const size = init === null || init === void 0 ? void 0 : init.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a4) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a4;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a4 = stream._writableStreamController._abortController) === null || _a4 === void 0 ? void 0 : _a4.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a4) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options, context) {
          assertDictionary(options, context);
          const mode = options === null || options === void 0 ? void 0 : options.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options, context) {
          assertDictionary(options, context);
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options, context) {
          assertDictionary(options, context);
          const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
          const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
          const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
          const signal = options === null || options === void 0 ? void 0 : options.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable, "readable", "ReadableWritablePair");
          assertReadableStream(readable, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options = convertReaderOptions(rawOptions, "First parameter");
            if (options.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options;
            try {
              options = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init, context) {
          assertDictionary(init, context);
          const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options) {
            assertRequiredArgument(options, 1, "CountQueuingStrategy");
            options = convertQueuingStrategyInit(options, "First parameter");
            this._countQueuingStrategyHighWaterMark = options.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable._state === "errored") {
              throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob2 } = require("buffer");
      if (Blob2 && !Blob2.prototype.stream) {
        Blob2.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = (_a = class {
      constructor(blobParts = [], options = {}) {
        __privateAdd(this, _parts, []);
        __privateAdd(this, _type, "");
        __privateAdd(this, _size, 0);
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof _a) {
            part = element;
          } else {
            part = encoder.encode(element);
          }
          __privateSet(this, _size, __privateGet(this, _size) + (ArrayBuffer.isView(part) ? part.byteLength : part.size));
          __privateGet(this, _parts).push(part);
        }
        const type = options.type === void 0 ? "" : String(options.type);
        __privateSet(this, _type, /^[\x20-\x7E]*$/.test(type) ? type : "");
      }
      get size() {
        return __privateGet(this, _size);
      }
      get type() {
        return __privateGet(this, _type);
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(__privateGet(this, _parts), false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(__privateGet(this, _parts), false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(__privateGet(this, _parts), true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = __privateGet(this, _parts);
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new _a([], { type: String(type).toLowerCase() });
        __privateSet(blob, _size, span);
        __privateSet(blob, _parts, blobParts);
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    }, _parts = new WeakMap(), _type = new WeakMap(), _size = new WeakMap(), _a);
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob = _Blob;
    Blob$1 = Blob;
    _File = (_a2 = class extends Blob$1 {
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        __privateAdd(this, _lastModified, 0);
        __privateAdd(this, _name, "");
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          __privateSet(this, _lastModified, lastModified);
        }
        __privateSet(this, _name, String(fileName));
      }
      get name() {
        return __privateGet(this, _name);
      }
      get lastModified() {
        return __privateGet(this, _lastModified);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    }, _lastModified = new WeakMap(), _name = new WeakMap(), _a2);
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = (_a3 = class {
      constructor(...a) {
        __privateAdd(this, _d, []);
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        __privateGet(this, _d).push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        __privateSet(this, _d, __privateGet(this, _d).filter(([b]) => b !== a));
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = __privateGet(this, _d), l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        __privateGet(this, _d).forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return __privateGet(this, _d).some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        __privateGet(this, _d).forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        __privateSet(this, _d, b);
      }
      *entries() {
        yield* __privateGet(this, _d);
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    }, _d = new WeakMap(), _a3);
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers2 = class extends URLSearchParams {
      constructor(init) {
        let result = [];
        if (init instanceof Headers2) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null)
          ;
        else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers2.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response2 = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers2(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response2(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response2(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response2(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response2.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request2 = class extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers2(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request2.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers2(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// .svelte-kit/output/server/chunks/index-27c4ae06.js
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function custom_event(type, detail, bubbles = false) {
  const e2 = document.createEvent("CustomEvent");
  e2.initCustomEvent(type, bubbles, false, detail);
  return e2;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items2, fn) {
  let str = "";
  for (let i2 = 0; i2 < items2.length; i2 += 1) {
    str += fn(items2[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css21) => css21.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true && boolean_attributes.has(name) ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var current_component, boolean_attributes, escaped, missing_component, on_destroy;
var init_index_27c4ae06 = __esm({
  ".svelte-kit/output/server/chunks/index-27c4ae06.js"() {
    Promise.resolve();
    boolean_attributes = new Set([
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]);
    escaped = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/entries/pages/__layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => _layout
});
var _layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/__layout.svelte.js"() {
    init_index_27c4ae06();
    _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${$$result.head += `<script src="${"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"}" data-svelte="svelte-13udy0f"><\/script><script src="${"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"}" data-svelte="svelte-13udy0f"><\/script><script src="${"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollToPlugin.min.js"}" data-svelte="svelte-13udy0f"><\/script>`, ""}

<div class="${"overflow-x-hidden"}">${slots.default ? slots.default({}) : ``}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  css: () => css2,
  entry: () => entry,
  js: () => js,
  module: () => layout_svelte_exports
});
var entry, js, css2;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_layout_svelte();
    entry = "pages/__layout.svelte-621ee154.js";
    js = ["pages/__layout.svelte-621ee154.js", "chunks/vendor-cece5832.js"];
    css2 = ["assets/pages/__layout.svelte-9456d031.css", "assets/vendor-c402c846.css"];
  }
});

// .svelte-kit/output/server/entries/pages/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/error.svelte.js"() {
    init_index_27c4ae06();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  css: () => css3,
  entry: () => entry2,
  js: () => js2,
  module: () => error_svelte_exports
});
var entry2, js2, css3;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_error_svelte();
    entry2 = "error.svelte-3916ed5c.js";
    js2 = ["error.svelte-3916ed5c.js", "chunks/vendor-cece5832.js"];
    css3 = ["assets/vendor-c402c846.css"];
  }
});

// .svelte-kit/output/server/chunks/Nav-0e3ea68b.js
function writable2(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var getStores, page, subscriber_queue2, white, showFilter, topActive, botActive, lvl1All, lvl2All, lvl3All, lvl1, lvl2, lvl3, listForTicker, css$2, Burger, Bot, BotActive, TopActive, css$1, Top, MobileLinks, css4, Nav;
var init_Nav_0e3ea68b = __esm({
  ".svelte-kit/output/server/chunks/Nav-0e3ea68b.js"() {
    init_index_27c4ae06();
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        page: {
          subscribe: stores.page.subscribe
        },
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        get preloading() {
          console.error("stores.preloading is deprecated; use stores.navigating instead");
          return {
            subscribe: stores.navigating.subscribe
          };
        },
        session: stores.session
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    subscriber_queue2 = [];
    white = writable2(false);
    showFilter = writable2(true);
    topActive = writable2(false);
    botActive = writable2(false);
    lvl1All = writable2(false);
    lvl2All = writable2(false);
    lvl3All = writable2(false);
    lvl1 = writable2([]);
    lvl2 = writable2([]);
    lvl3 = writable2([]);
    listForTicker = [
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists |",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists",
      "costumes designers |",
      "fashion stylists"
    ];
    css$2 = {
      code: ".white.svelte-2mjdmk{@apply bg-white;;@apply text-white;}",
      map: null
    };
    Burger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { toggled = false } = $$props;
      let { white: white2 } = $$props;
      if ($$props.toggled === void 0 && $$bindings.toggled && toggled !== void 0)
        $$bindings.toggled(toggled);
      if ($$props.white === void 0 && $$bindings.white && white2 !== void 0)
        $$bindings.white(white2);
      $$result.css.add(css$2);
      return `<div class="${"cursor-pointer"}">${toggled ? `<div class="${"m-3"}"><div class="${"w-7 text-center text-sm text-black"}">X</div></div>` : `<div class="${"pt-0.5"}"><div class="${"space-y-1.5 m-3"}"><div class="${["w-7 h-0.5 bg-black svelte-2mjdmk", white2 ? "white" : ""].join(" ").trim()}"></div>
				<div class="${["w-7 h-0.5 bg-black svelte-2mjdmk", white2 ? "white" : ""].join(" ").trim()}"></div>
				<div class="${["w-7 h-0.5 bg-black svelte-2mjdmk", white2 ? "white" : ""].join(" ").trim()}"></div></div></div>`}
</div>`;
    });
    Bot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { white: white2 } = $$props;
      if ($$props.white === void 0 && $$bindings.white && white2 !== void 0)
        $$bindings.white(white2);
      $$unsubscribe_page();
      return `${$page.url.pathname != "/" ? `<div class="${"flex transition duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10"}">\u041A\u043E\u043C\u0430\u043D\u0434\u0430
	</div>` : ``}
<span${add_attribute("class", white2 ? "flex transition border-l border-white duration-200 hover:shadow-white pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10" : "flex transition border-l border-black duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10", 0)}>\u041A\u043B\u0438\u0435\u043D\u0442\u044B</span>
<span${add_attribute("class", white2 ? "flex transition border-l border-white duration-200 hover:shadow-white pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10" : "flex transition border-l border-black duration-200 hover:shadow-border pl-5 cursor-pointer w-1/2 font-medium py-2 items-center pr-10", 0)}>\u041D\u0430\u0433\u0440\u0430\u0434\u044B
</span>`;
    });
    BotActive = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      createEventDispatcher();
      let images = [
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png",
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png",
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png",
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png"
      ];
      let rewards = [
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png"
      ];
      return `<div class="${"hidden lg:inline"}"><div class="${"w-full lg:flex justify-between"}"><a href="${"/team"}" class="${"hidden xl:flex flex-none font-medium w-4/12 xl:w-3/12 items-end"}"><h1 class="${"pl-5 w-full border-black border-t py-2 bg-white"}">\u041A\u043E\u043C\u0430\u043D\u0434\u0430</h1></a>
		<main class="${"grid grid-cols-2 w-full font-medium divide-x divide-black bg-white"}"><div class="${"px-5 2xl:px-7 pt-10 pb-20 text-sm border-black border-t border-l"}"><p class="${"font-bold"}">\u0410\u0440\u0442\u0438\u0441\u0442\u044B \u0438 \u0441\u0435\u043B\u0435\u0431\u0440\u0438\u0442\u0438</p>
				<p class="${"font-normal mt-5 2xl:whitespace-pre-line"}">Sati Kazanova, ZVENTA SVENTANA, VOLEN SENTIR, \u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440 \u0412\u0441\u0435\u0433\u043E, \u0433\u0440\u0443\u043F\u043F\u0430 Frukt\u044B, Krassna, Dr.
					Krivorotov, \u0410\u043D\u043D\u0430 \u0425\u0438\u043B\u044C\u043A\u0435\u0432\u0438\u0447, Sunsay, \u0415\u043B\u043A\u0430, Burito, Velvet Music, ALAMPA, \u041B\u044F\u0439\u0441\u0430\u043D \u0423\u0442\u044F\u0448\u0435\u0432\u0430,
					\u041F\u043E\u043B\u0438\u043D\u0430 \u041C\u0430\u043A\u0441\u0438\u043C\u043E\u0432\u0430, \u0415\u0433\u043E\u0440 \u041A\u043E\u0440\u0435\u0448\u043A\u043E\u0432, \u0416\u0435\u043D\u044F \u0411\u043E\u0440\u0437\u044B\u0445, C\u0411\u041F\u0427, TINAVIE, \u0422\u0438\u043C\u0443\u0440 \u0421\u043E\u043B\u043E\u0432\u044C\u0435\u0432, \u041D\u044E\u0448\u0430,
					Nonative, Rayda, Indablack, \u0412\u0430\u0440\u043D\u0430\u0432\u0430, Manizha
				</p>
				<p class="${"font-bold mt-5"}">\u041C\u0435\u0434\u0438\u0430 \u0438 \u0436\u0443\u0440\u043D\u0430\u043B\u044B</p>
				<p class="${"mt-5 font-normal 2xl:whitespace-pre-line"}">\u0420\u0411\u041A, GLAMOUR, Wonderzine, HIPO , SNC, Marie\u0421laire
				</p>
				<p class="${"font-bold mt-5"}">\u0411\u0440\u0435\u043D\u0434\u044B \u0438 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438</p>
				<div class="${"mt-5 grid grid-cols-6"}">${each(images, (img, index) => `<img class="${"w-16 object-cover"}"${add_attribute("src", img, 0)} alt="${""}">`)}</div></div>
			<div class="${"px-5 2xl:px-7 pt-10 pb-20 text-sm border-black border-t border-l"}"><p class="${"font-bold"}">\u041D\u0430\u0433\u0440\u0430\u0434\u044B</p>
				<div class="${"mt-5 grid grid-cols-5 gap-3"}">${each(rewards, (img, index) => `<img class="${"w-full object-cover"}"${add_attribute("src", img, 0)} alt="${""}">`)}</div></div>
			<div class="${"flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-t border-l border-black cursor-pointer"}"><span>\u041A\u043B\u0438\u0435\u043D\u0442\u044B</span></div>
			<div class="${"flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-t border-black cursor-pointer"}"><span>\u041D\u0430\u0433\u0440\u0430\u0434\u044B</span></div></main></div></div>`;
    });
    TopActive = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      createEventDispatcher();
      return `<main class="${"grid grid-cols-top w-full font-medium divide-x divide-black bg-white"}"><div class="${"flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-l border-b border-black cursor-pointer"}"><span>\u041E \u043D\u0430\u0441</span></div>
	<div class="${"flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-b border-black cursor-pointer"}"><span>\u0423\u0441\u043B\u0443\u0433\u0438</span></div>
	<div class="${"flex items-center pl-5 2xl:pl-7 py-2 transition duration-200 hover:shadow-border border-b border-black cursor-pointer"}"><span>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</span></div>

	<div class="${"px-5 2xl:px-7 py-10 text-sm border-black border-b"}"><p class="${"font-bold"}">GOOSEVA KOMANDA \u2014</p>
		<p class="${"font-normal 2xl:whitespace-pre-line"}">\u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0441\u0442\u0438\u043B\u0438\u0441\u0442\u043E\u0432, \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u043E\u0432 \u043F\u043E\xA0\u043A\u043E\u0441\u0442\u044E\u043C\u0443 \u0438\xA0\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442\u043E\u0432 \u043F\u043E\u0434
			\u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E\u043C \u0410\u043D\u043D\u044B \u0413\u0443\u0441\u0435\u0432\u043E\u0439.
		</p>
		<p class="${"mt-5 font-normal 2xl:whitespace-pre-line"}">\u041C\u044B\xA0\u0440\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438 \u0441\u044A\u0435\u043C\u043E\u043A, \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043D\u0443\u0436\u043D\u044B\u0439 \u043A\u043E\u043B\u043B\u0435\u043A\u0442\u0438\u0432 \u043F\u043E\u0434 \u043F\u0440\u043E\u0435\u043A\u0442 \u0438\u043B\u0438 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0430\u0435\u043C
			\u0441\xA0\u0432\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439. \u041F\u0440\u043E\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u043C \u0441\u0442\u0438\u043B\u044C \u0438\xA0\u043E\u0431\u0440\u0430\u0437\u044B, \u0441\u043E\u0437\u0434\u0430\u0435\u043C \u043A\u043E\u0441\u0442\u044E\u043C\u044B \u0434\u043B\u044F \u0433\u0435\u0440\u043E\u0435\u0432
			\u0432\xA0\u0440\u0435\u043A\u043B\u0430\u043C\u0435, \u0432\u0438\u0434\u0435\u043E \u0440\u043E\u043B\u0438\u043A\u0430\u0445, \u043C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u043F\u0430\u0445 \u0438\xA0\u043C\u043E\u0434\u043D\u044B\u0445 \u0436\u0443\u0440\u043D\u0430\u043B\u0430\u0445. \u0410\xA0\u0442\u0430\u043A\u0436\u0435
			\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433\u0430. \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B \u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B\xA0\u2014 \u044D\u0442\u043E \u0441\u0438\u043B\u044C\u043D\u044B\u0439
			\u0442\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u043E\u043B\u043B\u0435\u043A\u0442\u0438\u0432, \u0433\u0434\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u043E\u0431\u043B\u0430\u0434\u0430\u0435\u0442 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0432\u043A\u0443\u0441\u043E\u043C, \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u043E\u0439
			\u0432\xA0\u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043C\u043E\u0434\u044B \u0438\xA0\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0438, \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u044C\u044E \u0431\u044B\u0441\u0442\u0440\u043E \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\xA0\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C
			\u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F.
		</p></div>

	<div class="${"px-5 2xl:px-7 py-10 text-sm border-black border-b"}"><p class="${"font-bold"}">\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438</p>
		<p class="${"mt-3 font-bold"}">\u041A\u0440\u0435\u0430\u0442\u0438\u0432:</p>
		<p class="${"font-normal whitespace-pre-line"}">\u043F\u043E\u043B\u043D\u0430\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438 \u0441\u044A\u0435\u043C\u043A\u0438 (\u043E\u0442\xA050\xA0000) \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u0442\u0438\u043B\u044F \u0438\xA0\u043E\u0431\u0440\u0430\u0437\u043E\u0432
			(\u043E\u0442\xA030\xA0000)
		</p>
		<p class="${"mt-3 font-bold"}">\u0421\u0442\u0438\u043B\u044C:</p>
		<p class="${"font-normal whitespace-pre-line"}">\u0441\u0442\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043B\u0443\u043A\u043E\u0432 \u0434\u043B\u044F \u0444\u043E\u0442\u043E \u0438\xA0\u0432\u0438\u0434\u0435\u043E\xA0\u2014 \u0441\u044A\u0435\u043C\u043A\u0438 (\u043E\u0442\xA030\xA0000) \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F
			\u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0441\u043B\u0443\u0447\u0430\u044F (\u043E\u0442\xA025\xA0000)
		</p>
		<p class="${"mt-3 font-bold"}">\u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442 \u0441\u0442\u0438\u043B\u0438\u0441\u0442\u0430 \u043D\u0430\xA0\u0441\u044A\u0435\u043C\u043A\u0435:</p>
		<p class="${"font-normal whitespace-pre-line"}">\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442 \u0441\u0442\u0438\u043B\u0438\u0441\u0442\u0430: \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A\xA0\u0441\u044A\u0435\u043C\u043A\u0435, \u0440\u0430\u0431\u043E\u0442\u0430 \u043D\u0430\xA0\u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435, \u0440\u0430\u0437\u0432\u043E\u0437
			(\u043E\u0442\xA010\xA0000 ) \u0440\u0430\u0431\u043E\u0442\u0430 \u043A\u043E\u0441\u0442\u044E\u043C\u0435\u0440\u0430 (\u043E\u0442\xA06\xA0000 )
		</p>
		<p class="${"mt-3 font-bold"}">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043E\u0441\u0442\u044E\u043C\u043E\u0432:</p>
		<p class="${"font-normal whitespace-pre-line"}">\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043E\u0441\u0442\u044E\u043C\u0430 (\u043E\u0442\xA030000) \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0443
		</p>
		<p class="${"font-normal whitespace-pre-line mt-3"}">\u0421\u043C\u0435\u043D\u0430 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430\xA0\u2014 12\xA0\u0447\u0430\u0441\u043E\u0432. \u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0447\u0430\u0441\u044B \u0441\u0432\u0435\u0440\u0445 \u0441\u043C\u0435\u043D\u044B \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u043A
			\u043F\u0435\u0440\u0435\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0438\xA0\u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043E\u0442\xA0500\xA0\u0440\u0443\u0431.\xA0/ \u0447\u0430\u0441 (\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442),
			\u043E\u0442\xA01000\xA0\u0440\u0443\u0431.\xA0/ \u0447\u0430\u0441 (\u0441\u0442\u0438\u043B\u0438\u0441\u0442)
		</p>
		<p class="${"mt-3 font-bold"}">\u0427\u0430\u0441\u0442\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438</p>
		<p class="${"font-normal whitespace-pre-line mt-3"}">\u0420\u0430\u0437\u0431\u043E\u0440 \u0433\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u0430: \u043E\u0446\u0435\u043D\u043A\u0430 \u0438\xA0\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u0430, \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u043B\u0435\u0440\u0435\u0438 \u043E\u0431\u0440\u0430\u0437\u043E\u0432
			\u0438\xA0\u0438\u0445\xA0\u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F, \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044F \u043F\u043E\u0447\u0438\u043D\u043A\u0438 \u0438\xA0\u0445\u0438\u043C\u0447\u0438\u0441\u0442\u043A\u0438 \u0432\u0435\u0449\u0435\u0439
		</p>
		<p class="${"font-normal whitespace-pre-line mt-3"}">\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0448\u043E\u043F\u043F\u0438\u043D\u0433: \u0448\u043E\u043F\u043F\u0438\u043D\u0433 \u0441\u043E\xA0\u0441\u0442\u0438\u043B\u0438\u0441\u0442\u043E\u043C \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u043E\u043C\u0443 \u043F\u043B\u0430\u043D\u0443,
			\u0441\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u043B\u0435\u0440\u0435\u0438 \u043E\u0431\u0440\u0430\u0437\u043E\u0432, \u0432\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0431\u0440\u0430\u0437\u043E\u0432 \u0432\xA0\u0433\u0430\u0440\u0434\u0435\u0440\u043E\u0431 \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0435\u043D\u0438\u0435
		</p>
		<p class="${"mt-3 font-bold"}">\u041F\u043E\u0434\u0431\u043E\u0440\xA0/ \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043E\u0441\u0442\u044E\u043C\u043E\u0432 \u043D\u0430\xA0\u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435</p></div>
	<div class="${"px-5 2xl:px-7 py-10 text-sm border-black border-b"}"><p class="${"font-bold"}">\u0410\u043D\u043D\u0430 \u0413\u0443\u0441\u0435\u0432\u0430</p>
		<p>+79099505999</p>
		<p>gooseva.style@gmail.com</p>

		<p class="${"mt-3"}">Instagram</p>
		<p class="${"font-bold"}">@guseva_stylist</p>
		<a href="${"https://www.instagram.com/gooseva_komanda"}" class="${"font-bold"}">@gooseva_komanda</a>
		<p class="${"mt-3"}">\u0415\u0441\u043B\u0438 \u0432\u044B\xA0\u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F \u043A\xA0\u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435, \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u043E\u0441\u0442\u044F\u043C\u0438 \u0438\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E
			\u043F\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441\xA0\u043D\u0430\u043C\u0438, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\xA0goosevastyle@gmail.com
		</p></div></main>`;
    });
    css$1 = {
      code: ".white.svelte-47q93b{@apply text-white;;@apply border-white;}",
      map: null
    };
    Top = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $showFilter, $$unsubscribe_showFilter;
      $$unsubscribe_showFilter = subscribe(showFilter, (value) => $showFilter = value);
      let { white: white2 } = $$props;
      if ($$props.white === void 0 && $$bindings.white && white2 !== void 0)
        $$bindings.white(white2);
      $$result.css.add(css$1);
      $$unsubscribe_showFilter();
      return `${$showFilter ? `<span class="${"flex transition border-black bg-white border-r duration-200 hover:shadow-white pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10"}">\u041E \u043D\u0430\u0441
	</span>
	<span class="${"flex transition border-black border-r duration-200 hover:shadow-border pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10 bg-white"}">\u0423\u0441\u043B\u0443\u0433\u0438
	</span>
	<span class="${[
        "flex transition duration-200 hover:shadow-border pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10 bg-white svelte-47q93b",
        white2 ? "white" : ""
      ].join(" ").trim()}">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B
	</span>` : `<span${add_attribute("class", white2 ? "flex transition border-white border-r duration-200 hover:shadow-white pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10" : "flex transition border-black border-r duration-200 hover:shadow-border pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10", 0)}>\u041E \u043D\u0430\u0441
	</span>
	<span${add_attribute("class", white2 ? "flex transition border-white border-r duration-200 hover:shadow-white pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10" : "flex transition border-black border-r duration-200 hover:shadow-border pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10", 0)}>\u0423\u0441\u043B\u0443\u0433\u0438
	</span>
	<span class="${[
        escape(null_to_empty(white2 ? "flex transition duration-200 hover:shadow-white pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10" : "flex transition duration-200 hover:shadow-border pl-5 cursor-pointer w-1/3 font-medium py-2 items-center pr-10")) + " svelte-47q93b",
        white2 ? "white" : ""
      ].join(" ").trim()}">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B
	</span>`}`;
    });
    MobileLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let { toggled = false } = $$props;
      if ($$props.toggled === void 0 && $$bindings.toggled && toggled !== void 0)
        $$bindings.toggled(toggled);
      $$unsubscribe_page();
      return `${toggled ? `${$page.url.pathname == "/" ? `<div class="${"lg:hidden pt-10 h-screen flex flex-col divide-y divide-black justify-between border-b border-black mb-[0.2px]"}"><a href="${"/projects"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041F\u0440\u043E\u0435\u043A\u0442\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a target="${"_self"}" href="${"/team"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041A\u043E\u043C\u0430\u043D\u0434\u0430</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/services"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u0423\u0441\u043B\u0443\u0433\u0438</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/clients"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041A\u043B\u0438\u0435\u043D\u0442\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/rewards"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041D\u0430\u0433\u0440\u0430\u0434\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/about"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041E \u043D\u0430\u0441</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/contacts"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a></div>` : `<div class="${"lg:hidden pt-10 h-screen flex flex-col divide-y divide-black justify-between border-b border-black mb-[0.2px]"}"><a href="${"/projects"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041F\u0440\u043E\u0435\u043A\u0442\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a target="${"_self"}" href="${"/team"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041A\u043E\u043C\u0430\u043D\u0434\u0430</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/services"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u0423\u0441\u043B\u0443\u0433\u0438</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/clients"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041A\u043B\u0438\u0435\u043D\u0442\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/rewards"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041D\u0430\u0433\u0440\u0430\u0434\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/about"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041E \u043D\u0430\u0441</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a>
			<a href="${"/contacts"}" class="${"flex justify-between items-center px-7 text-lg flex-auto"}"><h1>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</h1>
				<p class="${"mt-1"}"><img src="${"/images/arrow.svg"}" alt="${""}"></p></a></div>`}` : ``}`;
    });
    css4 = {
      code: ".white.svelte-1w7z537{@apply text-white;;@apply border-white;;@apply divide-white;}",
      map: null
    };
    Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $showFilter, $$unsubscribe_showFilter;
      let $botActive, $$unsubscribe_botActive;
      let $topActive, $$unsubscribe_topActive;
      let $page, $$unsubscribe_page;
      $$unsubscribe_showFilter = subscribe(showFilter, (value) => $showFilter = value);
      $$unsubscribe_botActive = subscribe(botActive, (value) => $botActive = value);
      $$unsubscribe_topActive = subscribe(topActive, (value) => $topActive = value);
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let toggled = false;
      let { white: white2 = false } = $$props;
      if ($$props.white === void 0 && $$bindings.white && white2 !== void 0)
        $$bindings.white(white2);
      $$result.css.add(css4);
      $$unsubscribe_showFilter();
      $$unsubscribe_botActive();
      $$unsubscribe_topActive();
      $$unsubscribe_page();
      return `
${$page.url.pathname != "/" ? `<div${add_attribute("class", "", 0)}><div${add_attribute("class", $page.params.name ? "lg:hidden bg-transparent bg-white fixed w-full flex justify-between divide-x divide-black border-b border-black" : "lg:hidden bg-white fixed w-full flex justify-between divide-x divide-black border-b border-black", 0)}><div class="${"flex font-medium py-2 w-full px-5 items-center"}">${$page.params.name ? `<a href="${"/team"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-5 w-5 fill-current text-black"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M10 19l-7-7m0 0l7-7m-7 7h18"}"></path></svg></a>` : `${$page.params.id ? `<a href="${"/projects"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-5 w-5 fill-current text-black"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M10 19l-7-7m0 0l7-7m-7 7h18"}"></path></svg></a>` : ``}`}
				<div class="${"w-full flex items-center justify-center"}"><a href="${"/"}" class="${"sm:ml-10 font-bt uppercase text-center"}">gooseva komanda</a></div></div>
			<div class="${"px-2"}">${validate_component(Burger, "Burger").$$render($$result, { white: white2, toggled }, {}, {})}</div></div>

		${validate_component(MobileLinks, "MobileLinks").$$render($$result, { toggled }, {}, {})}</div>` : `<div${add_attribute("class", "", 0)}><div class="${[
        "lg:hidden fixed w-full flex justify-between divide-x divide-black border-b border-black svelte-1w7z537",
        white2 && !toggled ? "white" : ""
      ].join(" ").trim()}">${`<a href="${"/projects"}" target="${"_self"}" class="${"flex font-medium py-2 w-full items-center"}"><span class="${"ml-5"}">\u041F\u0440\u043E\u0435\u043A\u0442\u044B</span></a>
				<a target="${"_self"}" href="${"/team"}" class="${"flex font-medium py-2 w-full items-center"}"><span class="${"ml-5"}">\u041A\u043E\u043C\u0430\u043D\u0434\u0430</span></a>`}
			<div class="${"px-2"}">${validate_component(Burger, "Burger").$$render($$result, { white: white2, toggled }, {}, {})}</div></div>

		${validate_component(MobileLinks, "MobileLinks").$$render($$result, { toggled }, {}, {})}</div>`}


<div><div class="${"fixed w-full z-10"}">${$topActive ? `<div><div class="${"hidden lg:inline"}"><div class="${"hidden w-full lg:flex justify-between"}"><div class="${"hidden xl:flex flex-none font-medium w-2/12 xl:w-1/12 items-start"}"><h1 class="${"pl-5 2xl:pl-10 w-full border-black border-b py-2 bg-white"}">\u041F\u0440\u043E\u0435\u043A\u0442\u044B</h1></div>
						<div class="${"w-full lg:flex justify-between"}">${validate_component(TopActive, "TopActive").$$render($$result, {}, {}, {})}</div></div></div></div>` : `<div><div class="${"hidden lg:inline"}"><div class="${[
        "hidden w-full lg:flex justify-between border-b border-black svelte-1w7z537",
        white2 ? "white" : ""
      ].join(" ").trim()}">${$page.url.pathname == "/projects" ? `<div${add_attribute("class", $showFilter ? "flex justify-between items-center cursor-pointer hover:shadow-border w-2/3 xl:w-3/4 border-black border-r bg-white" : "flex justify-between items-center cursor-pointer hover:shadow-border w-2/3 xl:w-3/4 border-black border-r", 0)}><h1 class="${"ml-5 font-medium whitespace-nowrap"}">\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C</h1>
								<img${add_attribute("class", $showFilter ? "w-4 h-4 mt-1 mr-5 rotate-90 transition" : "w-4 h-4 mt-1 mr-5 rotate-180 transition", 0)} src="${"/images/arrow.svg"}" alt="${""}"></div>` : `<a href="${"/projects"}"${add_attribute("class", white2 ? "flex transition duration-200 hover:shadow-white font-medium py-2 w-full items-center border-r border-white" : "flex transition duration-200 hover:shadow-border font-medium py-2 w-full items-center border-r border-black", 0)}><h1 class="${"ml-5 2xl:ml-10"}">\u041F\u0440\u043E\u0435\u043A\u0442\u044B</h1></a>`}
						<div${add_attribute("class", $page.url.pathname == "/" ? "w-full lg:flex justify-between" : "w-1/3 xl:w-1/4 lg:flex justify-between border-r border-black", 0)}>${validate_component(Top, "Top").$$render($$result, { white: white2 }, {}, {})}</div></div></div></div>`}</div>

	<div class="${"fixed bottom-0 w-full z-50"}">${$botActive ? `<div>${validate_component(BotActive, "BotActive").$$render($$result, {}, {}, {})}</div>` : `<div class="${"hidden lg:inline w-full bottom-0"}"><div class="${[
        "hidden group w-full lg:flex justify-between border-t border-black svelte-1w7z537",
        white2 ? "white" : ""
      ].join(" ").trim()}">${$page.url.pathname == "/" ? `<div${add_attribute("class", white2 ? "flex transition duration-200 hover:shadow-white font-medium py-2 w-full items-center" : "flex transition duration-200 hover:shadow-border font-medium py-2 w-full items-center", 0)}><a href="${"/team"}" class="${"ml-5 w-full"}">\u041A\u043E\u043C\u0430\u043D\u0434\u0430</a></div>` : `<div class="${"flex transition duration-200 hover:shadow-border font-medium py-2 w-2/3 xl:w-3/4 items-center border-r border-black"}"><a href="${"/"}" class="${"ml-5 2xl:ml-10 font-bt uppercase w-full"}">gooseva komanda</a></div>`}
					<div${add_attribute("class", $page.url.pathname == "/" ? "w-full lg:flex justify-between " : "w-1/3 xl:w-1/4 lg:flex justify-between", 0)}>${validate_component(Bot, "Bot").$$render($$result, { white: white2 }, {}, {})}</div></div></div>`}</div>
</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/Image-fe0afddd.js
var css5, Image;
var init_Image_fe0afddd = __esm({
  ".svelte-kit/output/server/chunks/Image-fe0afddd.js"() {
    init_index_27c4ae06();
    css5 = {
      code: "img.svelte-1vi6dxg{opacity:0;transition:opacity 500ms ease-out}img.loaded.svelte-1vi6dxg{opacity:1}",
      map: null
    };
    Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { src } = $$props;
      let { srcMobile = src } = $$props;
      let { alt = "" } = $$props;
      let { classes = "" } = $$props;
      let { loading = "lazy" } = $$props;
      let thisImage;
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.srcMobile === void 0 && $$bindings.srcMobile && srcMobile !== void 0)
        $$bindings.srcMobile(srcMobile);
      if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
        $$bindings.alt(alt);
      if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
        $$bindings.classes(classes);
      if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
        $$bindings.loading(loading);
      $$result.css.add(css5);
      return `

${`<img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)}${add_attribute("loading", loading, 0)} class="${[escape(null_to_empty(classes)) + " svelte-1vi6dxg", ""].join(" ").trim()}"${add_attribute("this", thisImage, 0)}>`}`;
    });
  }
});

// .svelte-kit/output/server/entries/pages/index.svelte.js
var index_svelte_exports = {};
__export(index_svelte_exports, {
  default: () => Routes
});
var css6, Ticker, Routes;
var init_index_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/index.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    init_Image_fe0afddd();
    css6 = {
      code: "@-webkit-keyframes svelte-1ps3fbu-ticker{0%{-webkit-transform:translate3d(-20%, 0, 0);transform:translate3d(-20%, 0, 0);visibility:visible}100%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}}@keyframes svelte-1ps3fbu-ticker{0%{-webkit-transform:translate3d(-20%, 0, 0);transform:translate3d(-20%, 0, 0);visibility:visible}100%{-webkit-transform:translate3d(-100%, 0, 0);transform:translate3d(-100%, 0, 0)}}.ticker-wrap.svelte-1ps3fbu.svelte-1ps3fbu{width:100%;overflow:hidden;padding-left:100%;box-sizing:content-box}.ticker-wrap.svelte-1ps3fbu .ticker.svelte-1ps3fbu{display:inline-block;white-space:nowrap;padding-right:100%;box-sizing:content-box;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-name:svelte-1ps3fbu-ticker;animation-name:svelte-1ps3fbu-ticker;-webkit-animation-duration:var(--duration-mobile);animation-duration:var(--duration-mobile)}@media(min-width: 640px){.ticker-wrap.svelte-1ps3fbu .ticker.svelte-1ps3fbu{display:inline-block;white-space:nowrap;padding-right:100%;box-sizing:content-box;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-name:svelte-1ps3fbu-ticker;animation-name:svelte-1ps3fbu-ticker;-webkit-animation-duration:var(--duration);animation-duration:var(--duration)}}",
      map: null
    };
    Ticker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { items: items2 } = $$props;
      let { duration = "10s" } = $$props;
      let { durationMobile = "20s" } = $$props;
      let { classWrapper = "absolute" } = $$props;
      let { classParent = "space-x-6" } = $$props;
      let { classChild = "inline-block" } = $$props;
      if ($$props.items === void 0 && $$bindings.items && items2 !== void 0)
        $$bindings.items(items2);
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.durationMobile === void 0 && $$bindings.durationMobile && durationMobile !== void 0)
        $$bindings.durationMobile(durationMobile);
      if ($$props.classWrapper === void 0 && $$bindings.classWrapper && classWrapper !== void 0)
        $$bindings.classWrapper(classWrapper);
      if ($$props.classParent === void 0 && $$bindings.classParent && classParent !== void 0)
        $$bindings.classParent(classParent);
      if ($$props.classChild === void 0 && $$bindings.classChild && classChild !== void 0)
        $$bindings.classChild(classChild);
      $$result.css.add(css6);
      return `<div class="${"ticker-wrap " + escape(classWrapper) + " svelte-1ps3fbu"}"><div class="${"ticker " + escape(classParent) + " svelte-1ps3fbu"}" style="${"--duration: " + escape(duration) + "; --duration-mobile: " + escape(durationMobile)}">${each(items2, (i2, index) => `<div class="${escape(null_to_empty(classChild)) + " svelte-1ps3fbu"}">${escape(i2)}</div>`)}</div>
</div>`;
    });
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $topActive, $$unsubscribe_topActive;
      let $botActive, $$unsubscribe_botActive;
      $$unsubscribe_topActive = subscribe(topActive, (value) => $topActive = value);
      $$unsubscribe_botActive = subscribe(botActive, (value) => $botActive = value);
      let white2 = true;
      $$unsubscribe_topActive();
      $$unsubscribe_botActive();
      return `<div class="${"h-screen flex flex-col justify-between"}">${validate_component(Ticker, "Ticker").$$render($$result, {
        items: listForTicker,
        classWrapper: "fixed flex h-screen items-center z-10 lg:bottom-12 lg:h-auto",
        classParent: "space-x-1.5 font-bt",
        classChild: "inline-block text-white",
        durationMobile: "160s",
        duration: "140s"
      }, {}, {})}
	<div class="${"z-40"}">${validate_component(Nav, "Nav").$$render($$result, { white: white2 }, {}, {})}
		${`<div class="${"pb-5 px-2 pt-20 lg:py-16 z-10"}"><img class="${"w-full"}" src="${"/images/logo/goos_white.svg"}" alt="${""}"></div>`}</div>
	${`<div class="${"pb-5 px-2 lg:py-16 mb-2 z-10"}"><img class="${"w-full"}" src="${"/images/logo/kom_white.svg"}" alt="${""}"></div>`}

	<div class="${"lg:hidden absolute w-full h-full"}"><div class="${"img1 w-full object-cover h-screen absolute top-0 opacity-1"}">${validate_component(Image, "Image").$$render($$result, {
        srcMobile: "/images/index/1Mobile.jpg",
        src: "/images/index/1.jpg",
        alt: "main image",
        classes: "w-full object-cover h-screen absolute top-0"
      }, {}, {})}</div>
		<div class="${"img2 absolute w-full h-screen flex items-center justify-end overflow-hidden opacity-0"}"><div class="${"flex flex-col md:flex-row overflow-hidden"}">${validate_component(Image, "Image").$$render($$result, {
        src: "/images/index/2.1.jpg",
        classes: "ml-28 mt-20 md:m-0 object-cover"
      }, {}, {})}
				${validate_component(Image, "Image").$$render($$result, {
        classes: "object-cover",
        src: "/images/index/2.2.jpg"
      }, {}, {})}</div></div>
		<div class="${"img4 absolute w-full h-screen flex items-center justify-center opacity-0"}"><img src="${"/images/index/4.jpg"}" alt="${""}"></div>
		<img src="${"/images/index/3.jpg"}" alt="${""}" class="${"img3 w-full object-cover h-screen absolute top-0 opacity-0"}"></div>
	<div class="${"hidden lg:grid grid-cols-3 absolute w-full h-full"}">${`<div class="${"img1 w-full object-cover h-screen absolute top-0 opacity-1"}">${validate_component(Image, "Image").$$render($$result, {
        srcMobile: "/images/index/1Mobile.jpg",
        src: "/images/index/1.jpg",
        alt: "main image",
        classes: "w-full object-cover h-screen absolute top-0"
      }, {}, {})}</div>`}</div></div>

<div${add_attribute("class", $topActive || $botActive ? "hidden" : "hidden lg:grid grid-cols-2 absolute w-full h-5/6 z-40 top-10", 0)}><div></div>
	<div></div>
	<div></div>
	<div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  css: () => css7,
  entry: () => entry3,
  js: () => js3,
  module: () => index_svelte_exports
});
var entry3, js3, css7;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_index_svelte();
    entry3 = "pages/index.svelte-114ca0c4.js";
    js3 = ["pages/index.svelte-114ca0c4.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js"];
    css7 = ["assets/pages/index.svelte-e8112f40.css", "assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/contacts.svelte.js
var contacts_svelte_exports = {};
__export(contacts_svelte_exports, {
  default: () => Contacts
});
var Contacts;
var init_contacts_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/contacts.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    Contacts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_white;
      $$unsubscribe_white = subscribe(white, (value) => value);
      $$unsubscribe_white();
      return `

${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"my-10 pt-10 mx-5 text-sm"}"><p class="${"font-bold"}">\u0410\u043D\u043D\u0430 \u0413\u0443\u0441\u0435\u0432\u0430</p>
	<p>+79099505999</p>
	<p>gooseva.style@gmail.com</p>

	<p class="${"mt-3"}">Instagram</p>
	<p class="${"font-bold"}">@guseva_stylist</p>
	<p class="${"font-bold"}">@gooseva_komanda</p>
	<p class="${"mt-3"}">\u0415\u0441\u043B\u0438 \u0432\u044B\xA0\u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C\u0441\u044F \u043A\xA0\u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u0435, \u043F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043D\u043E\u0432\u043E\u0441\u0442\u044F\u043C\u0438 \u0438\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E
		\u043F\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441\xA0\u043D\u0430\u043C\u0438, \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\xA0goosevastyle@gmail.com
	</p></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  css: () => css8,
  entry: () => entry4,
  js: () => js4,
  module: () => contacts_svelte_exports
});
var entry4, js4, css8;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_contacts_svelte();
    entry4 = "pages/contacts.svelte-b24afdc4.js";
    js4 = ["pages/contacts.svelte-b24afdc4.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js"];
    css8 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/chunks/data-7f0af13e.js
var items;
var init_data_7f0af13e = __esm({
  ".svelte-kit/output/server/chunks/data-7f0af13e.js"() {
    items = {
      projects: [
        {
          title: "WHAT BOTHER ME",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          order: 0,
          mainImg: "/images/projects/BOTHER/1.jpg",
          video: "_9mf8Qhcank",
          style: "40px 20px 100px 0"
        },
        {
          title: "BAIKAL",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/BAIKAL1/5.jpg",
          images: ["/images/projects/BAIKAL1/1.jpg", "/images/projects/BAIKAL1/2.jpg", "/images/projects/BAIKAL1/3.jpg", "/images/projects/BAIKAL1/4.jpg", "/images/projects/BAIKAL1/5.jpg"],
          style: "10px 200px 10px 100px"
        },
        {
          title: "SPIN4SPIN",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/SPIN4SPIN/  -03.jpg",
          images: [
            "/images/projects/SPIN4SPIN/  -01.jpg",
            "/images/projects/SPIN4SPIN/  -03.jpg",
            "/images/projects/SPIN4SPIN/  -02.jpg",
            "/images/projects/SPIN4SPIN/  -06.jpg",
            "/images/projects/SPIN4SPIN/  -12.jpg",
            "/images/projects/SPIN4SPIN/  -07.jpg",
            "/images/projects/SPIN4SPIN/  -11.jpg",
            "/images/projects/SPIN4SPIN/  -05.jpg",
            "/images/projects/SPIN4SPIN/  -04.jpg",
            "/images/projects/SPIN4SPIN/  -10.jpg",
            "/images/projects/SPIN4SPIN/  -09.jpg",
            "/images/projects/SPIN4SPIN/  -08.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "AVIAPARK",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/AVIAPARK/1.jpg",
          images: [],
          video: "https://www.youtube.com/watch?v=CkL_ahnFXxI&feature=emb_logo",
          style: "170px 100px 50px 10px"
        },
        {
          title: "CHIKI",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/Chiki/1.jpeg",
          images: ["/images/projects/Chiki/1.jpeg"],
          style: "20px 70px 130px 60px"
        },
        {
          title: "PHD",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 70031.jpg",
          images: [
            "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 50007.jpg",
            "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 80033.jpg",
            "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 70033.jpg",
            "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 70031.jpg",
            "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 50026.jpg",
            "/images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 80013.jpg"
          ],
          style: "100px 10px 20px 10px"
        },
        {
          title: "1xBET",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/1XBET/1.jpg",
          video: "Q_Xqmbva_U0",
          style: "30px 250px 200px 15px"
        },
        {
          title: "Avon sale zone 19",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69409.jpg",
          images: [
            "/images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69943.jpg",
            "/images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69409.jpg",
            "/images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_70937_3.jpg",
            "/images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69694_2.jpg"
          ],
          style: "0 250px 0 0"
        },
        {
          title: "MANO",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 012_d_web.jpg",
          images: [
            "/images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 010_d_web.jpg",
            "/images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 016_d_web.jpg",
            "/images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 002_d_web.jpg",
            "/images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 013_d_web.jpg",
            "/images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 012_d_web.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "A101",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/A101/1.jpg",
          video: "hlxQMLfyGmQ",
          style: "30px 20px 170px 100px"
        },
        {
          title: "BELKA CAR",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/BELKA CAR2/\u041A\u043E\u043F\u0438\u044F 50218023_10156205866328790_8914228640305119232_o.jpg",
          images: [
            "/images/projects/BELKA CAR2/\u041A\u043E\u043F\u0438\u044F 50324133_10156205866463790_5012258050254307328_o.jpg",
            "/images/projects/BELKA CAR2/\u041A\u043E\u043F\u0438\u044F 50218023_10156205866328790_8914228640305119232_o.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "Zventa Sventana",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043A\u043E\u0441\u0442\u044E\u043C\u043E\u0432"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/ZVETANASVENTANA/1.jpg",
          style: "100px 0 100px 50px",
          video: "gAzNUY9yKv8"
        },
        {
          title: "STACY",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/STACY/1.jpg",
          video: "epJYlAYVO6M",
          style: "20px 10px 150px 10px"
        },
        {
          title: "BAIKAL",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/BAIKAL/1.jpg",
          classes: "p-2",
          video: "L6XPlM6ACNA",
          style: "100px 40px 80px 20px"
        },
        {
          title: "ADRENALINE RUSH",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/ADRENALINE/1.jpg",
          video: "xMCWP6V3X2c",
          style: "20px 20px 250px 250px"
        },
        {
          title: "DELOBANK",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/DELOBANK/1.jpg",
          video: "Zpu37bReork",
          style: "200px 20px 20px 20px"
        },
        {
          title: "SEBASTIAN + SYSTEM 2019",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/SEBASTIAM+SYSTEM 2019/4.jpg",
          images: [
            "/images/projects/SEBASTIAM+SYSTEM 2019/4.jpg",
            "/images/projects/SEBASTIAM+SYSTEM 2019/2.jpg",
            "/images/projects/SEBASTIAM+SYSTEM 2019/3.jpg",
            "/images/projects/SEBASTIAM+SYSTEM 2019/1.jpg"
          ]
        },
        {
          title: "Who I am",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/WHO I AM/WHOIAM 002.JPG",
          images: [
            "/images/projects/WHO I AM/WHOIAM 016.JPG",
            "/images/projects/WHO I AM/WHOIAM 002.JPG",
            "/images/projects/WHO I AM/WHOIAM 029.JPG",
            "/images/projects/WHO I AM/WHOIAM 007.JPG",
            "/images/projects/WHO I AM/WHOIAM 021.JPG",
            "/images/projects/WHO I AM/WHOIAM 020.JPG",
            "/images/projects/WHO I AM/WHOIAM 008.JPG",
            "/images/projects/WHO I AM/WHOIAM 019.JPG",
            "/images/projects/WHO I AM/WHOIAM 033.JPG",
            "/images/projects/WHO I AM/WHOIAM 032.JPG"
          ],
          style: "40px 240px 90px 20px"
        },
        {
          title: "\u0414\u0418\u0420\u0415\u041A\u0422\u041E\u0420 \u0412\u0421\u0415\u0413\u041E \u201C\u0417\u0430\u043D\u044F\u0442\u043E\u0439 \u0433\u0440\u0430\u0436\u0434\u0430\u043D\u0438\u043D\u201D",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/DIRECTOR/1.jpg",
          video: "7X18S0R-jBE",
          style: "20px 20px 300px 200px"
        },
        {
          title: "PERFUME FOR PROJECT 314",
          tagNames: [],
          tags: [],
          mainImg: "/images/projects/PERFUME FOR PROJECT 314/2.jpg",
          images: [
            "/images/projects/PERFUME FOR PROJECT 314/4.jpg",
            "/images/projects/PERFUME FOR PROJECT 314/2.jpg",
            "/images/projects/PERFUME FOR PROJECT 314/3.jpg",
            "/images/projects/PERFUME FOR PROJECT 314/1.jpg"
          ],
          style: "250px 50px 100px 300px"
        },
        {
          title: "TRAPEZE OF MALEVICH x CNS MAGAZINE",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/TRAPEZE OF MALEVICH/10.jpg",
          images: [
            "/images/projects/TRAPEZE OF MALEVICH/8.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/9.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/10.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/4.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/5.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/7.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/6.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/2.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/3.jpg",
            "/images/projects/TRAPEZE OF MALEVICH/1.jpg"
          ],
          style: "200px 20px 20px 20px"
        },
        {
          title: "DR.KRIVOROTOV MONAMI",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/MONAMI/1.jpg",
          video: "9Wptoc-ejf0",
          style: "40px 40px 300px 0"
        },
        {
          title: "WHAT ABOUT US",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 004.jpg",
          images: [
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 009.jpg",
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 008.jpg",
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 001.jpg",
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 002.jpg",
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 005.jpg",
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 004.jpg",
            "/images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 010.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "MEGA",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/MEGA/1.jpg",
          video: "BmOnHc4_sHQ",
          style: "250px 250px 50px 0"
        },
        {
          title: "DR KRIVOROTOV COVER SHOOT",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9354.jpg",
          images: [
            "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F BD4A9775.jpg",
            "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9354.jpg",
            "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9552.jpg",
            "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9915.jpg",
            "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9861.jpg",
            "/images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9954.jpg"
          ]
        },
        {
          title: "SBERBANK",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/SBERBANK/1.jpg",
          video: "0TQAb6feqaU",
          style: "300px 200px 50px 20px"
        },
        {
          title: "FAK BY FAK by Emi America",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F AA007.jpg",
          images: [
            "/images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F fakbyfak3682.jpg",
            "/images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F 000091220034.jpg",
            "/images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F AA007.jpg",
            "/images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F fakbyfak3700.jpg",
            "/images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F fakbyfak3660.jpg"
          ],
          style: "20px 0 200px 150px"
        },
        {
          title: "EVOLUTION 2.0 / HUF MAGAZINE",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00500.jpg",
          images: [
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09635.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00010-\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09745.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00048.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00500.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00228-\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E-\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00326.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00375_2 copy.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09506.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00153_1.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09865 copy.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09940.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09968.jpg",
            "/images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00186.jpg"
          ]
        },
        {
          title: "KRASSNA - \u0411\u041E\u0416\u0415",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/KRASSNA/1.jpg",
          video: "4Vo3kB6glAg",
          style: "300px 250px 100px 100px"
        },
        {
          title: "AVON 19 NY kids",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_II_0801.jpg",
          images: [
            "/images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_II_0801.jpg",
            "/images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_I_00711.jpg",
            "/images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F EmptyName 34.jpg",
            "/images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_II_1521.jpg"
          ],
          style: "150px 0 70px 50px"
        },
        {
          title: "LENTA",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/LENTA/1.jpg",
          video: "WWsp8LsYWIk",
          style: "0 0 300px 150px"
        },
        {
          title: '\u0414\u0418\u0420\u0415\u041A\u0422\u041E\u0420 \u0412\u0421\u0415\u0413\u041E "MBA" #',
          tagNames: ["\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0418\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/MBA/1.jpg",
          images: [],
          classes: "p-2",
          video: "ToqpXrivOOY",
          style: "150px 10px 150px 200px"
        },
        {
          title: "LA CHAMBRE VERTE X CONTRIBUTOR MAGAZINE",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 021.jpg",
          images: [
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 039.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 002.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 016.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 001.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 029.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 018.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 022.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 021.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 035.jpg",
            "/images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 041.jpg"
          ]
        },
        {
          title: "MELLER",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/MELLER/1.jpg",
          video: "3GYMgZnxW0s",
          style: "200px 30px 200px 270px"
        },
        {
          title: "\u0426\u0414\u041C",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/CDM/1.jpg",
          localVideo: "/images/projects/CDM/1.mp4",
          style: "200px 0 10px 50px"
        },
        {
          title: "Megafon \u0415\u041B\u041A\u0410",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/MEGAELKA/1.jpg",
          localVideo: "/images/projects/MEGAELKA/1.mp4",
          style: "200px 0 200px 100px"
        },
        {
          title: "AUSHAN",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/AUSHAN/1.jpg",
          video: "ZAN-1BmxcS4",
          style: "300px 50px 50px 100px"
        },
        {
          title: "Alpen Gold",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/ALPEN GOLD/1.jpg",
          localVideo: "/images/projects/ALPEN GOLD/1.mp4",
          style: "100px 10px 100px 0"
        },
        {
          title: "MEGAFON",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/MEGAFON/1.jpg",
          video: "d3-eeTvDiyE",
          style: "120px 0 300px 250px"
        },
        {
          title: "TTSWTR for Pushkinsiy Museum",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F FSM_-001.jpg",
          images: [
            "/images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-001.jpg",
            "/images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-015.jpg",
            "/images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-013.jpg",
            "/images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-005.jpg",
            "/images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F FSM_-001.jpg"
          ],
          style: "300px 30px 0 300px"
        },
        {
          title: "DOKUCHAEVA",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_10555 copy.jpg",
          images: [
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11839 copy.jpg",
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11724 copy.jpg",
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11012 copy.jpg",
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11360 copy.jpg",
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11145 copy.jpg",
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11411 copy.jpg",
            "/images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_10555 copy.jpg"
          ],
          style: "0 350px 250px 0"
        },
        {
          title: "AUROUS",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/AUROUS/1.jpg",
          video: "5ZoFvmUIa9g",
          style: "150px 90px 150px 0"
        },
        {
          title: "\u0410\u043D\u0442\u043E\u043D \u041A\u0440\u0438\u0432\u043E\u0440\u043E\u0442\u043E\u0432 \u0434\u043B\u044F \u043E\u0431\u043B\u043E\u0436\u0435\u043A \u0445\u043E\u043B\u043E\u0441\u0442\u044F\u043A\u0430",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F d4394489085388a02b800188bfeb6026.jpg",
          images: [
            "/images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F ok-zhurnal-8-02.jpg",
            "/images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F d4394489085388a02b800188bfeb6026.jpg",
            "/images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F 72e447bc9980f966eabc570ba2438d62.jpg"
          ]
        },
        {
          title: "\u0420\u0411\u041A \u0421\u041F\u0415\u0426\u041F\u0420\u041E\u0415\u041A\u0422",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/RBK/\u041A\u043E\u043F\u0438\u044F main-img-1.jpg",
          images: [
            "/images/projects/RBK/\u041A\u043E\u043F\u0438\u044F review-sisoev.jpg",
            "/images/projects/RBK/\u041A\u043E\u043F\u0438\u044F main-img-2.jpg",
            "/images/projects/RBK/\u041A\u043E\u043F\u0438\u044F main-img-1.jpg",
            "/images/projects/RBK/\u041A\u043E\u043F\u0438\u044F review-marko.jpg",
            "/images/projects/RBK/\u041A\u043E\u043F\u0438\u044F review-marko-2.jpg"
          ]
        },
        {
          title: "BELKA CAR",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/BELKA CAR/1.jpg",
          video: "HahhZihpU9U",
          style: "200px 50px 0 10px"
        },
        {
          title: "DR.KRIVOROTOV  WEEKEND",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/WEEKEND/1.jpg",
          video: "Dso2sn660GA",
          style: "100px 60px 200px 0"
        },
        {
          title: "KUNST MAGAZINE",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0402_done_1.jpg",
          images: [
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1399_done.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1072_done.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1564_done.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1713_done.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0850_done.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0567_done_1.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0568_done1_1.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1341_1_done.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0402_done_1.jpg",
            "/images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0730_done.jpg"
          ],
          style: "150px 200px 0 50px"
        },
        {
          title: "GLAMOUR & GLUKOZA",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/GLAMOUR AND GLUKOZA/1.jpg",
          classes: "p-2",
          video: "t2TJB8i7vhk",
          style: "200px 100px 60px 0"
        },
        {
          title: "HUF AND HUF",
          tagNames: [],
          tags: [],
          mainImg: "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0150-1.jpg",
          images: [
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183763-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183948-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183970-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0045-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183856-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0150-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0089-1.jpg",
            "/images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183708-1.jpg"
          ],
          style: "100px 100px 100px 100px"
        },
        {
          title: "SCHIAP / VGXW MAG",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_7090.jpg",
          images: [
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6825.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_7090.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6402.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6412.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6981.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6185.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6620.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6751.jpg",
            "/images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6888.jpg"
          ]
        },
        {
          title: "HUSKY LOOKBOOK 2",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2344 1.jpg",
          images: [
            "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog1540.jpg",
            "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2344 1.jpg",
            "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2670 1.jpg",
            "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2595.jpg",
            "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2621.jpg",
            "/images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2655.jpg"
          ],
          style: "0 200px 0 0"
        },
        {
          title: "BONELESS VLADIMIR VARNAVA / HIPO PLATFORM",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11402.jpg",
          images: [
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11337.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11457.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11655.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11546.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11397.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11237.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11603.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11402.jpg",
            "/images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11738.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "VK Donuts",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/VK DONUTS/1.jpg",
          localVideo: "/images/projects/VK DONUTS/1.mp4",
          style: "100px 0 200px 100px"
        },
        {
          title: "CITY MOBILE",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/CITY MOBILE/1.jpg",
          video: "hAwFGQcL7Wo",
          style: "50px 90px 200px 0"
        },
        {
          title: "MTS Samsung Galaxy - \u0425\u0438\u043B\u044C\u043A\u0435\u0432\u0438\u0447",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/MTS SAMSUNG/1.jpg",
          video: "lgjKoxhoJcw",
          style: "220px 0 100px 0"
        },
        {
          title: "YOU DRIVE",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/YOU DRIVE/1.jpg",
          video: "isQIIt0pA0c",
          style: "5px 20px 200px 0"
        },
        {
          title: "SPRING  RYAZAN'",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F DSC02505.jpg",
          images: [
            "/images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F DSC02505.jpg",
            "/images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F 0053.jpg",
            "/images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F DSC02625.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "UTOPIA 1985",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/UTOPIA/4.jpg",
          images: [
            "/images/projects/UTOPIA/4.jpg",
            "/images/projects/UTOPIA/5.jpg",
            "/images/projects/UTOPIA/2.jpg",
            "/images/projects/UTOPIA/3.jpg",
            "/images/projects/UTOPIA/1.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "AVON NEW YEAR",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "/images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6163.JPG",
          images: [
            "/images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6163.JPG",
            "/images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6164.JPG",
            "/images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6165.JPG",
            "/images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6166.JPG",
            "/images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6219.JPG"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "GERTRUDE / KALTBLUT MAG",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5805.JPG",
          images: [
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5805.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5804.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5806.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5807.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5803.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5802.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5800.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5801.JPG",
            "/images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F 8.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "",
          tagNames: [],
          tags: [],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: ""
        },
        {
          title: "DAVAI BROSAT",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://www.youtube.com/watch?v=xb6fL2BrX9o&feature=emb_logo"
        },
        {
          title: "\u0410\u0444\u0438\u0448\u0430 \u0441\u0435\u0440\u0438\u0430\u043B\u0430 \u0413\u0420\u0410\u041D\u0414",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/GRAND/1.jpg",
          images: ["/images/projects/GRAND/1.jpg"],
          classes: "p-2",
          video: ""
        },
        {
          title: "Samsung \u0421\u0432\u044F\u0437\u043D\u043E\u0439",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://drive.google.com/file/d/1jw4WZZ0WYol5EmI56RSE1_EwN2OMfBL6/view?usp=sharing"
        },
        {
          title: "SAMOLET",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0434\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://www.youtube.com/watch?v=es9atp1aTzY"
        },
        {
          title: "THE PROVEN POINT / SOLSTICE MAGAZINE",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01264 copy.jpg",
          images: [
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01264 copy.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01438 copy.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01170.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00864.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00959 copy.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00970 copy.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01545 copy.jpg",
            "/images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00932 copy.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "WELLA, SEBASTIAN, SYSTEM 2020",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u0444\u0435\u0448\u043D", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u0424\u0435\u0448\u043D", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0798.jpg",
          images: [
            "/images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0798.jpg",
            "/images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0648.jpg",
            "/images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0525.jpg",
            "/images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0626.jpg",
            "/images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0592.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "Alone. One with World or Lone? x Contributor Magazine",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 5.jpg",
          images: [
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 5.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 4.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 6.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 24.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 25.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 27.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 10.jpg",
            "/images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 12.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "POKERDOM",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://www.youtube.com/watch?v=oRPspvmBL-8"
        },
        {
          title: "BLINDING x KULTBLUT MAGAZINE",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043A\u043E\u0441\u0442\u044E\u043C\u0430"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435\u043A\u043E\u0441\u0442\u044E\u043C\u0430"],
          mainImg: "/images/projects/BLINDING AND KULTBLUT/ 8.jpg",
          images: [
            "/images/projects/BLINDING AND KULTBLUT/ 8.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 9.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 7.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 6.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 4.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 5.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 1.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 2.jpg",
            "/images/projects/BLINDING AND KULTBLUT/ 3.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "",
          tagNames: [],
          tags: [],
          mainImg: "/images/projects/MANIQU.RU/2.JPG",
          images: ["/images/projects/MANIQU.RU/2.JPG", "/images/projects/MANIQU.RU/1.JPG"],
          classes: "p-2",
          video: ""
        },
        {
          title: "YANDEX MONEY",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://www.youtube.com/watch?v=9HUm8ZchML0"
        },
        {
          title: "\u042F\u043D\u0434\u0435\u043A\u0441 \u041C\u0430\u0440\u043A\u0435\u0442",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://drive.google.com/file/d/1aRMCZbPsbr6UOCFdygMcEFKbAoJ8nycy/view?usp=sharing"
        },
        {
          title: "GOGEN",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"],
          mainImg: "/images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 06.jpg",
          images: [
            "/images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 06.jpg",
            "/images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 07.jpg",
            "/images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 03.jpg",
            "/images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 02.jpg"
          ],
          classes: "p-2",
          video: ""
        },
        {
          title: "\u0415\u0433\u043E\u0440 \u041A\u0440\u0438\u0434 - \u0425\u043E\u043B\u043E\u0441\u0442\u044F\u043A",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u0440\u0435\u043A\u043B\u0430\u043C\u0430", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://www.youtube.com/watch?v=pui1uSE63Wo&t=4s"
        },
        {
          title: "VOLEN SENTIR (Arrival)",
          tagNames: ["#\u0432\u0438\u0434\u0435\u043E", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0412\u0438\u0434\u0435\u043E", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "",
          images: [],
          classes: "p-2",
          video: "https://drive.google.com/drive/u/3/folders/1ZJprtTXYG-xUORBZQ6Jg4USrkgLtAVR4"
        },
        {
          title: "\u0420\u0435\u0436\u0438\u0441\u0441\u0435\u0440\u044B \u041C\u0435\u0440\u043A\u0443\u043B\u043E\u0432\u044B \u0434\u043B\u044F \u201C\u0410\u0424\u0418\u0428\u0418\u201D",
          tagNames: ["#\u0444\u043E\u0442\u043E", "#\u044D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "#\u0436\u0435\u043D\u0441\u043A\u0438\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433", "#\u043C\u0443\u0436\u0441\u043A\u043E\u0439\u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433"],
          tags: ["\u0424\u043E\u0442\u043E", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"],
          mainImg: "/images/projects/DIRECTORS MERKULOVY/\u041A\u043E\u043F\u0438\u044F 0018.jpg",
          images: [
            "/images/projects/DIRECTORS MERKULOVY/\u041A\u043E\u043F\u0438\u044F 0018.jpg",
            "/images/projects/DIRECTORS MERKULOVY/\u041A\u043E\u043F\u0438\u044F 0022.jpg"
          ],
          classes: "p-2",
          video: ""
        }
      ]
    };
  }
});

// .svelte-kit/output/server/entries/pages/projects/index.svelte.js
var index_svelte_exports2 = {};
__export(index_svelte_exports2, {
  default: () => Projects
});
var css9, Filter, Projects;
var init_index_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/projects/index.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    init_data_7f0af13e();
    init_Image_fe0afddd();
    css9 = {
      code: "@media(min-width: 1024px){input[type='checkbox'].svelte-c5jn4q{display:none}}",
      map: null
    };
    Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $lvl3, $$unsubscribe_lvl3;
      let $lvl3All, $$unsubscribe_lvl3All;
      let $lvl2, $$unsubscribe_lvl2;
      let $lvl2All, $$unsubscribe_lvl2All;
      let $lvl1, $$unsubscribe_lvl1;
      let $lvl1All, $$unsubscribe_lvl1All;
      $$unsubscribe_lvl3 = subscribe(lvl3, (value) => $lvl3 = value);
      $$unsubscribe_lvl3All = subscribe(lvl3All, (value) => $lvl3All = value);
      $$unsubscribe_lvl2 = subscribe(lvl2, (value) => $lvl2 = value);
      $$unsubscribe_lvl2All = subscribe(lvl2All, (value) => $lvl2All = value);
      $$unsubscribe_lvl1 = subscribe(lvl1, (value) => $lvl1 = value);
      $$unsubscribe_lvl1All = subscribe(lvl1All, (value) => $lvl1All = value);
      let lvl1Options = ["\u0424\u043E\u0442\u043E", "\u0412\u0438\u0434\u0435\u043E"];
      let lvl2Options = ["\u0424\u0435\u0448\u043D", "\u0420\u0435\u043A\u043B\u0430\u043C\u0430", "\u042D\u0434\u0438\u0442\u043E\u0440\u0438\u0430\u043B"];
      let lvl3Options = ["\u0416\u0435\u043D\u0441\u043A\u0438\u0439", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439", "\u0414\u0435\u0442\u0441\u043A\u0438\u0439", "\u0411\u044C\u044E\u0442\u0438", "\u041F\u0440\u043E\u0434\u0443\u043A\u0442", "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043E\u0441\u0442\u044E\u043C\u0430"];
      $$result.css.add(css9);
      {
        {
          if ($lvl1All)
            set_store_value(lvl1, $lvl1 = [], $lvl1);
          if ($lvl2All)
            set_store_value(lvl2, $lvl2 = [], $lvl2);
          if ($lvl3All)
            set_store_value(lvl3, $lvl3 = [], $lvl3);
        }
      }
      $$unsubscribe_lvl3();
      $$unsubscribe_lvl3All();
      $$unsubscribe_lvl2();
      $$unsubscribe_lvl2All();
      $$unsubscribe_lvl1();
      $$unsubscribe_lvl1All();
      return `
<div class="${"hidden bg-white border-b border-black py-7 px-5 w-full lg:flex"}"><div class="${"flex space-x-20"}"><div class="${"flex"}"><h1 class="${"font-medium"}">\u041F\u0440\u043E\u0435\u043A\u0442</h1>
			<div><div class="${"space-y-3 justify-center"}">${each(lvl1Options, (option) => `<label${add_attribute("for", option, 0)} class="${"whitespace-nowrap space-x-5 cursor-pointer"}"><input${add_attribute("id", option, 0)} class="${"text-black border-2 border-black w-5 h-5 focus:ring-0 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("value", option, 0)}${~$lvl1.indexOf(option) ? add_attribute("checked", true, 1) : ""}>
							<div class="${"flex items-center space-x-3 mt-0.5"}"><img${add_attribute("class", $lvl1.includes(option) ? "transition opacity-100" : "transition opacity-0", 0)} src="${"/images/arrow.svg"}" alt="${""}">
								<span${add_attribute("class", $lvl1.includes(option) ? "font-extralight -ml-2 underline transition" : "font-extralight -ml-2 transition", 0)}>${escape(option)}</span></div>
						</label>`)}</div></div></div>

		<div class="${"flex"}"><h1 class="${"font-medium"}">\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435</h1>
			<div><div class="${"space-y-3 justify-center"}">${each(lvl2Options, (option) => `<label${add_attribute("for", option, 0)} class="${"whitespace-nowrap space-x-5 cursor-pointer"}"><input${add_attribute("id", option, 0)} class="${"text-black border-2 border-black w-5 h-5 focus:ring-0 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("value", option, 0)}${~$lvl2.indexOf(option) ? add_attribute("checked", true, 1) : ""}>
							<div class="${"flex flex-wrap items-center space-x-3 mt-0.5"}"><img${add_attribute("class", $lvl2.includes(option) ? "transition opacity-100" : "transition opacity-0", 0)} src="${"/images/arrow.svg"}" alt="${""}">
								<span${add_attribute("class", $lvl2.includes(option) ? "font-extralight -ml-2 underline transition" : "font-extralight -ml-2 transition", 0)}>${escape(option)}</span></div>
						</label>`)}</div></div></div>

		<div class="${"flex"}"><h1 class="${"font-medium"}">\u0421\u0442\u0430\u0439\u043B\u0438\u043D\u0433</h1>
			<div><div class="${"grid grid-cols-2 justify-center"}">${each(lvl3Options, (option) => `<label${add_attribute("for", option, 0)} class="${"whitespace-nowrap space-x-5 cursor-pointer"}"><input${add_attribute("id", option, 0)} class="${"text-black border-2 border-black w-5 h-5 focus:ring-0 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("value", option, 0)}${~$lvl3.indexOf(option) ? add_attribute("checked", true, 1) : ""}>
							<div class="${"flex space-x-3 mt-0.5"}"><img${add_attribute("class", $lvl3.includes(option) ? "transition opacity-100" : "transition opacity-0", 0)} src="${"/images/arrow.svg"}" alt="${""}">
								<span${add_attribute("class", $lvl3.includes(option) ? "font-extralight -ml-2 underline transition" : "font-extralight -ml-2 transition", 0)}>${escape(option)}</span></div>
						</label>`)}</div></div></div></div></div>


<div class="${"bg-white lg:hidden"}"><div class="${"px-7 py-5 grid grid-cols-4 border-b border-black"}"><h1 class="${"col-span-2"}">\u041F\u0440\u043E\u0435\u043A\u0442</h1>
		<div class="${"col-span-1 flex flex-col space-y-2"}">${each(lvl1Options, (option) => `<label class="${"whitespace-nowrap space-x-1"}"><input class="${"text-black border-2 border-black w-4 h-4 focus:ring-0 mb-1 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("value", option, 0)}${~$lvl1.indexOf(option) ? add_attribute("checked", true, 1) : ""}>
					<span class="${"-ml-2"}">${escape(option)}</span>
				</label>`)}</div>
		<label class="${"col-span-1 justify-self-end space-x-1"}"><input class="${"text-black border-2 border-black w-4 h-4 focus:ring-0 mb-1 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("checked", $lvl1All, 1)}>
			<span class="${"-ml-2"}">\u0412\u0441\u0435</span></label></div>

	<div class="${"p-7 grid grid-cols-4 border-b border-black"}"><h1 class="${"col-span-2"}">\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435</h1>
		<div class="${"col-span-1 flex flex-col space-y-2"}">${each(lvl2Options, (option) => `<label class="${"whitespace-nowrap space-x-1"}"><input class="${"text-black border-2 border-black w-4 h-4 focus:ring-0 mb-1 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("value", option, 0)}${~$lvl2.indexOf(option) ? add_attribute("checked", true, 1) : ""}>
					<span class="${"-ml-2"}">${escape(option)}</span>
				</label>`)}</div>
		<label class="${"col-span-1 justify-self-end space-x-1"}"><input class="${"text-black border-2 border-black w-4 h-4 focus:ring-0 mb-1 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("checked", $lvl2All, 1)}>
			<span class="${"-ml-2"}">\u0412\u0441\u0435</span></label></div>

	<div class="${"p-7 grid grid-cols-4 border-b border-black"}"><h1 class="${"col-span-2"}">\u0421\u0442\u0430\u0439\u043B\u0438\u043D\u0433</h1>
		<div class="${"col-span-1 flex flex-col space-y-2"}">${each(lvl3Options, (option) => `<label class="${"whitespace-nowrap space-x-1"}"><input class="${"text-black border-2 border-black w-4 h-4 focus:ring-0 mb-1 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("value", option, 0)}${~$lvl3.indexOf(option) ? add_attribute("checked", true, 1) : ""}>
					<span class="${"-ml-2"}">${escape(option)}</span>
				</label>`)}</div>
		<label class="${"col-span-1 justify-self-end space-x-1"}"><input class="${"text-black border-2 border-black w-4 h-4 focus:ring-0 mb-1 svelte-c5jn4q"}" type="${"checkbox"}"${add_attribute("checked", $lvl3All, 1)}>
			<span class="${"-ml-2"}">\u0412\u0441\u0435</span></label></div>
</div>`;
    });
    Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $showFilter, $$unsubscribe_showFilter;
      let $lvl1, $$unsubscribe_lvl1;
      let $lvl2, $$unsubscribe_lvl2;
      let $lvl3, $$unsubscribe_lvl3;
      $$unsubscribe_showFilter = subscribe(showFilter, (value) => $showFilter = value);
      $$unsubscribe_lvl1 = subscribe(lvl1, (value) => $lvl1 = value);
      $$unsubscribe_lvl2 = subscribe(lvl2, (value) => $lvl2 = value);
      $$unsubscribe_lvl3 = subscribe(lvl3, (value) => $lvl3 = value);
      const capitalize = (s3) => s3 && s3[0].toUpperCase() + s3.slice(1);
      $$unsubscribe_showFilter();
      $$unsubscribe_lvl1();
      $$unsubscribe_lvl2();
      $$unsubscribe_lvl3();
      return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div><div class="${"flex mt-10 fixed w-full bg-white lg:hidden justify-between items-center px-7 py-5 border-b border-t border-black text-sm flex-auto"}"><h1>\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C</h1>
		<p class="${"mt-1"}"><img${add_attribute("class", $showFilter ? "rotate-180 transition" : "transition", 0)} src="${"/images/arrow.svg"}" alt="${"arrow"}"></p></div>
	${$showFilter ? `<div class="${"fixed w-full mt-[102px] lg:mt-0 border-black lg:border-t z-10"}">${validate_component(Filter, "Filter").$$render($$result, {}, {}, {})}</div>` : ``}
	<div class="${"pt-[102px] lg:pt-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:my-10"}">${each(items.projects, (i2, index) => `${(i2.tags.some((e2) => $lvl1.includes(capitalize(e2))) || !$lvl1.length) && (i2.tags.some((e2) => $lvl2.includes(capitalize(e2))) || !$lvl2.length) && (i2.tags.some((e2) => $lvl3.includes(capitalize(e2))) || !$lvl3.length) ? `<div class="${"border-b border-r border-black"}"><div class="${"border-2 border-black border-opacity-0 hover:border-opacity-100 transition duration-200"}"><a class="${"transition duration-200"}"${add_attribute("href", `projects/${index}`, 0)}><div id="${"img" + escape(index)}" class="${"img-anim h-96 xl:h-[34rem] " + escape(i2.classes)}" style="${"padding: " + escape(i2.style)}">${validate_component(Image, "Image").$$render($$result, {
        src: i2.mainImg,
        classes: `w-full h-full object-cover ${i2.classes}`
      }, {}, {})}</div>
								<div class="${"text-center lg:hidden"}">${escape(i2.title)}</div>
							</a></div>
					</div>` : ``}`)}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  css: () => css10,
  entry: () => entry5,
  js: () => js5,
  module: () => index_svelte_exports2
});
var entry5, js5, css10;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_index_svelte2();
    entry5 = "pages/projects/index.svelte-25f90961.js";
    js5 = ["pages/projects/index.svelte-25f90961.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js", "chunks/data-7f0af13e.js"];
    css10 = ["assets/pages/projects/index.svelte-fc570857.css", "assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/projects/_id_.svelte.js
var id_svelte_exports = {};
__export(id_svelte_exports, {
  default: () => U5Bidu5D
});
function format2(seconds) {
  if (isNaN(seconds))
    return "...";
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  if (seconds < 10)
    seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}
var css11, Player, Youtube, U5Bidu5D;
var init_id_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/projects/_id_.svelte.js"() {
    init_index_27c4ae06();
    init_data_7f0af13e();
    init_Nav_0e3ea68b();
    init_Image_fe0afddd();
    css11 = {
      code: "div.svelte-3ry5q6{position:relative}.controls.svelte-3ry5q6{position:absolute;top:0;width:100%;transition:opacity 1s}.info.svelte-3ry5q6{display:flex;width:100%;justify-content:space-between}span.svelte-3ry5q6{padding:0.2em 0.5em;color:white;text-shadow:0 0 8px black;font-size:1.4em;opacity:0.7}.time.svelte-3ry5q6{width:3em}.time.svelte-3ry5q6:last-child{text-align:right }progress.svelte-3ry5q6{display:block;width:100%;height:10px;-webkit-appearance:none;appearance:none}progress.svelte-3ry5q6::-webkit-progress-bar{background-color:rgba(0,0,0,0.2)}progress.svelte-3ry5q6::-webkit-progress-value{background-color:rgba(255,255,255,0.6)}video.svelte-3ry5q6{width:100%}",
      map: null
    };
    Player = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { src = "" } = $$props;
      let { poster = "" } = $$props;
      let time = 0;
      let duration;
      let paused = true;
      if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
      if ($$props.poster === void 0 && $$bindings.poster && poster !== void 0)
        $$bindings.poster(poster);
      $$result.css.add(css11);
      return `<div class="${"svelte-3ry5q6"}"><video class="${"aspect-video svelte-3ry5q6"}"${add_attribute("poster", poster, 0)}${add_attribute("src", src, 0)}${add_attribute("currentTime", time, 0)}${add_attribute("paused", paused, 0)}><track kind="${"captions"}"></video>

	<div class="${"controls svelte-3ry5q6"}" style="${"opacity: " + escape(0)}"><progress${add_attribute("value", 0, 0)} class="${"svelte-3ry5q6"}"></progress>

		<div class="${"info svelte-3ry5q6"}"><span class="${"time svelte-3ry5q6"}">${escape(format2(time))}</span>
			<span class="${"svelte-3ry5q6"}">click anywhere to ${escape("play")} / drag to seek</span>
			<span class="${"time svelte-3ry5q6"}">${escape(format2(duration))}</span></div></div>
</div>`;
    });
    Youtube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { id = "" } = $$props;
      if ($$props.id === void 0 && $$bindings.id && id !== void 0)
        $$bindings.id(id);
      return `<iframe src="${"https://www.youtube.com/embed/" + escape(id)}" class="${"w-full aspect-video"}" title="${"youtube video"}" frameborder="${"0"}"></iframe>`;
    });
    U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let id = $page.params.id;
      $$unsubscribe_page();
      return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"lg:grid grid-cols-4"}"><div class="${"mt-10 lg:my-10 p-5 lg:mx-0 col-span-1 lg:flex flex-col justify-between lg:border-r border-black"}"><div class="${"lg:mt-5 2xl:px-5 hidden lg:flex justify-between"}"><a href="${"/projects/" + escape(parseInt(id) == 0 ? items.projects.length - 1 : parseInt(id) - 1)}" rel="${"external"}"><div class="${"flex space-x-3 items-center cursor-pointer"}"><img class="${"w-5 h-5"}" src="${"/images/arrow-left.svg"}" alt="${""}">
					<p class="${"font-light"}">\u041D\u0430\u0437\u0430\u0434</p></div></a>
			<a href="${"/projects/" + escape(parseInt(id) + 1 >= items.projects.length ? "0" : parseInt(id) + 1)}" rel="${"external"}"><img class="${"w-5 h-5 cursor-pointer"}" src="${"/images/arrow.svg"}" alt="${""}"></a></div>
		<div class="${"space-y-1 2xl:px-5"}"><h1 class="${"font-bt font-thin text-2xl"}">${escape(items.projects[id].title)}</h1>
			<div class="${"flex font-light flex-wrap"}">${each(items.projects[id].tagNames, (tag, index) => `<span class="${"mr-1"}">${escape(tag)}</span>`)}</div></div></div>

	${items.projects[id].video ? `<div class="${"px-5 pb-20 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex"}"><div class="${"w-full self-end"}">${validate_component(Youtube, "Youtube").$$render($$result, { id: items.projects[id].video }, {}, {})}</div></div>` : `${items.projects[id].localVideo ? `<div class="${"px-5 pb-20 xl:px-20 2xl:px-32 col-span-3 lg:h-screen flex"}"><div class="${"w-full self-end"}">${validate_component(Player, "Player").$$render($$result, { src: items.projects[id].localVideo }, {}, {})}</div></div>` : `<div class="${"px-5 pb-5 lg:py-10 space-y-5 col-span-3 lg:overflow-scroll lg:h-screen lg:max-w-screen-lg lg:mx-auto w-full"}">${each(items.projects[id].images, (i2, index) => `<div class="${""}">${validate_component(Image, "Image").$$render($$result, { src: i2, classes: "mx-auto" }, {}, {})}
				</div>`)}</div>`}`}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  css: () => css12,
  entry: () => entry6,
  js: () => js6,
  module: () => id_svelte_exports
});
var entry6, js6, css12;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_id_svelte();
    entry6 = "pages/projects/_id_.svelte-3e0a1372.js";
    js6 = ["pages/projects/_id_.svelte-3e0a1372.js", "chunks/vendor-cece5832.js", "chunks/data-7f0af13e.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js", "chunks/Player-f7a65fdc.js"];
    css12 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css", "assets/Player-97ad1893.css"];
  }
});

// .svelte-kit/output/server/entries/pages/services.svelte.js
var services_svelte_exports = {};
__export(services_svelte_exports, {
  default: () => Services
});
var Services;
var init_services_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/services.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    Services = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_white;
      $$unsubscribe_white = subscribe(white, (value) => value);
      $$unsubscribe_white();
      return `

${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"my-10 pt-10 mx-5 text-sm"}"><p class="${"font-bold"}">\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438</p>
	<p class="${"mt-3"}">\u041A\u0440\u0435\u0430\u0442\u0438\u0432:</p>
	<p class="${"font-normal whitespace-pre-line"}">\u043F\u043E\u043B\u043D\u0430\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438 \u0441\u044A\u0435\u043C\u043A\u0438 (\u043E\u0442\xA050\xA0000) 
		\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441\u0442\u0438\u043B\u044F \u0438\xA0\u043E\u0431\u0440\u0430\u0437\u043E\u0432 (\u043E\u0442\xA030\xA0000)
	</p>
	<p class="${"mt-3"}">\u0421\u0442\u0438\u043B\u044C:</p>
	<p class="${"font-normal whitespace-pre-line"}">\u0441\u0442\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043B\u0443\u043A\u043E\u0432 \u0434\u043B\u044F \u0444\u043E\u0442\u043E \u0438\xA0\u0432\u0438\u0434\u0435\u043E\xA0\u2014 \u0441\u044A\u0435\u043C\u043A\u0438 (\u043E\u0442\xA030\xA0000) \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F \u0438\u043B\u0438
		\u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0441\u043B\u0443\u0447\u0430\u044F (\u043E\u0442\xA025\xA0000)
	</p>
	<p class="${"mt-3"}">\u0410\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442 \u0441\u0442\u0438\u043B\u0438\u0441\u0442\u0430 \u043D\u0430\xA0\u0441\u044A\u0435\u043C\u043A\u0435:</p>
	<p class="${"font-normal whitespace-pre-line"}">\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442 \u0441\u0442\u0438\u043B\u0438\u0441\u0442\u0430: \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u043A\xA0\u0441\u044A\u0435\u043C\u043A\u0435, \u0440\u0430\u0431\u043E\u0442\u0430 \u043D\u0430\xA0\u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0435, \u0440\u0430\u0437\u0432\u043E\u0437
		(\u043E\u0442\xA010\xA0000 ) \u0440\u0430\u0431\u043E\u0442\u0430 \u043A\u043E\u0441\u0442\u044E\u043C\u0435\u0440\u0430 (\u043E\u0442\xA06\xA0000 )
	</p>
	<p class="${"mt-3"}">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043E\u0441\u0442\u044E\u043C\u043E\u0432:</p>
	<p class="${"font-normal whitespace-pre-line"}">\u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043E\u0441\u0442\u044E\u043C\u0430 (\u043E\u0442\xA030\xA0000) \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u043F\u043E\u0434 \u0437\u0430\u0434\u0430\u0447\u0443
	</p>
	<p class="${"font-normal whitespace-pre-line mt-3"}">\u0421\u043C\u0435\u043D\u0430 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u0430\xA0\u2014 12\xA0\u0447\u0430\u0441\u043E\u0432. \u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u0447\u0430\u0441\u044B \u0441\u0432\u0435\u0440\u0445 \u0441\u043C\u0435\u043D\u044B \u0441\u0447\u0438\u0442\u0430\u044E\u0442\u0441\u044F \u043A\u0430\u043A \u043F\u0435\u0440\u0435\u0440\u0430\u0431\u043E\u0442\u043A\u0438
		\u0438\xA0\u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043E\u0442\xA0500\xA0\u0440\u0443\u0431.\xA0/ \u0447\u0430\u0441 (\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442), \u043E\u0442\xA01000\xA0\u0440\u0443\u0431.\xA0/
		\u0447\u0430\u0441 (\u0441\u0442\u0438\u043B\u0438\u0441\u0442)
	</p>
	<p class="${"mt-3 font-bold"}">\u0427\u0430\u0441\u0442\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438</p>
	<p class="${"font-normal whitespace-pre-line mt-3"}">\u0420\u0430\u0437\u0431\u043E\u0440 \u0433\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u0430: \u043E\u0446\u0435\u043D\u043A\u0430 \u0438\xA0\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u0430\u0440\u0434\u0435\u0440\u043E\u0431\u0430, \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u043B\u0435\u0440\u0435\u0438 \u043E\u0431\u0440\u0430\u0437\u043E\u0432
		\u0438\xA0\u0438\u0445\xA0\u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044F, \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0446\u0438\u044F \u043F\u043E\u0447\u0438\u043D\u043A\u0438 \u0438\xA0\u0445\u0438\u043C\u0447\u0438\u0441\u0442\u043A\u0438 \u0432\u0435\u0449\u0435\u0439
	</p>
	<p class="${"font-normal whitespace-pre-line mt-3"}">\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u0448\u043E\u043F\u043F\u0438\u043D\u0433: \u0448\u043E\u043F\u043F\u0438\u043D\u0433 \u0441\u043E\xA0\u0441\u0442\u0438\u043B\u0438\u0441\u0442\u043E\u043C \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u0438\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u043E\u043C\u0443 \u043F\u043B\u0430\u043D\u0443,
		\u0441\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u043B\u0435\u0440\u0435\u0438 \u043E\u0431\u0440\u0430\u0437\u043E\u0432, \u0432\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0431\u0440\u0430\u0437\u043E\u0432 \u0432\xA0\u0433\u0430\u0440\u0434\u0435\u0440\u043E\u0431 \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u043E\u043F\u0440\u043E\u0432\u043E\u0436\u0434\u0435\u043D\u0438\u0435
	</p>
	<p class="${"mt-3 font-bold"}">\u041F\u043E\u0434\u0431\u043E\u0440\xA0/ \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043A\u043E\u0441\u0442\u044E\u043C\u043E\u0432 \u043D\u0430\xA0\u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435</p></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  css: () => css13,
  entry: () => entry7,
  js: () => js7,
  module: () => services_svelte_exports
});
var entry7, js7, css13;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_services_svelte();
    entry7 = "pages/services.svelte-e39605f5.js";
    js7 = ["pages/services.svelte-e39605f5.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js"];
    css13 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/clients.svelte.js
var clients_svelte_exports = {};
__export(clients_svelte_exports, {
  default: () => Clients
});
var Clients;
var init_clients_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/clients.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    Clients = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_white;
      $$unsubscribe_white = subscribe(white, (value) => value);
      let images = [
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png",
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png",
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png",
        "/images/companies/cian.png",
        "/images/companies/lg.png",
        "/images/companies/mega.png",
        "/images/companies/samsung.png"
      ];
      $$unsubscribe_white();
      return `

${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"my-10 pt-10 mx-5 text-sm"}"><p class="${"font-bold"}">\u0410\u0440\u0442\u0438\u0441\u0442\u044B \u0438 \u0441\u0435\u043B\u0435\u0431\u0440\u0438\u0442\u0438</p>
	<p class="${"font-normal mt-5 2xl:whitespace-pre-line"}">Sati Kazanova, ZVENTA SVENTANA, VOLEN SENTIR, \u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440 \u0412\u0441\u0435\u0433\u043E, \u0433\u0440\u0443\u043F\u043F\u0430 Frukt\u044B, Krassna, Dr.
		Krivorotov, \u0410\u043D\u043D\u0430 \u0425\u0438\u043B\u044C\u043A\u0435\u0432\u0438\u0447, Sunsay, \u0415\u043B\u043A\u0430, Burito, Velvet Music, ALAMPA, \u041B\u044F\u0439\u0441\u0430\u043D \u0423\u0442\u044F\u0448\u0435\u0432\u0430, \u041F\u043E\u043B\u0438\u043D\u0430
		\u041C\u0430\u043A\u0441\u0438\u043C\u043E\u0432\u0430, \u0415\u0433\u043E\u0440 \u041A\u043E\u0440\u0435\u0448\u043A\u043E\u0432, \u0416\u0435\u043D\u044F \u0411\u043E\u0440\u0437\u044B\u0445, C\u0411\u041F\u0427, TINAVIE, \u0422\u0438\u043C\u0443\u0440 \u0421\u043E\u043B\u043E\u0432\u044C\u0435\u0432, \u041D\u044E\u0448\u0430, Nonative, Rayda,
		Indablack, \u0412\u0430\u0440\u043D\u0430\u0432\u0430, Manizha
	</p>
	<p class="${"font-bold mt-5"}">\u041C\u0435\u0434\u0438\u0430 \u0438 \u0436\u0443\u0440\u043D\u0430\u043B\u044B</p>
	<p class="${"mt-5 font-normal 2xl:whitespace-pre-line"}">\u0420\u0411\u041A, GLAMOUR, Wonderzine, HIPO , SNC, Marie\u0421laire
	</p>
	<p class="${"font-bold mt-5"}">\u0411\u0440\u0435\u043D\u0434\u044B \u0438 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438</p>
	<div class="${"mt-5 grid grid-cols-6"}">${each(images, (img, index) => `<img class="${"w-16 object-cover"}"${add_attribute("src", img, 0)} alt="${""}">`)}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  css: () => css14,
  entry: () => entry8,
  js: () => js8,
  module: () => clients_svelte_exports
});
var entry8, js8, css14;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_clients_svelte();
    entry8 = "pages/clients.svelte-27f78d60.js";
    js8 = ["pages/clients.svelte-27f78d60.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js"];
    css14 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/rewards.svelte.js
var rewards_svelte_exports = {};
__export(rewards_svelte_exports, {
  default: () => Rewards
});
var Rewards;
var init_rewards_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/rewards.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    Rewards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_white;
      $$unsubscribe_white = subscribe(white, (value) => value);
      let rewards = [
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png",
        "/images/rewards/reward1.png"
      ];
      $$unsubscribe_white();
      return `

${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"mt-10 pt-10 mx-5 text-xs"}"><p class="${"font-bold"}">\u041D\u0430\u0433\u0440\u0430\u0434\u044B</p>
	<div class="${"mt-5 grid grid-cols-3 gap-3"}">${each(rewards, (img, index) => `<img class="${"w-full object-cover"}"${add_attribute("src", img, 0)} alt="${""}">`)}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  css: () => css15,
  entry: () => entry9,
  js: () => js9,
  module: () => rewards_svelte_exports
});
var entry9, js9, css15;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_rewards_svelte();
    entry9 = "pages/rewards.svelte-6d15c766.js";
    js9 = ["pages/rewards.svelte-6d15c766.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js"];
    css15 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/about.svelte.js
var about_svelte_exports = {};
__export(about_svelte_exports, {
  default: () => About
});
var About;
var init_about_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/about.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_white;
      $$unsubscribe_white = subscribe(white, (value) => value);
      $$unsubscribe_white();
      return `

${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"my-10 pt-10 mx-5 text-sm"}"><p class="${"font-bold"}">GOOSEVA KOMANDA \u2014</p>
	<p class="${"font-normal 2xl:whitespace-pre-line"}">\u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0441\u0442\u0438\u043B\u0438\u0441\u0442\u043E\u0432, \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u043E\u0432 \u043F\u043E\xA0\u043A\u043E\u0441\u0442\u044E\u043C\u0443 \u0438\xA0\u0430\u0441\u0441\u0438\u0441\u0442\u0435\u043D\u0442\u043E\u0432 \u043F\u043E\u0434
		\u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E\u043C \u0410\u043D\u043D\u044B \u0413\u0443\u0441\u0435\u0432\u043E\u0439.
	</p>
	<p class="${"mt-5 font-normal 2xl:whitespace-pre-line"}">\u041C\u044B\xA0\u0440\u0430\u0437\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438 \u0441\u044A\u0435\u043C\u043E\u043A, \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043D\u0443\u0436\u043D\u044B\u0439 \u043A\u043E\u043B\u043B\u0435\u043A\u0442\u0438\u0432 \u043F\u043E\u0434 \u043F\u0440\u043E\u0435\u043A\u0442 \u0438\u043B\u0438 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0430\u0435\u043C
		\u0441\xA0\u0432\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439. \u041F\u0440\u043E\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u043C \u0441\u0442\u0438\u043B\u044C \u0438\xA0\u043E\u0431\u0440\u0430\u0437\u044B, \u0441\u043E\u0437\u0434\u0430\u0435\u043C \u043A\u043E\u0441\u0442\u044E\u043C\u044B \u0434\u043B\u044F \u0433\u0435\u0440\u043E\u0435\u0432
		\u0432\xA0\u0440\u0435\u043A\u043B\u0430\u043C\u0435, \u0432\u0438\u0434\u0435\u043E \u0440\u043E\u043B\u0438\u043A\u0430\u0445, \u043C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u043F\u0430\u0445 \u0438\xA0\u043C\u043E\u0434\u043D\u044B\u0445 \u0436\u0443\u0440\u043D\u0430\u043B\u0430\u0445. \u0410\xA0\u0442\u0430\u043A\u0436\u0435 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u043C
		\u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u0439\u043B\u0438\u043D\u0433\u0430. \u0421\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B \u043D\u0430\u0448\u0435\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B\xA0\u2014 \u044D\u0442\u043E \u0441\u0438\u043B\u044C\u043D\u044B\u0439 \u0442\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0438\u0439
		\u043A\u043E\u043B\u043B\u0435\u043A\u0442\u0438\u0432, \u0433\u0434\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u043E\u0431\u043B\u0430\u0434\u0430\u0435\u0442 \u0445\u0443\u0434\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0432\u043A\u0443\u0441\u043E\u043C, \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u0438\u0437\u043E\u0439 \u0432\xA0\u043E\u0431\u043B\u0430\u0441\u0442\u0438 \u043C\u043E\u0434\u044B
		\u0438\xA0\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u0438, \u0441\u043F\u043E\u0441\u043E\u0431\u043D\u043E\u0441\u0442\u044C\u044E \u0431\u044B\u0441\u0442\u0440\u043E \u0440\u0435\u0430\u0433\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\xA0\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u0430\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F.
	</p></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  css: () => css16,
  entry: () => entry10,
  js: () => js10,
  module: () => about_svelte_exports
});
var entry10, js10, css16;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_about_svelte();
    entry10 = "pages/about.svelte-37fd0ea3.js";
    js10 = ["pages/about.svelte-37fd0ea3.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js"];
    css16 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/chunks/people-c3341470.js
var people;
var init_people_c3341470 = __esm({
  ".svelte-kit/output/server/chunks/people-c3341470.js"() {
    people = [
      {
        text: "\u0410\u043D\u043D\u0430 \u0413\u0443\u0441\u0435\u0432\u0430",
        img: "/images/team/guseva.jpg",
        link: "/team/gooseva",
        profession: `\u041A\u0440\u0435\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440,
		\u0441\u0442\u0438\u043B\u0438\u0441\u0442,
		\u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A \u043F\u043E \u043A\u043E\u0441\u0442\u044E\u043C\u0430\u043C. 
		\u041E\u0441\u043D\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u0440\u043E\u0435\u043A\u0442\u0430 @gooseva_komanda.`,
        about: `\u041F\u0435\u0434\u0430\u0433\u043E\u0433 \u0412\u044B\u0441\u0448\u0435\u0439 \u0411\u0440\u0438\u0442\u0430\u043D\u0441\u043A\u043E\u0439 \u0428\u043A\u043E\u043B\u044B \u0414\u0438\u0437\u0430\u0439\u043D\u0430 BHSAD.
\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u0446\u0430 V&nbsp;\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u043E\u0439 \u0411\u0438\u0435\u043D\u043D\u0430\u043B\u0435 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0430, \u043F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044C \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u043A\u043E\u043D\u043A\u0443\u0440\u0441\u0430 \u0444\u0435\u0441\u0442\u0438\u0432\u0430\u043B\u044F \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0430 Artmosfera, \u0441&nbsp;2014&nbsp;\u0433. \u0447\u043B\u0435\u043D \u0422\u0421\u0425\u0420 ( \u0442\u0432\u043E\u0440\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u043E\u044E\u0437 \u0445\u0443\u0434\u043E\u0436\u043D\u0438\u043A\u043E\u0432 \u0420\u043E\u0441\u0441\u0438\u0438 ). \u0423\u0447\u0430\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u044B\u0441\u0442\u0430\u0432\u043E\u043A \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0430 \u0432&nbsp;\u041F\u0430\u0440\u0438\u0436\u0435, \u0411\u0440\u044E\u0433\u0433\u0435, \u0414\u044E\u0441\u0441\u0435\u043B\u044C\u0434\u043E\u0440\u0444\u0435. 

\u0412&nbsp;2015 \u0438&nbsp;2016 \u0433\u043E\u0434\u0443 \u0432\u0435\u043B\u0430 \u0430\u0432\u0442\u043E\u0440\u0441\u043A\u0443\u044E \u043A\u043E\u043B\u043E\u043D\u043A\u0443 \u043E&nbsp;\u0441\u0442\u0438\u043B\u0435 \u0434\u043B\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u0438\u0437\u0434\u0430\u043D\u0438\u044F Marieclaire.ru 
\u0412&nbsp;2016 \u0438&nbsp;2017 \u0433\u043E\u0434\u0443 \u0437\u0430\u043D\u0438\u043C\u0430\u043B\u0430 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C \u0431\u0430\u0439\u0435\u0440\u0430 \u0438&nbsp;\u0431\u0440\u0435\u043D\u0434-\u0434\u0438\u0440\u0435\u043A\u0442\u043E\u0440\u0430 \u043A\u043E\u043D\u0446\u0435\u043F\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0431\u0443\u0442\u0438\u043A\u0430 Project&nbsp;3,14. 

\u0421\u0442\u0438\u043B\u0438\u0441\u0442 \u0441\u044A\u0435\u043C\u043E\u043A \u0434\u043B\u044F MANIZHA, L&rsquo;ONE, ELKA, ZVENTA SVENTANA, \u0410\u043D\u043D\u044B \u0425\u0438\u043B\u044C\u043A\u0435\u0432\u0438\u0447, \u0411\u0443\u0440\u0438\u0442\u043E, Sunsay, Dr.Krivorotov , \u0433\u0440\u0443\u043F\u043F\u044B \u0424\u0440\u0443\u043A\u0442\u044B, \u041F\u043E\u043B\u0438\u043D\u044B \u041C\u0430\u043A\u0441\u0438\u043C\u043E\u0432\u043E\u0439, \u0415\u0433\u043E\u0440\u0430 \u041A\u043E\u0440\u0435\u0448\u043A\u043E\u0432\u0430, \u0414\u0435\u043D\u0438\u0441\u0430 \u0428\u0432\u0435\u0434\u043E\u0432\u0430, \u0421\u0430\u0442\u0438 \u041A\u0430\u0437\u0430\u043D\u043E\u0432\u043E\u0439 \u0438&nbsp;\u0434\u0440.
		`,
        projects: ["alone", "phd", "a101", "kaltblut", "boneless", "chiki", "krivorotov1", "krivorotov2", "flowers", "lachambre", "notalice", "oriflame", "schiap", "stacy", "krivorotov3", "trapeze", "ttswtrs", "vogue", "bother", "whoiam", "youdrive", "zventa"]
      },
      { text: "\u0422\u0430\u044F \u0410\u0437\u0431\u0443\u043A\u0430", img: "https://picsum.photos/1000/202", link: "/team/azbuka" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/203", link: "/team/name" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/204", link: "/team/name" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/205", link: "/team/name" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/206", link: "/team/name" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/207", link: "/team/name" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/208", link: "/team/name" },
      { text: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F", img: "https://picsum.photos/1000/209", link: "/team/name" }
    ];
  }
});

// .svelte-kit/output/server/entries/pages/team/index.svelte.js
var index_svelte_exports3 = {};
__export(index_svelte_exports3, {
  default: () => Team
});
var css17, Team;
var init_index_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/team/index.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    init_people_c3341470();
    css17 = {
      code: "img.svelte-1vi6dxg{opacity:0;transition:opacity 500ms ease-out}img.loaded.svelte-1vi6dxg{opacity:1}",
      map: null
    };
    Team = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_white;
      $$unsubscribe_white = subscribe(white, (value) => value);
      let thisImage;
      let { parentClass = "py-10" } = $$props;
      let { textClass = "" } = $$props;
      let { wrapperClass = "lg:hidden" } = $$props;
      let items2 = people;
      let triItems = [...items2, ...items2, ...items2];
      if ($$props.parentClass === void 0 && $$bindings.parentClass && parentClass !== void 0)
        $$bindings.parentClass(parentClass);
      if ($$props.textClass === void 0 && $$bindings.textClass && textClass !== void 0)
        $$bindings.textClass(textClass);
      if ($$props.wrapperClass === void 0 && $$bindings.wrapperClass && wrapperClass !== void 0)
        $$bindings.wrapperClass(wrapperClass);
      $$result.css.add(css17);
      $$unsubscribe_white();
      return `

<div class="${"top-0 h-5 w-5 relative hidden h-full mx-5 2xl:w-80 2xl:h-80"}"></div>

<div class="${"top-0 fixed w-full z-10"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</div>


<div class="${"w-full border-t border-black " + escape(wrapperClass)}">${each(triItems, (i2, index) => `<div id="${"item" + escape(index)}" class="${"relative border-b border-black " + escape(parentClass)}"><a${add_attribute("href", i2.link, 0)}><img${add_attribute("src", i2.img, 0)}${add_attribute("alt", i2.text, 0)} class="${[
        escape(null_to_empty(i2["shown"] ? "absolute transition duration-500 opacity-100 w-full top-0 h-full object-cover" : "absolute loaded transition duration-500 opacity-0 hidden w-full top-0 h-full object-cover")) + " svelte-1vi6dxg",
        ""
      ].join(" ").trim()}" loading="${"lazy"}"${add_attribute("this", thisImage, 0)}>
				<div class="${"flex justify-between mx-5"}"><div class="${"relative " + escape(textClass)}">${escape(i2.text)}</div>
					<svg class="${"fill-current text-white w-5 h-5 relative"}" xmlns="${"http://www.w3.org/2000/svg"}" fill="${"white"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M14 5l7 7m0 0l-7 7m7-7H3"}"></path></svg>
				</div></a>
		</div>`)}
</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  css: () => css18,
  entry: () => entry11,
  js: () => js11,
  module: () => index_svelte_exports3
});
var entry11, js11, css18;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_index_svelte3();
    entry11 = "pages/team/index.svelte-792ca6bf.js";
    js11 = ["pages/team/index.svelte-792ca6bf.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js", "chunks/people-c3341470.js"];
    css18 = ["assets/pages/team/index.svelte-2f1824e1.css", "assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css"];
  }
});

// .svelte-kit/output/server/entries/pages/team/projects/_name_.svelte.js
var name_svelte_exports = {};
__export(name_svelte_exports, {
  default: () => U5Bnameu5D
});
var U5Bnameu5D;
var init_name_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/team/projects/_name_.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    U5Bnameu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => value);
      $$unsubscribe_page();
      return `

${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
<div class="${"px-5 my-10"}">${`${`${``}`}`}</div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  css: () => css19,
  entry: () => entry12,
  js: () => js12,
  module: () => name_svelte_exports
});
var entry12, js12, css19;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_name_svelte();
    entry12 = "pages/team/projects/_name_.svelte-0034fc73.js";
    js12 = ["pages/team/projects/_name_.svelte-0034fc73.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js", "chunks/teamProjects-ef73914c.js", "chunks/Player-f7a65fdc.js"];
    css19 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css", "assets/Player-97ad1893.css"];
  }
});

// .svelte-kit/output/server/entries/pages/team/_name_.svelte.js
var name_svelte_exports2 = {};
__export(name_svelte_exports2, {
  default: () => U5Bnameu5D2
});
var U5Bnameu5D2;
var init_name_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/team/_name_.svelte.js"() {
    init_index_27c4ae06();
    init_Nav_0e3ea68b();
    init_Image_fe0afddd();
    init_people_c3341470();
    U5Bnameu5D2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      let person = {};
      let personProjects = [];
      $$unsubscribe_page();
      return `<div class="${"lg:hidden"}"><header class="${"h-[70vh] bg-cover bg-center"}" style="${"background-image: url(" + escape(person["img"]) + ")"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</header>
	<h1 class="${"text-center py-5 text-3xl tracking-wide font-medium border-t border-b border-black"}">${escape("")}</h1>
	<div class="${"flex flex-col space-y-5 p-5 border-b border-black"}"><h1 class="${"font-semibold text-sm leading-5 whitespace-pre-line"}">${escape("")}</h1>
		<p class="${"text-sm whitespace-pre-line font-light"}"><!-- HTML_TAG_START -->${""}<!-- HTML_TAG_END --></p></div>
	${personProjects ? `${each(personProjects, (proj, index) => `<a${add_attribute("href", proj.link, 0)}><div class="${"h-36 flex border-b border-black"}"><div class="${"w-5/12 font-bt text-sm self-center px-5"}">${escape(proj.name)}</div>
					<div class="${"w-7/12"}"><div class="${"w-full h-full overflow-hidden"}"><img class="${"object-cover w-full h-full"}" style="${"padding: " + escape(proj.style) + ";"}"${add_attribute("src", proj.mainImg, 0)} alt="${""}"></div>
					</div></div>
			</a>`)}` : ``}</div>

<div class="${"hidden lg:block"}">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}</div>
<div class="${"hidden lg:grid grid-cols-4 h-screen py-10"}"><div class="${"border-r border-black col-span-1 p-5 2xl:p-10 flex space-x-8 xl:space-x-14"}"><h1 class="${"text-md font-medium"}">\u0421\u0442\u0438\u043B\u0438\u0441\u0442\u044B</h1>
		<div>${each(people, (i2, index) => `<a${add_attribute("href", i2.link, 0)} class="${"relative"}"><img${add_attribute("class", "/team/" + $page.params.name === i2.link ? "absolute top-2 -left-7" : "hidden", 0)} src="${"/images/arrow.svg"}" alt="${""}">
					<p${add_attribute("class", "/team/" + $page.params.name == i2.link ? "leading-7 underline font-light whitespace-nowrap" : "leading-7 hover:underline font-light whitespace-nowrap", 0)}>${escape(i2.text)}</p>
				</a>`)}</div></div>
	<div class="${"relative col-span-3 p-5 2xl:p-10 flex flex-col justify-between space-y-5"}">${`<div><h1 class="${"text-4xl tracking-wide"}">${escape(person["text"])}</h1>
				<div class="${"mt-10 flex justify-between"}"><p class="${"font-light whitespace-pre-line max-w-lg 2xl:max-w-2xl leading-5"}"><!-- HTML_TAG_START -->${person["about"]}<!-- HTML_TAG_END --></p>
					${validate_component(Image, "Image").$$render($$result, {
        src: person["img"],
        classes: "object-cover w-64 h-64"
      }, {}, {})}</div></div>
			<div class="${"flex flex-wrap gap-3"}">${each(personProjects, (i2, index) => `<div class="${"cursor-pointer flex max-w-xs"}">${validate_component(Image, "Image").$$render($$result, {
        src: i2["mainImg"],
        classes: "grow object-cover h-32 w-full max-w-sm"
      }, {}, {})}
					</div>`)}</div>`}</div></div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  css: () => css20,
  entry: () => entry13,
  js: () => js13,
  module: () => name_svelte_exports2
});
var entry13, js13, css20;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_name_svelte2();
    entry13 = "pages/team/_name_.svelte-6c5bf12e.js";
    js13 = ["pages/team/_name_.svelte-6c5bf12e.js", "chunks/vendor-cece5832.js", "chunks/Nav-85821155.js", "chunks/singletons-a42a5e91.js", "chunks/people-c3341470.js", "chunks/teamProjects-ef73914c.js", "chunks/Player-f7a65fdc.js"];
    css20 = ["assets/vendor-c402c846.css", "assets/Nav-ba69bb6a.css", "assets/Player-97ad1893.css"];
  }
});

// .svelte-kit/vercel-tmp/entry.js
__export(exports, {
  default: () => entry_default
});
init_install_fetch();

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h2 = req.headers;
    if (!h2["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h2["content-length"]);
    if (isNaN(length) && h2["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
init_index_27c4ae06();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function decode_params(params) {
  for (const key in params) {
    params[key] = params[key].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s22) {
  return typeof s22 === "string" || s22 instanceof String;
}
var text_types = new Set([
  "application/xml",
  "application/json",
  "application/x-www-form-urlencoded",
  "multipart/form-data"
]);
function is_text(content_type) {
  if (!content_type)
    return true;
  const type = content_type.split(";")[0].toLowerCase();
  return type.startsWith("text/") || type.endsWith("+xml") || text_types.has(type);
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  request.params = route.params ? decode_params(route.params(match)) : {};
  const response = await handler(request);
  const preface = `Invalid response from route ${request.url.pathname}`;
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  if (response.fallthrough) {
    return;
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  if (!is_text(type) && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = __spreadProps(__spreadValues({}, headers), { "content-type": "application/json; charset=utf-8" });
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry14) {
    return entry14[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry14, i2) {
    names.set(entry14[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a4) {
            var k = _a4[0], v = _a4[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped2[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped2) {
      result += escaped2[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop3() {
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape2(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape2(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape2(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s2 = JSON.stringify;
async function render_response({
  branch,
  options,
  $session,
  page_config,
  status,
  error: error2,
  url,
  params,
  ssr,
  stuff
}) {
  const css22 = new Set(options.manifest._.entry.css);
  const js14 = new Set(options.manifest._.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options.get_stack(error2);
  }
  if (ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url2) => css22.add(url2));
      if (node.js)
        node.js.forEach((url2) => js14.add(url2));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page: { url, params, status, error: error2, stuff },
      components: branch.map(({ node }) => node.module.default)
    };
    const print_error = (property, replacement) => {
      Object.defineProperty(props.page, property, {
        get: () => {
          throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
        }
      });
    };
    print_error("origin", "origin");
    print_error("path", "pathname");
    print_error("query", "searchParams");
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js14.clear();
  const links = options.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(css22).map((dep) => `<link rel="stylesheet" href="${options.prefix}${dep}">`),
    ...Array.from(js14).map((dep) => `<link rel="modulepreload" href="${options.prefix}${dep}">`)
  ].join("\n		");
  let init = "";
  if (options.amp) {
    init = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    init += options.service_worker ? '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>' : "";
  } else if (include_js) {
    init = `<script type="module">
			import { start } from ${s2(options.prefix + options.manifest._.entry.file)};
			start({
				target: ${options.target ? `document.querySelector(${s2(options.target)})` : "document.body"},
				paths: ${s2(options.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				route: ${!!page_config.router},
				spa: ${!ssr},
				trailing_slash: ${s2(options.trailing_slash)},
				hydrate: ${ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s2(options.prefix + node.entry)})`).join(",\n						")}
					],
					url: new URL(${s2(url.href)}),
					params: ${devalue(params)}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options.service_worker && !options.amp) {
    init += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init
  ].join("\n\n		");
  let body = rendered.html;
  if (options.amp) {
    if (options.service_worker) {
      body += `<amp-install-serviceworker src="${options.service_worker}" layout="nodisplay"></amp-install-serviceworker>`;
    }
  } else {
    body += serialized_data.map(({ url: url2, body: body2, json }) => {
      let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url2)}`;
      if (body2)
        attributes += ` data-body="${hash(body2)}"`;
      return `<script ${attributes}>${json}<\/script>`;
    }).join("\n\n	");
  }
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  const segments = url.pathname.slice(options.paths.base.length).split("/").slice(2);
  const assets2 = options.paths.assets || (segments.length > 0 ? segments.map(() => "..").join("/") : ".");
  return {
    status,
    headers,
    body: options.template({
      head,
      body,
      assets: assets2
    })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize(__spreadProps(__spreadValues({}, error2), { name, message, stack }));
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var absolute = /^([a-z]+:)?\/?\//;
var scheme = /^[a-z]+:/;
function resolve(base2, path) {
  if (scheme.test(path))
    return path;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path) {
  return path[0] === "/" && path[1] !== "/";
}
async function load_node({
  request,
  options,
  state,
  route,
  url,
  params,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const url_proxy = new Proxy(url, {
    get: (target, prop, receiver) => {
      if (prerender_enabled && (prop === "search" || prop === "searchParams")) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      url: url_proxy,
      params,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let requested;
        if (typeof resource === "string") {
          requested = resource;
        } else {
          requested = resource.url;
          opts = __spreadValues({
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity
          }, opts);
        }
        opts.headers = new Headers(opts.headers);
        const resolved = resolve(request.url.pathname, requested.split("?")[0]);
        let response;
        const prefix = options.paths.assets || options.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (options.read) {
            const type = is_asset ? options.manifest._.mime[filename.slice(filename.lastIndexOf("."))] : "text/html";
            response = new Response(options.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          } else {
            response = await fetch(`${url.origin}/${file}`, opts);
          }
        } else if (is_root_relative(resolved)) {
          const relative = resolved;
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            if (request.headers.cookie) {
              opts.headers.set("cookie", request.headers.cookie);
            }
            if (request.headers.authorization && !opts.headers.has("authorization")) {
              opts.headers.set("authorization", request.headers.authorization);
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const rendered = await respond({
            url: new URL(requested, request.url),
            method: opts.method || "GET",
            headers: Object.fromEntries(opts.headers),
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body)
          }, options, {
            fetched: requested,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          } else {
            return fetch(new URL(requested, request.url).href, {
              method: opts.method || "GET",
              headers: opts.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${requested}) in server-side fetch`);
          }
          if (`.${new URL(requested).hostname}`.endsWith(`.${request.url.hostname}`) && opts.credentials !== "omit") {
            uses_credentials = true;
            opts.headers.set("cookie", request.headers.cookie);
          }
          const external_request = new Request(requested, opts);
          response = await options.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url: requested,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: __spreadValues({}, stuff)
    };
    if (options.dev) {
      Object.defineProperty(load_input, "page", {
        get: () => {
          throw new Error("`page` in `load` functions has been replaced by `url` and `params`");
        }
      });
    }
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
    if (!loaded) {
      throw new Error(`load function must return a value${options.dev ? ` (${node.entry})` : ""}`);
    }
  } else {
    loaded = {};
  }
  if (loaded.fallthrough && !is_error) {
    return;
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({
  request,
  options,
  state,
  $session,
  status,
  error: error2,
  ssr
}) {
  try {
    const default_layout = await options.manifest._.nodes[0]();
    const default_error = await options.manifest._.nodes[1]();
    const params = {};
    const layout_loaded = await load_node({
      request,
      options,
      state,
      route: null,
      url: request.url,
      params,
      node: default_layout,
      $session,
      stuff: {},
      prerender_enabled: is_prerender_enabled(options, default_error, state),
      is_error: false
    });
    const error_loaded = await load_node({
      request,
      options,
      state,
      route: null,
      url: request.url,
      params,
      node: default_error,
      $session,
      stuff: layout_loaded ? layout_loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options, default_error, state),
      is_error: true,
      status,
      error: error2
    });
    return await render_response({
      options,
      $session,
      page_config: {
        hydrate: options.hydrate,
        router: options.router
      },
      stuff: error_loaded.stuff,
      status,
      error: error2,
      branch: [layout_loaded, error_loaded],
      url: request.url,
      params,
      ssr
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options, node, state) {
  return options.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options, state, $session, route, ssr } = opts;
  let nodes;
  if (!ssr) {
    return await render_response(__spreadProps(__spreadValues({}, opts), {
      branch: [],
      page_config: {
        hydrate: true,
        router: true
      },
      status: 200,
      url: request.url,
      stuff: {}
    }));
  }
  try {
    nodes = await Promise.all(route.a.map((n) => options.manifest._.nodes[n] && options.manifest._.nodes[n]()));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return await respond_with_error({
      request,
      options,
      state,
      $session,
      status: 500,
      error: error3,
      ssr
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  let stuff = {};
  ssr:
    if (ssr) {
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
              url: request.url,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options, node, state),
              is_error: false
            }));
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options.handle_error(e2, request);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options.manifest._.nodes[route.b[i2]]();
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node(__spreadProps(__spreadValues({}, opts), {
                    url: request.url,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options, error_node, state),
                    is_error: true,
                    status,
                    error: error2
                  }));
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  stuff = __spreadValues(__spreadValues({}, node_loaded.stuff), error_loaded.stuff);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options.handle_error(e2, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options,
              state,
              $session,
              status,
              error: error2,
              ssr
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = __spreadValues(__spreadValues({}, stuff), loaded.loaded.stuff);
        }
      }
    }
  try {
    return with_cookies(await render_response(__spreadProps(__spreadValues({}, opts), {
      stuff,
      url: request.url,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    })), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options.handle_error(error3, request);
    return with_cookies(await respond_with_error(__spreadProps(__spreadValues({}, opts), {
      status: 500,
      error: error3
    })), set_cookie_headers);
  }
}
function get_page_config(leaf, options) {
  if ("ssr" in leaf) {
    throw new Error("`export const ssr` has been removed \u2014 use the handle hook instead: https://kit.svelte.dev/docs#hooks-handle");
  }
  return {
    router: "router" in leaf ? !!leaf.router : options.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options, state, ssr) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.url.pathname}`
    };
  }
  const params = route.params ? decode_params(route.params(match)) : {};
  const $session = await options.hooks.getSession(request);
  const response = await respond$1({
    request,
    options,
    state,
    $session,
    route,
    params,
    ssr
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd2(this, _map, void 0);
    __privateSet2(this, _map, map);
  }
  get(key) {
    const value = __privateGet2(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet2(this, _map).get(key);
  }
  has(key) {
    return __privateGet2(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield [key, value[i2]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet2(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet2(this, _map)) {
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        yield value[i2];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options, state = {}) {
  var _a4;
  if (incoming.url.pathname !== "/" && options.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.url.pathname.endsWith("/");
    if (has_trailing_slash && options.trailing_slash === "never" || !has_trailing_slash && options.trailing_slash === "always" && !(incoming.url.pathname.split("/").pop() || "").includes(".")) {
      incoming.url.pathname = has_trailing_slash ? incoming.url.pathname.slice(0, -1) : incoming.url.pathname + "/";
      if (incoming.url.search === "?")
        incoming.url.search = "";
      return {
        status: 301,
        headers: {
          location: incoming.url.pathname + incoming.url.search
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = __spreadProps(__spreadValues({}, incoming), {
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  });
  const { parameter, allowed } = options.method_override;
  const method_override = (_a4 = incoming.url.searchParams.get(parameter)) == null ? void 0 : _a4.toUpperCase();
  if (method_override) {
    if (request.method.toUpperCase() === "POST") {
      if (allowed.includes(method_override)) {
        request.method = method_override;
      } else {
        const verb = allowed.length === 0 ? "enabled" : "allowed";
        const body = `${parameter}=${method_override} is not ${verb}. See https://kit.svelte.dev/docs#configuration-methodoverride`;
        return {
          status: 400,
          headers: {},
          body
        };
      }
    } else {
      throw new Error(`${parameter}=${method_override} is only allowed with POST requests`);
    }
  }
  const print_error = (property, replacement) => {
    Object.defineProperty(request, property, {
      get: () => {
        throw new Error(`request.${property} has been replaced by request.url.${replacement}`);
      }
    });
  };
  print_error("origin", "origin");
  print_error("path", "pathname");
  print_error("query", "searchParams");
  let ssr = true;
  try {
    return await options.hooks.handle({
      request,
      resolve: async (request2, opts) => {
        if (opts && "ssr" in opts)
          ssr = opts.ssr;
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            url: request2.url,
            params: request2.params,
            options,
            $session: await options.hooks.getSession(request2),
            page_config: { router: true, hydrate: true },
            stuff: {},
            status: 200,
            branch: [],
            ssr: false
          });
        }
        const decoded = decodeURI(request2.url.pathname).replace(options.paths.base, "");
        for (const route of options.manifest._.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options, state, ssr);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                let if_none_match_value = request2.headers["if-none-match"];
                if (if_none_match_value == null ? void 0 : if_none_match_value.startsWith('W/"')) {
                  if_none_match_value = if_none_match_value.substring(2);
                }
                const etag = `"${hash(response.body || "")}"`;
                if (if_none_match_value === etag) {
                  return {
                    status: 304,
                    headers: {}
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        if (!state.initiator) {
          const $session = await options.hooks.getSession(request2);
          return await respond_with_error({
            request: request2,
            options,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${request2.url.pathname}`),
            ssr
          });
        }
      }
    });
  } catch (e2) {
    const error2 = coalesce_to_error(e2);
    options.handle_error(error2, request);
    try {
      const $session = await options.hooks.getSession(request);
      return await respond_with_error({
        request,
        options,
        state,
        $session,
        status: 500,
        error: error2,
        ssr
      });
    } catch (e22) {
      const error3 = coalesce_to_error(e22);
      return {
        status: 500,
        headers: {},
        body: options.dev ? error3.stack : error3.message
      };
    }
  }
}
function afterUpdate() {
}
var css = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: null
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css);
  {
    stores.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[2] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}`
    })}` : `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {})}`}`
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {})}`}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body, assets: assets2 }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var default_protocol = "https";
var App = class {
  constructor(manifest2) {
    const hooks = get_hooks(user_hooks);
    this.options = {
      amp: false,
      dev: false,
      floc: false,
      get_stack: (error2) => String(error2),
      handle_error: (error2, request) => {
        hooks.handleError({ error: error2, request });
        error2.stack = this.options.get_stack(error2);
      },
      hooks,
      hydrate: true,
      manifest: manifest2,
      method_override: { "parameter": "_method", "allowed": [] },
      paths: { base, assets },
      prefix: assets + "/_app/",
      prerender: true,
      read,
      root: Root,
      service_worker: null,
      router: true,
      target: null,
      template,
      trailing_slash: "never"
    };
  }
  render(request, {
    prerender
  } = {}) {
    if (Object.keys(request).sort().join() !== "headers,method,rawBody,url") {
      throw new Error("Adapters should call app.render({ url, method, headers, rawBody })");
    }
    const host = request.headers["host"];
    const protocol = default_protocol;
    return respond(__spreadProps(__spreadValues({}, request), { url: new URL(request.url, protocol + "://" + host) }), this.options, { prerender });
  }
};

// .svelte-kit/vercel-tmp/manifest.js
var manifest = {
  appDir: "_app",
  assets: new Set(["favicon.png", "images/arrow-left.svg", "images/arrow.svg", "images/companies/cian.png", "images/companies/lg.png", "images/companies/mega.png", "images/companies/samsung.png", "images/index/1.jpg", "images/index/1Mobile.jpg", "images/index/2.1.jpg", "images/index/2.2.jpg", "images/index/3.jpg", "images/index/4.jpg", "images/index/5.jpg", "images/index/5Moblie.jpg", "images/index/6.jpg", "images/logo/goos.svg", "images/logo/goos_white.svg", "images/logo/kom.svg", "images/logo/kom_white.svg", "images/projects/1XBET/1.jpg", "images/projects/1XBET/1xBET.docx", "images/projects/A101/1.jpg", "images/projects/A101/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/ADRENALINE/1.jpg", "images/projects/ADRENALINE/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 10.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 12.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 24.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 25.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 27.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 4.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 5.jpg", "images/projects/ALONE/\u041A\u043E\u043F\u0438\u044F 6.jpg", "images/projects/ALONE/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/ALPEN GOLD/1.jpg", "images/projects/ALPEN GOLD/1.mp4", "images/projects/ALPEN GOLD/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/AUROUS/1.jpg", "images/projects/AUROUS/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/AUSHAN/1.jpg", "images/projects/AVIAPARK/1.jpg", "images/projects/AVIAPARK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_II_0801.jpg", "images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_II_1521.jpg", "images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F AVON_NY_I_00711.jpg", "images/projects/AVON 19 NY KIDS/\u041A\u043E\u043F\u0438\u044F EmptyName 34.jpg", "images/projects/AVON 19 NY KIDS/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/AVON 19 NY KIDS/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F AVON_NY_II_0801.jpg", "images/projects/AVON 19 NY KIDS/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F AVON_NY_II_1521.jpg", "images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6163.JPG", "images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6164.JPG", "images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6165.JPG", "images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6166.JPG", "images/projects/AVON NEW YEAR/\u041A\u043E\u043F\u0438\u044F IMG_6219.JPG", "images/projects/AVON NEW YEAR/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/AVON NEW YEAR/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F IMG_6166.JPG", "images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69409.jpg", "images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69694_2.jpg", "images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_69943.jpg", "images/projects/AVON SALE ZONE 19/\u041A\u043E\u043F\u0438\u044F IMG_70937_3.jpg", "images/projects/AVON SALE ZONE 19/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/AVON SALE ZONE 19/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F IMG_69409.jpg", "images/projects/AVON SALE ZONE 19/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F IMG_69694_2.jpg", "images/projects/BAIKAL/1.jpg", "images/projects/BAIKAL/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/BAIKAL1/1.jpg", "images/projects/BAIKAL1/2.jpg", "images/projects/BAIKAL1/3.jpg", "images/projects/BAIKAL1/4.jpg", "images/projects/BAIKAL1/5.jpg", "images/projects/BELKA CAR/1.jpg", "images/projects/BELKA CAR/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/BELKA CAR2/\u041A\u043E\u043F\u0438\u044F 50218023_10156205866328790_8914228640305119232_o.jpg", "images/projects/BELKA CAR2/\u041A\u043E\u043F\u0438\u044F 50324133_10156205866463790_5012258050254307328_o.jpg", "images/projects/BELKA CAR2/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/BLINDING AND KULTBLUT/ 1.jpg", "images/projects/BLINDING AND KULTBLUT/ 2.jpg", "images/projects/BLINDING AND KULTBLUT/ 3.jpg", "images/projects/BLINDING AND KULTBLUT/ 4.jpg", "images/projects/BLINDING AND KULTBLUT/ 5.jpg", "images/projects/BLINDING AND KULTBLUT/ 6.jpg", "images/projects/BLINDING AND KULTBLUT/ 7.jpg", "images/projects/BLINDING AND KULTBLUT/ 8.jpg", "images/projects/BLINDING AND KULTBLUT/ 9.jpg", "images/projects/BLINDING AND KULTBLUT/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11237.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11337.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11397.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11402.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11457.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11546.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11603.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11655.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041A\u043E\u043F\u0438\u044F 18.11.27-dance-color11738.jpg", "images/projects/BONELESS VLADIMIR VARNAV/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/BOTHER/1.jpg", "images/projects/CDM/1.jpg", "images/projects/CDM/1.mp4", "images/projects/CDM/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/CITY MOBILE/1.jpg", "images/projects/CITY MOBILE/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/Chiki/1.jpeg", "images/projects/DAVAI BROSAT/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/DELOBANK/1.jpg", "images/projects/DELOBANK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/DIRECTOR/1.jpg", "images/projects/DIRECTOR/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/DIRECTORS MERKULOVY/\u041A\u043E\u043F\u0438\u044F 0018.jpg", "images/projects/DIRECTORS MERKULOVY/\u041A\u043E\u043F\u0438\u044F 0022.jpg", "images/projects/DIRECTORS MERKULOVY/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_10555 copy.jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11012 copy.jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11145 copy.jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11360 copy.jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11411 copy.jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11724 copy(1).jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11724 copy.jpg", "images/projects/DOKUCHAEVA/\u041A\u043E\u043F\u0438\u044F Dokuchaeva_200910_11839 copy.jpg", "images/projects/DOKUCHAEVA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F BD4A9775.jpg", "images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9354.jpg", "images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9552.jpg", "images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9861.jpg", "images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9915.jpg", "images/projects/DR KRIVOROTOV 2.0/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9954.jpg", "images/projects/DR KRIVOROTOV 2.0/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/DR KRIVOROTOV 2.0/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F BD4A9354.jpg", "images/projects/EGOR KRID/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00010-\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00048.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00153_1.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00186.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00228-\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E-\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00326.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00375_2 copy.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC00500.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09506.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09635.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09745.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09865 copy.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09940.jpg", "images/projects/EVOLUTION 2.0/\u041A\u043E\u043F\u0438\u044F DSC09968.jpg", "images/projects/EVOLUTION 2.0/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F 000091220034.jpg", "images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F AA007.jpg", "images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F fakbyfak3660.jpg", "images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F fakbyfak3682.jpg", "images/projects/FAKBYFAK/\u041A\u043E\u043F\u0438\u044F fakbyfak3700.jpg", "images/projects/FAKBYFAK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0402_done_1.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0567_done_1.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0568_done1_1.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0730_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A0850_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1072_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1341_1_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1399_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1564_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041A\u043E\u043F\u0438\u044F 0R2A1713_done.jpg", "images/projects/FLOWERS AND SHADOWS/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F 8.jpg", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5800.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5801.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5802.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5803.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5804.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5805.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5806.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041A\u043E\u043F\u0438\u044F IMG_5807.JPG", "images/projects/GERTRUDE:KALTBLUT/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/GLAMOUR AND GLUKOZA/1.jpg", "images/projects/GLAMOUR AND GLUKOZA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 02.jpg", "images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 03.jpg", "images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 06.jpg", "images/projects/GOGEN/\u041A\u043E\u043F\u0438\u044F 07.jpg", "images/projects/GOGEN/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/GRAND/1.jpg", "images/projects/GRAND/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog1540.jpg", "images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2344 1.jpg", "images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2595.jpg", "images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2621.jpg", "images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2655.jpg", "images/projects/HASKY LOOKBOOK/\u041A\u043E\u043F\u0438\u044F Capture One Catalog2670 1.jpg", "images/projects/HASKY LOOKBOOK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F 72e447bc9980f966eabc570ba2438d62.jpg", "images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F d4394489085388a02b800188bfeb6026.jpg", "images/projects/HOLOSTIAK/\u041A\u043E\u043F\u0438\u044F ok-zhurnal-8-02.jpg", "images/projects/HOLOSTIAK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/HOLOSTIAK/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F d4394489085388a02b800188bfeb6026.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183708-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183763-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183856-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183948-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u043E\u0441\u0443\u0434\u043A\u0430-7-\u043E\u043A\u0442-183970-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0045-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0089-1.jpg", "images/projects/HUF AHD HUF/\u041A\u043E\u043F\u0438\u044F HH-\u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u0435-_0150-1.jpg", "images/projects/KRASSNA/1.jpg", "images/projects/KRASSNA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 001.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 002.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 016.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 018.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 021.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 022.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 029.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 035.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 039.jpg", "images/projects/LA CHAMBRE VERTE/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F fuji400 041.jpg", "images/projects/LA CHAMBRE VERTE/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/LENTA/1.jpg", "images/projects/LENTA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/MANIQU.RU/1.JPG", "images/projects/MANIQU.RU/2.JPG", "images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 002_d_web.jpg", "images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 010_d_web.jpg", "images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 012_d_web.jpg", "images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 013_d_web.jpg", "images/projects/MANO/\u041A\u043E\u043F\u0438\u044F mano 016_d_web.jpg", "images/projects/MBA/1.jpg", "images/projects/MBA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/MEGA/1.jpg", "images/projects/MEGA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/MEGAELKA/1.jpg", "images/projects/MEGAELKA/1.mp4", "images/projects/MEGAELKA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/MEGAFON/1.jpg", "images/projects/MEGAFON/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/MELLER/1.jpg", "images/projects/MELLER/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/MONAMI/1.jpg", "images/projects/MONAMI/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/MTS SAMSUNG/1.jpg", "images/projects/MTS SAMSUNG/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/PERFUME FOR PROJECT 314/1.jpg", "images/projects/PERFUME FOR PROJECT 314/2.jpg", "images/projects/PERFUME FOR PROJECT 314/3.jpg", "images/projects/PERFUME FOR PROJECT 314/4.jpg", "images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 50007.jpg", "images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 50026.jpg", "images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 70031.jpg", "images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 70033.jpg", "images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 80013.jpg", "images/projects/PHD/\u041A\u043E\u043F\u0438\u044F PhD 80033.jpg", "images/projects/POKERDOM/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/RBK/\u041A\u043E\u043F\u0438\u044F main-img-1.jpg", "images/projects/RBK/\u041A\u043E\u043F\u0438\u044F main-img-2.jpg", "images/projects/RBK/\u041A\u043E\u043F\u0438\u044F review-marko-2.jpg", "images/projects/RBK/\u041A\u043E\u043F\u0438\u044F review-marko.jpg", "images/projects/RBK/\u041A\u043E\u043F\u0438\u044F review-sisoev.jpg", "images/projects/RBK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/RBK/\u041F\u0420\u0415\u0412\u042C\u042E/\u041A\u043E\u043F\u0438\u044F \u041A\u043E\u043F\u0438\u044F main-img-1.jpg", "images/projects/SAMOLET/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/SAMSUNG/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/SBERBANK/1.jpg", "images/projects/SBERBANK/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6185.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6402.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6412.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6620.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6751.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6825.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6888.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_6981.jpg", "images/projects/SCHIAP:VGXW/\u041A\u043E\u043F\u0438\u044F 2019_11_17_SCHIAP_7090.jpg", "images/projects/SCHIAP:VGXW/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/SEBASTIAM+SYSTEM 2019/1.jpg", "images/projects/SEBASTIAM+SYSTEM 2019/2.jpg", "images/projects/SEBASTIAM+SYSTEM 2019/3.jpg", "images/projects/SEBASTIAM+SYSTEM 2019/4.jpg", "images/projects/SPIN4SPIN/  -01.jpg", "images/projects/SPIN4SPIN/  -02.jpg", "images/projects/SPIN4SPIN/  -03.jpg", "images/projects/SPIN4SPIN/  -04.jpg", "images/projects/SPIN4SPIN/  -05.jpg", "images/projects/SPIN4SPIN/  -06.jpg", "images/projects/SPIN4SPIN/  -07.jpg", "images/projects/SPIN4SPIN/  -08.jpg", "images/projects/SPIN4SPIN/  -09.jpg", "images/projects/SPIN4SPIN/  -10.jpg", "images/projects/SPIN4SPIN/  -11.jpg", "images/projects/SPIN4SPIN/  -12.jpg", "images/projects/SPIN4SPIN/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F 0053.jpg", "images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F DSC02505.jpg", "images/projects/SPRING RYAZAN/\u041A\u043E\u043F\u0438\u044F DSC02625.jpg", "images/projects/SPRING RYAZAN/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/STACY/1.jpg", "images/projects/STACY/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00864.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00932 copy.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00959 copy.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC00970 copy.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01170.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01264 copy.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01438 copy.jpg", "images/projects/THE PROVEN POINT/\u041A\u043E\u043F\u0438\u044F DSC01545 copy.jpg", "images/projects/THE PROVEN POINT/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/TRAPEZE OF MALEVICH/1.jpg", "images/projects/TRAPEZE OF MALEVICH/10.jpg", "images/projects/TRAPEZE OF MALEVICH/2.jpg", "images/projects/TRAPEZE OF MALEVICH/3.jpg", "images/projects/TRAPEZE OF MALEVICH/4.jpg", "images/projects/TRAPEZE OF MALEVICH/5.jpg", "images/projects/TRAPEZE OF MALEVICH/6.jpg", "images/projects/TRAPEZE OF MALEVICH/7.jpg", "images/projects/TRAPEZE OF MALEVICH/8.jpg", "images/projects/TRAPEZE OF MALEVICH/9.jpg", "images/projects/TRAPEZE OF MALEVICH/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F FSM_-001.jpg", "images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-001.jpg", "images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-005.jpg", "images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-013.jpg", "images/projects/TTSWTR/\u041A\u043E\u043F\u0438\u044F ttswtrs-015.jpg", "images/projects/TTSWTR/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/UTOPIA/1.jpg", "images/projects/UTOPIA/2.jpg", "images/projects/UTOPIA/3.jpg", "images/projects/UTOPIA/4.jpg", "images/projects/UTOPIA/5.jpg", "images/projects/UTOPIA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/VK DONUTS/1.jpg", "images/projects/VK DONUTS/1.mp4", "images/projects/VK DONUTS/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/VOLEN SENTIR/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/WEEKEND/1.jpg", "images/projects/WEEKEND/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0525.jpg", "images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0592.jpg", "images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0626.jpg", "images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0648.jpg", "images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041A\u043E\u043F\u0438\u044F wella december0798.jpg", "images/projects/WELLA, SEBASTIAN, SYSTEM 2021/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 001.jpg", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 002.jpg", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 004.jpg", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 005.jpg", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 008.jpg", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 009.jpg", "images/projects/WHAT ABOUT US/\u041A\u043E\u043F\u0438\u044F W_A_U_ 010.jpg", "images/projects/WHAT ABOUT US/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/WHO I AM/WHOIAM 002.JPG", "images/projects/WHO I AM/WHOIAM 007.JPG", "images/projects/WHO I AM/WHOIAM 008.JPG", "images/projects/WHO I AM/WHOIAM 016.JPG", "images/projects/WHO I AM/WHOIAM 019.JPG", "images/projects/WHO I AM/WHOIAM 020.JPG", "images/projects/WHO I AM/WHOIAM 021.JPG", "images/projects/WHO I AM/WHOIAM 029.JPG", "images/projects/WHO I AM/WHOIAM 032.JPG", "images/projects/WHO I AM/WHOIAM 033.JPG", "images/projects/WHO I AM/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/YANDEX/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/projects/YANDEX MONEY/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/YOU DRIVE/1.jpg", "images/projects/YOU DRIVE/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 (1).docx", "images/projects/ZVETANASVENTANA/1.jpg", "images/projects/ZVETANASVENTANA/\u041D\u043E\u0432\u044B\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442.docx", "images/rewards/reward1.png", "images/team/guseva.jpg", "images/teamProjects/a101/a101.jpg", "images/teamProjects/a101/a101.mp4", "images/teamProjects/alone/1.jpg", "images/teamProjects/alone/2.jpg", "images/teamProjects/alone/3.jpg", "images/teamProjects/boneless/1.jpg", "images/teamProjects/boneless/2.jpg", "images/teamProjects/bother/1.jpg", "images/teamProjects/chiki/1.jpg", "images/teamProjects/flowers/1.jpg", "images/teamProjects/gertrude/1.jpg", "images/teamProjects/kaltblut/1.jpg", "images/teamProjects/kaltblut/2.jpg", "images/teamProjects/krivorotov1/1.jpg", "images/teamProjects/krivorotov2/1.mp4", "images/teamProjects/krivorotov2/1.png", "images/teamProjects/krivorotov3/1.jpg", "images/teamProjects/krivorotov3/1.mp4", "images/teamProjects/lachambre/1.jpg", "images/teamProjects/lachambre/2.jpg", "images/teamProjects/notalice/1.jpg", "images/teamProjects/oriflame/1.jpg", "images/teamProjects/oriflame/1.mp4", "images/teamProjects/phd/phd1.jpg", "images/teamProjects/phd/phd2.jpg", "images/teamProjects/phd/phd3.jpg", "images/teamProjects/schiap/1.jpg", "images/teamProjects/schiap/2.jpg", "images/teamProjects/schiap/3.jpg", "images/teamProjects/stacy/1.jpg", "images/teamProjects/stacy/1.mp4", "images/teamProjects/trapeze/1.jpg", "images/teamProjects/trapeze/2.jpg", "images/teamProjects/trapeze/3.jpg", "images/teamProjects/ttswtrs/1.jpg", "images/teamProjects/ttswtrs/2.jpg", "images/teamProjects/vogue/1.jpeg", "images/teamProjects/vogue/2.jpg", "images/teamProjects/vogue/3.jpg", "images/teamProjects/whoiam/1.jpg", "images/teamProjects/whoiam/2.jpg", "images/teamProjects/whoiam/3.jpg", "images/teamProjects/youdrive/1.jpg", "images/teamProjects/youdrive/1.mp4", "images/teamProjects/zventa/1.jpg"]),
  _: {
    mime: { ".png": "image/png", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".mp4": "video/mp4", ".JPG": "image/jpeg", ".jpeg": "image/jpeg" },
    entry: { "file": "start-8e1d7f0f.js", "js": ["start-8e1d7f0f.js", "chunks/vendor-cece5832.js", "chunks/singletons-a42a5e91.js"], "css": ["assets/start-d5b4de3e.css", "assets/vendor-c402c846.css"] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3)),
      () => Promise.resolve().then(() => (init__4(), __exports4)),
      () => Promise.resolve().then(() => (init__5(), __exports5)),
      () => Promise.resolve().then(() => (init__6(), __exports6)),
      () => Promise.resolve().then(() => (init__7(), __exports7)),
      () => Promise.resolve().then(() => (init__8(), __exports8)),
      () => Promise.resolve().then(() => (init__9(), __exports9)),
      () => Promise.resolve().then(() => (init__10(), __exports10)),
      () => Promise.resolve().then(() => (init__11(), __exports11)),
      () => Promise.resolve().then(() => (init__12(), __exports12)),
      () => Promise.resolve().then(() => (init__13(), __exports13))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/contacts\/?$/,
        params: null,
        path: "/contacts",
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/projects\/?$/,
        params: null,
        path: "/projects",
        a: [0, 4],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/projects\/([^/]+?)\/?$/,
        params: (m2) => ({ id: m2[1] }),
        path: null,
        a: [0, 5],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/services\/?$/,
        params: null,
        path: "/services",
        a: [0, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/clients\/?$/,
        params: null,
        path: "/clients",
        a: [0, 7],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/rewards\/?$/,
        params: null,
        path: "/rewards",
        a: [0, 8],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/about\/?$/,
        params: null,
        path: "/about",
        a: [0, 9],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/team\/?$/,
        params: null,
        path: "/team",
        a: [0, 10],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/team\/projects\/([^/]+?)\/?$/,
        params: (m2) => ({ name: m2[1] }),
        path: null,
        a: [0, 11],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/team\/([^/]+?)\/?$/,
        params: (m2) => ({ name: m2[1] }),
        path: null,
        a: [0, 12],
        b: [1]
      }
    ]
  }
};

// .svelte-kit/vercel-tmp/entry.js
__fetch_polyfill();
var app = new App(manifest);
var entry_default = async (req, res) => {
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await app.render({
    url: req.url,
    method: req.method,
    headers: req.headers,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
