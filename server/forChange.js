// 1)    Create one on one chat 
        
//         Req: 
//         {
//             userId:"654a11b6de59b9fd49ae154e"
//         }

//         Res:
//         {
//             _id: new ObjectId("654a122ade59b9fd49ae1551"),
//             chatName: 'sender',
//             isGroupChat: false,
//             users: [
//                 {
//                 pic: [Object],
//                 _id: new ObjectId("6541f0b4b9ae1af29c99e3b9"),
//                 username: 'navdeep',
//                 email: 'navdeep@gmail.com',
//                 isAdmin: false,
//                 createdAt: 2023-11-01T06:31:16.744Z,
//                 updatedAt: 2023-11-01T06:31:16.744Z,
//                 __v: 0
//                 },
//                 {
//                 pic: [Object],
//                 _id: new ObjectId("654a11b6de59b9fd49ae154e"),
//                 username: 'sahil',
//                 email: 'sahil@gmail.com',
//                 isAdmin: false,
//                 createdAt: 2023-11-07T10:30:14.835Z,
//                 updatedAt: 2023-11-07T10:30:14.835Z,
//                 __v: 0
//                 }
//             ],
//             createdAt: 2023-11-07T10:32:10.217Z,
//             updatedAt: 2023-11-07T12:53:22.563Z,
//             __v: 0,
//             latestMessage: {
//                 _id: new ObjectId("654a33429c9a95054efd6435"),
//                 sender: {
//                 pic: [Object],
//                 _id: new ObjectId("6541f0b4b9ae1af29c99e3b9"),
//                 email: 'navdeep@gmail.com'
//                 },
//                 content: 'what are you doing',
//                 chat: new ObjectId("654a122ade59b9fd49ae1551"),
//                 createdAt: 2023-11-07T12:53:22.518Z,
//                 updatedAt: 2023-11-07T12:53:22.518Z,
//                 __v: 0
//             }
//         }

// 2) get all chats including group in which my logged in user parsent 

//         (get response through authorization)

//         Req: [
//             {
//               _id: new ObjectId("6541f183b9ae1af29c99e3bc"),
//               chatName: 'sender',
//               isGroupChat: false,
//               users: [ [Object], [Object] ],
//               createdAt: 2023-11-01T06:34:43.326Z,
//               updatedAt: 2023-11-01T10:43:23.464Z,
//               __v: 0,
//               latestMessage: {
//                 _id: new ObjectId("65422bcbef2263630e114684"),
//                 sender: [Object],
//                 content: 'ok',
//                 chat: new ObjectId("6541f183b9ae1af29c99e3bc"),
//                 createdAt: 2023-11-01T10:43:23.446Z,
//                 updatedAt: 2023-11-01T10:43:23.446Z,
//                 __v: 0
//               }
//             },
//             {
//               _id: new ObjectId("6541f8e3b9ae1af29c99e3ce"),
//               chatName: 'office group',
//               isGroupChat: true,
//               users: [ [Object], [Object], [Object] ],
//               groupAdmin: {
//                 pic: [Object],
//                 _id: new ObjectId("6541ee70b9ae1af29c99e3b5"),
//                 username: 'karan',
//                 email: 'karan@gmail.com',
//                 isAdmin: false,
//                 createdAt: 2023-11-01T06:21:36.520Z,
//                 updatedAt: 2023-11-01T06:21:36.520Z,
//                 __v: 0
//               },
//               createdAt: 2023-11-01T07:06:11.938Z,
//               updatedAt: 2023-11-01T07:06:11.938Z,
//               __v: 0
//             },
//             {
//               _id: new ObjectId("654a122ade59b9fd49ae1551"),
//               chatName: 'sender',
//               isGroupChat: false,
//               users: [ [Object], [Object] ],
//               createdAt: 2023-11-07T10:32:10.217Z,
//               updatedAt: 2023-11-07T12:53:22.563Z,
//               __v: 0,
//               latestMessage: {
//                 _id: new ObjectId("654a33429c9a95054efd6435"),
//                 sender: [Object],
//                 content: 'what are you doing',
//                 chat: new ObjectId("654a122ade59b9fd49ae1551"),
//                 createdAt: 2023-11-07T12:53:22.518Z,
//                 updatedAt: 2023-11-07T12:53:22.518Z,
//                 __v: 0
//               }
//             }
//           ]

// 3) Group chat create

//         Req: {
//             chatName:"office group",
//             users:["6541f775b9ae1af29c99e3c5","6541f0b4b9ae1af29c99e3b9"]
//         }

//         Res: {
//             _id: new ObjectId("6541f183b9ae1af29c99e3bc"),
//             chatName: 'sender',
//             isGroupChat: true,
//             users: [ [Object], [Object], [Object]],
//             createdAt: 2023-11-01T06:34:43.326Z,
//             updatedAt: 2023-11-01T10:43:23.464Z,
//             __v: 0,
//             latestMessage: {
//               _id: new ObjectId("65422bcbef2263630e114684"),
//               sender: [Object],
//               content: 'ok',
//               chat: new ObjectId("6541f183b9ae1af29c99e3bc"),
//               createdAt: 2023-11-01T10:43:23.446Z,
//               updatedAt: 2023-11-01T10:43:23.446Z,
//               __v: 0
//             }
//           }

// 4) get group chat using id

//         pass chatId as a params (http://localhost:8082/chat/group/:chatId)

//         Res :{
//             _id: new ObjectId("6541f183b9ae1af29c99e3bc"),
//             chatName: 'sender',
//             isGroupChat: true,
//             users: [ [Object], [Object], [Object]],
//             createdAt: 2023-11-01T06:34:43.326Z,
//             updatedAt: 2023-11-01T10:43:23.464Z,
//             __v: 0,
//             latestMessage: {
//               _id: new ObjectId("65422bcbef2263630e114684"),
//               sender: [Object],
//               content: 'ok',
//               chat: new ObjectId("6541f183b9ae1af29c99e3bc"),
//               createdAt: 2023-11-01T10:43:23.446Z,
//               updatedAt: 2023-11-01T10:43:23.446Z,
//               __v: 0
//             }
//         }

// 5)  post message 

//         Req: {
//             content:"hi are you there?",
//             chatId:"6541f183b9ae1af29c99e3bc"
//         }

//         Res: {
//             sender: {
//                 _id: "6541f0b4b9ae1af29c99e3b9",
//                 username: "navdeep"
//             },
//             content: "hi are you there?",
//             chat: {
//                 _id: "6541f183b9ae1af29c99e3bc",
//                 chatName: "sender",
//                 isGroupChat: false,
//                 users: [
//                     {
//                         "_id": "6541ee70b9ae1af29c99e3b5",
//                         "username": "karan",
//                         "email": "karan@gmail.com"
//                     },
//                     {
//                         "_id": "6541f0b4b9ae1af29c99e3b9",
//                         "username": "navdeep",
//                         "email": "navdeep@gmail.com"
//                     }
//                 ],
//                 "createdAt": "2023-11-01T06:34:43.326Z",
//                 "updatedAt": "2023-11-08T06:33:35.401Z",
//                 "__v": 0,
//                 "latestMessage": "654b2bbff4f3eaec5e20a86b"
//             },
//             "_id": "654b2c8c4c0d3aebc8ef2bcc",
//             "createdAt": "2023-11-08T06:37:00.745Z",
//             "updatedAt": "2023-11-08T06:37:00.745Z",
//             "__v": 0
//         }

// 6) get all message for a specific chat

//         pass chatId as a params (http://localhost:8082/message/6541f183b9ae1af29c99e3bc)

//         Res: {
//             sender: {
//                 _id: "6541f0b4b9ae1af29c99e3b9",
//                 username: "navdeep"
//             },
//             content: "hi",
//             chat: {
//                 _id: "6541f183b9ae1af29c99e3bc",
//                 chatName: "sender",
//                 isGroupChat: false,
//                 users: [
//                     {
//                         "_id": "6541ee70b9ae1af29c99e3b5",
//                         "username": "karan",
//                         "email": "karan@gmail.com"
//                     },
//                     {
//                         "_id": "6541f0b4b9ae1af29c99e3b9",
//                         "username": "navdeep",
//                         "email": "navdeep@gmail.com"
//                     }
//                 ],
//                 "createdAt": "2023-11-01T06:34:43.326Z",
//                 "updatedAt": "2023-11-08T06:33:35.401Z",
//                 "__v": 0,
//                 "latestMessage": "654b2bbff4f3eaec5e20a86b"
//             },
//             "_id": "654b2c8c4c0d3aebc8ef2bcc",
//             "createdAt": "2023-11-08T06:37:00.745Z",
//             "updatedAt": "2023-11-08T06:37:00.745Z",
//             "__v": 0
//         },
//         {
//             sender: {
//                 _id: "6541f0b4b9ae1af29445cb35c",
//                 username: "karan"
//             },
//             content: "hello",
//             chat: {
//                 _id: "6541f183b9ae1af29c99e3bc",
//                 chatName: "sender",
//                 isGroupChat: false,
//                 users: [
//                     {
//                         "_id": "6541ee70b9ae1af29c99e3b5",
//                         "username": "karan",
//                         "email": "karan@gmail.com"
//                     },
//                     {
//                         "_id": "6541f0b4b9ae1af29c99e3b9",
//                         "username": "navdeep",
//                         "email": "navdeep@gmail.com"
//                     }
//                 ],
//                 "createdAt": "2023-11-01T06:34:43.326Z",
//                 "updatedAt": "2023-11-08T06:33:35.401Z",
//                 "__v": 0,
//                 "latestMessage": "654b2bbff4f3eaec5e20a86b"
//             },
//             "_id": "654b2c8c4c0d3aebc8ef2bcc",
//             "createdAt": "2023-11-08T06:37:00.745Z",
//             "updatedAt": "2023-11-08T06:37:00.745Z",
//             "__v": 0
//         },
//         {
//             sender: {
//                 _id: "6541f0b4b9ae1af29c99e3b9",
//                 username: "navdeep"
//             },
//             content: "what are you doing",
//             chat: {
//                 _id: "6541f183b9ae1af29c99e3bc",
//                 chatName: "sender",
//                 isGroupChat: false,
//                 users: [
//                     {
//                         "_id": "6541ee70b9ae1af29c99e3b5",
//                         "username": "karan",
//                         "email": "karan@gmail.com"
//                     },
//                     {
//                         "_id": "6541f0b4b9ae1af29c99e3b9",
//                         "username": "navdeep",
//                         "email": "navdeep@gmail.com"
//                     }
//                 ],
//                 "createdAt": "2023-11-01T06:34:43.326Z",
//                 "updatedAt": "2023-11-08T06:33:35.401Z",
//                 "__v": 0,
//                 "latestMessage": "654b2bbff4f3eaec5e20a86b"
//             },
//             "_id": "654b2c8c4c0d3aebc8ef2bcc",
//             "createdAt": "2023-11-08T06:37:00.745Z",
//             "updatedAt": "2023-11-08T06:37:00.745Z",
//             "__v": 0
//         }