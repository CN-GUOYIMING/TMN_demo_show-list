import data from "./_data.js";

const dataJSON = JSON.stringify(data);

export const get = (request, response, next) => {
  response.end(dataJSON);
};

export const post = (request, response, next) => {
  // TODO: 伝送された JSON 文字列を JSON オブジェクトに解析。
  // const newData = JSON.parse(request.body);
  // const newDataJSON = JSON.stringify(newData);

  response.end(dataJSON);
};
