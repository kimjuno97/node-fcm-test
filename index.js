const admin = require("firebase-admin");
/** firebase admin json파일 가져오기 */
const serviceAccount = require("./dev-wiiee-1e390-firebase-adminsdk-ba7cy-201f474f11.json");

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// FCM 메시지 보내기 함수
async function sendFcmMessage({ token, title, body, index, data }) {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    android: {
      // notification: {
      //   channel_id: "zamfit_01",
      // },
      // sound: "zamfit_01", // .mp3 또는 .wav 확장자를 제외한 파일 이름
    },
    apns: {
      payload: {
        aps: {
          // sound: "zamfit_01.wav", // .wav 파일 이름 (확장자 포함)
          // badge: 1, // 배지 카운터 지정 가능
        },
      },
    },
    data,
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
  } catch (error) {
    console.error(`${index}번째 배열 Error sending message:`, error);
  }
}
/**
 * ```
json: JSON.stringify({
    tabIndex: "HOME", // home tab 유지
    navigationType: "PUSH", 
    deeplink: "zamfit://how_to_use_point",
    routes: [
      // page 스택 쌓기
      {
        path: "/mafia/reservation",
        arg: {
          eventId: 1,
        },
      },
    ],
  }),
};
 * ```
 */
const data = {
  json: JSON.stringify({
    tabIndex: "MEMBER_RECRUITMENT",
    navigationType: "PUSH",
    deeplink: "zamfit://recruitments/detail/12",
    routes: [
      {
        path: "/recruitments/detail/12",
      },
    ],
  }),
};

const tokens = [
  "dItRYsIs-0YpkEyw6zdrrn:APA91bFssQmQCfeu_vLoMB_7-6862B_iok776DMv4slt3oyS8agaSzOKje0VSBus5kyv617r712j2HBXM6wB9Hfko5PWVjUezHqEb4Yox__Q1X1tNGuxahQ",
];
tokens.map((token, index) => {
  sendFcmMessage({
    token,
    title: "안녕하세요 ",
    body: "바디입니다.",
    index,
    data,
  });
});
