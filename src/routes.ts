const route = {
  api: "/api",

  //admin
  admin: "/admin",

  //board
  board: "/board",
  readBoardList: "/list",
  createBoard: "/",
  readBoard: "/",
  updateBoard: "/:id",
  deleteBoard: "/:id",

  //user
  user: "/user",

  login: "/login",
  logout: "/logout",

  //token
  token: "/token",
  renewal: "/renewal",

  regist: "/regist",
  registAdminInfo: "/",

  //posting
  posting: "/posting",
  postingList: "/list/:boardId",
  writePosting: "/",
  modifyPosting: "/id",
  readPosting: "/:id",
  deletePosting: "/:id",
  upload: "/upload/image",

  test: "/test",
  authTest: "/auth",
  loginTest: "/login",

  //client
  client: "/client",

  //clientPosting
  clientPosting: "/posting",
  clientReadPosting: "/:id",
  clientGetPostingListByBoardId: "/list/:boardId",

  //clientBoard
  clientBoard: "/board",
  clientBoardList: "/list",
};

export default route;
